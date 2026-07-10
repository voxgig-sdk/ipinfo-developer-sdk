# frozen_string_literal: true

# Typed models for the IpinfoDeveloper SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Abuse entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] network
#   @return [String, nil]
#
# @!attribute [rw] phone
#   @return [String, nil]
Abuse = Struct.new(
  :address,
  :country,
  :email,
  :name,
  :network,
  :phone,
  keyword_init: true
)

# Request payload for Abuse#load.
#
# @!attribute [rw] ip
#   @return [String]
AbuseLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

# Asn entity data model.
#
# @!attribute [rw] allocated
#   @return [String, nil]
#
# @!attribute [rw] asn
#   @return [String]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] downstream
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] num_ip
#   @return [Integer, nil]
#
# @!attribute [rw] peer
#   @return [Array, nil]
#
# @!attribute [rw] prefix
#   @return [Array, nil]
#
# @!attribute [rw] prefixes6
#   @return [Array, nil]
#
# @!attribute [rw] registry
#   @return [String, nil]
#
# @!attribute [rw] route
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String]
#
# @!attribute [rw] upstream
#   @return [Array, nil]
Asn = Struct.new(
  :allocated,
  :asn,
  :country,
  :domain,
  :downstream,
  :name,
  :num_ip,
  :peer,
  :prefix,
  :prefixes6,
  :registry,
  :route,
  :type,
  :upstream,
  keyword_init: true
)

# Request payload for Asn#list.
#
# @!attribute [rw] asn
#   @return [Integer]
AsnListMatch = Struct.new(
  :asn,
  keyword_init: true
)

# Carrier entity data model.
#
# @!attribute [rw] mcc
#   @return [String]
#
# @!attribute [rw] mnc
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
Carrier = Struct.new(
  :mcc,
  :mnc,
  :name,
  keyword_init: true
)

# Request payload for Carrier#load.
#
# @!attribute [rw] ip
#   @return [String]
CarrierLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

# Company entity data model.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
Company = Struct.new(
  :domain,
  :name,
  :type,
  keyword_init: true
)

# Request payload for Company#load.
#
# @!attribute [rw] ip
#   @return [String]
CompanyLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

# Core entity data model.
#
# @!attribute [rw] as
#   @return [Hash, nil]
#
# @!attribute [rw] geo
#   @return [Hash, nil]
#
# @!attribute [rw] hostname
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] is_anonymous
#   @return [Boolean, nil]
#
# @!attribute [rw] is_anycast
#   @return [Boolean, nil]
#
# @!attribute [rw] is_hosting
#   @return [Boolean, nil]
#
# @!attribute [rw] is_mobile
#   @return [Boolean, nil]
#
# @!attribute [rw] is_satellite
#   @return [Boolean, nil]
Core = Struct.new(
  :as,
  :geo,
  :hostname,
  :ip,
  :is_anonymous,
  :is_anycast,
  :is_hosting,
  :is_mobile,
  :is_satellite,
  keyword_init: true
)

# Request payload for Core#load.
#
# @!attribute [rw] ip
#   @return [String, nil]
CoreLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

# Domain entity data model.
#
# @!attribute [rw] domain
#   @return [Array, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] total
#   @return [Integer]
Domain = Struct.new(
  :domain,
  :ip,
  :page,
  :total,
  keyword_init: true
)

# Request payload for Domain#load.
#
# @!attribute [rw] id
#   @return [String]
DomainLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# General entity data model.
#
# @!attribute [rw] 8_8_8_8
#   @return [Hash, nil]
#
# @!attribute [rw] 8_8_8_8city
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Hash, nil]
General = Struct.new(
  :"8_8_8_8",
  :"8_8_8_8city",
  :summary,
  :value,
  keyword_init: true
)

# Request payload for General#create.
#
# @!attribute [rw] 8_8_8_8
#   @return [Hash, nil]
#
# @!attribute [rw] 8_8_8_8city
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] value
#   @return [Hash, nil]
GeneralCreateData = Struct.new(
  :"8_8_8_8",
  :"8_8_8_8city",
  :summary,
  :value,
  keyword_init: true
)

# GetCurrentInformation entity data model.
#
# @!attribute [rw] asn
#   @return [Hash]
#
# @!attribute [rw] bogon
#   @return [Boolean, nil]
#
# @!attribute [rw] carrier
#   @return [Hash]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [Hash]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [Hash]
#
# @!attribute [rw] hostname
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] loc
#   @return [String, nil]
#
# @!attribute [rw] org
#   @return [String, nil]
#
# @!attribute [rw] postal
#   @return [String, nil]
#
# @!attribute [rw] privacy
#   @return [Hash]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
GetCurrentInformation = Struct.new(
  :asn,
  :bogon,
  :carrier,
  :city,
  :company,
  :country,
  :domain,
  :hostname,
  :ip,
  :loc,
  :org,
  :postal,
  :privacy,
  :region,
  :timezone,
  keyword_init: true
)

