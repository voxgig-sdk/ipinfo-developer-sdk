-- IpinfoDeveloper SDK error

local IpinfoDeveloperError = {}
IpinfoDeveloperError.__index = IpinfoDeveloperError


function IpinfoDeveloperError.new(code, msg, ctx)
  local self = setmetatable({}, IpinfoDeveloperError)
  self.is_sdk_error = true
  self.sdk = "IpinfoDeveloper"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IpinfoDeveloperError:error()
  return self.msg
end


function IpinfoDeveloperError:__tostring()
  return self.msg
end


return IpinfoDeveloperError
