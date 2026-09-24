// Typed models for the IpinfoDeveloper SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/ipinfo-developer-sdk/go/core"
)

// Abuse is the typed data model for the abuse entity.
type Abuse struct {
}

// AbuseLoadMatch is the typed request payload for Abuse.LoadTyped.
type AbuseLoadMatch struct {
	Ip string `json:"ip"`
}

// Asn is the typed data model for the asn entity.
type Asn struct {
}

// AsnListMatch is the typed request payload for Asn.ListTyped.
type AsnListMatch struct {
	Asn int `json:"asn"`
}

// Carrier is the typed data model for the carrier entity.
type Carrier struct {
}

// CarrierLoadMatch is the typed request payload for Carrier.LoadTyped.
type CarrierLoadMatch struct {
	Ip string `json:"ip"`
}

// Company is the typed data model for the company entity.
type Company struct {
}

// CompanyLoadMatch is the typed request payload for Company.LoadTyped.
type CompanyLoadMatch struct {
	Ip string `json:"ip"`
}

// Core is the typed data model for the core entity.
type Core struct {
}

// CoreLoadMatch is the typed request payload for Core.LoadTyped.
type CoreLoadMatch struct {
	Ip string `json:"ip"`
}

// Domain is the typed data model for the domain entity.
type Domain struct {
}

// DomainLoadMatch is the typed request payload for Domain.LoadTyped.
type DomainLoadMatch struct {
	Id string `json:"id"`
	Limit *int `json:"limit,omitempty"`
	Page *int `json:"page,omitempty"`
}

// General is the typed data model for the general entity.
type General struct {
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
}

// GetCurrentInformationLoadMatch is the typed request payload for GetCurrentInformation.LoadTyped.
type GetCurrentInformationLoadMatch struct {
	Asn *map[string]any `json:"asn,omitempty"`
	Bogon *bool `json:"bogon,omitempty"`
	Carrier *map[string]any `json:"carrier,omitempty"`
	City *string `json:"city,omitempty"`
	Company *map[string]any `json:"company,omitempty"`
	Country *string `json:"country,omitempty"`
	Domains *map[string]any `json:"domains,omitempty"`
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
}

// GetInformationByIpLoadMatch is the typed request payload for GetInformationByIp.LoadTyped.
type GetInformationByIpLoadMatch struct {
	Id string `json:"id"`
}

// IpinfoCore is the typed data model for the ipinfo_core entity.
type IpinfoCore struct {
}

// IpinfoCoreLoadMatch is the typed request payload for IpinfoCore.LoadTyped.
type IpinfoCoreLoadMatch struct {
	Field string `json:"field"`
	Ip *string `json:"ip,omitempty"`
}

// IpinfoLite is the typed data model for the ipinfo_lite entity.
type IpinfoLite struct {
}

// IpinfoLiteLoadMatch is the typed request payload for IpinfoLite.LoadTyped.
type IpinfoLiteLoadMatch struct {
	Id string `json:"id"`
}

// IpinfoPlus is the typed data model for the ipinfo_plus entity.
type IpinfoPlus struct {
}

// IpinfoPlusLoadMatch is the typed request payload for IpinfoPlus.LoadTyped.
type IpinfoPlusLoadMatch struct {
	Field string `json:"field"`
	Ip *string `json:"ip,omitempty"`
}

// Lite is the typed data model for the lite entity.
type Lite struct {
}

// LiteLoadMatch is the typed request payload for Lite.LoadTyped.
type LiteLoadMatch struct {
}

// Max is the typed data model for the max entity.
type Max struct {
}

// MaxLoadMatch is the typed request payload for Max.LoadTyped.
type MaxLoadMatch struct {
	Id string `json:"id"`
}

// Men is the typed data model for the men entity.
type Men struct {
}

// MenLoadMatch is the typed request payload for Men.LoadTyped.
type MenLoadMatch struct {
	Features *map[string]any `json:"features,omitempty"`
	Requests *map[string]any `json:"requests,omitempty"`
	Token *string `json:"token,omitempty"`
}

// Place is the typed data model for the place entity.
type Place struct {
}

// PlaceLoadMatch is the typed request payload for Place.LoadTyped.
type PlaceLoadMatch struct {
	Id string `json:"id"`
}

// Plus is the typed data model for the plus entity.
type Plus struct {
}

// PlusLoadMatch is the typed request payload for Plus.LoadTyped.
type PlusLoadMatch struct {
	Id string `json:"id"`
}

// Privacy is the typed data model for the privacy entity.
type Privacy struct {
}

// PrivacyLoadMatch is the typed request payload for Privacy.LoadTyped.
type PrivacyLoadMatch struct {
	Ip string `json:"ip"`
}

// PrivacyExtended is the typed data model for the privacy_extended entity.
type PrivacyExtended struct {
}

// PrivacyExtendedListMatch is the typed request payload for PrivacyExtended.ListTyped.
type PrivacyExtendedListMatch struct {
	Ip string `json:"ip"`
}

// Range is the typed data model for the range entity.
type Range struct {
}

// RangeLoadMatch is the typed request payload for Range.LoadTyped.
type RangeLoadMatch struct {
	Id string `json:"id"`
}

// ResidentialProxy is the typed data model for the residential_proxy entity.
type ResidentialProxy struct {
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
}

// WhoisAsn is the typed data model for the whois_asn entity.
type WhoisAsn struct {
}

// WhoisAsnListMatch is the typed request payload for WhoisAsn.ListTyped.
type WhoisAsnListMatch struct {
	Asn int `json:"asn"`
	Page *int `json:"page,omitempty"`
	Whoissource *string `json:"whoissource,omitempty"`
}

// WhoisDomain is the typed data model for the whois_domain entity.
type WhoisDomain struct {
}

// WhoisDomainLoadMatch is the typed request payload for WhoisDomain.LoadTyped.
type WhoisDomainLoadMatch struct {
	Domain string `json:"domain"`
	Page *int `json:"page,omitempty"`
	Whoissource *string `json:"whoissource,omitempty"`
}

// WhoisIp is the typed data model for the whois_ip entity.
type WhoisIp struct {
}

// WhoisIpLoadMatch is the typed request payload for WhoisIp.LoadTyped.
type WhoisIpLoadMatch struct {
	Whoisip string `json:"whoisip"`
	Page *int `json:"page,omitempty"`
	Whoissource *string `json:"whoissource,omitempty"`
}

// WhoisNetId is the typed data model for the whois_net_id entity.
type WhoisNetId struct {
}

// WhoisNetIdLoadMatch is the typed request payload for WhoisNetId.LoadTyped.
type WhoisNetIdLoadMatch struct {
	Whoisnetid string `json:"whoisnetid"`
	Page *int `json:"page,omitempty"`
	Whoissource *string `json:"whoissource,omitempty"`
}

// WhoisOrg is the typed data model for the whois_org entity.
type WhoisOrg struct {
}

// WhoisOrgLoadMatch is the typed request payload for WhoisOrg.LoadTyped.
type WhoisOrgLoadMatch struct {
	Id string `json:"id"`
	Page *int `json:"page,omitempty"`
	Whoissource *string `json:"whoissource,omitempty"`
}

// WhoisPoc is the typed data model for the whois_poc entity.
type WhoisPoc struct {
}

// WhoisPocLoadMatch is the typed request payload for WhoisPoc.LoadTyped.
type WhoisPocLoadMatch struct {
	Id string `json:"id"`
	Page *int `json:"page,omitempty"`
	Whoissource *string `json:"whoissource,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
