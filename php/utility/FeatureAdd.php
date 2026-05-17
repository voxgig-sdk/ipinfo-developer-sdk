<?php
declare(strict_types=1);

// IpinfoDeveloper SDK utility: feature_add

class IpinfoDeveloperFeatureAdd
{
    public static function call(IpinfoDeveloperContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
