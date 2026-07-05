// Typed models for the IpinfoDeveloper SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Abuse is the typed data model for the abuse entity.
type Abuse struct {
	Address *string `json:"address,omitempty"`
	Country *string `json:"country,omitempty"`
	Email *string `json:"email,omitempty"`
	Name *string `json:"name,omitempty"`
	Network *string `json:"network,omitempty"`
	Phone *string `json:"phone,omitempty"`
}

// AbuseLoadMatch is the typed request payload for Abuse.LoadTyped.
type AbuseLoadMatch struct {
	Ip string `json:"ip"`
}

// Asn is the typed data model for the asn entity.
type Asn struct {
	Allocated *string `json:"allocated,omitempty"`
	Asn string `json:"asn"`
	Country *string `json:"country,omitempty"`
	Domain string `json:"domain"`
	Downstream *[]any `json:"downstream,omitempty"`
	Name string `json:"name"`
	NumIp *int `json:"num_ip,omitempty"`
	Peer *[]any `json:"peer,omitempty"`
	Prefix *[]any `json:"prefix,omitempty"`
	Prefixes6 *[]any `json:"prefixes6,omitempty"`
	Registry *string `json:"registry,omitempty"`
	Route *string `json:"route,omitempty"`
	Type string `json:"type"`
	Upstream *[]any `json:"upstream,omitempty"`
}

// AsnListMatch is the typed request payload for Asn.ListTyped.
type AsnListMatch struct {
	Asn int `json:"asn"`
}

// Carrier is the typed data model for the carrier entity.
type Carrier struct {
	Mcc string `json:"mcc"`
	Mnc string `json:"mnc"`
	Name string `json:"name"`
}

// CarrierLoadMatch is the typed request payload for Carrier.LoadTyped.
type CarrierLoadMatch struct {
	Ip string `json:"ip"`
}

// Company is the typed data model for the company entity.
type Company struct {
	Domain string `json:"domain"`
	Name string `json:"name"`
	Type string `json:"type"`
}

// CompanyLoadMatch is the typed request payload for Company.LoadTyped.
type CompanyLoadMatch struct {
	Ip string `json:"ip"`
}

// Core is the typed data model for the core entity.
type Core struct {
	As *map[string]any `json:"as,omitempty"`
	Geo *map[string]any `json:"geo,omitempty"`
	Hostname *string `json:"hostname,omitempty"`
	Ip string `json:"ip"`
	IsAnonymous *bool `json:"is_anonymous,omitempty"`
	IsAnycast *bool `json:"is_anycast,omitempty"`
	IsHosting *bool `json:"is_hosting,omitempty"`
	IsMobile *bool `json:"is_mobile,omitempty"`
	IsSatellite *bool `json:"is_satellite,omitempty"`
}

// CoreLoadMatch is the typed request payload for Core.LoadTyped.
type CoreLoadMatch struct {
	Ip string `json:"ip"`
}

// Domain is the typed data model for the domain entity.
type Domain struct {
	Domain *[]any `json:"domain,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Page *int `json:"page,omitempty"`
	Total int `json:"total"`
}

// DomainLoadMatch is the typed request payload for Domain.LoadTyped.
type DomainLoadMatch struct {
	Id string `json:"id"`
}

// General is the typed data model for the general entity.
type General struct {
	F8888 *map[string]any `json:"8_8_8_8,omitempty"`
	F8888city *string `json:"8_8_8_8city,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Value *map[string]any `json:"value,omitempty"`
}

// GeneralCreateData is the typed request payload for General.CreateTyped.
type GeneralCreateData struct {
	F8888 *map[string]any `json:"8_8_8_8,omitempty"`
	F8888city *string `json:"8_8_8_8city,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Value *map[string]any `json:"value,omitempty"`
}

// GetCurrentInformation is the typed data model for the get_current_information entity.
type GetCurrentInformation struct {
	Asn map[string]any `json:"asn"`
	Bogon *bool `json:"bogon,omitempty"`
	Carrier map[string]any `json:"carrier"`
	City *string `json:"city,omitempty"`
	Company map[string]any `json:"company"`
	Country *string `json:"country,omitempty"`
	Domain map[string]any `json:"domain"`
	Hostname *string `json:"hostname,omitempty"`
	Ip string `json:"ip"`
	Loc *string `json:"loc,omitempty"`
	Org *string `json:"org,omitempty"`
	Postal *string `json:"postal,omitempty"`
	Privacy map[string]any `json:"privacy"`
	Region *string `json:"region,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
}

