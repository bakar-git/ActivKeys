<?php

namespace App\Console\Commands;

use App\Models\StoredKey;
use Illuminate\Console\Command;

class ReprocessErrorStoredKeys extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reprocess-error-stored-keys';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start reprocessing of such stored keys where network error occurred (-7) and update their remaining counts';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        StoredKey::query()
            ->whereHas('keyType', function ($query) {
                $query->where('daily_check', true);
            })
            ->where('remaining_counts', -7)
            ->update([
                'key_remaining_count_status' => null,
            ]);
    }
}
