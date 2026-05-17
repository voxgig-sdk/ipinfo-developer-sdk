<?php
declare(strict_types=1);

// IpinfoDeveloper SDK utility: result_body

class IpinfoDeveloperResultBody
{
    public static function call(IpinfoDeveloperContext $ctx): ?IpinfoDeveloperResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
