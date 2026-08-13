// Typed models for the IpinfoDeveloper SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Abuse {
  address?: string
  country?: string
  email?: string
  name?: string
  network?: string
  phone?: string
}

export interface AbuseLoadMatch {
  ip: string
}

export interface Asn {
  allocated?: string
  asn: string
  country?: string
  domain: string
  downstreams?: any[]
  name: string
  num_ips?: number
  peers?: any[]
  prefixes?: any[]
  prefixes6?: any[]
  registry?: string
  route?: string
  type: string
  upstreams?: any[]
}

export interface AsnListMatch {
  asn: number
}

export interface Carrier {
  mcc: string
  mnc: string
  name: string
}

export interface CarrierLoadMatch {
  ip: string
}

export interface Company {
  domain: string
  name: string
  type: string
}

export interface CompanyLoadMatch {
  ip: string
}

export interface Core {
  as?: Record<string, any>
  geo?: Record<string, any>
  hostname?: string
  ip: string
  is_anonymous?: boolean
  is_anycast?: boolean
  is_hosting?: boolean
  is_mobile?: boolean
  is_satellite?: boolean
}

export interface CoreLoadMatch {
  ip?: string
}

export interface Domain {
  domains?: any[]
  ip?: string
  page?: number
  total: number
}

export interface DomainLoadMatch {
  id: string
}

export interface General {
  "8_8_8_8"?: Record<string, any>
  "8_8_8_8city"?: string
  summary?: string
  value?: Record<string, any>
}

export interface GeneralCreateData {
  "8_8_8_8"?: Record<string, any>
  "8_8_8_8city"?: string
  summary?: string
  value?: Record<string, any>
}

export interface GetCurrentInformation {
  asn: Record<string, any>
  bogon?: boolean
  carrier: Record<string, any>
  city?: string
  company: Record<string, any>
  country?: string
  domains: Record<string, any>
  hostname?: string
  ip: string
  loc?: string
  org?: string
  postal?: string
  privacy: Record<string, any>
  region?: string
  timezone?: string
}

export interface GetCurrentInformationLoadMatch {
  asn?: Record<string, any>
  bogon?: boolean
  carrier?: Record<string, any>
  city?: string
  company?: Record<string, any>
  country?: string
  domains?: Record<string, any>
  hostname?: string
  ip?: string
  loc?: string
  org?: string
  postal?: string
  privacy?: Record<string, any>
  region?: string
  timezone?: string
}

export interface GetInformationByIp {
  asn: Record<string, any>
  bogon?: boolean
  carrier: Record<string, any>
  city?: string
  company: Record<string, any>
  country?: string
  domains: Record<string, any>
  hostname?: string
  ip: string
  loc?: string
  org?: string
  postal?: string
  privacy: Record<string, any>
  region?: string
  timezone?: string
}

export interface GetInformationByIpLoadMatch {
  id: string
}

export interface IpinfoCore {
  city?: string
  key?: string
  region?: string
}

export interface IpinfoCoreLoadMatch {
  field: string
  ip?: string
}

export interface IpinfoLite {
}

export interface IpinfoLiteLoadMatch {
  field?: string
  ip?: string
  id?: string
}

export interface IpinfoPlus {
  city?: string
  key?: string
  region?: string
}

export interface IpinfoPlusLoadMatch {
  field: string
  ip?: string
}

export interface Lite {
  as_domain: string
  as_name: string
  asn: string
  continent: string
  continent_code: string
  country: string
  country_code: string
  ip: string
}

export interface LiteLoadMatch {
  as_domain?: string
  as_name?: string
  asn?: string
  continent?: string
  continent_code?: string
  country?: string
  country_code?: string
  ip?: string

  // Selects a custom action instead of the plain load:
  //   'me'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Max {
  anonymous: Record<string, any>
  as: Record<string, any>
  geo: Record<string, any>
  hostname?: string
  ip: string
  is_anonymous?: boolean
  is_anycast?: boolean
  is_hosting?: boolean
  is_mobile?: boolean
  is_satellite?: boolean
  mobile?: Record<string, any>
}

export interface MaxLoadMatch {
  id: string
}

export interface Men {
  features: Record<string, any>
  requests: Record<string, any>
  token: string
}

export interface MenLoadMatch {
  features?: Record<string, any>
  requests?: Record<string, any>
  token?: string
}

export interface Place {
  category: string
  ip: string
  latitude: number
  longitude: number
  name: string
  ssid: string
}

export interface PlaceLoadMatch {
  id: string
}

export interface Plus {
  anonymous?: Record<string, any>
  as?: Record<string, any>
  geo?: Record<string, any>
  ip: string
  is_anonymous?: boolean
  is_anycast?: boolean
  is_hosting?: boolean
  is_mobile?: boolean
  is_satellite?: boolean
  mobile?: Record<string, any>
}

export interface PlusLoadMatch {
  id: string

  // Selects a custom action instead of the plain load:
  //   'me'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Privacy {
  hosting: boolean
  proxy: boolean
  relay: boolean
  service: string
  tor: boolean
  vpn: boolean
}

export interface PrivacyLoadMatch {
  ip: string
}

export interface PrivacyExtended {
  census?: boolean
  census_ports?: any[]
  confidence?: number
  coverage?: number
  device_activity?: boolean
  first_seen?: string
  hosting: boolean
  inferred?: boolean
  last_seen?: string
  proxy: boolean
  relay: boolean
  service: string
  tor: boolean
  vpn: boolean
  vpn_config?: boolean
  whois?: boolean
}

export interface PrivacyExtendedListMatch {
  ip: string
}

export interface Range {
  domain: string
  num_ranges: string
  ranges: any[]
  redirects_to: string
}

export interface RangeLoadMatch {
  id: string
}

export interface ResidentialProxy {
  ip: string
  last_seen: string
  percent_days_seen: number
  service: string
}

export interface ResidentialProxyLoadMatch {
  ip: string
}

export interface Single {
}

export interface SingleLoadMatch {
  ip?: string
}

export interface WhoisAsn {
  abuse?: string
  admin?: string
  country?: string
  id?: string
  maintainer?: string
  name?: string
  org?: string
  range?: string
  raw?: string
  source?: string
  status?: string
  tech?: string
  updated?: string
}

export interface WhoisAsnListMatch {
  asn: number
}

export interface WhoisDomain {
  net?: string
  page?: number
  records?: any[]
  total?: number
}

export interface WhoisDomainLoadMatch {
  domain: string
}

export interface WhoisIp {
  net?: string
  page?: number
  records?: any[]
  total?: number
}

export interface WhoisIpLoadMatch {
  whoisip: string
}

export interface WhoisNetId {
  net?: string
  page?: number
  records?: any[]
  total?: number
}

export interface WhoisNetIdLoadMatch {
  whoisnetid: string
}

export interface WhoisOrg {
  org?: string
  page?: number
  records?: any[]
  total?: number
}

export interface WhoisOrgLoadMatch {
  id: string
}

export interface WhoisPoc {
  page?: number
  poc?: string
  records?: any[]
  total?: number
}

export interface WhoisPocLoadMatch {
  id: string
}

