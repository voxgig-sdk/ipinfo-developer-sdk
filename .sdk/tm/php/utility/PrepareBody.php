<?php
declare(strict_types=1);

// IpinfoDeveloper SDK utility: prepare_body

class IpinfoDeveloperPrepareBody
{
    public static function call(IpinfoDeveloperContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
