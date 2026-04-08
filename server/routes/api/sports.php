<?php

use App\Http\Controllers\Api\SportsController;
use Illuminate\Support\Facades\Route;

Route::controller(SportsController::class)->group(function () {
    Route::get('/leagues', 'getLeagues')->name('sports.leagues');
    Route::get('/leagues/{leagueName}/teams', 'getTeams')->name('sports.teams');
    Route::get('/teams/{teamId}', 'getTeamDetail')->name('sports.team_detail');
    Route::get('/teams/{teamId}/matches', 'getMatches')->name('sports.matches');
    Route::get('/leagues/{leagueId}/standings', 'getStandings')->name('sports.standings');
});
