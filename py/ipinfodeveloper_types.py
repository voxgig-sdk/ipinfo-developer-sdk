# Typed models for the IpinfoDeveloper SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Abuse:
    address: Optional[str] = None
    country: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None
    network: Optional[str] = None
    phone: Optional[str] = None


@dataclass
class AbuseLoadMatch:
    ip: str


@dataclass
class Asn:
    asn: str
    domain: str
    name: str
    type: str
    allocated: Optional[str] = None
    country: Optional[str] = None
    downstream: Optional[list] = None
    num_ip: Optional[int] = None
    peer: Optional[list] = None
    prefix: Optional[list] = None
    prefixes6: Optional[list] = None
    registry: Optional[str] = None
    route: Optional[str] = None
    upstream: Optional[list] = None


@dataclass
class AsnListMatch:
    asn: int


@dataclass
class Carrier:
    mcc: str
    mnc: str
    name: str


@dataclass
class CarrierLoadMatch:
    ip: str


@dataclass
class Company:
    domain: str
    name: str
    type: str


@dataclass
class CompanyLoadMatch:
    ip: str


@dataclass
class Core:
    ip: str
    geo: Optional[dict] = None
    hostname: Optional[str] = None
    is_anonymous: Optional[bool] = None
    is_anycast: Optional[bool] = None
    is_hosting: Optional[bool] = None
    is_mobile: Optional[bool] = None
    is_satellite: Optional[bool] = None


@dataclass
class CoreLoadMatch:
    ip: str


@dataclass
class Domain:
    total: int
    domain: Optional[list] = None
    ip: Optional[str] = None
    page: Optional[int] = None


@dataclass
class DomainLoadMatch:
    id: str


@dataclass
class General:
    summary: Optional[str] = None
    value: Optional[dict] = None


@dataclass
class GeneralCreateData:
    summary: Optional[str] = None
    value: Optional[dict] = None


@dataclass
class GetCurrentInformation:
    asn: dict
    carrier: dict
    company: dict
    domain: dict
    ip: str
    privacy: dict
    bogon: Optional[bool] = None
    city: Optional[str] = None
    country: Optional[str] = None
    hostname: Optional[str] = None
    loc: Optional[str] = None
    org: Optional[str] = None
    postal: Optional[str] = None
    region: Optional[str] = None
    timezone: Optional[str] = None


@dataclass
class GetCurrentInformationLoadMatch:
    asn: Optional[dict] = None
    bogon: Optional[bool] = None
    carrier: Optional[dict] = None
    city: Optional[str] = None
    company: Optional[dict] = None
    country: Optional[str] = None
    domain: Optional[dict] = None
    hostname: Optional[str] = None
    ip: Optional[str] = None
    loc: Optional[str] = None
    org: Optional[str] = None
    postal: Optional[str] = None
    privacy: Optional[dict] = None
    region: Optional[str] = None
    timezone: Optional[str] = None


@dataclass
class GetInformationByIp:
    asn: dict
    carrier: dict
    company: dict
    domain: dict
    ip: str
    privacy: dict
    bogon: Optional[bool] = None
    city: Optional[str] = None
    country: Optional[str] = None
    hostname: Optional[str] = None
    loc: Optional[str] = None
    org: Optional[str] = None
    postal: Optional[str] = None
    region: Optional[str] = None
    timezone: Optional[str] = None


@dataclass
class GetInformationByIpLoadMatch:
    id: str


@dataclass
class IpinfoCore:
    city: Optional[str] = None
    key: Optional[str] = None
    region: Optional[str] = None


@dataclass
class IpinfoCoreLoadMatch:
    field: str
    ip: str


@dataclass
class IpinfoLite:
    pass


@dataclass
class IpinfoLiteLoadMatch:
    field: str
    ip: str
    id: str


@dataclass
class IpinfoPlus:
    city: Optional[str] = None
    key: Optional[str] = None
    region: Optional[str] = None


@dataclass
class IpinfoPlusLoadMatch:
    field: str
    ip: str


@dataclass
class Lite:
    as_domain: str
    as_name: str
    asn: str
    continent: str
    continent_code: str
    country: str
    country_code: str
    ip: str


@dataclass
class LiteLoadMatch:
    as_domain: Optional[str] = None
    as_name: Optional[str] = None
    asn: Optional[str] = None
    continent: Optional[str] = None
    continent_code: Optional[str] = None
    country: Optional[str] = None
    country_code: Optional[str] = None
    ip: Optional[str] = None


