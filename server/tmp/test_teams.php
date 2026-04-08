<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Http;

$apiKey = "1";
$baseUrl = "https://www.thesportsdb.com/api/v1/json";
$league = "English Premier League";

$url = "$baseUrl/$apiKey/search_all_teams.php?l=" . urlencode($league);
$response = Http::withoutVerifying()->get($url);
$teams = $response->json()['teams'] ?? [];

echo "Found " . count($teams) . " teams for $league\n";
foreach (array_slice($teams, 0, 5) as $team) {
    echo "Team: " . $team['strTeam'] . " | ID: " . $team['idTeam'] . "\n";
}
