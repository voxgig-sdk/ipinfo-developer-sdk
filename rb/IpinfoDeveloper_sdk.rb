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


  # Idiomatic facade: client.abuse.list / client.abuse.load({ "id" => ... })
  def abuse
    require_relative 'entity/abuse_entity'
    @abuse ||= AbuseEntity.new(self, nil)
  end

  # Deprecated: use client.abuse instead.
  def Abuse(data = nil)
    require_relative 'entity/abuse_entity'
    AbuseEntity.new(self, data)
  end


  # Idiomatic facade: client.asn.list / client.asn.load({ "id" => ... })
  def asn
    require_relative 'entity/asn_entity'
    @asn ||= AsnEntity.new(self, nil)
  end

  # Deprecated: use client.asn instead.
  def Asn(data = nil)
    require_relative 'entity/asn_entity'
    AsnEntity.new(self, data)
  end


  # Idiomatic facade: client.carrier.list / client.carrier.load({ "id" => ... })
  def carrier
    require_relative 'entity/carrier_entity'
    @carrier ||= CarrierEntity.new(self, nil)
  end

  # Deprecated: use client.carrier instead.
  def Carrier(data = nil)
    require_relative 'entity/carrier_entity'
    CarrierEntity.new(self, data)
  end


  # Idiomatic facade: client.company.list / client.company.load({ "id" => ... })
  def company
    require_relative 'entity/company_entity'
    @company ||= CompanyEntity.new(self, nil)
  end

  # Deprecated: use client.company instead.
  def Company(data = nil)
    require_relative 'entity/company_entity'
    CompanyEntity.new(self, data)
  end


  # Idiomatic facade: client.core.list / client.core.load({ "id" => ... })
  def core
    require_relative 'entity/core_entity'
    @core ||= CoreEntity.new(self, nil)
  end

  # Deprecated: use client.core instead.
  def Core(data = nil)
    require_relative 'entity/core_entity'
    CoreEntity.new(self, data)
  end


  # Idiomatic facade: client.domain.list / client.domain.load({ "id" => ... })
  def domain
    require_relative 'entity/domain_entity'
    @domain ||= DomainEntity.new(self, nil)
  end

  # Deprecated: use client.domain instead.
  def Domain(data = nil)
    require_relative 'entity/domain_entity'
    DomainEntity.new(self, data)
  end


  # Idiomatic facade: client.general.list / client.general.load({ "id" => ... })
  def general
    require_relative 'entity/general_entity'
    @general ||= GeneralEntity.new(self, nil)
  end

  # Deprecated: use client.general instead.
  def General(data = nil)
    require_relative 'entity/general_entity'
    GeneralEntity.new(self, data)
  end


  # Idiomatic facade: client.get_current_information.list / client.get_current_information.load({ "id" => ... })
  def get_current_information
    require_relative 'entity/get_current_information_entity'
    @get_current_information ||= GetCurrentInformationEntity.new(self, nil)
  end

  # Deprecated: use client.get_current_information instead.
  def GetCurrentInformation(data = nil)
    require_relative 'entity/get_current_information_entity'
    GetCurrentInformationEntity.new(self, data)
  end


  # Idiomatic facade: client.get_information_by_ip.list / client.get_information_by_ip.load({ "id" => ... })
  def get_information_by_ip
    require_relative 'entity/get_information_by_ip_entity'
    @get_information_by_ip ||= GetInformationByIpEntity.new(self, nil)
  end

  # Deprecated: use client.get_information_by_ip instead.
  def GetInformationByIp(data = nil)
    require_relative 'entity/get_information_by_ip_entity'
    GetInformationByIpEntity.new(self, data)
  end


  # Idiomatic facade: client.ipinfo_core.list / client.ipinfo_core.load({ "id" => ... })
  def ipinfo_core
    require_relative 'entity/ipinfo_core_entity'
    @ipinfo_core ||= IpinfoCoreEntity.new(self, nil)
  end

  # Deprecated: use client.ipinfo_core instead.
  def IpinfoCore(data = nil)
    require_relative 'entity/ipinfo_core_entity'
    IpinfoCoreEntity.new(self, data)
  end


  # Idiomatic facade: client.ipinfo_lite.list / client.ipinfo_lite.load({ "id" => ... })
  def ipinfo_lite
    require_relative 'entity/ipinfo_lite_entity'
    @ipinfo_lite ||= IpinfoLiteEntity.new(self, nil)
  end

  # Deprecated: use client.ipinfo_lite instead.
  def IpinfoLite(data = nil)
    require_relative 'entity/ipinfo_lite_entity'
    IpinfoLiteEntity.new(self, data)
  end


  # Idiomatic facade: client.ipinfo_plus.list / client.ipinfo_plus.load({ "id" => ... })
  def ipinfo_plus
    require_relative 'entity/ipinfo_plus_entity'
    @ipinfo_plus ||= IpinfoPlusEntity.new(self, nil)
  end

  # Deprecated: use client.ipinfo_plus instead.
  def IpinfoPlus(data = nil)
    require_relative 'entity/ipinfo_plus_entity'
    IpinfoPlusEntity.new(self, data)
  end


  # Idiomatic facade: client.lite.list / client.lite.load({ "id" => ... })
  def lite
    require_relative 'entity/lite_entity'
    @lite ||= LiteEntity.new(self, nil)
  end

  # Deprecated: use client.lite instead.
  def Lite(data = nil)
    require_relative 'entity/lite_entity'
    LiteEntity.new(self, data)
  end


  # Idiomatic facade: client.max.list / client.max.load({ "id" => ... })
  def max
    require_relative 'entity/max_entity'
    @max ||= MaxEntity.new(self, nil)
  end

  # Deprecated: use client.max instead.
  def Max(data = nil)
    require_relative 'entity/max_entity'
    MaxEntity.new(self, data)
  end


  # Idiomatic facade: client.men.list / client.men.load({ "id" => ... })
  def men
    require_relative 'entity/men_entity'
    @men ||= MenEntity.new(self, nil)
  end

  # Deprecated: use client.men instead.
  def Men(data = nil)
    require_relative 'entity/men_entity'
    MenEntity.new(self, data)
  end


  # Idiomatic facade: client.place.list / client.place.load({ "id" => ... })
  def place
    require_relative 'entity/place_entity'
    @place ||= PlaceEntity.new(self, nil)
  end

  # Deprecated: use client.place instead.
  def Place(data = nil)
    require_relative 'entity/place_entity'
    PlaceEntity.new(self, data)
  end


  # Idiomatic facade: client.plus.list / client.plus.load({ "id" => ... })
  def plus
    require_relative 'entity/plus_entity'
    @plus ||= PlusEntity.new(self, nil)
  end

  # Deprecated: use client.plus instead.
  def Plus(data = nil)
    require_relative 'entity/plus_entity'
    PlusEntity.new(self, data)
  end


  # Idiomatic facade: client.privacy.list / client.privacy.load({ "id" => ... })
  def privacy
    require_relative 'entity/privacy_entity'
    @privacy ||= PrivacyEntity.new(self, nil)
  end

  # Deprecated: use client.privacy instead.
  def Privacy(data = nil)
    require_relative 'entity/privacy_entity'
    PrivacyEntity.new(self, data)
  end


  # Idiomatic facade: client.privacy_extended.list / client.privacy_extended.load({ "id" => ... })
  def privacy_extended
    require_relative 'entity/privacy_extended_entity'
    @privacy_extended ||= PrivacyExtendedEntity.new(self, nil)
  end

  # Deprecated: use client.privacy_extended instead.
  def PrivacyExtended(data = nil)
    require_relative 'entity/privacy_extended_entity'
    PrivacyExtendedEntity.new(self, data)
  end


  # Idiomatic facade: client.range.list / client.range.load({ "id" => ... })
  def range
    require_relative 'entity/range_entity'
    @range ||= RangeEntity.new(self, nil)
  end

  # Deprecated: use client.range instead.
  def Range(data = nil)
    require_relative 'entity/range_entity'
    RangeEntity.new(self, data)
  end


  # Idiomatic facade: client.residential_proxy.list / client.residential_proxy.load({ "id" => ... })
  def residential_proxy
    require_relative 'entity/residential_proxy_entity'
    @residential_proxy ||= ResidentialProxyEntity.new(self, nil)
  end

  # Deprecated: use client.residential_proxy instead.
  def ResidentialProxy(data = nil)
    require_relative 'entity/residential_proxy_entity'
    ResidentialProxyEntity.new(self, data)
  end


  # Idiomatic facade: client.single.list / client.single.load({ "id" => ... })
  def single
    require_relative 'entity/single_entity'
    @single ||= SingleEntity.new(self, nil)
  end

  # Deprecated: use client.single instead.
  def Single(data = nil)
    require_relative 'entity/single_entity'
    SingleEntity.new(self, data)
  end


  # Idiomatic facade: client.whois_asn.list / client.whois_asn.load({ "id" => ... })
  def whois_asn
    require_relative 'entity/whois_asn_entity'
    @whois_asn ||= WhoisAsnEntity.new(self, nil)
  end

  # Deprecated: use client.whois_asn instead.
  def WhoisAsn(data = nil)
    require_relative 'entity/whois_asn_entity'
    WhoisAsnEntity.new(self, data)
  end


  # Idiomatic facade: client.whois_domain.list / client.whois_domain.load({ "id" => ... })
  def whois_domain
    require_relative 'entity/whois_domain_entity'
    @whois_domain ||= WhoisDomainEntity.new(self, nil)
  end

  # Deprecated: use client.whois_domain instead.
  def WhoisDomain(data = nil)
    require_relative 'entity/whois_domain_entity'
    WhoisDomainEntity.new(self, data)
  end


  # Idiomatic facade: client.whois_ip.list / client.whois_ip.load({ "id" => ... })
  def whois_ip
    require_relative 'entity/whois_ip_entity'
    @whois_ip ||= WhoisIpEntity.new(self, nil)
  end

  # Deprecated: use client.whois_ip instead.
  def WhoisIp(data = nil)
    require_relative 'entity/whois_ip_entity'
    WhoisIpEntity.new(self, data)
  end


  # Idiomatic facade: client.whois_net_id.list / client.whois_net_id.load({ "id" => ... })
  def whois_net_id
    require_relative 'entity/whois_net_id_entity'
    @whois_net_id ||= WhoisNetIdEntity.new(self, nil)
  end

  # Deprecated: use client.whois_net_id instead.
  def WhoisNetId(data = nil)
    require_relative 'entity/whois_net_id_entity'
    WhoisNetIdEntity.new(self, data)
  end


  # Idiomatic facade: client.whois_org.list / client.whois_org.load({ "id" => ... })
  def whois_org
    require_relative 'entity/whois_org_entity'
    @whois_org ||= WhoisOrgEntity.new(self, nil)
  end

  # Deprecated: use client.whois_org instead.
  def WhoisOrg(data = nil)
    require_relative 'entity/whois_org_entity'
    WhoisOrgEntity.new(self, data)
  end


  # Idiomatic facade: client.whois_poc.list / client.whois_poc.load({ "id" => ... })
  def whois_poc
    require_relative 'entity/whois_poc_entity'
    @whois_poc ||= WhoisPocEntity.new(self, nil)
  end

  # Deprecated: use client.whois_poc instead.
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
