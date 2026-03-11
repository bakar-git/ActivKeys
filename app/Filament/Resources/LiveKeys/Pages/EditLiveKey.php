<?php

namespace App\Filament\Resources\LiveKeys\Pages;

use App\Filament\Resources\LiveKeys\LiveKeyResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditLiveKey extends EditRecord
{
    protected static string $resource = LiveKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
