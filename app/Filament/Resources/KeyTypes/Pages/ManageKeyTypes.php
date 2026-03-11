<?php

namespace App\Filament\Resources\KeyTypes\Pages;

use App\Filament\Resources\KeyTypes\KeyTypeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageKeyTypes extends ManageRecords
{
    protected static string $resource = KeyTypeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
