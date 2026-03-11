<?php

namespace App\Console\Commands;

use App\Enums\AppSettingKey;
use App\Enums\KeyInfoStatus;
use App\Enums\KeyRemainingCountStatus;
use App\Models\AppSetting;
use App\Models\ChangeLog;
use App\Models\StoredKey;
use App\Services\CapabilitiesService;
use App\Services\PidProcessingService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProcessStoredKeyPids extends Command
{
    protected $signature = 'app:process-stored-key-pids {--sleep=0 : Sleep for parallel processing}';

    protected $description = 'Process StoredKey PIDs synchronously and update database';

    public function handle(PidProcessingService $pidService)
    {
        // Add sleep for parallel processing coordination
        $sleepTime = (int) $this->option('sleep');
        if ($sleepTime > 0) {
            $this->info("Sleeping for {$sleepTime} seconds for parallel processing coordination...");
            sleep($sleepTime);
        }

        $limit = (int) AppSetting::getValue(AppSettingKey::MaxKeysAllowed);
        if ($limit <= 0) {
            $this->error("Invalid max_keys_allowed setting.");
            $this->error(CapabilitiesService::getErrorMessage($limit));
            return Command::FAILURE;
        }

        $this->info("Starting StoredKey PID processing...");
        $this->info("Limit: {$limit} PIDs");

        $processed = $this->processStoredKeys($limit, $pidService);

        if ($processed === 0) {
            $this->info("No pending StoredKey PIDs found to process.");
        } else {
            $this->info("Total processed: {$processed} PIDs");
        }

        $this->info("Processing complete!");
    }

    protected function processStoredKeys(int $limit, PidProcessingService $pidService): int
    {
        return DB::transaction(function () use ($limit, $pidService) {
            // Find pending PIDs with lock
            $records = StoredKey::toCheck()
                ->orderBy('id', 'desc')
                ->limit($limit)
                ->lockForUpdate()
                ->get();

            if ($records->isEmpty()) {
                $this->line("No pending StoredKey PIDs found.");
                // Log::info("No pending StoredKey PIDs found.");
                return 0;
            }

            // Immediately mark as pending to prevent other workers from picking them up
            StoredKey::whereIn('id', $records->pluck('id'))
                ->update(['key_remaining_count_status' => KeyRemainingCountStatus::PENDING->value]);

            $pids = $records->pluck('product_id')->filter()->toArray();
            $pidCount = count($pids);

            $this->info("Processing {$pidCount} StoredKey PIDs...");

            // Process PIDs
            $result = $pidService->processPids($pids);

            if ($result['success']) {
                // Update database with results
                foreach ($result['activation_results'] as $originalPid => $count) {
                    $modifiedPid = preg_replace('/\.0000-\d{3}\d{4}$/', '', $originalPid);
                    StoredKey::where('product_id', 'like', "{$modifiedPid}%")->update([
                        'remaining_counts' => (int)$count,
                        'key_remaining_count_status' => (int) $count >= 0 ? KeyRemainingCountStatus::RECEIVED : KeyRemainingCountStatus::ERROR,
                    ]);

                    // Log the change
                    $logData = ['remaining_counts' => (int)$count];
                    ChangeLog::create([
                        'table_name' => 'stored_keys',
                        'table_id' => StoredKey::select('id', 'product_id')->where('product_id', 'like', "{$modifiedPid}%")->value('id'),
                        'data' => $logData,
                    ]);
                }

                $this->info("✓ StoredKey: Successfully processed {$pidCount} PIDs");
                
                // Show some results
                $successCount = 0;
                $errorCount = 0;
                foreach ($result['activation_results'] as $pid => $count) {
                    if ((int) $count >= 0) {
                        $successCount++;
                    } else {
                        $errorCount++;
                    }
                }
                
                $this->line("  Success: {$successCount}, Errors: {$errorCount}");

            } else {
                // Mark all as failed
                StoredKey::whereIn('product_id', $pids)->update([
                    'key_remaining_count_status' => KeyRemainingCountStatus::ERROR,
                ]);

                $this->error("✗ StoredKey: Failed to process PIDs - " . $result['error']);
            }

            return $pidCount;
        });
    }
}
