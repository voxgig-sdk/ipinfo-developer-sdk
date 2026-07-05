-- Typed models for the IpinfoDeveloper SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Abuse
---@field address? string
---@field country? string
---@field email? string
---@field name? string
---@field network? string
---@field phone? string

---@class AbuseLoadMatch
---@field ip string

---@class Asn
---@field allocated? string
---@field asn string
---@field country? string
---@field domain string
---@field downstream? table
---@field name string
---@field num_ip? number
---@field peer? table
---@field prefix? table
---@field prefixes6? table
---@field registry? string
---@field route? string
---@field type string
---@field upstream? table

---@class AsnListMatch
---@field asn number

---@class Carrier
---@field mcc string
---@field mnc string
---@field name string

---@class CarrierLoadMatch
---@field ip string

---@class Company
---@field domain string
---@field name string
---@field type string

---@class CompanyLoadMatch
---@field ip string

---@class Core
---@field as? table
---@field geo? table
---@field hostname? string
---@field ip string
---@field is_anonymous? boolean
---@field is_anycast? boolean
---@field is_hosting? boolean
---@field is_mobile? boolean
---@field is_satellite? boolean

---@class CoreLoadMatch
---@field ip string

---@class Domain
---@field domain? table
---@field ip? string
---@field page? number
---@field total number

---@class DomainLoadMatch
---@field id string

---@class General
---@field ["8_8_8_8"]? table
---@field ["8_8_8_8city"]? string
---@field summary? string
---@field value? table

---@class GeneralCreateData
---@field ["8_8_8_8"]? table
---@field ["8_8_8_8city"]? string
---@field summary? string
---@field value? table

---@class GetCurrentInformation
---@field asn table
---@field bogon? boolean
---@field carrier table
---@field city? string
---@field company table
---@field country? string
---@field domain table
---@field hostname? string
---@field ip string
---@field loc? string
---@field org? string
---@field postal? string
---@field privacy table
---@field region? string
---@field timezone? string

---@class GetCurrentInformationLoadMatch
---@field asn? table
---@field bogon? boolean
---@field carrier? table
---@field city? string
---@field company? table
---@field country? string
---@field domain? table
---@field hostname? string
---@field ip? string
---@field loc? string
---@field org? string
---@field postal? string
---@field privacy? table
---@field region? string
---@field timezone? string

---@class GetInformationByIp
---@field asn table
---@field bogon? boolean
---@field carrier table
---@field city? string
---@field company table
---@field country? string
---@field domain table
---@field hostname? string
---@field ip string
---@field loc? string
---@field org? string
---@field postal? string
---@field privacy table
---@field region? string
---@field timezone? string

---@class GetInformationByIpLoadMatch
---@field id string

---@class IpinfoCore
---@field city? string
---@field key? string
---@field region? string

---@class IpinfoCoreLoadMatch
---@field field string
---@field ip string

---@class IpinfoLite

---@class IpinfoLiteLoadMatch
---@field field string
---@field ip string
---@field id string

---@class IpinfoPlus
---@field city? string
---@field key? string
---@field region? string

---@class IpinfoPlusLoadMatch
---@field field string
---@field ip string

---@class Lite
---@field as_domain string
---@field as_name string
---@field asn string
---@field continent string
---@field continent_code string
---@field country string
---@field country_code string
---@field ip string

---@class LiteLoadMatch
---@field as_domain? string
---@field as_name? string
---@field asn? string
---@field continent? string
---@field continent_code? string
---@field country? string
---@field country_code? string
---@field ip? string

---@class Max
---@field anonymous table
---@field as table
---@field geo table
---@field hostname? string
---@field ip string
---@field is_anonymous? boolean
---@field is_anycast? boolean
---@field is_hosting? boolean
---@field is_mobile? boolean
---@field is_satellite? boolean
---@field mobile? table

---@class MaxLoadMatch
---@field id string

---@class Men
---@field feature table
---@field request table
---@field token string

---@class MenLoadMatch
---@field feature? table
---@field request? table
---@field token? string

---@class Place
---@field category string
---@field ip string
---@field latitude number
---@field longitude number
---@field name string
---@field ssid string

---@class PlaceLoadMatch
---@field id string

---@class Plus
---@field anonymous? table
---@field as? table
---@field geo? table
---@field ip string
---@field is_anonymous? boolean
---@field is_anycast? boolean
---@field is_hosting? boolean
---@field is_mobile? boolean
---@field is_satellite? boolean
---@field mobile? table

---@class PlusLoadMatch
---@field id string

---@class Privacy
---@field hosting boolean
---@field proxy boolean
---@field relay boolean
---@field service string
---@field tor boolean
---@field vpn boolean

---@class PrivacyLoadMatch
---@field ip string

---@class PrivacyExtended
---@field census? boolean
---@field census_port? table
---@field confidence? number
---@field coverage? number
---@field device_activity? boolean
---@field first_seen? string
---@field hosting boolean
---@field inferred? boolean
---@field last_seen? string
---@field proxy boolean
---@field relay boolean
---@field service string
---@field tor boolean
---@field vpn boolean
---@field vpn_config? boolean
---@field whoi? boolean

---@class PrivacyExtendedListMatch
---@field ip string

---@class Range
---@field domain string
---@field num_range string
---@field range table
---@field redirects_to string

---@class RangeLoadMatch
---@field id string

---@class ResidentialProxy
---@field ip string
---@field last_seen string
---@field percent_days_seen number
---@field service string

---@class ResidentialProxyLoadMatch
---@field ip string

---@class Single

---@class SingleLoadMatch
---@field ip string

---@class WhoisAsn
---@field abuse? string
---@field admin? string
---@field country? string
---@field id? string
---@field maintainer? string
---@field name? string
---@field org? string
---@field range? string
---@field raw? string
---@field source? string
---@field status? string
---@field tech? string
---@field updated? string

---@class WhoisAsnListMatch
---@field asn number

---@class WhoisDomain
---@field net? string
---@field page? number
---@field record? table
---@field total? number

---@class WhoisDomainLoadMatch
---@field domain string

---@class WhoisIp
---@field net? string
---@field page? number
---@field record? table
---@field total? number

---@class WhoisIpLoadMatch
---@field whoisip string

---@class WhoisNetId
---@field net? string
---@field page? number
---@field record? table
---@field total? number

---@class WhoisNetIdLoadMatch
---@field whoisnetid string

---@class WhoisOrg
---@field org? string
---@field page? number
---@field record? table
---@field total? number

---@class WhoisOrgLoadMatch
---@field id string

---@class WhoisPoc
---@field page? number
---@field poc? string
---@field record? table
---@field total? number

---@class WhoisPocLoadMatch
---@field id string

local M = {}

return M
