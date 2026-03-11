<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class PidProcessingService
{
    private const SECRET_KEY = [
        0xfe, 0x31, 0x98, 0x75, 0xfb, 0x48, 0x84, 0x86, 0x9c, 0xf3, 0xf1, 0xce, 0x99, 0xa8, 0x90, 0x64,
        0xab, 0x57, 0x1f, 0xca, 0x47, 0x04, 0x50, 0x58, 0x30, 0x24, 0xe2, 0x14, 0x62, 0x87, 0x79, 0xa0,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ];

    // Error code constants
    public const ERROR_KEY_BLOCKED = -1;
    public const ERROR_UNSUPPORTED_PRODUCT = -2;
    public const ERROR_SYSTEM_MAINTENANCE = -3;
    public const ERROR_UNKNOWN = -4;
    public const ERROR_HTTP_FAILED = -5;
    public const ERROR_EMPTY_RESPONSE = -6;
    public const ERROR_EXCEPTION = -7;
    public const ERROR_XML_PARSE = -8;
    public const ERROR_NO_ACTIVATION_REMAINING = -9;
    public const ERROR_NO_RESPONSE_XML = -10;
    public const ERROR_MAK_LIMIT_EXCEEDED = -11;
    public const ERROR_INVALID_PRODUCT_KEY = -12;
    public const ERROR_INVALID_KEY_TYPE = -13;
    public const ERROR_INVALID_INSTALLATION_ID = -14;
    public const ERROR_NOT_CHECKED= -111;


    public function __construct()
    {
    }

    // Error messages mapping
    public static function getErrorMessage(int $errorCode): string
    {
        return match($errorCode) {
            self::ERROR_KEY_BLOCKED => 'Key blocked!',
            self::ERROR_UNSUPPORTED_PRODUCT => 'Unsupported product',
            self::ERROR_SYSTEM_MAINTENANCE => 'MS System is under maintenance',
            self::ERROR_UNKNOWN => 'Unknown error',
            self::ERROR_HTTP_FAILED => 'HTTP request failed',
            self::ERROR_EMPTY_RESPONSE => 'Empty response body',
            self::ERROR_EXCEPTION => 'Exception occurred',
            self::ERROR_XML_PARSE => 'XML parse error',
            self::ERROR_NO_ACTIVATION_REMAINING => 'Could not find ActivationRemaining element',
            self::ERROR_NO_RESPONSE_XML => 'Could not find ResponseXml element',
            self::ERROR_MAK_LIMIT_EXCEEDED => 'The Multiple Activation Key has exceeded its limit',
            self::ERROR_INVALID_PRODUCT_KEY => 'Invalid product key',
            self::ERROR_INVALID_KEY_TYPE => 'Invalid key type',
            self::ERROR_INVALID_INSTALLATION_ID => 'Please check the Installation ID and try again',
            self::ERROR_NOT_CHECKED => 'Remaining counts not checked yet',
            default => 'Unknown error code'
        };
    }

    /**
     * Process PIDs and get count data
     */
    public function processPids(array $pids): array
    {
        try {
            $modifiedPids = [];
            foreach ($pids as $pid) {
                $modifiedPids[] = $this->replaceEpid($pid);
            }

            Log::info('Modified PIDs:', $modifiedPids);

            // Step 4: Get count data for modified PIDs
            $results = $this->getCountAsync($modifiedPids);

            return [
                'modified_pids' => $modifiedPids,
                'activation_results' => $results,
                'processed_pid_count' => count($modifiedPids),
                'success' => true
            ];

        } catch (Exception $ex) {
            Log::error('PID Processing Error: ' . $ex->getMessage());
            
            return [
                'error' => $ex->getMessage(),
                'success' => false
            ];
        }
    }

    /**
     * Replace EPID in the PID string with current date
     */
    private function replaceEpid(string $pid): string
    {
        $now = now();
        $dayOfYear = $now->dayOfYear;
        $year = $now->year;
        $formattedDayOfYear = str_pad($dayOfYear, 3, '0', STR_PAD_LEFT);
        $epid = ".0000-{$formattedDayOfYear}{$year}";
        
        $lastDotIndex = strrpos($pid, '.');
        if ($lastDotIndex !== false) {
            $pidPrefix = substr($pid, 0, $lastDotIndex);
            $pid = $pidPrefix . $epid;
        } else {
            $pid = $pid . $epid;
        }
        
        return $pid;
    }

    /**
     * Get activation count for PIDs via Microsoft's batch activation service
     */
    private function getCountAsync(array $pids): array
    {
        $results = [];

        try {
            // Create the inner XML request
            $requestBuilder = "<ActivationRequest xmlns=\"http://www.microsoft.com/DRM/SL/BatchActivationRequest/1.0\">";
            $requestBuilder .= "<VersionNumber>2.0</VersionNumber>";
            $requestBuilder .= "<RequestType>2</RequestType>";
            $requestBuilder .= "<Requests>";

            foreach ($pids as $pid) {
                $requestBuilder .= "<Request><PID>{$pid}</PID></Request>";
            }

            $requestBuilder .= "</Requests>";
            $requestBuilder .= "</ActivationRequest>";

            // Convert to UTF-16 LE (to match original C++ wstring behavior)
            $requestBytes = mb_convert_encoding($requestBuilder, 'UTF-16LE', 'UTF-8');

            // Calculate HMAC-SHA256 digest
            $secretKeyBinary = pack('C*', ...self::SECRET_KEY);
            $hash = hash_hmac('sha256', $requestBytes, $secretKeyBinary, true);
            $digest = base64_encode($hash);
            $base64Body = base64_encode($requestBytes);

            // Create SOAP envelope
            $soapEnvelope = '<?xml version="1.0" encoding="utf-8"?>' .
                '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">' .
                '<soap:Body>' .
                '<BatchActivate xmlns="http://www.microsoft.com/BatchActivationService">' .
                '<request>' .
                "<Digest>{$digest}</Digest>" .
                "<RequestXml>{$base64Body}</RequestXml>" .
                '</request>' .
                '</BatchActivate>' .
                '</soap:Body>' .
                '</soap:Envelope>';

            // Make HTTP request with SSL verification disabled
            $response = Http::withOptions([
                'verify' => false, // Disable SSL verification
                // 'proxy' => 'http://192.168.1.3:8888',
                'allow_redirects' => [
                    'track_redirects' => true,
                    'strict' => true,   // keep POST method across 301/302 redirects
                ],
                'timeout' => 180, // 3 minutes timeout
            ])
            ->withHeaders([
                'User-Agent' => 'Mozilla/4.0 (compatible; MSIE 6.0; MS Web Services Client Protocol 4.0.30319.42000)',
                'SOAPAction' => '"http://www.microsoft.com/BatchActivationService/BatchActivate"',
                'Content-Type' => 'text/xml; charset=utf-8',
                'Expect'=> '100-continue',
                'Connection'=> 'Keep-Alive'
            ])
            ->send('POST', 'https://activation.sls.microsoft.com/BatchActivation/BatchActivation.asmx', [
                'body' => $soapEnvelope
            ]);
            // ->send('POST', 'http://go.microsoft.com/fwlink/?LinkId=82160', [
            //     'body' => $soapEnvelope
            // ]);

            if (!$response->successful()) {
                foreach ($pids as $pid) {
                    $results[$pid] = self::ERROR_HTTP_FAILED;
                }
                return $results;
            }

            $responseBody = $response->body();

            // Log::info('SOAP Response Received', ['response' => $responseBody]);

            if (empty($responseBody)) {
                foreach ($pids as $pid) {
                    $results[$pid] = self::ERROR_EMPTY_RESPONSE;
                }
                return $results;
            }

            // Parse the SOAP response
            $parsedResults = $this->parseSoapResponse($responseBody);
            foreach ($parsedResults as $pid => $result) {
                $results[$pid] = $result;
            }

        } catch (Exception $ex) {
            foreach ($pids as $pid) {
                $results[$pid] = self::ERROR_EXCEPTION;
            }
        }

        return $results;
    }

    /**
     * Parse the SOAP response XML to extract activation counts
     */
    private function parseSoapResponse(string $soapResponse): array
    {
        $results = [];

        try {
            // Parse the outer SOAP envelope
            $doc = new \DOMDocument();
            $doc->loadXML($soapResponse);
            $xpath = new \DOMXPath($doc);
            $xpath->registerNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xpath->registerNamespace('batch', 'http://www.microsoft.com/BatchActivationService');

            $responseXmlNodes = $xpath->query('//batch:ResponseXml');
            
            if ($responseXmlNodes->length === 0) {
                return ['ERROR' => self::ERROR_NO_RESPONSE_XML];
            }

            // Get the inner XML (HTML encoded)
            $innerXml = $responseXmlNodes->item(0)->nodeValue;
            
            // HTML decode the inner XML
            $innerXml = html_entity_decode($innerXml, ENT_QUOTES, 'UTF-8');
            
            // Fix the UTF-16 declaration issue - replace with UTF-8 or remove it
            $innerXml = preg_replace('/<\?xml[^>]*encoding="utf-16"[^>]*\?>/', '<?xml version="1.0" encoding="utf-8"?>', $innerXml);
            
            // Parse the inner XML
            $innerDoc = new \DOMDocument();
            $innerDoc->loadXML($innerXml);
            $innerXpath = new \DOMXPath($innerDoc);
            $innerXpath->registerNamespace('activation', 'http://www.microsoft.com/DRM/SL/BatchActivationResponse/1.0');

            $responseNodes = $innerXpath->query('//activation:Response');

            foreach ($responseNodes as $responseNode) {
                $pidNodes = $innerXpath->query('.//activation:PID', $responseNode);
                $countNodes = $innerXpath->query('.//activation:ActivationRemaining', $responseNode);
                
                $pid = $pidNodes->length > 0 ? $pidNodes->item(0)->nodeValue : 'Unknown PID';

                if ($countNodes->length > 0) {
                    $countValue = $countNodes->item(0)->nodeValue;

                    // Check if there's an error node
                    $errorNodes = $innerXpath->query('.//activation:ErrorCode', $responseNode);
                    if ($errorNodes->length > 0) {
                        $errorCode = $errorNodes->item(0)->nodeValue;
                        match($errorCode) {
                            '0x7F' => $results[$pid] = self::ERROR_MAK_LIMIT_EXCEEDED,
                            '0x67' => $results[$pid] = self::ERROR_KEY_BLOCKED,
                            '0x68' => $results[$pid] = self::ERROR_INVALID_PRODUCT_KEY,
                            '0x86' => $results[$pid] = self::ERROR_INVALID_KEY_TYPE,
                            '0x90' => $results[$pid] = self::ERROR_INVALID_INSTALLATION_ID,
                            '0x80004003' => $results[$pid] = self::ERROR_SYSTEM_MAINTENANCE,
                            default => $results[$pid] = self::ERROR_UNKNOWN,
                        };
                    } else {
                        $results[$pid] = $countValue;
                    }
                } else {
                    $results[$pid] = self::ERROR_NO_ACTIVATION_REMAINING;
                }
            }
            Log::info('Parsed Activation Results:', $results);
            return $results;

        } catch (Exception $ex) {
            return ['ERROR' => self::ERROR_XML_PARSE];
        }
    }
}