<?php

namespace App\Http\Controllers\Api;

use App\Services\FavoriteTeamService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class FavoriteTeamController extends BaseController
{
    public function __construct(
        protected FavoriteTeamService $favoriteTeamService
    ) {}

    /**
     * Get list of favorite teams.
     */
    public function index(Request $request): JsonResponse
    {
        $favorites = $this->favoriteTeamService->getUserFavorites($request->user()->id);
        return $this->success($favorites, 'Daftar tim favorit berhasil diambil.');
    }

    /**
     * Add a team to favorites.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'team_id' => 'required|string',
            'team_name' => 'required|string',
            'team_badge' => 'nullable|string',
        ]);

        try {
            $favorite = $this->favoriteTeamService->addToFavorites($request->user()->id, $validated);
            return $this->success($favorite, 'Tim berhasil ditambahkan ke favorit.', 201);
        } catch (ValidationException $e) {
            return $this->error($e->getMessage(), 422, $e->errors());
        }
    }

    /**
     * Remove a team from favorites.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $this->favoriteTeamService->removeFromFavorites($request->user()->id, $id);
        return $this->success(null, 'Tim berhasil dihapus dari favorit.');
    }
}
