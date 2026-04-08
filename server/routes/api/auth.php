<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register')->name('auth.register');
    
    // Terapkan Throttling pada Login
    Route::post('/login', 'login')
        ->middleware('throttle:login')
        ->name('auth.login');
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/profile', [\App\Http\Controllers\Api\ProfileController::class, 'update']);
        Route::post('/logout', 'logout')->name('auth.logout');
    });
});
