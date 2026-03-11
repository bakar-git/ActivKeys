<?php

use App\Http\Controllers\GetRemainingCountAPIController;
use App\Http\Controllers\LiveKeyInfoController;
use App\Http\Controllers\StoredKeyInfoController;
use App\Http\Middleware\EnsureApiKeyIsValid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware(EnsureApiKeyIsValid::class)->group(function () {
    Route::get('/live-key/info', [LiveKeyInfoController::class, 'index']);
    Route::post('/live-key/info', [LiveKeyInfoController::class, 'update']);

    Route::get('/stored-key/info', [StoredKeyInfoController::class, 'index']);
    Route::post('/stored-key/info', [StoredKeyInfoController::class, 'update']);
});

Route::post('v1/mak', GetRemainingCountAPIController::class);
