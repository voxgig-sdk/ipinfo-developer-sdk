# IpinfoDeveloper PHP SDK



The PHP SDK for the IpinfoDeveloper API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Abuse()` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases](https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'ipinfodeveloper_sdk.php';

$client = new IpinfoDeveloperSDK([
    "apikey" => getenv("IPINFO_DEVELOPER_APIKEY"),
]);
```

### 3. Load an abuse

```php
try {
    // load() returns the bare Abuse record (throws on error).
    $abuse = $client->Abuse()->load();
    print_r($abuse);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $abuse = $client->Abuse()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = IpinfoDeveloperSDK::test();

// Entity ops return the bare mock record (throws on error).
$abuse = $client->Abuse()->load();
print_r($abuse);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new IpinfoDeveloperSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
IPINFO_DEVELOPER_TEST_LIVE=TRUE
IPINFO_DEVELOPER_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### IpinfoDeveloperSDK

```php
require_once 'ipinfodeveloper_sdk.php';
$client = new IpinfoDeveloperSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = IpinfoDeveloperSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### IpinfoDeveloperSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Abuse` | `($data): AbuseEntity` | Create an Abuse entity instance. |
| `Asn` | `($data): AsnEntity` | Create an Asn entity instance. |
| `Carrier` | `($data): CarrierEntity` | Create a Carrier entity instance. |
| `Company` | `($data): CompanyEntity` | Create a Company entity instance. |
| `Core` | `($data): CoreEntity` | Create a Core entity instance. |
| `Domain` | `($data): DomainEntity` | Create a Domain entity instance. |
| `General` | `($data): GeneralEntity` | Create a General entity instance. |
| `GetCurrentInformation` | `($data): GetCurrentInformationEntity` | Create a GetCurrentInformation entity instance. |
| `GetInformationByIp` | `($data): GetInformationByIpEntity` | Create a GetInformationByIp entity instance. |
| `IpinfoCore` | `($data): IpinfoCoreEntity` | Create an IpinfoCore entity instance. |
| `IpinfoLite` | `($data): IpinfoLiteEntity` | Create an IpinfoLite entity instance. |
| `IpinfoPlus` | `($data): IpinfoPlusEntity` | Create an IpinfoPlus entity instance. |
| `Lite` | `($data): LiteEntity` | Create a Lite entity instance. |
| `Max` | `($data): MaxEntity` | Create a Max entity instance. |
| `Men` | `($data): MenEntity` | Create a Men entity instance. |
| `Place` | `($data): PlaceEntity` | Create a Place entity instance. |
| `Plus` | `($data): PlusEntity` | Create a Plus entity instance. |
| `Privacy` | `($data): PrivacyEntity` | Create a Privacy entity instance. |
| `PrivacyExtended` | `($data): PrivacyExtendedEntity` | Create a PrivacyExtended entity instance. |
| `Range` | `($data): RangeEntity` | Create a Range entity instance. |
| `ResidentialProxy` | `($data): ResidentialProxyEntity` | Create a ResidentialProxy entity instance. |
| `Single` | `($data): SingleEntity` | Create a Single entity instance. |
| `WhoisAsn` | `($data): WhoisAsnEntity` | Create a WhoisAsn entity instance. |
| `WhoisDomain` | `($data): WhoisDomainEntity` | Create a WhoisDomain entity instance. |
| `WhoisIp` | `($data): WhoisIpEntity` | Create a WhoisIp entity instance. |
| `WhoisNetId` | `($data): WhoisNetIdEntity` | Create a WhoisNetId entity instance. |
| `WhoisOrg` | `($data): WhoisOrgEntity` | Create a WhoisOrg entity instance. |
| `WhoisPoc` | `($data): WhoisPocEntity` | Create a WhoisPoc entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Abuse

| Field | Description |
| --- | --- |
| `address` |  |
| `country` |  |
| `email` |  |
| `name` |  |
| `network` |  |
| `phone` |  |

Operations: Load.

API path: `/{ip}/abuse`

#### Asn

