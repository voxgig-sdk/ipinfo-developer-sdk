-- IpinfoDeveloper SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local IpinfoDeveloperSDK = {}
IpinfoDeveloperSDK.__index = IpinfoDeveloperSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

IpinfoDeveloperSDK._make_feature = _make_feature


function IpinfoDeveloperSDK.new(options)
  local self = setmetatable({}, IpinfoDeveloperSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function IpinfoDeveloperSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function IpinfoDeveloperSDK:get_utility()
  return Utility.copy(self._utility)
end


function IpinfoDeveloperSDK:get_root_ctx()
  return self._rootctx
end


function IpinfoDeveloperSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function IpinfoDeveloperSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



function IpinfoDeveloperSDK:Abuse(data)
  local EntityMod = require("entity.abuse_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Asn(data)
  local EntityMod = require("entity.asn_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Carrier(data)
  local EntityMod = require("entity.carrier_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Company(data)
  local EntityMod = require("entity.company_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Core(data)
  local EntityMod = require("entity.core_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Domain(data)
  local EntityMod = require("entity.domain_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:General(data)
  local EntityMod = require("entity.general_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:GetCurrentInformation(data)
  local EntityMod = require("entity.get_current_information_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:GetInformationByIp(data)
  local EntityMod = require("entity.get_information_by_ip_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:IpinfoCore(data)
  local EntityMod = require("entity.ipinfo_core_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:IpinfoLite(data)
  local EntityMod = require("entity.ipinfo_lite_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:IpinfoPlus(data)
  local EntityMod = require("entity.ipinfo_plus_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Lite(data)
  local EntityMod = require("entity.lite_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Max(data)
  local EntityMod = require("entity.max_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Men(data)
  local EntityMod = require("entity.men_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Place(data)
  local EntityMod = require("entity.place_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Plus(data)
  local EntityMod = require("entity.plus_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Privacy(data)
  local EntityMod = require("entity.privacy_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:PrivacyExtended(data)
  local EntityMod = require("entity.privacy_extended_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Range(data)
  local EntityMod = require("entity.range_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:ResidentialProxy(data)
  local EntityMod = require("entity.residential_proxy_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:Single(data)
  local EntityMod = require("entity.single_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:WhoisAsn(data)
  local EntityMod = require("entity.whois_asn_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:WhoisDomain(data)
  local EntityMod = require("entity.whois_domain_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:WhoisIp(data)
  local EntityMod = require("entity.whois_ip_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:WhoisNetId(data)
  local EntityMod = require("entity.whois_net_id_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:WhoisOrg(data)
  local EntityMod = require("entity.whois_org_entity")
  return EntityMod.new(self, data)
end


function IpinfoDeveloperSDK:WhoisPoc(data)
  local EntityMod = require("entity.whois_poc_entity")
  return EntityMod.new(self, data)
end




function IpinfoDeveloperSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = IpinfoDeveloperSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return IpinfoDeveloperSDK
