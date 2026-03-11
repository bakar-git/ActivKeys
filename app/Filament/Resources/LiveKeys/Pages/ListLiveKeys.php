<?php

namespace App\Filament\Resources\LiveKeys\Pages;

use App\Filament\Resources\LiveKeys\LiveKeyResource;
use App\Models\LiveKey;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\Textarea;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;

class ListLiveKeys extends ListRecords
{
    protected static string $resource = LiveKeyResource::class;

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
                        Textarea::make('keys')
                            ->label('Enter keys (one per line)')
                            ->rows(8)
                            ->required(),
                    ])
                    ->action(function (array $data) {
                        $lines = preg_split('/\r?\n/', $data['keys']);
                        $keys = array_filter(array_map(fn($line) => trim($line), $lines));
                        foreach ($keys as $key) {
                            LiveKey::create(['key' => $key]);
                        }
                    })
                    ->successNotificationTitle('Keys added successfully'),
        ];
    }
}