| Field | Description |
| --- | --- |
| `allocated` |  |
| `asn` |  |
| `country` |  |
| `domain` |  |
| `downstream` |  |
| `name` |  |
| `num_ip` |  |
| `peer` |  |
| `prefix` |  |
| `prefixes6` |  |
| `registry` |  |
| `route` |  |
| `type` |  |
| `upstream` |  |

Operations: List.

API path: `/AS{asn}`

#### Carrier

| Field | Description |
| --- | --- |
| `mcc` |  |
| `mnc` |  |
| `name` |  |

Operations: Load.

API path: `/{ip}/carrier`

#### Company

| Field | Description |
| --- | --- |
| `domain` |  |
| `name` |  |
| `type` |  |

Operations: Load.

API path: `/{ip}/company`

#### Core

| Field | Description |
| --- | --- |
| `as` |  |
| `geo` |  |
| `hostname` |  |
| `ip` |  |
| `is_anonymous` |  |
| `is_anycast` |  |
| `is_hosting` |  |
| `is_mobile` |  |
| `is_satellite` |  |

Operations: Load.

API path: `/lookup/{ip}`

#### Domain

| Field | Description |
| --- | --- |
| `domain` |  |
| `ip` |  |
| `page` |  |
| `total` |  |

Operations: Load.

API path: `/domains/{ip}`

#### General

| Field | Description |
| --- | --- |
| `8_8_8_8` |  |
| `8_8_8_8city` |  |
| `summary` |  |
| `value` |  |

Operations: Create.

API path: `/tools/map`

#### GetCurrentInformation

| Field | Description |
| --- | --- |
| `asn` |  |
| `bogon` |  |
| `carrier` |  |
| `city` |  |
| `company` |  |
| `country` |  |
| `domain` |  |
| `hostname` |  |
| `ip` |  |
| `loc` |  |
| `org` |  |
| `postal` |  |
| `privacy` |  |
| `region` |  |
| `timezone` |  |

Operations: Load.

API path: `/`

#### GetInformationByIp

| Field | Description |
| --- | --- |
| `asn` |  |
| `bogon` |  |
| `carrier` |  |
| `city` |  |
| `company` |  |
| `country` |  |
| `domain` |  |
| `hostname` |  |
| `ip` |  |
| `loc` |  |
| `org` |  |
| `postal` |  |
| `privacy` |  |
| `region` |  |
| `timezone` |  |

Operations: Load.

API path: `/{ip}`

#### IpinfoCore

| Field | Description |
| --- | --- |
| `city` |  |
| `key` |  |
| `region` |  |

Operations: Load.

API path: `/lookup/{ip}/{field}`

