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
        return Cache::remember('sports_leagues_enriched_v1', $this->cacheDuration, function () {
            // 1. Get the master list of all leagues
            $allLeagues = $this->fetchCached('raw_raw_all_leagues', 'all_leagues.php');
            
            // 2. Get enriched data for popular sports to maximize count without hitting rate limits
            $sports = [
                'Soccer', 'Basketball', 'Motorsport', 'American Football', 'Fighting'
            ];
            
            // 3. Create a master collection of leagues index by ID
            $masterLeagues = [];
            
            // Add all leagues from the master list (minimalist/capped at 10)
            foreach ($allLeagues as $league) {
                if (isset($league['idLeague'])) {
                    $masterLeagues[$league['idLeague']] = $league;
                }
            }
            
            // Function to merge enriched data accurately
            foreach ($sports as $sport) {
                $sportLeagues = $this->fetchCached("enriched_{$sport}_leagues", 'search_all_leagues.php', ['s' => $sport]);
                foreach ($sportLeagues as $league) {
                    $id = $league['idLeague'] ?? null;
                    if ($id) {
                        // We prefer data from the enriched list (logos, descriptions, etc.)
                        $masterLeagues[$id] = array_merge($masterLeagues[$id] ?? [], $league);
                    }
                }
            }

            // Convert back to sequential array
            $merged = array_values($masterLeagues);

            $enrichedCount = count(array_filter($merged, fn($l) => !empty($l['strBadge'])));
            \Log::info("SportsService: Final league count: " . count($merged) . " (Enriched: $enrichedCount)");

            return $merged;
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
        // Workaround: TheSportsDB 'lookupteam.php' currently has a bug where it returns Arsenal
        // for many team IDs when using free keys. 
        // If leagueName is provided, we fetch the league teams which is more reliable.
        if ($leagueName) {
            $teams = $this->getTeams($leagueName);
            $team = collect($teams)->firstWhere('idTeam', $teamId);

            if ($team) {
                \Log::info("SportsService Workaround Triggered: Found team {$team['strTeam']} in league $leagueName");
                return (array) $team;
            }
        }

        // Fallback to direct lookup if league lookup fails or isn't provided
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
        $data = $this->fetchCached($cacheKey, 'lookuptable.php', [
            'l' => $leagueId,
            's' => $season
        ]);

        if (empty($data)) {
            \Log::info("SportsService: No standings data found for league $leagueId in season $season");
        }

        return $data;
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
                    \Log::error("SportsService API Error: " . $response->body());
                    return [];
                }

                $data = $response->json();

                // Debug: Log the first item found to verify data
                if (!empty($data)) {
                    $firstKey = array_key_first($data);
                    $firstTeam = !empty($data[$firstKey]) ? $data[$firstKey][0]['strTeam'] ?? 'Unknown' : 'Empty';
                    \Log::info("SportsService API Response Success: $firstKey | Team: $firstTeam");
                }

                // Ambil key pertama dari json sebagai data (leagues, teams, results, dll)
                $result = !empty($data) ? array_values($data)[0] : [];
                
                // CRITICAL: Do not cache empty results as they might be due to temporary API limits
                if (empty($result)) {
                    return [];
                }

                return $result;
            } catch (\Exception $e) {
                \Log::error("SportsService Exception: " . $e->getMessage());
                return [];
            }
        });
    }
}
