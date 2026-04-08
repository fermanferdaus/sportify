<?php

use App\Http\Controllers\Api\FavoriteTeamController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Menggunakan apiResource (only index, store, destroy)
    Route::apiResource('favorites', FavoriteTeamController::class)
        ->only(['index', 'store', 'destroy'])
        ->parameters(['favorites' => 'teamId']) // Menyesuaikan agar parameter tetap {teamId}
        ->names('favorites');
});