// GetCurrentInformationLoadMatch is the typed request payload for GetCurrentInformation.LoadTyped.
type GetCurrentInformationLoadMatch struct {
	Asn *map[string]any `json:"asn,omitempty"`
	Bogon *bool `json:"bogon,omitempty"`
	Carrier *map[string]any `json:"carrier,omitempty"`
	City *string `json:"city,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	Country *string `json:"country,omitempty"`
	Domain *map[string]any `json:"domain,omitempty"`
	Hostname *string `json:"hostname,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Loc *string `json:"loc,omitempty"`
	Org *string `json:"org,omitempty"`
	Postal *string `json:"postal,omitempty"`
	Privacy *map[string]any `json:"privacy,omitempty"`
	Region *string `json:"region,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
}

// GetInformationByIp is the typed data model for the get_information_by_ip entity.
type GetInformationByIp struct {
	Asn map[string]any `json:"asn"`
	Bogon *bool `json:"bogon,omitempty"`
	Carrier map[string]any `json:"carrier"`
	City *string `json:"city,omitempty"`
	Company map[string]any `json:"company"`
	Country *string `json:"country,omitempty"`
	Domain map[string]any `json:"domain"`
	Hostname *string `json:"hostname,omitempty"`
	Ip string `json:"ip"`
	Loc *string `json:"loc,omitempty"`
	Org *string `json:"org,omitempty"`
	Postal *string `json:"postal,omitempty"`
	Privacy map[string]any `json:"privacy"`
	Region *string `json:"region,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
}

// GetInformationByIpLoadMatch is the typed request payload for GetInformationByIp.LoadTyped.
type GetInformationByIpLoadMatch struct {
	Id string `json:"id"`
}

// IpinfoCore is the typed data model for the ipinfo_core entity.
type IpinfoCore struct {
	City *string `json:"city,omitempty"`
	Key *string `json:"key,omitempty"`
	Region *string `json:"region,omitempty"`
}

// IpinfoCoreLoadMatch is the typed request payload for IpinfoCore.LoadTyped.
type IpinfoCoreLoadMatch struct {
	Field string `json:"field"`
	Ip string `json:"ip"`
}

// IpinfoLite is the typed data model for the ipinfo_lite entity.
type IpinfoLite struct {
}

// IpinfoLiteLoadMatch is the typed request payload for IpinfoLite.LoadTyped.
type IpinfoLiteLoadMatch struct {
	Field string `json:"field"`
	Ip string `json:"ip"`
	Id string `json:"id"`
}

// IpinfoPlus is the typed data model for the ipinfo_plus entity.
type IpinfoPlus struct {
	City *string `json:"city,omitempty"`
	Key *string `json:"key,omitempty"`
	Region *string `json:"region,omitempty"`
}

// IpinfoPlusLoadMatch is the typed request payload for IpinfoPlus.LoadTyped.
type IpinfoPlusLoadMatch struct {
	Field string `json:"field"`
	Ip string `json:"ip"`
}

// Lite is the typed data model for the lite entity.
type Lite struct {
	AsDomain string `json:"as_domain"`
	AsName string `json:"as_name"`
	Asn string `json:"asn"`
	Continent string `json:"continent"`
	ContinentCode string `json:"continent_code"`
	Country string `json:"country"`
	CountryCode string `json:"country_code"`
	Ip string `json:"ip"`
}

