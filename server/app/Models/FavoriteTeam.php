<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FavoriteTeam extends Model
{
    protected $fillable = [
        'user_id',
        'team_id',
        'team_name',
        'team_badge',
        'league_name',
    ];

    /**
     * Get the user that owns the favorite team.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
