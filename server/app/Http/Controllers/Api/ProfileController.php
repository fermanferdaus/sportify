<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class ProfileController extends BaseController
{
    protected $profileService;

    public function __construct(\App\Services\ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    /**
     * Update user profile information.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        try {
            $user = $this->profileService->updateProfile($user, $request->all());

            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_picture' => $user->profile_picture,
            ];

            return $this->success($userData, 'Profil berhasil diperbarui.');
        } catch (\Exception $e) {
            return $this->error($e->getMessage(), 422);
        }
    }
}
