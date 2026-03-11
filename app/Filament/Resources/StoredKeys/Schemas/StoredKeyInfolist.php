<?php

namespace App\Filament\Resources\StoredKeys\Schemas;

use App\Models\StoredKey;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class StoredKeyInfolist
{
    public static function configure(Schema $schema): Schema
    {
        /** @var StoredKey $record */
        $record = $schema->getRecord();

        return $schema
            ->components([
                Grid::make(3)
                    ->schema([
                        Section::make('Key Information')
                            ->icon('heroicon-o-key')
                            ->description('Primary key details and identification')
                            ->schema([
                                TextEntry::make('key')
                                    ->label('License Key')
                                    ->copyable(true)
                                    ->copyMessage('Key copied to clipboard')
                                    ->weight('bold')
                                    ->color('primary'),
                                TextEntry::make('description')
                                    ->placeholder('No description provided'),
                                TextEntry::make('keyType.name')
                                    ->label('Key Type')
                                    ->badge()
                                    ->placeholder('Unknown'),
                                IconEntry::make('is_sold')
                                    ->label('Sold Status')
                                    ->boolean()
                                    ->trueIcon('heroicon-o-check-circle')
                                    ->falseIcon('heroicon-o-x-circle')
                                    ->trueColor('success')
                                    ->falseColor('gray'),
                            ])
                            ->columns(1),

                        Section::make('Product Details')
                            ->icon('heroicon-o-cube')
                            ->description('Software product information')
                            ->schema([
                                TextEntry::make('product_id')
                                    ->label('Product ID')
                                    ->placeholder('Not specified'),
                                TextEntry::make('edition_id')
                                    ->label('Edition ID')
                                    ->placeholder('Not specified'),
                                TextEntry::make('key_type')
                                    ->label('Type (Auto-detected)')
                                    ->badge()
                                    ->color('secondary')
                                    ->placeholder('Unknown'),
                                TextEntry::make('eula_type')
                                    ->label('EULA Type')
                                    ->badge()
                                    ->color('info')
                                    ->placeholder('Not specified'),
                            ])
                            ->columns(1),
                        Section::make('Usage Status')
                            ->icon('heroicon-o-chart-bar')
                            ->schema([
                                TextEntry::make('remaining_counts')
                                    ->label('Remaining Uses')
                                    ->numeric()
                                    ->badge()
                                    ->color(fn ($state) => match (true) {
                                        $state > 10 => 'success',
                                        $state > 0 => 'warning',
                                        default => 'danger',
                                    }),
                                TextEntry::make('key_remaining_count_status')
                                    ->label('Count Status')
                                    ->badge()
                                    ->placeholder('Unknown'),
                                TextEntry::make('key_info_status')
                                    ->label('Info Status')
                                    ->badge()
                                    ->color(fn ($state) => match ($state) {
                                        'valid' => 'success',
                                        'invalid' => 'danger',
                                        'error' => 'danger',
                                        default => 'warning',
                                    })
                                    ->placeholder('Unknown'),
                                TextEntry::make('error')
                                    ->label('Error Details')
                                    ->color('danger')
                                    ->placeholder('No errors')
                                    ->visible(fn ($state) => !empty($state)),
                                    TextEntry::make('created_at')
                                    ->label('Created')
                                    ->dateTime()
                                    ->since()
                                    ->placeholder('Unknown'),
                                TextEntry::make('updated_at')
                                    ->label('Last Updated')
                                    ->dateTime()
                                    ->since()
                                    ->placeholder('Unknown'),
                            ])
                            ->columns(2),

                    ])->columnSpanFull(),
            ])->extraAttributes(
                $record?->needsPolling() ? ['wire:poll.2s' => ''] : []
            );;
    }
}
