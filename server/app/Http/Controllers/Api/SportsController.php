<?php

namespace App\Http\Controllers\Api;

use App\Services\SportsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SportsController extends BaseController
{
    public function __construct(
        protected SportsService $sportsService
    ) {}

    /**
     * Get all leagues.
     */
    public function getLeagues(): JsonResponse
    {
        $leagues = $this->sportsService->getLeagues();
        return $this->success($leagues, 'Data liga berhasil diambil.');
    }

    /**
     * Get teams by league name.
     */
    public function getTeams(string $leagueName): JsonResponse
    {
        $teams = $this->sportsService->getTeams($leagueName);
        return $this->success($teams, "Data tim untuk liga $leagueName berhasil diambil.");
    }

    /**
     * Get matches by team ID.
     */
    public function getMatches(string $teamId): JsonResponse
    {
        $matches = $this->sportsService->getMatches($teamId);
        return $this->success($matches, "Data pertandingan untuk tim ID $teamId berhasil diambil.");
    }

    /**
     * Get team detail by ID.
     */
    public function getTeamDetail(string $teamId, Request $request): JsonResponse
    {
        $leagueName = $request->query('league');
        $team = $this->sportsService->getTeamDetail($teamId, $leagueName);
        return $this->success($team, "Data detail tim ID $teamId berhasil diambil.");
    }

    /**
     * Get league standings.
     */
    public function getStandings(string $leagueId, Request $request): JsonResponse
    {
        $season = $request->query('s', '2024-2025');
        $standings = $this->sportsService->getStandings($leagueId, $season);
        return $this->success($standings, "Data klasemen untuk liga ID $leagueId musim $season berhasil diambil.");
    }
}
