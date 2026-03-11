<?php

namespace App\Filament\Widgets;

use App\Models\KeyType;
use App\Models\LiveKey;
use App\Models\StoredKey;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class AdminStatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    public static function canView(): bool
    {
        return Auth::user()?->is_admin ?? false;
    }

    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::where('is_admin', false)->count())
                ->description('Registered users')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),

            Stat::make('Total Key Types', KeyType::count())
                ->description('Across all users')
                ->descriptionIcon('heroicon-m-archive-box')
                ->color('info'),

            Stat::make('Total Stored Keys', StoredKey::count())
                ->description(StoredKey::where('is_sold', true)->count() . ' sold')
                ->descriptionIcon('heroicon-m-key')
                ->color('warning'),

            Stat::make('Total Live Keys', LiveKey::count())
                ->description('Checked live keys')
                ->descriptionIcon('heroicon-m-signal')
                ->color('success'),
        ];
    }
}
