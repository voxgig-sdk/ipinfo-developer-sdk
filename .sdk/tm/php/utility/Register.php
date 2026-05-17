<?php
declare(strict_types=1);

// IpinfoDeveloper SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

IpinfoDeveloperUtility::setRegistrar(function (IpinfoDeveloperUtility $u): void {
    $u->clean = [IpinfoDeveloperClean::class, 'call'];
    $u->done = [IpinfoDeveloperDone::class, 'call'];
    $u->make_error = [IpinfoDeveloperMakeError::class, 'call'];
    $u->feature_add = [IpinfoDeveloperFeatureAdd::class, 'call'];
    $u->feature_hook = [IpinfoDeveloperFeatureHook::class, 'call'];
    $u->feature_init = [IpinfoDeveloperFeatureInit::class, 'call'];
    $u->fetcher = [IpinfoDeveloperFetcher::class, 'call'];
    $u->make_fetch_def = [IpinfoDeveloperMakeFetchDef::class, 'call'];
    $u->make_context = [IpinfoDeveloperMakeContext::class, 'call'];
    $u->make_options = [IpinfoDeveloperMakeOptions::class, 'call'];
    $u->make_request = [IpinfoDeveloperMakeRequest::class, 'call'];
    $u->make_response = [IpinfoDeveloperMakeResponse::class, 'call'];
    $u->make_result = [IpinfoDeveloperMakeResult::class, 'call'];
    $u->make_point = [IpinfoDeveloperMakePoint::class, 'call'];
    $u->make_spec = [IpinfoDeveloperMakeSpec::class, 'call'];
    $u->make_url = [IpinfoDeveloperMakeUrl::class, 'call'];
    $u->param = [IpinfoDeveloperParam::class, 'call'];
    $u->prepare_auth = [IpinfoDeveloperPrepareAuth::class, 'call'];
    $u->prepare_body = [IpinfoDeveloperPrepareBody::class, 'call'];
    $u->prepare_headers = [IpinfoDeveloperPrepareHeaders::class, 'call'];
    $u->prepare_method = [IpinfoDeveloperPrepareMethod::class, 'call'];
    $u->prepare_params = [IpinfoDeveloperPrepareParams::class, 'call'];
    $u->prepare_path = [IpinfoDeveloperPreparePath::class, 'call'];
    $u->prepare_query = [IpinfoDeveloperPrepareQuery::class, 'call'];
    $u->result_basic = [IpinfoDeveloperResultBasic::class, 'call'];
    $u->result_body = [IpinfoDeveloperResultBody::class, 'call'];
    $u->result_headers = [IpinfoDeveloperResultHeaders::class, 'call'];
    $u->transform_request = [IpinfoDeveloperTransformRequest::class, 'call'];
    $u->transform_response = [IpinfoDeveloperTransformResponse::class, 'call'];
});
