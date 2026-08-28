# Typed models for the IpinfoDeveloper SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Abuse(TypedDict, total=False):
    address: str
    country: str
    email: str
    name: str
    network: str
    phone: str


class AbuseLoadMatch(TypedDict):
    ip: str


class AsnRequired(TypedDict):
    asn: str
    domain: str
    name: str
    type: str


class Asn(AsnRequired, total=False):
    allocated: str
    country: str
    downstreams: list
    num_ips: int
    peers: list
    prefixes: list
    prefixes6: list
    registry: str
    route: str
    upstreams: list


class AsnListMatch(TypedDict):
    asn: int


class Carrier(TypedDict):
    mcc: str
    mnc: str
    name: str


class CarrierLoadMatch(TypedDict):
    ip: str


class Company(TypedDict):
    domain: str
    name: str
    type: str


class CompanyLoadMatch(TypedDict):
    ip: str


class CoreRequired(TypedDict):
    ip: str


class Core(CoreRequired, total=False):
    geo: dict
    hostname: str
    is_anonymous: bool
    is_anycast: bool
    is_hosting: bool
    is_mobile: bool
    is_satellite: bool


class CoreLoadMatch(TypedDict):
    ip: str


class DomainRequired(TypedDict):
    total: int


class Domain(DomainRequired, total=False):
    domains: list
    id: str
    ip: str
    page: int


class DomainLoadMatchRequired(TypedDict):
    id: str


class DomainLoadMatch(DomainLoadMatchRequired, total=False):
    limit: int
    page: int


class General(TypedDict, total=False):
    summary: str
    value: dict


class GeneralCreateData(TypedDict, total=False):
    summary: str
    value: dict


class GetCurrentInformationRequired(TypedDict):
    asn: dict
    carrier: dict
    company: dict
    domains: dict
    ip: str
    privacy: dict


class GetCurrentInformation(GetCurrentInformationRequired, total=False):
    bogon: bool
    city: str
    country: str
    hostname: str
    loc: str
    org: str
    postal: str
    region: str
    timezone: str


class GetCurrentInformationLoadMatch(TypedDict, total=False):
    asn: dict
    bogon: bool
    carrier: dict
    city: str
    company: dict
    country: str
    domains: dict
    hostname: str
    ip: str
    loc: str
    org: str
    postal: str
    privacy: dict
    region: str
    timezone: str


class GetInformationByIpRequired(TypedDict):
    asn: dict
    carrier: dict
    company: dict
    domains: dict
    ip: str
    privacy: dict


class GetInformationByIp(GetInformationByIpRequired, total=False):
    bogon: bool
    city: str
    country: str
    hostname: str
    id: str
    loc: str
    org: str
    postal: str
    region: str
    timezone: str


class GetInformationByIpLoadMatch(TypedDict):
    id: str


class IpinfoCore(TypedDict, total=False):
    city: str
    key: str
    region: str


class IpinfoCoreLoadMatchRequired(TypedDict):
    field: str


class IpinfoCoreLoadMatch(IpinfoCoreLoadMatchRequired, total=False):
    ip: str


class IpinfoLite(TypedDict, total=False):
    id: str


class IpinfoLiteLoadMatch(TypedDict):
    id: str


class IpinfoPlus(TypedDict, total=False):
    city: str
    key: str
    region: str


class IpinfoPlusLoadMatchRequired(TypedDict):
    field: str


class IpinfoPlusLoadMatch(IpinfoPlusLoadMatchRequired, total=False):
    ip: str


class Lite(TypedDict):
    as_domain: str
    as_name: str
    asn: str
    continent: str
    continent_code: str
    country: str
    country_code: str
    ip: str


class LiteLoadMatch(TypedDict, total=False):
    as_domain: str
    as_name: str
    asn: str
    continent: str
    continent_code: str
    country: str
    country_code: str
    ip: str


class MaxRequired(TypedDict):
    anonymous: dict
    geo: dict
    ip: str


class Max(MaxRequired, total=False):
    hostname: str
    id: str
    is_anonymous: bool
    is_anycast: bool
    is_hosting: bool
    is_mobile: bool
    is_satellite: bool
    mobile: dict


