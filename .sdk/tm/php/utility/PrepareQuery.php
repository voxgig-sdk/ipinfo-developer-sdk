<?php
declare(strict_types=1);

// IpinfoDeveloper SDK utility: prepare_query

class IpinfoDeveloperPrepareQuery
{
    public static function call(IpinfoDeveloperContext $ctx): array
    {
        $point = $ctx->point;
        $reqmatch = $ctx->reqmatch ?? [];
        $params = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'params');
            if (is_array($p)) {
                $params = $p;
            }
        }
        $out = [];
        $items = \Voxgig\Struct\Struct::items($reqmatch);
        if ($items) {
            foreach ($items as $item) {
                $key = $item[0];
                $val = $item[1];
                if ($val !== null && is_string($key) && !in_array($key, $params, true)) {
                    $out[$key] = $val;
                }
            }
        }
        return $out;
    }
}
