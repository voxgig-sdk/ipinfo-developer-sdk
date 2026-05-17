<?php
declare(strict_types=1);

// IpinfoDeveloper SDK utility: result_headers

class IpinfoDeveloperResultHeaders
{
    public static function call(IpinfoDeveloperContext $ctx): ?IpinfoDeveloperResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
