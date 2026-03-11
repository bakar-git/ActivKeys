<?php

namespace App\Console\Commands;

use App\Enums\AppSettingKey;
use App\Models\AppSetting;
use App\Services\CapabilitiesService;
use Illuminate\Console\Command;

class UpdateMaxKeysAllowed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-max-keys-allowed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update max keys allowed setting by fetching capabilities from Microsoft';

    protected CapabilitiesService $capabilitiesService;

    public function __construct(CapabilitiesService $capabilitiesService)
    {
        parent::__construct();
        $this->capabilitiesService = $capabilitiesService;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Fetching capabilities from Microsoft...');

        $maxRequests = $this->capabilitiesService->getCapabilities();

        if ($maxRequests < 0) {
            $errorMessage = CapabilitiesService::getErrorMessage($maxRequests);
            $this->error("Failed to get capabilities: {$errorMessage}");
            return Command::FAILURE;
        }

        // Update the database setting
        AppSetting::setValue(AppSettingKey::MaxKeysAllowed, $maxRequests);

        $this->info("Successfully updated max_keys_allowed to: {$maxRequests}");
        return Command::SUCCESS;
    }
}