# Request payload for GetCurrentInformation#load.
#
# @!attribute [rw] asn
#   @return [Hash, nil]
#
# @!attribute [rw] bogon
#   @return [Boolean, nil]
#
# @!attribute [rw] carrier
#   @return [Hash, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [Hash, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [Hash, nil]
#
# @!attribute [rw] hostname
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] loc
#   @return [String, nil]
#
# @!attribute [rw] org
#   @return [String, nil]
#
# @!attribute [rw] postal
#   @return [String, nil]
#
# @!attribute [rw] privacy
#   @return [Hash, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
GetCurrentInformationLoadMatch = Struct.new(
  :asn,
  :bogon,
  :carrier,
  :city,
  :company,
  :country,
  :domain,
  :hostname,
  :ip,
  :loc,
  :org,
  :postal,
  :privacy,
  :region,
  :timezone,
  keyword_init: true
)

# GetInformationByIp entity data model.
#
# @!attribute [rw] asn
#   @return [Hash]
#
# @!attribute [rw] bogon
#   @return [Boolean, nil]
#
# @!attribute [rw] carrier
#   @return [Hash]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [Hash]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [Hash]
#
# @!attribute [rw] hostname
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] loc
#   @return [String, nil]
#
# @!attribute [rw] org
#   @return [String, nil]
#
# @!attribute [rw] postal
#   @return [String, nil]
#
# @!attribute [rw] privacy
#   @return [Hash]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] timezone
#   @return [String, nil]
GetInformationByIp = Struct.new(
  :asn,
  :bogon,
  :carrier,
  :city,
  :company,
  :country,
  :domain,
  :hostname,
  :ip,
  :loc,
  :org,
  :postal,
  :privacy,
  :region,
  :timezone,
  keyword_init: true
)

# Request payload for GetInformationByIp#load.
#
# @!attribute [rw] id
#   @return [String]
GetInformationByIpLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# IpinfoCore entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
IpinfoCore = Struct.new(
  :city,
  :key,
  :region,
  keyword_init: true
)

# Request payload for IpinfoCore#load.
#
# @!attribute [rw] field
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String, nil]
IpinfoCoreLoadMatch = Struct.new(
  :field,
  :ip,
  keyword_init: true
)

# IpinfoLite entity data model.
class IpinfoLite
end

# Request payload for IpinfoLite#load.
#
# @!attribute [rw] field
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
IpinfoLiteLoadMatch = Struct.new(
  :field,
  :ip,
  :id,
  keyword_init: true
)

# IpinfoPlus entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
IpinfoPlus = Struct.new(
  :city,
  :key,
  :region,
  keyword_init: true
)

# Request payload for IpinfoPlus#load.
#
# @!attribute [rw] field
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String, nil]
IpinfoPlusLoadMatch = Struct.new(
  :field,
  :ip,
  keyword_init: true
)

# Lite entity data model.
#
# @!attribute [rw] as_domain
#   @return [String]
#
# @!attribute [rw] as_name
#   @return [String]
#
# @!attribute [rw] asn
#   @return [String]
#
# @!attribute [rw] continent
#   @return [String]
#
# @!attribute [rw] continent_code
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] country_code
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String]
Lite = Struct.new(
  :as_domain,
  :as_name,
  :asn,
  :continent,
  :continent_code,
  :country,
  :country_code,
  :ip,
  keyword_init: true
)

# Request payload for Lite#load.
#
# @!attribute [rw] as_domain
#   @return [String, nil]
#
# @!attribute [rw] as_name
#   @return [String, nil]
#
# @!attribute [rw] asn
#   @return [String, nil]
#
# @!attribute [rw] continent
#   @return [String, nil]
#
# @!attribute [rw] continent_code
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
LiteLoadMatch = Struct.new(
  :as_domain,
  :as_name,
  :asn,
  :continent,
  :continent_code,
  :country,
  :country_code,
  :ip,
  keyword_init: true
)