class MaxLoadMatch(TypedDict):
    id: str


class Men(TypedDict):
    features: dict
    requests: dict
    token: str


class MenLoadMatch(TypedDict, total=False):
    features: dict
    requests: dict
    token: str


class PlaceRequired(TypedDict):
    category: str
    ip: str
    latitude: float
    longitude: float
    name: str
    ssid: str


class Place(PlaceRequired, total=False):
    id: str


class PlaceLoadMatch(TypedDict):
    id: str


class PlusRequired(TypedDict):
    ip: str


class Plus(PlusRequired, total=False):
    anonymous: dict
    geo: dict
    id: str
    is_anonymous: bool
    is_anycast: bool
    is_hosting: bool
    is_mobile: bool
    is_satellite: bool
    mobile: dict


class PlusLoadMatch(TypedDict):
    id: str


class Privacy(TypedDict):
    hosting: bool
    proxy: bool
    relay: bool
    service: str
    tor: bool
    vpn: bool


class PrivacyLoadMatch(TypedDict):
    ip: str


class PrivacyExtendedRequired(TypedDict):
    hosting: bool
    proxy: bool
    relay: bool
    service: str
    tor: bool
    vpn: bool


class PrivacyExtended(PrivacyExtendedRequired, total=False):
    census: bool
    census_ports: list
    confidence: int
    coverage: float
    device_activity: bool
    first_seen: str
    inferred: bool
    last_seen: str
    vpn_config: bool
    whois: bool


class PrivacyExtendedListMatch(TypedDict):
    ip: str


class RangeRequired(TypedDict):
    domain: str
    num_ranges: str
    ranges: list
    redirects_to: str


class Range(RangeRequired, total=False):
    id: str


class RangeLoadMatch(TypedDict):
    id: str


class ResidentialProxy(TypedDict):
    ip: str
    last_seen: str
    percent_days_seen: int
    service: str


class ResidentialProxyLoadMatch(TypedDict):
    ip: str


class Single(TypedDict):
    pass


class SingleLoadMatch(TypedDict):
    pass


class WhoisAsn(TypedDict, total=False):
    abuse: str
    admin: str
    country: str
    id: str
    maintainer: str
    name: str
    org: str
    range: str
    raw: str
    source: str
    status: str
    tech: str
    updated: str


class WhoisAsnListMatchRequired(TypedDict):
    asn: int


class WhoisAsnListMatch(WhoisAsnListMatchRequired, total=False):
    page: int
    whoissource: str


class WhoisDomain(TypedDict, total=False):
    net: str
    page: int
    records: list
    total: int


class WhoisDomainLoadMatchRequired(TypedDict):
    domain: str


class WhoisDomainLoadMatch(WhoisDomainLoadMatchRequired, total=False):
    page: int
    whoissource: str


class WhoisIp(TypedDict, total=False):
    net: str
    page: int
    records: list
    total: int


class WhoisIpLoadMatchRequired(TypedDict):
    whoisip: str


class WhoisIpLoadMatch(WhoisIpLoadMatchRequired, total=False):
    page: int
    whoissource: str


class WhoisNetId(TypedDict, total=False):
    net: str
    page: int
    records: list
    total: int


class WhoisNetIdLoadMatchRequired(TypedDict):
    whoisnetid: str


class WhoisNetIdLoadMatch(WhoisNetIdLoadMatchRequired, total=False):
    page: int
    whoissource: str


class WhoisOrg(TypedDict, total=False):
    id: str
    org: str
    page: int
    records: list
    total: int


class WhoisOrgLoadMatchRequired(TypedDict):
    id: str


class WhoisOrgLoadMatch(WhoisOrgLoadMatchRequired, total=False):
    page: int
    whoissource: str


class WhoisPoc(TypedDict, total=False):
    id: str
    page: int
    poc: str
    records: list
    total: int


class WhoisPocLoadMatchRequired(TypedDict):
    id: str


class WhoisPocLoadMatch(WhoisPocLoadMatchRequired, total=False):
    page: int
    whoissource: str
