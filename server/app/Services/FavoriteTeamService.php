<?php

namespace App\Services;

use App\Repositories\FavoriteTeamRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class FavoriteTeamService
{
    public function __construct(
        protected FavoriteTeamRepository $favoriteTeamRepository
    ) {}

    /**
     * Get list of favorite teams for a user.
     */
    public function getUserFavorites(int $userId): Collection
    {
        return $this->favoriteTeamRepository->getByUserId($userId);
    }

    /**
     * Add team to user favorites.
     */
    public function addToFavorites(int $userId, array $data): \App\Models\FavoriteTeam
    {
        // Cek apakah sudah ada
        if ($this->favoriteTeamRepository->findByUserAndTeam($userId, $data['team_id'])) {
            throw ValidationException::withMessages([
                'team_id' => ['Tim ini sudah ada di daftar favorit Anda.'],
            ]);
        }

        $data['user_id'] = $userId;
        return $this->favoriteTeamRepository->create($data);
    }

    /**
     * Remove team from user favorites.
     */
    public function removeFromFavorites(int $userId, int $id): bool
    {
        return $this->favoriteTeamRepository->delete($userId, $id);
    }
}
