# IpinfoDeveloper SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'IpinfoDeveloper_types'


class IpinfoDeveloperSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = IpinfoDeveloperUtility.new
    @_utility = utility

    config = IpinfoDeveloperConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = IpinfoDeveloperHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = IpinfoDeveloperHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, IpinfoDeveloperFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    IpinfoDeveloperUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = IpinfoDeveloperHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = IpinfoDeveloperHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = IpinfoDeveloperHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = IpinfoDeveloperSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue IpinfoDeveloperError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = IpinfoDeveloperHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = IpinfoDeveloperHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Canonical facade: client.Abuse.list / client.Abuse.load({ "id" => ... })
  def Abuse(data = nil)
    require_relative 'entity/abuse_entity'
    AbuseEntity.new(self, data)
  end


  # Canonical facade: client.Asn.list / client.Asn.load({ "id" => ... })
  def Asn(data = nil)
    require_relative 'entity/asn_entity'
    AsnEntity.new(self, data)
  end


  # Canonical facade: client.Carrier.list / client.Carrier.load({ "id" => ... })
  def Carrier(data = nil)
    require_relative 'entity/carrier_entity'
    CarrierEntity.new(self, data)
  end


  # Canonical facade: client.Company.list / client.Company.load({ "id" => ... })
  def Company(data = nil)
    require_relative 'entity/company_entity'
    CompanyEntity.new(self, data)
  end


  # Canonical facade: client.Core.list / client.Core.load({ "id" => ... })
  def Core(data = nil)
    require_relative 'entity/core_entity'
    CoreEntity.new(self, data)
  end


  # Canonical facade: client.Domain.list / client.Domain.load({ "id" => ... })
  def Domain(data = nil)
    require_relative 'entity/domain_entity'
    DomainEntity.new(self, data)
  end


  # Canonical facade: client.General.list / client.General.load({ "id" => ... })
  def General(data = nil)
    require_relative 'entity/general_entity'
    GeneralEntity.new(self, data)
  end


  # Canonical facade: client.GetCurrentInformation.list / client.GetCurrentInformation.load({ "id" => ... })
  def GetCurrentInformation(data = nil)
    require_relative 'entity/get_current_information_entity'
    GetCurrentInformationEntity.new(self, data)
  end


  # Canonical facade: client.GetInformationByIp.list / client.GetInformationByIp.load({ "id" => ... })
  def GetInformationByIp(data = nil)
    require_relative 'entity/get_information_by_ip_entity'
    GetInformationByIpEntity.new(self, data)
  end


  # Canonical facade: client.IpinfoCore.list / client.IpinfoCore.load({ "id" => ... })
  def IpinfoCore(data = nil)
    require_relative 'entity/ipinfo_core_entity'
    IpinfoCoreEntity.new(self, data)
  end


  # Canonical facade: client.IpinfoLite.list / client.IpinfoLite.load({ "id" => ... })
  def IpinfoLite(data = nil)
    require_relative 'entity/ipinfo_lite_entity'
    IpinfoLiteEntity.new(self, data)
  end


  # Canonical facade: client.IpinfoPlus.list / client.IpinfoPlus.load({ "id" => ... })
  def IpinfoPlus(data = nil)
    require_relative 'entity/ipinfo_plus_entity'
    IpinfoPlusEntity.new(self, data)
  end


  # Canonical facade: client.Lite.list / client.Lite.load({ "id" => ... })
  def Lite(data = nil)
    require_relative 'entity/lite_entity'
    LiteEntity.new(self, data)
  end


  # Canonical facade: client.Max.list / client.Max.load({ "id" => ... })
  def Max(data = nil)
    require_relative 'entity/max_entity'
    MaxEntity.new(self, data)
  end


  # Canonical facade: client.Men.list / client.Men.load({ "id" => ... })
  def Men(data = nil)
    require_relative 'entity/men_entity'
    MenEntity.new(self, data)
  end


  # Canonical facade: client.Place.list / client.Place.load({ "id" => ... })
  def Place(data = nil)
    require_relative 'entity/place_entity'
    PlaceEntity.new(self, data)
  end


  # Canonical facade: client.Plus.list / client.Plus.load({ "id" => ... })
  def Plus(data = nil)
    require_relative 'entity/plus_entity'
    PlusEntity.new(self, data)
  end


  # Canonical facade: client.Privacy.list / client.Privacy.load({ "id" => ... })
  def Privacy(data = nil)
    require_relative 'entity/privacy_entity'
    PrivacyEntity.new(self, data)
  end


  # Canonical facade: client.PrivacyExtended.list / client.PrivacyExtended.load({ "id" => ... })
  def PrivacyExtended(data = nil)
    require_relative 'entity/privacy_extended_entity'
    PrivacyExtendedEntity.new(self, data)
  end


  # Canonical facade: client.Range.list / client.Range.load({ "id" => ... })
  def Range(data = nil)
    require_relative 'entity/range_entity'
    RangeEntity.new(self, data)
  end


  # Canonical facade: client.ResidentialProxy.list / client.ResidentialProxy.load({ "id" => ... })
  def ResidentialProxy(data = nil)
    require_relative 'entity/residential_proxy_entity'
    ResidentialProxyEntity.new(self, data)
  end


  # Canonical facade: client.Single.list / client.Single.load({ "id" => ... })
  def Single(data = nil)
    require_relative 'entity/single_entity'
    SingleEntity.new(self, data)
  end


  # Canonical facade: client.WhoisAsn.list / client.WhoisAsn.load({ "id" => ... })
  def WhoisAsn(data = nil)
    require_relative 'entity/whois_asn_entity'
    WhoisAsnEntity.new(self, data)
  end


  # Canonical facade: client.WhoisDomain.list / client.WhoisDomain.load({ "id" => ... })
  def WhoisDomain(data = nil)
    require_relative 'entity/whois_domain_entity'
    WhoisDomainEntity.new(self, data)
  end


  # Canonical facade: client.WhoisIp.list / client.WhoisIp.load({ "id" => ... })
  def WhoisIp(data = nil)
    require_relative 'entity/whois_ip_entity'
    WhoisIpEntity.new(self, data)
  end


  # Canonical facade: client.WhoisNetId.list / client.WhoisNetId.load({ "id" => ... })
  def WhoisNetId(data = nil)
    require_relative 'entity/whois_net_id_entity'
    WhoisNetIdEntity.new(self, data)
  end


  # Canonical facade: client.WhoisOrg.list / client.WhoisOrg.load({ "id" => ... })
  def WhoisOrg(data = nil)
    require_relative 'entity/whois_org_entity'
    WhoisOrgEntity.new(self, data)
  end


  # Canonical facade: client.WhoisPoc.list / client.WhoisPoc.load({ "id" => ... })
  def WhoisPoc(data = nil)
    require_relative 'entity/whois_poc_entity'
    WhoisPocEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = IpinfoDeveloperSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
