<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes Entry Point
|--------------------------------------------------------------------------
*/

// Version 1 Group
Route::prefix('v1')->as('v1.')->group(function () {

    // User Profile (Global Protected)
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    })->name('user.profile');

    /**
     * Modular Routes Inclusions
     */

    // Auth Routes
    require __DIR__ . '/api/auth.php';

    // Sports Data Routes
    require __DIR__ . '/api/sports.php';

    // Favorite Teams Routes
    require __DIR__ . '/api/favorites.php';

});
