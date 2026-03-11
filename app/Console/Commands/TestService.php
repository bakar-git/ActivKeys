<?php

namespace App\Console\Commands;

use App\Services\PidProcessingService;
use Illuminate\Console\Command;

class TestService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-service';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test PID processing service (synchronous version)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->warn('This is the synchronous version. For large datasets, use: php artisan app:process-pids-async');

        $pids = [
            "12345-02165-229-400558-03-1031-9200.0000-0142026"
        ];

        $pidService = app(PidProcessingService::class);
        $result = $pidService->processPids($pids);

        if ($result['success']) {
            $this->info('Modified PIDs:');
            foreach ($result['modified_pids'] as $pid) {
                $this->line("  {$pid}");
            }

            $this->info("\nActivation Remaining:");
            foreach ($result['activation_results'] as $pid => $count) {
                if ($count < 0) {
                    $count = PidProcessingService::getErrorMessage($count);
                }
                $this->line("  {$pid}: {$count}");
            }
        } else {
            $this->error("Error: " . $result['error']);
        }
    }
}
