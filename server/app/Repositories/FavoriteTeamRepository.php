<?php

namespace App\Repositories;

use App\Models\FavoriteTeam;
use Illuminate\Database\Eloquent\Collection;

class FavoriteTeamRepository
{
    /**
     * Get all favorite teams for a user.
     */
    public function getByUserId(int $userId): Collection
    {
        return FavoriteTeam::where('user_id', $userId)->get();
    }

    /**
     * Add a team to favorites.
     */
    public function create(array $data): FavoriteTeam
    {
        return FavoriteTeam::create($data);
    }

    /**
     * Remove a team from favorites.
     */
    public function delete(int $userId, int $id): bool
    {
        return FavoriteTeam::where('user_id', $userId)
            ->where('id', $id)
            ->delete();
    }

    /**
     * Check if a team is already favorited by the user.
     */
    public function findByUserAndTeam(int $userId, string $teamId): ?FavoriteTeam
    {
        return FavoriteTeam::where('user_id', $userId)
            ->where('team_id', $teamId)
            ->first();
    }
}