#### IpinfoLite

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/lite/{ip}/{field}`

#### IpinfoPlus

| Field | Description |
| --- | --- |
| `city` |  |
| `key` |  |
| `region` |  |

Operations: Load.

API path: `/plus/{ip}/{field}`

#### Lite

| Field | Description |
| --- | --- |
| `as_domain` |  |
| `as_name` |  |
| `asn` |  |
| `continent` |  |
| `continent_code` |  |
| `country` |  |
| `country_code` |  |
| `ip` |  |

Operations: Load.

API path: `/lite/me`

#### Max

| Field | Description |
| --- | --- |
| `anonymous` |  |
| `as` |  |
| `geo` |  |
| `hostname` |  |
| `ip` |  |
| `is_anonymous` |  |
| `is_anycast` |  |
| `is_hosting` |  |
| `is_mobile` |  |
| `is_satellite` |  |
| `mobile` |  |

Operations: Load.

API path: `/max/{ip}`

#### Men

| Field | Description |
| --- | --- |
| `feature` |  |
| `request` |  |
| `token` |  |

Operations: Load.

API path: `/me`

#### Place

| Field | Description |
| --- | --- |
| `category` |  |
| `ip` |  |
| `latitude` |  |
| `longitude` |  |
| `name` |  |
| `ssid` |  |

Operations: Load.

API path: `/places/{ip}`

#### Plus

| Field | Description |
| --- | --- |
| `anonymous` |  |
| `as` |  |
| `geo` |  |
| `ip` |  |
| `is_anonymous` |  |
| `is_anycast` |  |
| `is_hosting` |  |
| `is_mobile` |  |
| `is_satellite` |  |
| `mobile` |  |

Operations: Load.

API path: `/plus/{ip}`

#### Privacy

| Field | Description |
| --- | --- |
| `hosting` |  |
| `proxy` |  |
| `relay` |  |
| `service` |  |
| `tor` |  |
| `vpn` |  |

Operations: Load.

API path: `/{ip}/privacy`

#### PrivacyExtended

| Field | Description |
| --- | --- |
| `census` |  |
| `census_port` |  |
| `confidence` |  |
| `coverage` |  |
| `device_activity` |  |
| `first_seen` |  |
| `hosting` |  |
| `inferred` |  |
| `last_seen` |  |
| `proxy` |  |
| `relay` |  |
| `service` |  |
| `tor` |  |
| `vpn` |  |
| `vpn_config` |  |
| `whoi` |  |

Operations: List.

API path: `/{ip}/privacy_extended`

#### Range

| Field | Description |
| --- | --- |
| `domain` |  |
| `num_range` |  |
| `range` |  |
| `redirects_to` |  |

Operations: Load.

API path: `/ranges/{domain}`

#### ResidentialProxy

| Field | Description |
| --- | --- |
| `ip` |  |
| `last_seen` |  |
| `percent_days_seen` |  |
| `service` |  |

Operations: Load.

API path: `/{ip}/resproxy`

#### Single

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/{ip}/city`

#### WhoisAsn

| Field | Description |
| --- | --- |
| `abuse` |  |
| `admin` |  |
| `country` |  |
| `id` |  |
| `maintainer` |  |
| `name` |  |
| `org` |  |
| `range` |  |
| `raw` |  |
| `source` |  |
| `status` |  |
| `tech` |  |
| `updated` |  |

Operations: List.

API path: `/whois/net/AS{asn}`

#### WhoisDomain

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{domain}`

#### WhoisIp

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{whoisip}`

#### WhoisNetId

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{whoisnetid}`

#### WhoisOrg

| Field | Description |
| --- | --- |
| `org` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/org/{whoisorgid}`

#### WhoisPoc

| Field | Description |
| --- | --- |
| `page` |  |
| `poc` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/poc/{whoispoc}`



## Entities


### Abuse

Create an instance: `$abuse = $client->Abuse();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `country` | `string` |  |
| `email` | `string` |  |
| `name` | `string` |  |
| `network` | `string` |  |
| `phone` | `string` |  |

#### Example: Load

```php
// load() returns the bare Abuse record (throws on error).
$abuse = $client->Abuse()->load();
```


### Asn

Create an instance: `$asn = $client->Asn();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocated` | `string` |  |
| `asn` | `string` |  |
| `country` | `string` |  |
| `domain` | `string` |  |
| `downstream` | `array` |  |
| `name` | `string` |  |
| `num_ip` | `int` |  |
| `peer` | `array` |  |
| `prefix` | `array` |  |
| `prefixes6` | `array` |  |
| `registry` | `string` |  |
| `route` | `string` |  |
| `type` | `string` |  |
| `upstream` | `array` |  |

#### Example: List

```php
// list() returns an array of Asn records (throws on error).
$asns = $client->Asn()->list();
```


### Carrier

Create an instance: `$carrier = $client->Carrier();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `mcc` | `string` |  |
| `mnc` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Carrier record (throws on error).
$carrier = $client->Carrier()->load();
```


### Company

Create an instance: `$company = $client->Company();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Company record (throws on error).
$company = $client->Company()->load();
```


### Core

Create an instance: `$core = $client->Core();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as` | `array` |  |
| `geo` | `array` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Core record (throws on error).
$core = $client->Core()->load();
```


### Domain

Create an instance: `$domain = $client->Domain();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `array` |  |
| `ip` | `string` |  |
| `page` | `int` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare Domain record (throws on error).
$domain = $client->Domain()->load(["id" => "domain_id"]);
```


### General

Create an instance: `$general = $client->General();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `8_8_8_8` | `array` |  |
| `8_8_8_8city` | `string` |  |
| `summary` | `string` |  |
| `value` | `array` |  |

