<?php

use App\Console\Commands\ProcessLiveKeyPids;
use App\Console\Commands\ProcessStoredKeyPids;
use App\Console\Commands\ReprocessErrorStoredKeys;
use App\Console\Commands\ReprocessStoredKeys;
use App\Console\Commands\UpdateMaxKeysAllowed;
use Illuminate\Support\Facades\Schedule;



Schedule::command(UpdateMaxKeysAllowed::class)->everyFourHours();

Schedule::command(ReprocessStoredKeys::class)->daily();
Schedule::command(ReprocessErrorStoredKeys::class)->dailyAt('03:00');


Schedule::command(ProcessLiveKeyPids::class, ['--sleep=0'])->everyThirtySeconds()->runInBackground()->withoutOverlapping();
Schedule::command(ProcessLiveKeyPids::class, ['--sleep=5'])->everyThirtySeconds()->runInBackground()->withoutOverlapping();

Schedule::command(ProcessStoredKeyPids::class, ['--sleep=0'])->everyThirtySeconds()->runInBackground()->withoutOverlapping();
Schedule::command(ProcessStoredKeyPids::class, ['--sleep=5'])->everyThirtySeconds()->runInBackground()->withoutOverlapping();