// LiteLoadMatch is the typed request payload for Lite.LoadTyped.
type LiteLoadMatch struct {
	AsDomain *string `json:"as_domain,omitempty"`
	AsName *string `json:"as_name,omitempty"`
	Asn *string `json:"asn,omitempty"`
	Continent *string `json:"continent,omitempty"`
	ContinentCode *string `json:"continent_code,omitempty"`
	Country *string `json:"country,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Ip *string `json:"ip,omitempty"`
}

// Max is the typed data model for the max entity.
type Max struct {
	Anonymous map[string]any `json:"anonymous"`
	As map[string]any `json:"as"`
	Geo map[string]any `json:"geo"`
	Hostname *string `json:"hostname,omitempty"`
	Ip string `json:"ip"`
	IsAnonymous *bool `json:"is_anonymous,omitempty"`
	IsAnycast *bool `json:"is_anycast,omitempty"`
	IsHosting *bool `json:"is_hosting,omitempty"`
	IsMobile *bool `json:"is_mobile,omitempty"`
	IsSatellite *bool `json:"is_satellite,omitempty"`
	Mobile *map[string]any `json:"mobile,omitempty"`
}

// MaxLoadMatch is the typed request payload for Max.LoadTyped.
type MaxLoadMatch struct {
	Id string `json:"id"`
}

// Men is the typed data model for the men entity.
type Men struct {
	Feature map[string]any `json:"feature"`
	Request map[string]any `json:"request"`
	Token string `json:"token"`
}

// MenLoadMatch is the typed request payload for Men.LoadTyped.
type MenLoadMatch struct {
	Feature *map[string]any `json:"feature,omitempty"`
	Request *map[string]any `json:"request,omitempty"`
	Token *string `json:"token,omitempty"`
}

// Place is the typed data model for the place entity.
type Place struct {
	Category string `json:"category"`
	Ip string `json:"ip"`
	Latitude float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Name string `json:"name"`
	Ssid string `json:"ssid"`
}

// PlaceLoadMatch is the typed request payload for Place.LoadTyped.
type PlaceLoadMatch struct {
	Id string `json:"id"`
}

// Plus is the typed data model for the plus entity.
type Plus struct {
	Anonymous *map[string]any `json:"anonymous,omitempty"`
	As *map[string]any `json:"as,omitempty"`
	Geo *map[string]any `json:"geo,omitempty"`
	Ip string `json:"ip"`
	IsAnonymous *bool `json:"is_anonymous,omitempty"`
	IsAnycast *bool `json:"is_anycast,omitempty"`
	IsHosting *bool `json:"is_hosting,omitempty"`
	IsMobile *bool `json:"is_mobile,omitempty"`
	IsSatellite *bool `json:"is_satellite,omitempty"`
	Mobile *map[string]any `json:"mobile,omitempty"`
}

// PlusLoadMatch is the typed request payload for Plus.LoadTyped.
type PlusLoadMatch struct {
	Id string `json:"id"`
}

// Privacy is the typed data model for the privacy entity.
type Privacy struct {
	Hosting bool `json:"hosting"`
	Proxy bool `json:"proxy"`
	Relay bool `json:"relay"`
	Service string `json:"service"`
	Tor bool `json:"tor"`
	Vpn bool `json:"vpn"`
}

// PrivacyLoadMatch is the typed request payload for Privacy.LoadTyped.
type PrivacyLoadMatch struct {
	Ip string `json:"ip"`
}

// PrivacyExtended is the typed data model for the privacy_extended entity.
type PrivacyExtended struct {
	Census *bool `json:"census,omitempty"`
	CensusPort *[]any `json:"census_port,omitempty"`
	Confidence *int `json:"confidence,omitempty"`
	Coverage *float64 `json:"coverage,omitempty"`
	DeviceActivity *bool `json:"device_activity,omitempty"`
	FirstSeen *string `json:"first_seen,omitempty"`
	Hosting bool `json:"hosting"`
	Inferred *bool `json:"inferred,omitempty"`
	LastSeen *string `json:"last_seen,omitempty"`
	Proxy bool `json:"proxy"`
	Relay bool `json:"relay"`
	Service string `json:"service"`
	Tor bool `json:"tor"`
	Vpn bool `json:"vpn"`
	VpnConfig *bool `json:"vpn_config,omitempty"`
	Whoi *bool `json:"whoi,omitempty"`
}

// PrivacyExtendedListMatch is the typed request payload for PrivacyExtended.ListTyped.
type PrivacyExtendedListMatch struct {
	Ip string `json:"ip"`
}

// Range is the typed data model for the range entity.
type Range struct {
	Domain string `json:"domain"`
	NumRange string `json:"num_range"`
	Range []any `json:"range"`
	RedirectsTo string `json:"redirects_to"`
}

// RangeLoadMatch is the typed request payload for Range.LoadTyped.
type RangeLoadMatch struct {
	Id string `json:"id"`
}

// ResidentialProxy is the typed data model for the residential_proxy entity.
type ResidentialProxy struct {
	Ip string `json:"ip"`
	LastSeen string `json:"last_seen"`
	PercentDaysSeen int `json:"percent_days_seen"`
	Service string `json:"service"`
}

// ResidentialProxyLoadMatch is the typed request payload for ResidentialProxy.LoadTyped.
type ResidentialProxyLoadMatch struct {
	Ip string `json:"ip"`
}

// Single is the typed data model for the single entity.
type Single struct {
}

// SingleLoadMatch is the typed request payload for Single.LoadTyped.
type SingleLoadMatch struct {
	Ip string `json:"ip"`
}

// WhoisAsn is the typed data model for the whois_asn entity.
type WhoisAsn struct {
	Abuse *string `json:"abuse,omitempty"`
	Admin *string `json:"admin,omitempty"`
	Country *string `json:"country,omitempty"`
	Id *string `json:"id,omitempty"`
	Maintainer *string `json:"maintainer,omitempty"`
	Name *string `json:"name,omitempty"`
	Org *string `json:"org,omitempty"`
	Range *string `json:"range,omitempty"`
	Raw *string `json:"raw,omitempty"`
	Source *string `json:"source,omitempty"`
	Status *string `json:"status,omitempty"`
	Tech *string `json:"tech,omitempty"`
	Updated *string `json:"updated,omitempty"`
}

// WhoisAsnListMatch is the typed request payload for WhoisAsn.ListTyped.
type WhoisAsnListMatch struct {
	Asn int `json:"asn"`
}

// WhoisDomain is the typed data model for the whois_domain entity.
type WhoisDomain struct {
	Net *string `json:"net,omitempty"`
	Page *int `json:"page,omitempty"`
	Record *[]any `json:"record,omitempty"`
	Total *int `json:"total,omitempty"`
}

// WhoisDomainLoadMatch is the typed request payload for WhoisDomain.LoadTyped.
type WhoisDomainLoadMatch struct {
	Domain string `json:"domain"`
}

// WhoisIp is the typed data model for the whois_ip entity.
type WhoisIp struct {
	Net *string `json:"net,omitempty"`
	Page *int `json:"page,omitempty"`
	Record *[]any `json:"record,omitempty"`
	Total *int `json:"total,omitempty"`
}

// WhoisIpLoadMatch is the typed request payload for WhoisIp.LoadTyped.
type WhoisIpLoadMatch struct {
	Whoisip string `json:"whoisip"`
}

// WhoisNetId is the typed data model for the whois_net_id entity.
type WhoisNetId struct {
	Net *string `json:"net,omitempty"`
	Page *int `json:"page,omitempty"`
	Record *[]any `json:"record,omitempty"`
	Total *int `json:"total,omitempty"`
}

// WhoisNetIdLoadMatch is the typed request payload for WhoisNetId.LoadTyped.
type WhoisNetIdLoadMatch struct {
	Whoisnetid string `json:"whoisnetid"`
}

// WhoisOrg is the typed data model for the whois_org entity.
type WhoisOrg struct {
	Org *string `json:"org,omitempty"`
	Page *int `json:"page,omitempty"`
	Record *[]any `json:"record,omitempty"`
	Total *int `json:"total,omitempty"`
}

// WhoisOrgLoadMatch is the typed request payload for WhoisOrg.LoadTyped.
type WhoisOrgLoadMatch struct {
	Id string `json:"id"`
}

// WhoisPoc is the typed data model for the whois_poc entity.
type WhoisPoc struct {
	Page *int `json:"page,omitempty"`
	Poc *string `json:"poc,omitempty"`
	Record *[]any `json:"record,omitempty"`
	Total *int `json:"total,omitempty"`
}

// WhoisPocLoadMatch is the typed request payload for WhoisPoc.LoadTyped.
type WhoisPocLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