#### Example: Create

```php
$general = $client->General()->create([
]);
```


### GetCurrentInformation

Create an instance: `$get_current_information = $client->GetCurrentInformation();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `array` |  |
| `bogon` | `bool` |  |
| `carrier` | `array` |  |
| `city` | `string` |  |
| `company` | `array` |  |
| `country` | `string` |  |
| `domain` | `array` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `loc` | `string` |  |
| `org` | `string` |  |
| `postal` | `string` |  |
| `privacy` | `array` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```php
// load() returns the bare GetCurrentInformation record (throws on error).
$get_current_information = $client->GetCurrentInformation()->load();
```


### GetInformationByIp

Create an instance: `$get_information_by_ip = $client->GetInformationByIp();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `array` |  |
| `bogon` | `bool` |  |
| `carrier` | `array` |  |
| `city` | `string` |  |
| `company` | `array` |  |
| `country` | `string` |  |
| `domain` | `array` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `loc` | `string` |  |
| `org` | `string` |  |
| `postal` | `string` |  |
| `privacy` | `array` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```php
// load() returns the bare GetInformationByIp record (throws on error).
$get_information_by_ip = $client->GetInformationByIp()->load(["id" => "get_information_by_ip_id"]);
```


### IpinfoCore

Create an instance: `$ipinfo_core = $client->IpinfoCore();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `key` | `string` |  |
| `region` | `string` |  |

#### Example: Load

```php
// load() returns the bare IpinfoCore record (throws on error).
$ipinfo_core = $client->IpinfoCore()->load();
```


### IpinfoLite

Create an instance: `$ipinfo_lite = $client->IpinfoLite();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare IpinfoLite record (throws on error).
$ipinfo_lite = $client->IpinfoLite()->load(["id" => "ipinfo_lite_id"]);
```


### IpinfoPlus

Create an instance: `$ipinfo_plus = $client->IpinfoPlus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `key` | `string` |  |
| `region` | `string` |  |

#### Example: Load

```php
// load() returns the bare IpinfoPlus record (throws on error).
$ipinfo_plus = $client->IpinfoPlus()->load();
```


### Lite

Create an instance: `$lite = $client->Lite();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_domain` | `string` |  |
| `as_name` | `string` |  |
| `asn` | `string` |  |
| `continent` | `string` |  |
| `continent_code` | `string` |  |
| `country` | `string` |  |
| `country_code` | `string` |  |
| `ip` | `string` |  |

#### Example: Load

```php
// load() returns the bare Lite record (throws on error).
$lite = $client->Lite()->load();
```


### Max

Create an instance: `$max = $client->Max();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `array` |  |
| `as` | `array` |  |
| `geo` | `array` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |
| `mobile` | `array` |  |

#### Example: Load

```php
// load() returns the bare Max record (throws on error).
$max = $client->Max()->load(["id" => "max_id"]);
```


### Men

Create an instance: `$men = $client->Men();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `feature` | `array` |  |
| `request` | `array` |  |
| `token` | `string` |  |

#### Example: Load

```php
// load() returns the bare Men record (throws on error).
$men = $client->Men()->load();
```


### Place

Create an instance: `$place = $client->Place();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `ip` | `string` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `name` | `string` |  |
| `ssid` | `string` |  |

#### Example: Load

```php
// load() returns the bare Place record (throws on error).
$place = $client->Place()->load(["id" => "place_id"]);
```


### Plus

Create an instance: `$plus = $client->Plus();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `array` |  |
| `as` | `array` |  |
| `geo` | `array` |  |
| `ip` | `string` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |
| `mobile` | `array` |  |

#### Example: Load

```php
// load() returns the bare Plus record (throws on error).
$plus = $client->Plus()->load(["id" => "plus_id"]);
```


### Privacy

