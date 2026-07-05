<?php
declare(strict_types=1);

// Typed models for the IpinfoDeveloper SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Abuse entity data model. */
class Abuse
{
    public ?string $address = null;
    public ?string $country = null;
    public ?string $email = null;
    public ?string $name = null;
    public ?string $network = null;
    public ?string $phone = null;
}

/** Request payload for Abuse#load. */
class AbuseLoadMatch
{
    public string $ip;
}

/** Asn entity data model. */
class Asn
{
    public ?string $allocated = null;
    public string $asn;
    public ?string $country = null;
    public string $domain;
    public ?array $downstream = null;
    public string $name;
    public ?int $num_ip = null;
    public ?array $peer = null;
    public ?array $prefix = null;
    public ?array $prefixes6 = null;
    public ?string $registry = null;
    public ?string $route = null;
    public string $type;
    public ?array $upstream = null;
}

/** Request payload for Asn#list. */
class AsnListMatch
{
    public int $asn;
}

/** Carrier entity data model. */
class Carrier
{
    public string $mcc;
    public string $mnc;
    public string $name;
}

/** Request payload for Carrier#load. */
class CarrierLoadMatch
{
    public string $ip;
}

/** Company entity data model. */
class Company
{
    public string $domain;
    public string $name;
    public string $type;
}

/** Request payload for Company#load. */
class CompanyLoadMatch
{
    public string $ip;
}

/** Core entity data model. */
class Core
{
    public ?array $as = null;
    public ?array $geo = null;
    public ?string $hostname = null;
    public string $ip;
    public ?bool $is_anonymous = null;
    public ?bool $is_anycast = null;
    public ?bool $is_hosting = null;
    public ?bool $is_mobile = null;
    public ?bool $is_satellite = null;
}

/** Request payload for Core#load. */
class CoreLoadMatch
{
    public string $ip;
}

/** Domain entity data model. */
class Domain
{
    public ?array $domain = null;
    public ?string $ip = null;
    public ?int $page = null;
    public int $total;
}

/** Request payload for Domain#load. */
class DomainLoadMatch
{
    public string $id;
}

/** General entity data model. */
class General
{
    public ?string $summary = null;
    public ?array $value = null;
}

/** Request payload for General#create. */
class GeneralCreateData
{
    public ?string $summary = null;
    public ?array $value = null;
}

/** GetCurrentInformation entity data model. */
class GetCurrentInformation
{
    public array $asn;
    public ?bool $bogon = null;
    public array $carrier;
    public ?string $city = null;
    public array $company;
    public ?string $country = null;
    public array $domain;
    public ?string $hostname = null;
    public string $ip;
    public ?string $loc = null;
    public ?string $org = null;
    public ?string $postal = null;
    public array $privacy;
    public ?string $region = null;
    public ?string $timezone = null;
}

/** Request payload for GetCurrentInformation#load. */
class GetCurrentInformationLoadMatch
{
    public ?array $asn = null;
    public ?bool $bogon = null;
    public ?array $carrier = null;
    public ?string $city = null;
    public ?array $company = null;
    public ?string $country = null;
    public ?array $domain = null;
    public ?string $hostname = null;
    public ?string $ip = null;
    public ?string $loc = null;
    public ?string $org = null;
    public ?string $postal = null;
    public ?array $privacy = null;
    public ?string $region = null;
    public ?string $timezone = null;
}

/** GetInformationByIp entity data model. */
class GetInformationByIp
{
    public array $asn;
    public ?bool $bogon = null;
    public array $carrier;
    public ?string $city = null;
    public array $company;
    public ?string $country = null;
    public array $domain;
    public ?string $hostname = null;
    public string $ip;
    public ?string $loc = null;
    public ?string $org = null;
    public ?string $postal = null;
    public array $privacy;
    public ?string $region = null;
    public ?string $timezone = null;
}

/** Request payload for GetInformationByIp#load. */
class GetInformationByIpLoadMatch
{
    public string $id;
}

/** IpinfoCore entity data model. */
class IpinfoCore
{
    public ?string $city = null;
    public ?string $key = null;
    public ?string $region = null;
}

/** Request payload for IpinfoCore#load. */
class IpinfoCoreLoadMatch
{
    public string $field;
    public string $ip;
}

/** IpinfoLite entity data model. */
class IpinfoLite
{
}

/** Request payload for IpinfoLite#load. */
class IpinfoLiteLoadMatch
{
    public string $field;
    public string $ip;
    public string $id;
}

/** IpinfoPlus entity data model. */
class IpinfoPlus
{
    public ?string $city = null;
    public ?string $key = null;
    public ?string $region = null;
}

/** Request payload for IpinfoPlus#load. */
class IpinfoPlusLoadMatch
{
    public string $field;
    public string $ip;
}

/** Lite entity data model. */
class Lite
{
    public string $as_domain;
    public string $as_name;
    public string $asn;
    public string $continent;
    public string $continent_code;
    public string $country;
    public string $country_code;
    public string $ip;
}

/** Request payload for Lite#load. */
class LiteLoadMatch
{
    public ?string $as_domain = null;
    public ?string $as_name = null;
    public ?string $asn = null;
    public ?string $continent = null;
    public ?string $continent_code = null;
    public ?string $country = null;
    public ?string $country_code = null;
    public ?string $ip = null;
}

