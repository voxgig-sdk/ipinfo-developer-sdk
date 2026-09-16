# IpinfoDeveloper SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IpinfoDeveloperFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpinfoDeveloperBaseFeature.new
    when "ratelimit"
      IpinfoDeveloperRatelimitFeature.new
    when "retry"
      IpinfoDeveloperRetryFeature.new
    when "test"
      IpinfoDeveloperTestFeature.new
    when "timeout"
      IpinfoDeveloperTimeoutFeature.new
    else
      IpinfoDeveloperBaseFeature.new
    end
  end
end
