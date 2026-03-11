<?php

namespace Database\Seeders;

use App\Enums\AppSettingKey;
use App\Models\AppSetting;
use App\Models\KeyType;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default settings
        AppSetting::create([
            'key' => AppSettingKey::MaxKeysAllowed->value,
            'value' => '50',
        ]);
    }
}
