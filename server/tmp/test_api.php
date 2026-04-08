<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Http;

$apiKey = "1"; // Free Key
$baseUrl = "https://www.thesportsdb.com/api/v1/json";

$teams = ["133602", "133612"]; // Arsenal, Man Utd

foreach ($teams as $id) {
    try {
        $url = "$baseUrl/$apiKey/lookupteam.php?id=$id";
        echo "Testing URL: $url\n";
        $response = Http::withoutVerifying()->get($url);
        
        echo "Status: " . $response->status() . "\n";
        $json = $response->json();
        
        if (is_array($json)) {
            echo "ID $id: " . (isset($json['teams']) && !empty($json['teams']) ? "FOUND" : "NOT FOUND") . "\n";
            echo "Response: " . json_encode($json) . "\n";
        } else {
            echo "ID $id: Invalid JSON response\n";
            echo "Body: " . $response->body() . "\n";
        }
    } catch (\Exception $e) {
        echo "Error for ID $id: " . $e->getMessage() . "\n";
    }
    echo "-------------------\n";
}