# Max entity data model.
#
# @!attribute [rw] anonymous
#   @return [Hash]
#
# @!attribute [rw] as
#   @return [Hash]
#
# @!attribute [rw] geo
#   @return [Hash]
#
# @!attribute [rw] hostname
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] is_anonymous
#   @return [Boolean, nil]
#
# @!attribute [rw] is_anycast
#   @return [Boolean, nil]
#
# @!attribute [rw] is_hosting
#   @return [Boolean, nil]
#
# @!attribute [rw] is_mobile
#   @return [Boolean, nil]
#
# @!attribute [rw] is_satellite
#   @return [Boolean, nil]
#
# @!attribute [rw] mobile
#   @return [Hash, nil]
Max = Struct.new(
  :anonymous,
  :as,
  :geo,
  :hostname,
  :ip,
  :is_anonymous,
  :is_anycast,
  :is_hosting,
  :is_mobile,
  :is_satellite,
  :mobile,
  keyword_init: true
)

# Request payload for Max#load.
#
# @!attribute [rw] id
#   @return [String]
MaxLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Men entity data model.
#
# @!attribute [rw] feature
#   @return [Hash]
#
# @!attribute [rw] request
#   @return [Hash]
#
# @!attribute [rw] token
#   @return [String]
Men = Struct.new(
  :feature,
  :request,
  :token,
  keyword_init: true
)

# Request payload for Men#load.
#
# @!attribute [rw] feature
#   @return [Hash, nil]
#
# @!attribute [rw] request
#   @return [Hash, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
MenLoadMatch = Struct.new(
  :feature,
  :request,
  :token,
  keyword_init: true
)

# Place entity data model.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] latitude
#   @return [Float]
#
# @!attribute [rw] longitude
#   @return [Float]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] ssid
#   @return [String]
Place = Struct.new(
  :category,
  :ip,
  :latitude,
  :longitude,
  :name,
  :ssid,
  keyword_init: true
)

# Request payload for Place#load.
#
# @!attribute [rw] id
#   @return [String]
PlaceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Plus entity data model.
#
# @!attribute [rw] anonymous
#   @return [Hash, nil]
#
# @!attribute [rw] as
#   @return [Hash, nil]
#
# @!attribute [rw] geo
#   @return [Hash, nil]
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] is_anonymous
#   @return [Boolean, nil]
#
# @!attribute [rw] is_anycast
#   @return [Boolean, nil]
#
# @!attribute [rw] is_hosting
#   @return [Boolean, nil]
#
# @!attribute [rw] is_mobile
#   @return [Boolean, nil]
#
# @!attribute [rw] is_satellite
#   @return [Boolean, nil]
#
# @!attribute [rw] mobile
#   @return [Hash, nil]
Plus = Struct.new(
  :anonymous,
  :as,
  :geo,
  :ip,
  :is_anonymous,
  :is_anycast,
  :is_hosting,
  :is_mobile,
  :is_satellite,
  :mobile,
  keyword_init: true
)

# Request payload for Plus#load.
#
# @!attribute [rw] id
#   @return [String]
PlusLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Privacy entity data model.
#
# @!attribute [rw] hosting
#   @return [Boolean]
#
# @!attribute [rw] proxy
#   @return [Boolean]
#
# @!attribute [rw] relay
#   @return [Boolean]
#
# @!attribute [rw] service
#   @return [String]
#
# @!attribute [rw] tor
#   @return [Boolean]
#
# @!attribute [rw] vpn
#   @return [Boolean]
Privacy = Struct.new(
  :hosting,
  :proxy,
  :relay,
  :service,
  :tor,
  :vpn,
  keyword_init: true
)

# Request payload for Privacy#load.
#
# @!attribute [rw] ip
#   @return [String]
PrivacyLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

# PrivacyExtended entity data model.
#
# @!attribute [rw] census
#   @return [Boolean, nil]
#
# @!attribute [rw] census_port
#   @return [Array, nil]
#
# @!attribute [rw] confidence
#   @return [Integer, nil]
#
# @!attribute [rw] coverage
#   @return [Float, nil]
#
# @!attribute [rw] device_activity
#   @return [Boolean, nil]
#
# @!attribute [rw] first_seen
#   @return [String, nil]
#
# @!attribute [rw] hosting
#   @return [Boolean]
#
# @!attribute [rw] inferred
#   @return [Boolean, nil]
#
# @!attribute [rw] last_seen
#   @return [String, nil]
#
# @!attribute [rw] proxy
#   @return [Boolean]
#
# @!attribute [rw] relay
#   @return [Boolean]
#
# @!attribute [rw] service
#   @return [String]
#
# @!attribute [rw] tor
#   @return [Boolean]
#
# @!attribute [rw] vpn
#   @return [Boolean]
#
# @!attribute [rw] vpn_config
#   @return [Boolean, nil]
#
# @!attribute [rw] whoi
#   @return [Boolean, nil]
PrivacyExtended = Struct.new(
  :census,
  :census_port,
  :confidence,
  :coverage,
  :device_activity,
  :first_seen,
  :hosting,
  :inferred,
  :last_seen,
  :proxy,
  :relay,
  :service,
  :tor,
  :vpn,
  :vpn_config,
  :whoi,
  keyword_init: true
)

