# IpinfoDeveloper SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IpinfoDeveloperUtility.registrar = ->(u) {
  u.clean = IpinfoDeveloperUtilities::Clean
  u.done = IpinfoDeveloperUtilities::Done
  u.make_error = IpinfoDeveloperUtilities::MakeError
  u.feature_add = IpinfoDeveloperUtilities::FeatureAdd
  u.feature_hook = IpinfoDeveloperUtilities::FeatureHook
  u.feature_init = IpinfoDeveloperUtilities::FeatureInit
  u.fetcher = IpinfoDeveloperUtilities::Fetcher
  u.make_fetch_def = IpinfoDeveloperUtilities::MakeFetchDef
  u.make_context = IpinfoDeveloperUtilities::MakeContext
  u.make_options = IpinfoDeveloperUtilities::MakeOptions
  u.make_request = IpinfoDeveloperUtilities::MakeRequest
  u.make_response = IpinfoDeveloperUtilities::MakeResponse
  u.make_result = IpinfoDeveloperUtilities::MakeResult
  u.make_point = IpinfoDeveloperUtilities::MakePoint
  u.make_spec = IpinfoDeveloperUtilities::MakeSpec
  u.make_url = IpinfoDeveloperUtilities::MakeUrl
  u.param = IpinfoDeveloperUtilities::Param
  u.prepare_auth = IpinfoDeveloperUtilities::PrepareAuth
  u.prepare_body = IpinfoDeveloperUtilities::PrepareBody
  u.prepare_headers = IpinfoDeveloperUtilities::PrepareHeaders
  u.prepare_method = IpinfoDeveloperUtilities::PrepareMethod
  u.prepare_params = IpinfoDeveloperUtilities::PrepareParams
  u.prepare_path = IpinfoDeveloperUtilities::PreparePath
  u.prepare_query = IpinfoDeveloperUtilities::PrepareQuery
  u.result_basic = IpinfoDeveloperUtilities::ResultBasic
  u.result_body = IpinfoDeveloperUtilities::ResultBody
  u.result_headers = IpinfoDeveloperUtilities::ResultHeaders
  u.transform_request = IpinfoDeveloperUtilities::TransformRequest
  u.transform_response = IpinfoDeveloperUtilities::TransformResponse
}
