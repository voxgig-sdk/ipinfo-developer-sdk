# IpinfoDeveloper SDK exists test

require "minitest/autorun"
require_relative "../IpinfoDeveloper_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IpinfoDeveloperSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
