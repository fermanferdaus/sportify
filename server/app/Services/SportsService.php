<?php

namespace App\Services;

use App\Config\AppConfig;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SportsService
{
    protected string $baseUrl;
    protected string $apiKey;
    protected int $cacheDuration = 86400; // 24 Jam

    public function __construct()
    {
        $this->baseUrl = AppConfig::getSportsDbBaseUrl();
        $this->apiKey = AppConfig::getSportsDbKey();
    }

    /**
     * Get all leagues with enriched data (logos) where possible.
     */
    public function getLeagues(): array
    {
        return Cache::remember('sports_leagues_soccer_full_v3', $this->cacheDuration, function () {
            $enrichedSoccer = $this->fetchCached("enriched_soccer_v3", 'search_all_leagues.php', ['s' => 'Soccer']);
            $allLeagues = $this->fetchCached('raw_all_leagues_v3', 'all_leagues.php');

            $allSoccer = array_filter($allLeagues, function ($league) {
                return stripos($league['strSport'] ?? '', 'Soccer') !== false;
            });

            $finalLeagues = $enrichedSoccer;
            $enrichedIds = array_column($enrichedSoccer, 'idLeague');

            foreach ($allSoccer as $league) {
                if (isset($league['idLeague']) && !in_array($league['idLeague'], $enrichedIds)) {
                    $finalLeagues[] = $league;
                }
            }

            return $finalLeagues;
        });
    }


    /**
     * Get all teams in a league.
     */
    public function getTeams(string $leagueName): array
    {
        $cacheKey = 'sports_teams_' . str_replace(' ', '_', strtolower($leagueName));
        return $this->fetchCached($cacheKey, 'search_all_teams.php', ['l' => $leagueName]);
    }

    /**
     * Get last matches of a team.
     */
    public function getMatches(string $teamId): array
    {
        $cacheKey = 'sports_matches_' . $teamId;
        return $this->fetchCached($cacheKey, 'eventslast.php', ['id' => $teamId]);
    }

    /**
     * Get team detail by ID.
     */
    public function getTeamDetail(string $teamId, ?string $leagueName = null): array
    {
        if ($leagueName) {
            $teams = $this->getTeams($leagueName);
            $team = collect($teams)->firstWhere('idTeam', $teamId);

            if ($team) {
                return (array) $team;
            }
        }

        $cacheKey = 'sports_team_detail_v2_' . $teamId;
        $data = $this->fetchCached($cacheKey, 'lookupteam.php', ['id' => $teamId]);

        return !empty($data) ? $data[0] : [];
    }

    /**
     * Get league standings.
     */
    public function getStandings(string $leagueId, string $season = '2024-2025'): array
    {
        $cacheKey = "sports_standings_{$leagueId}_" . str_replace('-', '_', $season);
        return $this->fetchCached($cacheKey, 'lookuptable.php', [
            'l' => $leagueId,
            's' => $season
        ]);
    }

    /**
     * Helper to fetch data with caching and error handling.
     */
    private function fetchCached(string $cacheKey, string $endpoint, array $params = []): array
    {
        // Debug: Log the request being made
        \Log::info("SportsService Request: $endpoint", [
            'key' => $cacheKey,
            'params' => $params
        ]);

        return Cache::remember($cacheKey, $this->cacheDuration, function () use ($endpoint, $params) {
            try {
                $url = "{$this->baseUrl}/{$this->apiKey}/{$endpoint}";
                $response = Http::withoutVerifying()->get($url, $params);

                if ($response->failed()) {
                    Log::error("SportsService API Error: " . $response->body());
                    return [];
                }

                $data = $response->json();
                $result = !empty($data) ? array_values($data)[0] : [];

                if (empty($result)) {
                    return [];
                }

                return $result;
            } catch (\Exception $e) {
                Log::error("SportsService Exception: " . $e->getMessage());
                return [];
            }
        });
    }
}
