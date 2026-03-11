<?php

namespace App\Filament\Resources\StoredKeys\Pages;

use App\Filament\Resources\StoredKeys\StoredKeyResource;
use App\Filament\Resources\StoredKeys\Widgets\StoredKeyHistoryChart;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewStoredKey extends ViewRecord
{
    protected static string $resource = StoredKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function getFooterWidgets(): array
    {
        return [
            StoredKeyHistoryChart::make([
                'record_id' => $this->record->id,
            ]),
        ];   
    }
    
}
