<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class UserStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected ?string $heading = 'My Stats';

    public static function canView(): bool
    {
        return !(Auth::user()?->is_admin ?? false);
    }

    protected function getStats(): array
    {
        $user = Auth::user();

        return [
            Stat::make('Key Types', $user->keyTypes()->count())
                ->description('Your key categories')
                ->descriptionIcon('heroicon-m-archive-box')
                ->color('info'),

            Stat::make('Stored Keys', $user->storedKeys()->count())
                ->description($user->storedKeys()->where('is_sold', true)->count() . ' sold')
                ->descriptionIcon('heroicon-m-key')
                ->color('warning'),

            Stat::make('Live Keys', $user->liveKeys()->count())
                ->description('Checked live keys')
                ->descriptionIcon('heroicon-m-signal')
                ->color('success'),
        ];
    }
}
