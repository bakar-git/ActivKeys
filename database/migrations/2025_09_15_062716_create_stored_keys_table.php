<?php

use App\Models\KeyType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stored_keys', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('description')->nullable();
            $table->string('edition_id')->nullable();
            $table->string('key_type')->nullable();
            $table->string('eula_type')->nullable();
            $table->string('product_id')->nullable();
            $table->string('error')->nullable();
            $table->string('key_info_status')->nullable();
            $table->string('key_remaining_count_status')->nullable();
            $table->integer('remaining_counts')->default(-111);
            $table->boolean('is_sold')->default(false);
            $table->foreignIdFor(KeyType::class)->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stored_keys');
    }
};
