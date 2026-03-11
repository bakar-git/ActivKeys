<?php

namespace App\Console\Commands;

use App\Models\StoredKey;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ReprocessStoredKeys extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reprocess-stored-keys';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start reprocessing stored keys to update their remaining counts';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        StoredKey::query()
            ->whereHas('keyType', function ($query) {
                $query->where('daily_check', true);
            })
            ->update([
                'key_remaining_count_status' => null,
            ]);
    }
}
