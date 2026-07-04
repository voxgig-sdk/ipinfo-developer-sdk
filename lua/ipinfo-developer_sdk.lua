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



-- Idiomatic facade: client:abuse():list() / client:abuse():load({ id = ... })
function IpinfoDeveloperSDK:abuse(data)
  local EntityMod = require("entity.abuse_entity")
  if data == nil then
    if self._abuse == nil then
      self._abuse = EntityMod.new(self, nil)
    end
    return self._abuse
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:abuse() instead.
function IpinfoDeveloperSDK:Abuse(data)
  local EntityMod = require("entity.abuse_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:asn():list() / client:asn():load({ id = ... })
function IpinfoDeveloperSDK:asn(data)
  local EntityMod = require("entity.asn_entity")
  if data == nil then
    if self._asn == nil then
      self._asn = EntityMod.new(self, nil)
    end
    return self._asn
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:asn() instead.
function IpinfoDeveloperSDK:Asn(data)
  local EntityMod = require("entity.asn_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:carrier():list() / client:carrier():load({ id = ... })
function IpinfoDeveloperSDK:carrier(data)
  local EntityMod = require("entity.carrier_entity")
  if data == nil then
    if self._carrier == nil then
      self._carrier = EntityMod.new(self, nil)
    end
    return self._carrier
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:carrier() instead.
function IpinfoDeveloperSDK:Carrier(data)
  local EntityMod = require("entity.carrier_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:company():list() / client:company():load({ id = ... })
function IpinfoDeveloperSDK:company(data)
  local EntityMod = require("entity.company_entity")
  if data == nil then
    if self._company == nil then
      self._company = EntityMod.new(self, nil)
    end
    return self._company
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:company() instead.
function IpinfoDeveloperSDK:Company(data)
  local EntityMod = require("entity.company_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:core():list() / client:core():load({ id = ... })
function IpinfoDeveloperSDK:core(data)
  local EntityMod = require("entity.core_entity")
  if data == nil then
    if self._core == nil then
      self._core = EntityMod.new(self, nil)
    end
    return self._core
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:core() instead.
function IpinfoDeveloperSDK:Core(data)
  local EntityMod = require("entity.core_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:domain():list() / client:domain():load({ id = ... })
function IpinfoDeveloperSDK:domain(data)
  local EntityMod = require("entity.domain_entity")
  if data == nil then
    if self._domain == nil then
      self._domain = EntityMod.new(self, nil)
    end
    return self._domain
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:domain() instead.
function IpinfoDeveloperSDK:Domain(data)
  local EntityMod = require("entity.domain_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:general():list() / client:general():load({ id = ... })
function IpinfoDeveloperSDK:general(data)
  local EntityMod = require("entity.general_entity")
  if data == nil then
    if self._general == nil then
      self._general = EntityMod.new(self, nil)
    end
    return self._general
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:general() instead.
function IpinfoDeveloperSDK:General(data)
  local EntityMod = require("entity.general_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:get_current_information():list() / client:get_current_information():load({ id = ... })
function IpinfoDeveloperSDK:get_current_information(data)
  local EntityMod = require("entity.get_current_information_entity")
  if data == nil then
    if self._get_current_information == nil then
      self._get_current_information = EntityMod.new(self, nil)
    end
    return self._get_current_information
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:get_current_information() instead.
function IpinfoDeveloperSDK:GetCurrentInformation(data)
  local EntityMod = require("entity.get_current_information_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:get_information_by_ip():list() / client:get_information_by_ip():load({ id = ... })
function IpinfoDeveloperSDK:get_information_by_ip(data)
  local EntityMod = require("entity.get_information_by_ip_entity")
  if data == nil then
    if self._get_information_by_ip == nil then
      self._get_information_by_ip = EntityMod.new(self, nil)
    end
    return self._get_information_by_ip
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:get_information_by_ip() instead.
function IpinfoDeveloperSDK:GetInformationByIp(data)
  local EntityMod = require("entity.get_information_by_ip_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ipinfo_core():list() / client:ipinfo_core():load({ id = ... })
function IpinfoDeveloperSDK:ipinfo_core(data)
  local EntityMod = require("entity.ipinfo_core_entity")
  if data == nil then
    if self._ipinfo_core == nil then
      self._ipinfo_core = EntityMod.new(self, nil)
    end
    return self._ipinfo_core
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:ipinfo_core() instead.
function IpinfoDeveloperSDK:IpinfoCore(data)
  local EntityMod = require("entity.ipinfo_core_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ipinfo_lite():list() / client:ipinfo_lite():load({ id = ... })
function IpinfoDeveloperSDK:ipinfo_lite(data)
  local EntityMod = require("entity.ipinfo_lite_entity")
  if data == nil then
    if self._ipinfo_lite == nil then
      self._ipinfo_lite = EntityMod.new(self, nil)
    end
    return self._ipinfo_lite
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:ipinfo_lite() instead.
function IpinfoDeveloperSDK:IpinfoLite(data)
  local EntityMod = require("entity.ipinfo_lite_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ipinfo_plus():list() / client:ipinfo_plus():load({ id = ... })
function IpinfoDeveloperSDK:ipinfo_plus(data)
  local EntityMod = require("entity.ipinfo_plus_entity")
  if data == nil then
    if self._ipinfo_plus == nil then
      self._ipinfo_plus = EntityMod.new(self, nil)
    end
    return self._ipinfo_plus
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:ipinfo_plus() instead.
function IpinfoDeveloperSDK:IpinfoPlus(data)
  local EntityMod = require("entity.ipinfo_plus_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:lite():list() / client:lite():load({ id = ... })
function IpinfoDeveloperSDK:lite(data)
  local EntityMod = require("entity.lite_entity")
  if data == nil then
    if self._lite == nil then
      self._lite = EntityMod.new(self, nil)
    end
    return self._lite
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:lite() instead.
function IpinfoDeveloperSDK:Lite(data)
  local EntityMod = require("entity.lite_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:max():list() / client:max():load({ id = ... })
function IpinfoDeveloperSDK:max(data)
  local EntityMod = require("entity.max_entity")
  if data == nil then
    if self._max == nil then
      self._max = EntityMod.new(self, nil)
    end
    return self._max
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:max() instead.
function IpinfoDeveloperSDK:Max(data)
  local EntityMod = require("entity.max_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:men():list() / client:men():load({ id = ... })
function IpinfoDeveloperSDK:men(data)
  local EntityMod = require("entity.men_entity")
  if data == nil then
    if self._men == nil then
      self._men = EntityMod.new(self, nil)
    end
    return self._men
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:men() instead.
function IpinfoDeveloperSDK:Men(data)
  local EntityMod = require("entity.men_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:place():list() / client:place():load({ id = ... })
function IpinfoDeveloperSDK:place(data)
  local EntityMod = require("entity.place_entity")
  if data == nil then
    if self._place == nil then
      self._place = EntityMod.new(self, nil)
    end
    return self._place
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:place() instead.
function IpinfoDeveloperSDK:Place(data)
  local EntityMod = require("entity.place_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:plus():list() / client:plus():load({ id = ... })
function IpinfoDeveloperSDK:plus(data)
  local EntityMod = require("entity.plus_entity")
  if data == nil then
    if self._plus == nil then
      self._plus = EntityMod.new(self, nil)
    end
    return self._plus
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:plus() instead.
function IpinfoDeveloperSDK:Plus(data)
  local EntityMod = require("entity.plus_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:privacy():list() / client:privacy():load({ id = ... })
function IpinfoDeveloperSDK:privacy(data)
  local EntityMod = require("entity.privacy_entity")
  if data == nil then
    if self._privacy == nil then
      self._privacy = EntityMod.new(self, nil)
    end
    return self._privacy
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:privacy() instead.
function IpinfoDeveloperSDK:Privacy(data)
  local EntityMod = require("entity.privacy_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:privacy_extended():list() / client:privacy_extended():load({ id = ... })
function IpinfoDeveloperSDK:privacy_extended(data)
  local EntityMod = require("entity.privacy_extended_entity")
  if data == nil then
    if self._privacy_extended == nil then
      self._privacy_extended = EntityMod.new(self, nil)
    end
    return self._privacy_extended
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:privacy_extended() instead.
function IpinfoDeveloperSDK:PrivacyExtended(data)
  local EntityMod = require("entity.privacy_extended_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:range():list() / client:range():load({ id = ... })
function IpinfoDeveloperSDK:range(data)
  local EntityMod = require("entity.range_entity")
  if data == nil then
    if self._range == nil then
      self._range = EntityMod.new(self, nil)
    end
    return self._range
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:range() instead.
function IpinfoDeveloperSDK:Range(data)
  local EntityMod = require("entity.range_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:residential_proxy():list() / client:residential_proxy():load({ id = ... })
function IpinfoDeveloperSDK:residential_proxy(data)
  local EntityMod = require("entity.residential_proxy_entity")
  if data == nil then
    if self._residential_proxy == nil then
      self._residential_proxy = EntityMod.new(self, nil)
    end
    return self._residential_proxy
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:residential_proxy() instead.
function IpinfoDeveloperSDK:ResidentialProxy(data)
  local EntityMod = require("entity.residential_proxy_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:single():list() / client:single():load({ id = ... })
function IpinfoDeveloperSDK:single(data)
  local EntityMod = require("entity.single_entity")
  if data == nil then
    if self._single == nil then
      self._single = EntityMod.new(self, nil)
    end
    return self._single
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:single() instead.
function IpinfoDeveloperSDK:Single(data)
  local EntityMod = require("entity.single_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:whois_asn():list() / client:whois_asn():load({ id = ... })
function IpinfoDeveloperSDK:whois_asn(data)
  local EntityMod = require("entity.whois_asn_entity")
  if data == nil then
    if self._whois_asn == nil then
      self._whois_asn = EntityMod.new(self, nil)
    end
    return self._whois_asn
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:whois_asn() instead.
function IpinfoDeveloperSDK:WhoisAsn(data)
  local EntityMod = require("entity.whois_asn_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:whois_domain():list() / client:whois_domain():load({ id = ... })
function IpinfoDeveloperSDK:whois_domain(data)
  local EntityMod = require("entity.whois_domain_entity")
  if data == nil then
    if self._whois_domain == nil then
      self._whois_domain = EntityMod.new(self, nil)
    end
    return self._whois_domain
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:whois_domain() instead.
function IpinfoDeveloperSDK:WhoisDomain(data)
  local EntityMod = require("entity.whois_domain_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:whois_ip():list() / client:whois_ip():load({ id = ... })
function IpinfoDeveloperSDK:whois_ip(data)
  local EntityMod = require("entity.whois_ip_entity")
  if data == nil then
    if self._whois_ip == nil then
      self._whois_ip = EntityMod.new(self, nil)
    end
    return self._whois_ip
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:whois_ip() instead.
function IpinfoDeveloperSDK:WhoisIp(data)
  local EntityMod = require("entity.whois_ip_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:whois_net_id():list() / client:whois_net_id():load({ id = ... })
function IpinfoDeveloperSDK:whois_net_id(data)
  local EntityMod = require("entity.whois_net_id_entity")
  if data == nil then
    if self._whois_net_id == nil then
      self._whois_net_id = EntityMod.new(self, nil)
    end
    return self._whois_net_id
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:whois_net_id() instead.
function IpinfoDeveloperSDK:WhoisNetId(data)
  local EntityMod = require("entity.whois_net_id_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:whois_org():list() / client:whois_org():load({ id = ... })
function IpinfoDeveloperSDK:whois_org(data)
  local EntityMod = require("entity.whois_org_entity")
  if data == nil then
    if self._whois_org == nil then
      self._whois_org = EntityMod.new(self, nil)
    end
    return self._whois_org
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:whois_org() instead.
function IpinfoDeveloperSDK:WhoisOrg(data)
  local EntityMod = require("entity.whois_org_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:whois_poc():list() / client:whois_poc():load({ id = ... })
function IpinfoDeveloperSDK:whois_poc(data)
  local EntityMod = require("entity.whois_poc_entity")
  if data == nil then
    if self._whois_poc == nil then
      self._whois_poc = EntityMod.new(self, nil)
    end
    return self._whois_poc
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:whois_poc() instead.
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
