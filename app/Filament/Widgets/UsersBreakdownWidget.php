<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class UsersBreakdownWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    protected ?string $heading = 'Per-User Breakdown';

    public static function canView(): bool
    {
        return Auth::user()?->is_admin ?? false;
    }

    protected function getStats(): array
    {
        $stats = [];

        $users = User::where('is_admin', false)
            ->withCount(['keyTypes', 'storedKeys', 'liveKeys'])
            ->orderBy('name')
            ->get();

        foreach ($users as $user) {
            $stats[] = Stat::make($user->name, "{$user->stored_keys_count} stored · {$user->live_keys_count} live")
                ->description("{$user->key_types_count} key types · " . ($user->is_active ? 'Active' : 'Disabled'))
                ->descriptionIcon($user->is_active ? 'heroicon-m-check-circle' : 'heroicon-m-x-circle')
                ->color($user->is_active ? 'success' : 'danger');
        }

        return $stats;
    }
}

