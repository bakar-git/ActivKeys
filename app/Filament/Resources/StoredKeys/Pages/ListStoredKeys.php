<?php

namespace App\Filament\Resources\StoredKeys\Pages;

use App\Filament\Resources\StoredKeys\StoredKeyResource;
use App\Models\StoredKey;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;

class ListStoredKeys extends ListRecords
{
    protected static string $resource = StoredKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
            ->label('New Key')
            ->icon(Heroicon::Plus),
                Action::make('bulkAddKeys')
                    ->label('Bulk Add Keys')
                    ->icon(Heroicon::DocumentPlus)
                    ->modalHeading('Bulk Add Keys')
                    ->modalSubmitActionLabel('Add Keys')
                    ->schema([
                        Select::make('key_type_id')
                            ->label('Key Type')
                            ->searchable()
                            ->relationship('keyType', 'name')
                            ->required(),
                        Textarea::make('keys')
                            ->label('Enter keys (one per line)')
                            ->rows(8)
                            ->required(),
                    ])
                    ->action(function (array $data) {
                        $lines = preg_split('/\r?\n/', $data['keys']);
                        $keys = array_filter(array_map(fn($line) => trim($line), $lines));
                        foreach ($keys as $key) {
                            StoredKey::create(['key' => $key, 'key_type_id' => $data['key_type_id']]);
                        }
                    })
                    ->successNotificationTitle('Keys added successfully'),
        ];
    }
}
