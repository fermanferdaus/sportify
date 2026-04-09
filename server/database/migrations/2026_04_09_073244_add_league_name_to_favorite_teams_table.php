<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('favorite_teams', function (Blueprint $col) {
            $col->string('league_name')->nullable()->after('team_badge');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('favorite_teams', function (Blueprint $col) {
            $col->dropColumn('league_name');
        });
    }
};
