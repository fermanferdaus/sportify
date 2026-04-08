<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

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

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'current_password' => 'nullable|required_with:new_password',
            'new_password' => ['nullable', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,webp,heic|max:5120',
        ]);

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
