<?php
declare(strict_types=1);

// IpinfoDeveloper SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IpinfoDeveloperMakeContext
{
    public static function call(array $ctxmap, ?IpinfoDeveloperContext $basectx): IpinfoDeveloperContext
    {
        return new IpinfoDeveloperContext($ctxmap, $basectx);
    }
}
