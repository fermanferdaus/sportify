<?php

namespace App\Config;

class AppConfig
{
    /**
     * Get TheSportsDb Base URL.
     */
    public static function getSportsDbBaseUrl(): string
    {
        return (string) config('services.the_sports_db.base_url');
    }

    /**
     * Get TheSportsDb API Key.
     */
    public static function getSportsDbKey(): string
    {
        return (string) config('services.the_sports_db.key');
    }

    /**
     * Get Application URL.
     */
    public static function getAppUrl(): string
    {
        return (string) config('app.url');
    }

    /**
     * Is Debug Mode Enabled.
     */
    public static function isDebug(): bool
    {
        return (bool) config('app.debug');
    }
}