@dataclass
class Max:
    anonymous: dict
    geo: dict
    ip: str
    hostname: Optional[str] = None
    is_anonymous: Optional[bool] = None
    is_anycast: Optional[bool] = None
    is_hosting: Optional[bool] = None
    is_mobile: Optional[bool] = None
    is_satellite: Optional[bool] = None
    mobile: Optional[dict] = None


@dataclass
class MaxLoadMatch:
    id: str


@dataclass
class Men:
    feature: dict
    request: dict
    token: str


@dataclass
class MenLoadMatch:
    feature: Optional[dict] = None
    request: Optional[dict] = None
    token: Optional[str] = None


@dataclass
class Place:
    category: str
    ip: str
    latitude: float
    longitude: float
    name: str
    ssid: str


@dataclass
class PlaceLoadMatch:
    id: str


@dataclass
class Plus:
    ip: str
    anonymous: Optional[dict] = None
    geo: Optional[dict] = None
    is_anonymous: Optional[bool] = None
    is_anycast: Optional[bool] = None
    is_hosting: Optional[bool] = None
    is_mobile: Optional[bool] = None
    is_satellite: Optional[bool] = None
    mobile: Optional[dict] = None


@dataclass
class PlusLoadMatch:
    id: str


@dataclass
class Privacy:
    hosting: bool
    proxy: bool
    relay: bool
    service: str
    tor: bool
    vpn: bool


@dataclass
class PrivacyLoadMatch:
    ip: str


@dataclass
class PrivacyExtended:
    hosting: bool
    proxy: bool
    relay: bool
    service: str
    tor: bool
    vpn: bool
    census: Optional[bool] = None
    census_port: Optional[list] = None
    confidence: Optional[int] = None
    coverage: Optional[float] = None
    device_activity: Optional[bool] = None
    first_seen: Optional[str] = None
    inferred: Optional[bool] = None
    last_seen: Optional[str] = None
    vpn_config: Optional[bool] = None
    whoi: Optional[bool] = None


@dataclass
class PrivacyExtendedListMatch:
    ip: str


@dataclass
class Range:
    domain: str
    num_range: str
    range: list
    redirects_to: str


@dataclass
class RangeLoadMatch:
    id: str


@dataclass
class ResidentialProxy:
    ip: str
    last_seen: str
    percent_days_seen: int
    service: str


@dataclass
class ResidentialProxyLoadMatch:
    ip: str


@dataclass
class Single:
    pass


@dataclass
class SingleLoadMatch:
    ip: str


@dataclass
class WhoisAsn:
    abuse: Optional[str] = None
    admin: Optional[str] = None
    country: Optional[str] = None
    id: Optional[str] = None
    maintainer: Optional[str] = None
    name: Optional[str] = None
    org: Optional[str] = None
    range: Optional[str] = None
    raw: Optional[str] = None
    source: Optional[str] = None
    status: Optional[str] = None
    tech: Optional[str] = None
    updated: Optional[str] = None


@dataclass
class WhoisAsnListMatch:
    asn: int


@dataclass
class WhoisDomain:
    net: Optional[str] = None
    page: Optional[int] = None
    record: Optional[list] = None
    total: Optional[int] = None


@dataclass
class WhoisDomainLoadMatch:
    domain: str


@dataclass
class WhoisIp:
    net: Optional[str] = None
    page: Optional[int] = None
    record: Optional[list] = None
    total: Optional[int] = None


@dataclass
class WhoisIpLoadMatch:
    whoisip: str


@dataclass
class WhoisNetId:
    net: Optional[str] = None
    page: Optional[int] = None
    record: Optional[list] = None
    total: Optional[int] = None


@dataclass
class WhoisNetIdLoadMatch:
    whoisnetid: str


@dataclass
class WhoisOrg:
    org: Optional[str] = None
    page: Optional[int] = None
    record: Optional[list] = None
    total: Optional[int] = None


@dataclass
class WhoisOrgLoadMatch:
    id: str


@dataclass
class WhoisPoc:
    page: Optional[int] = None
    poc: Optional[str] = None
    record: Optional[list] = None
    total: Optional[int] = None


@dataclass
class WhoisPocLoadMatch:
    id: str

