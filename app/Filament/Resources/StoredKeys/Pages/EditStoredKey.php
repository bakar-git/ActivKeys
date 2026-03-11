<?php

namespace App\Filament\Resources\StoredKeys\Pages;

use App\Filament\Resources\StoredKeys\StoredKeyResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditStoredKey extends EditRecord
{
    protected static string $resource = StoredKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