/** Max entity data model. */
class Max
{
    public array $anonymous;
    public array $as;
    public array $geo;
    public ?string $hostname = null;
    public string $ip;
    public ?bool $is_anonymous = null;
    public ?bool $is_anycast = null;
    public ?bool $is_hosting = null;
    public ?bool $is_mobile = null;
    public ?bool $is_satellite = null;
    public ?array $mobile = null;
}

/** Request payload for Max#load. */
class MaxLoadMatch
{
    public string $id;
}

/** Men entity data model. */
class Men
{
    public array $feature;
    public array $request;
    public string $token;
}

/** Request payload for Men#load. */
class MenLoadMatch
{
    public ?array $feature = null;
    public ?array $request = null;
    public ?string $token = null;
}

/** Place entity data model. */
class Place
{
    public string $category;
    public string $ip;
    public float $latitude;
    public float $longitude;
    public string $name;
    public string $ssid;
}

/** Request payload for Place#load. */
class PlaceLoadMatch
{
    public string $id;
}

/** Plus entity data model. */
class Plus
{
    public ?array $anonymous = null;
    public ?array $as = null;
    public ?array $geo = null;
    public string $ip;
    public ?bool $is_anonymous = null;
    public ?bool $is_anycast = null;
    public ?bool $is_hosting = null;
    public ?bool $is_mobile = null;
    public ?bool $is_satellite = null;
    public ?array $mobile = null;
}

/** Request payload for Plus#load. */
class PlusLoadMatch
{
    public string $id;
}

/** Privacy entity data model. */
class Privacy
{
    public bool $hosting;
    public bool $proxy;
    public bool $relay;
    public string $service;
    public bool $tor;
    public bool $vpn;
}

/** Request payload for Privacy#load. */
class PrivacyLoadMatch
{
    public string $ip;
}

/** PrivacyExtended entity data model. */
class PrivacyExtended
{
    public ?bool $census = null;
    public ?array $census_port = null;
    public ?int $confidence = null;
    public ?float $coverage = null;
    public ?bool $device_activity = null;
    public ?string $first_seen = null;
    public bool $hosting;
    public ?bool $inferred = null;
    public ?string $last_seen = null;
    public bool $proxy;
    public bool $relay;
    public string $service;
    public bool $tor;
    public bool $vpn;
    public ?bool $vpn_config = null;
    public ?bool $whoi = null;
}

/** Request payload for PrivacyExtended#list. */
class PrivacyExtendedListMatch
{
    public string $ip;
}

/** Range entity data model. */
class Range
{
    public string $domain;
    public string $num_range;
    public array $range;
    public string $redirects_to;
}

/** Request payload for Range#load. */
class RangeLoadMatch
{
    public string $id;
}

/** ResidentialProxy entity data model. */
class ResidentialProxy
{
    public string $ip;
    public string $last_seen;
    public int $percent_days_seen;
    public string $service;
}

/** Request payload for ResidentialProxy#load. */
class ResidentialProxyLoadMatch
{
    public string $ip;
}

/** Single entity data model. */
class Single
{
}

/** Request payload for Single#load. */
class SingleLoadMatch
{
    public string $ip;
}

/** WhoisAsn entity data model. */
class WhoisAsn
{
    public ?string $abuse = null;
    public ?string $admin = null;
    public ?string $country = null;
    public ?string $id = null;
    public ?string $maintainer = null;
    public ?string $name = null;
    public ?string $org = null;
    public ?string $range = null;
    public ?string $raw = null;
    public ?string $source = null;
    public ?string $status = null;
    public ?string $tech = null;
    public ?string $updated = null;
}

/** Request payload for WhoisAsn#list. */
class WhoisAsnListMatch
{
    public int $asn;
}

/** WhoisDomain entity data model. */
class WhoisDomain
{
    public ?string $net = null;
    public ?int $page = null;
    public ?array $record = null;
    public ?int $total = null;
}

/** Request payload for WhoisDomain#load. */
class WhoisDomainLoadMatch
{
    public string $domain;
}

/** WhoisIp entity data model. */
class WhoisIp
{
    public ?string $net = null;
    public ?int $page = null;
    public ?array $record = null;
    public ?int $total = null;
}

/** Request payload for WhoisIp#load. */
class WhoisIpLoadMatch
{
    public string $whoisip;
}

/** WhoisNetId entity data model. */
class WhoisNetId
{
    public ?string $net = null;
    public ?int $page = null;
    public ?array $record = null;
    public ?int $total = null;
}

/** Request payload for WhoisNetId#load. */
class WhoisNetIdLoadMatch
{
    public string $whoisnetid;
}

/** WhoisOrg entity data model. */
class WhoisOrg
{
    public ?string $org = null;
    public ?int $page = null;
    public ?array $record = null;
    public ?int $total = null;
}

/** Request payload for WhoisOrg#load. */
class WhoisOrgLoadMatch
{
    public string $id;
}

/** WhoisPoc entity data model. */
class WhoisPoc
{
    public ?int $page = null;
    public ?string $poc = null;
    public ?array $record = null;
    public ?int $total = null;
}

/** Request payload for WhoisPoc#load. */
class WhoisPocLoadMatch
{
    public string $id;
}

