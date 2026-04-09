<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProfileService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Update user profile.
     *
     * @param User $user
     * @param array $data
     * @return User
     * @throws \Exception
     */
    public function updateProfile(User $user, array $data): User
    {
        $updateData = [
            'name' => $data['name']
        ];

        // Handle Password Update
        if (isset($data['new_password']) && !empty($data['new_password'])) {
            if (!Hash::check($data['current_password'], $user->password)) {
                throw new \Exception('The current password you entered is incorrect.');
            }
            $updateData['password'] = Hash::make($data['new_password']);
        }

        // Handle Profile Picture
        if (isset($data['profile_picture']) && $data['profile_picture'] instanceof \Illuminate\Http\UploadedFile) {
            $updateData['profile_picture'] = $this->handleImageUpload($user, $data['profile_picture']);
        }

        return $this->userRepository->update($user, $updateData);
    }

    /**
     * Process and upload profile picture.
     *
     * @param User $user
     * @param \Illuminate\Http\UploadedFile $file
     * @return string
     */
    protected function handleImageUpload(User $user, $file): string
    {
        // Delete old picture if exists
        if ($user->profile_picture) {
            Storage::disk('uploads')->delete($user->profile_picture);
        }

        $filename = 'profile_' . $user->id . '_' . time() . '.webp';
        $path = 'profiles/' . $filename;

        // Process Image with Intervention Image v3
        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);

        // Scale and Encode
        $image->scale(width: 400);
        $encoded = $image->toWebp(80);

        // Save to uploads disk (public/uploads)
        Storage::disk('uploads')->put($path, (string) $encoded);

        return $path;
    }
}
