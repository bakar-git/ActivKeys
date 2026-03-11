<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class CapabilitiesService
{
    // Error code constants
    public const ERROR_CAPABILITIES_FAILED = -11;
    public const ERROR_CAPABILITIES_PARSE = -12;
    public const ERROR_EXCEPTION = -13;
    public const ERROR_EMPTY_RESPONSE = -14;

    // Error messages mapping
    public static function getErrorMessage(int $errorCode): string
    {
        return match($errorCode) {
            self::ERROR_CAPABILITIES_FAILED => 'Failed to get capabilities from Microsoft',
            self::ERROR_CAPABILITIES_PARSE => 'Failed to parse capabilities response',
            self::ERROR_EXCEPTION => 'Exception occurred while getting capabilities',
            self::ERROR_EMPTY_RESPONSE => 'Empty response from capabilities service',
            default => 'Unknown capabilities error'
        };
    }

    /**
     * Get capabilities from Microsoft's batch activation service
     */
    public function getCapabilities(): int
    {
        try {
            // Create SOAP envelope for GetCapabilities
            $soapEnvelope = '<?xml version="1.0" encoding="utf-8"?>' .
                '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" ' .
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' .
                'xmlns:xsd="http://www.w3.org/2001/XMLSchema">' .
                '<soap:Body>' .
                '<GetCapabilities xmlns="http://www.microsoft.com/BatchActivationService" />' .
                '</soap:Body>' .
                '</soap:Envelope>';

            // Make HTTP request with SSL verification disabled
            $response = Http::withOptions([
                'verify' => false, // Disable SSL verification
                'allow_redirects' => [
                    'track_redirects' => true,
                    'strict' => true,   // keep POST method across 301/302 redirects
                ],
            ])
            ->withHeaders([
                'User-Agent' => 'Mozilla/4.0 (compatible; MSIE 6.0; MS Web Services Client Protocol 4.0.30319.42000)',
                'SOAPAction' => 'http://www.microsoft.com/BatchActivationService/GetCapabilities',
                'Content-Type' => 'text/xml; charset=utf-8',
            ])
            ->send('POST', 'https://activation.sls.microsoft.com/BatchActivation/BatchActivation.asmx', [
                'body' => $soapEnvelope
            ]);

            if (!$response->successful()) {
                Log::error('GetCapabilities HTTP request failed', ['status' => $response->status()]);
                return self::ERROR_CAPABILITIES_FAILED;
            }

            $responseBody = $response->body();
            Log::info('GetCapabilities Response Received', ['response' => $responseBody]);

            if (empty($responseBody)) {
                return self::ERROR_EMPTY_RESPONSE;
            }

            // Parse the SOAP response
            return $this->parseCapabilitiesResponse($responseBody);

        } catch (Exception $ex) {
            Log::error('GetCapabilities Exception: ' . $ex->getMessage());
            return self::ERROR_EXCEPTION;
        }
    }

    /**
     * Parse the GetCapabilities SOAP response to extract maximum number of requests
     */
    private function parseCapabilitiesResponse(string $soapResponse): int
    {
        try {
            $doc = new \DOMDocument();
            $doc->loadXML($soapResponse);
            $xpath = new \DOMXPath($doc);
            $xpath->registerNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
            $xpath->registerNamespace('batch', 'http://www.microsoft.com/BatchActivationService');

            $maxRequestsNodes = $xpath->query('//batch:MaximumNumberOfRequests');
            
            if ($maxRequestsNodes->length === 0) {
                Log::error('Could not find MaximumNumberOfRequests element in capabilities response');
                return self::ERROR_CAPABILITIES_PARSE;
            }

            $maxRequests = intval($maxRequestsNodes->item(0)->nodeValue);
            Log::info('Parsed maximum requests from capabilities:', ['max_requests' => $maxRequests]);
            
            return $maxRequests;

        } catch (Exception $ex) {
            Log::error('Failed to parse capabilities response: ' . $ex->getMessage());
            return self::ERROR_CAPABILITIES_PARSE;
        }
    }
}
