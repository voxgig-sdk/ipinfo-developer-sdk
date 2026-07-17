-- IpinfoDeveloper SDK exists test

local sdk = require("ipinfo-developer_sdk")

describe("IpinfoDeveloperSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
