# IpinfoDeveloper SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IpinfoDeveloperFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpinfoDeveloperBaseFeature.new
    when "test"
      IpinfoDeveloperTestFeature.new
    else
      IpinfoDeveloperBaseFeature.new
    end
  end
end
