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
    downstream: list
    num_ip: int
    peer: list
    prefix: list
    prefixes6: list
    registry: str
    route: str
    upstream: list


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
    domain: list
    ip: str
    page: int


class DomainLoadMatch(TypedDict):
    id: str


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
    domain: dict
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
    domain: dict
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
    domain: dict
    ip: str
    privacy: dict


class GetInformationByIp(GetInformationByIpRequired, total=False):
    bogon: bool
    city: str
    country: str
    hostname: str
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


class IpinfoCoreLoadMatch(TypedDict):
    field: str
    ip: str


class IpinfoLite(TypedDict):
    pass


class IpinfoLiteLoadMatch(TypedDict):
    field: str
    ip: str
    id: str


class IpinfoPlus(TypedDict, total=False):
    city: str
    key: str
    region: str


class IpinfoPlusLoadMatch(TypedDict):
    field: str
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
    is_anonymous: bool
    is_anycast: bool
    is_hosting: bool
    is_mobile: bool
    is_satellite: bool
    mobile: dict


class MaxLoadMatch(TypedDict):
    id: str


class Men(TypedDict):
    feature: dict
    request: dict
    token: str


class MenLoadMatch(TypedDict, total=False):
    feature: dict
    request: dict
    token: str


class Place(TypedDict):
    category: str
    ip: str
    latitude: float
    longitude: float
    name: str
    ssid: str


class PlaceLoadMatch(TypedDict):
    id: str


class PlusRequired(TypedDict):
    ip: str


class Plus(PlusRequired, total=False):
    anonymous: dict
    geo: dict
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
    census_port: list
    confidence: int
    coverage: float
    device_activity: bool
    first_seen: str
    inferred: bool
    last_seen: str
    vpn_config: bool
    whoi: bool


class PrivacyExtendedListMatch(TypedDict):
    ip: str


class Range(TypedDict):
    domain: str
    num_range: str
    range: list
    redirects_to: str


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
    ip: str


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


class WhoisAsnListMatch(TypedDict):
    asn: int


class WhoisDomain(TypedDict, total=False):
    net: str
    page: int
    record: list
    total: int


class WhoisDomainLoadMatch(TypedDict):
    domain: str


class WhoisIp(TypedDict, total=False):
    net: str
    page: int
    record: list
    total: int


class WhoisIpLoadMatch(TypedDict):
    whoisip: str


class WhoisNetId(TypedDict, total=False):
    net: str
    page: int
    record: list
    total: int


class WhoisNetIdLoadMatch(TypedDict):
    whoisnetid: str


class WhoisOrg(TypedDict, total=False):
    org: str
    page: int
    record: list
    total: int


class WhoisOrgLoadMatch(TypedDict):
    id: str


class WhoisPoc(TypedDict, total=False):
    page: int
    poc: str
    record: list
    total: int


class WhoisPocLoadMatch(TypedDict):
    id: str
