<?php

namespace App\Filament\Resources\LiveKeys\Pages;

use App\Filament\Resources\LiveKeys\LiveKeyResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewLiveKey extends ViewRecord
{
    protected static string $resource = LiveKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