# Request payload for PrivacyExtended#list.
#
# @!attribute [rw] ip
#   @return [String]
PrivacyExtendedListMatch = Struct.new(
  :ip,
  keyword_init: true
)

# Range entity data model.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] num_range
#   @return [String]
#
# @!attribute [rw] range
#   @return [Array]
#
# @!attribute [rw] redirects_to
#   @return [String]
Range = Struct.new(
  :domain,
  :num_range,
  :range,
  :redirects_to,
  keyword_init: true
)

# Request payload for Range#load.
#
# @!attribute [rw] id
#   @return [String]
RangeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# ResidentialProxy entity data model.
#
# @!attribute [rw] ip
#   @return [String]
#
# @!attribute [rw] last_seen
#   @return [String]
#
# @!attribute [rw] percent_days_seen
#   @return [Integer]
#
# @!attribute [rw] service
#   @return [String]
ResidentialProxy = Struct.new(
  :ip,
  :last_seen,
  :percent_days_seen,
  :service,
  keyword_init: true
)

# Request payload for ResidentialProxy#load.
#
# @!attribute [rw] ip
#   @return [String]
ResidentialProxyLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

# Single entity data model.
class Single
end

# Request payload for Single#load.
#
# @!attribute [rw] ip
#   @return [String, nil]
SingleLoadMatch = Struct.new(
  :ip,
  keyword_init: true
)

# WhoisAsn entity data model.
#
# @!attribute [rw] abuse
#   @return [String, nil]
#
# @!attribute [rw] admin
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] maintainer
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] org
#   @return [String, nil]
#
# @!attribute [rw] range
#   @return [String, nil]
#
# @!attribute [rw] raw
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] tech
#   @return [String, nil]
#
# @!attribute [rw] updated
#   @return [String, nil]
WhoisAsn = Struct.new(
  :abuse,
  :admin,
  :country,
  :id,
  :maintainer,
  :name,
  :org,
  :range,
  :raw,
  :source,
  :status,
  :tech,
  :updated,
  keyword_init: true
)

# Request payload for WhoisAsn#list.
#
# @!attribute [rw] asn
#   @return [Integer]
WhoisAsnListMatch = Struct.new(
  :asn,
  keyword_init: true
)

# WhoisDomain entity data model.
#
# @!attribute [rw] net
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] record
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
WhoisDomain = Struct.new(
  :net,
  :page,
  :record,
  :total,
  keyword_init: true
)

# Request payload for WhoisDomain#load.
#
# @!attribute [rw] domain
#   @return [String]
WhoisDomainLoadMatch = Struct.new(
  :domain,
  keyword_init: true
)

# WhoisIp entity data model.
#
# @!attribute [rw] net
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] record
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
WhoisIp = Struct.new(
  :net,
  :page,
  :record,
  :total,
  keyword_init: true
)

# Request payload for WhoisIp#load.
#
# @!attribute [rw] whoisip
#   @return [String]
WhoisIpLoadMatch = Struct.new(
  :whoisip,
  keyword_init: true
)

# WhoisNetId entity data model.
#
# @!attribute [rw] net
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] record
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
WhoisNetId = Struct.new(
  :net,
  :page,
  :record,
  :total,
  keyword_init: true
)

# Request payload for WhoisNetId#load.
#
# @!attribute [rw] whoisnetid
#   @return [String]
WhoisNetIdLoadMatch = Struct.new(
  :whoisnetid,
  keyword_init: true
)

# WhoisOrg entity data model.
#
# @!attribute [rw] org
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] record
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
WhoisOrg = Struct.new(
  :org,
  :page,
  :record,
  :total,
  keyword_init: true
)

# Request payload for WhoisOrg#load.
#
# @!attribute [rw] id
#   @return [String]
WhoisOrgLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# WhoisPoc entity data model.
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] poc
#   @return [String, nil]
#
# @!attribute [rw] record
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
WhoisPoc = Struct.new(
  :page,
  :poc,
  :record,
  :total,
  keyword_init: true
)

# Request payload for WhoisPoc#load.
#
# @!attribute [rw] id
#   @return [String]
WhoisPocLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