Create an instance: `$privacy = $client->Privacy();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hosting` | `bool` |  |
| `proxy` | `bool` |  |
| `relay` | `bool` |  |
| `service` | `string` |  |
| `tor` | `bool` |  |
| `vpn` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Privacy record (throws on error).
$privacy = $client->Privacy()->load();
```


### PrivacyExtended

Create an instance: `$privacy_extended = $client->PrivacyExtended();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `census` | `bool` |  |
| `census_port` | `array` |  |
| `confidence` | `int` |  |
| `coverage` | `float` |  |
| `device_activity` | `bool` |  |
| `first_seen` | `string` |  |
| `hosting` | `bool` |  |
| `inferred` | `bool` |  |
| `last_seen` | `string` |  |
| `proxy` | `bool` |  |
| `relay` | `bool` |  |
| `service` | `string` |  |
| `tor` | `bool` |  |
| `vpn` | `bool` |  |
| `vpn_config` | `bool` |  |
| `whoi` | `bool` |  |

#### Example: List

```php
// list() returns an array of PrivacyExtended records (throws on error).
$privacy_extendeds = $client->PrivacyExtended()->list();
```


### Range

Create an instance: `$range = $client->Range();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `num_range` | `string` |  |
| `range` | `array` |  |
| `redirects_to` | `string` |  |

#### Example: Load

```php
// load() returns the bare Range record (throws on error).
$range = $client->Range()->load(["id" => "range_id"]);
```


### ResidentialProxy

Create an instance: `$residential_proxy = $client->ResidentialProxy();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ip` | `string` |  |
| `last_seen` | `string` |  |
| `percent_days_seen` | `int` |  |
| `service` | `string` |  |

#### Example: Load

```php
// load() returns the bare ResidentialProxy record (throws on error).
$residential_proxy = $client->ResidentialProxy()->load();
```


### Single

Create an instance: `$single = $client->Single();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Single record (throws on error).
$single = $client->Single()->load();
```


### WhoisAsn

Create an instance: `$whois_asn = $client->WhoisAsn();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abuse` | `string` |  |
| `admin` | `string` |  |
| `country` | `string` |  |
| `id` | `string` |  |
| `maintainer` | `string` |  |
| `name` | `string` |  |
| `org` | `string` |  |
| `range` | `string` |  |
| `raw` | `string` |  |
| `source` | `string` |  |
| `status` | `string` |  |
| `tech` | `string` |  |
| `updated` | `string` |  |

#### Example: List

```php
// list() returns an array of WhoisAsn records (throws on error).
$whois_asns = $client->WhoisAsn()->list();
```


### WhoisDomain

Create an instance: `$whois_domain = $client->WhoisDomain();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `int` |  |
| `record` | `array` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare WhoisDomain record (throws on error).
$whois_domain = $client->WhoisDomain()->load();
```


### WhoisIp

Create an instance: `$whois_ip = $client->WhoisIp();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `int` |  |
| `record` | `array` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare WhoisIp record (throws on error).
$whois_ip = $client->WhoisIp()->load();
```


### WhoisNetId

Create an instance: `$whois_net_id = $client->WhoisNetId();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `int` |  |
| `record` | `array` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare WhoisNetId record (throws on error).
$whois_net_id = $client->WhoisNetId()->load();
```


### WhoisOrg

Create an instance: `$whois_org = $client->WhoisOrg();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `org` | `string` |  |
| `page` | `int` |  |
| `record` | `array` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare WhoisOrg record (throws on error).
$whois_org = $client->WhoisOrg()->load(["id" => "whois_org_id"]);
```


### WhoisPoc

Create an instance: `$whois_poc = $client->WhoisPoc();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page` | `int` |  |
| `poc` | `string` |  |
| `record` | `array` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare WhoisPoc record (throws on error).
$whois_poc = $client->WhoisPoc()->load(["id" => "whois_poc_id"]);
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── ipinfodeveloper_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`ipinfodeveloper_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$abuse = $client->Abuse();
$abuse->load();

// $abuse->data_get() now returns the abuse data from the last load
// $abuse->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
