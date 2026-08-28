# IpinfoDeveloper PHP SDK Reference

Complete API reference for the IpinfoDeveloper PHP SDK.


## IpinfoDeveloperSDK

### Constructor

```php
require_once __DIR__ . '/ipinfodeveloper_sdk.php';

$client = new IpinfoDeveloperSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpinfoDeveloperSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IpinfoDeveloperSDK::test();
```


### Instance Methods

#### `Abuse($data = null)`

Create a new `AbuseEntity` instance. Pass `null` for no initial data.

#### `Asn($data = null)`

Create a new `AsnEntity` instance. Pass `null` for no initial data.

#### `Carrier($data = null)`

Create a new `CarrierEntity` instance. Pass `null` for no initial data.

#### `Company($data = null)`

Create a new `CompanyEntity` instance. Pass `null` for no initial data.

#### `Core($data = null)`

Create a new `CoreEntity` instance. Pass `null` for no initial data.

#### `Domain($data = null)`

Create a new `DomainEntity` instance. Pass `null` for no initial data.

#### `General($data = null)`

Create a new `GeneralEntity` instance. Pass `null` for no initial data.

#### `GetCurrentInformation($data = null)`

Create a new `GetCurrentInformationEntity` instance. Pass `null` for no initial data.

#### `GetInformationByIp($data = null)`

Create a new `GetInformationByIpEntity` instance. Pass `null` for no initial data.

#### `IpinfoCore($data = null)`

Create a new `IpinfoCoreEntity` instance. Pass `null` for no initial data.

#### `IpinfoLite($data = null)`

Create a new `IpinfoLiteEntity` instance. Pass `null` for no initial data.

#### `IpinfoPlus($data = null)`

Create a new `IpinfoPlusEntity` instance. Pass `null` for no initial data.

#### `Lite($data = null)`

Create a new `LiteEntity` instance. Pass `null` for no initial data.

#### `Max($data = null)`

Create a new `MaxEntity` instance. Pass `null` for no initial data.

#### `Men($data = null)`

Create a new `MenEntity` instance. Pass `null` for no initial data.

#### `Place($data = null)`

Create a new `PlaceEntity` instance. Pass `null` for no initial data.

#### `Plus($data = null)`

Create a new `PlusEntity` instance. Pass `null` for no initial data.

#### `Privacy($data = null)`

Create a new `PrivacyEntity` instance. Pass `null` for no initial data.

#### `PrivacyExtended($data = null)`

Create a new `PrivacyExtendedEntity` instance. Pass `null` for no initial data.

#### `Range($data = null)`

Create a new `RangeEntity` instance. Pass `null` for no initial data.

#### `ResidentialProxy($data = null)`

Create a new `ResidentialProxyEntity` instance. Pass `null` for no initial data.

#### `Single($data = null)`

Create a new `SingleEntity` instance. Pass `null` for no initial data.

#### `WhoisAsn($data = null)`

Create a new `WhoisAsnEntity` instance. Pass `null` for no initial data.

#### `WhoisDomain($data = null)`

Create a new `WhoisDomainEntity` instance. Pass `null` for no initial data.

#### `WhoisIp($data = null)`

Create a new `WhoisIpEntity` instance. Pass `null` for no initial data.

#### `WhoisNetId($data = null)`

Create a new `WhoisNetIdEntity` instance. Pass `null` for no initial data.

#### `WhoisOrg($data = null)`

Create a new `WhoisOrgEntity` instance. Pass `null` for no initial data.

#### `WhoisPoc($data = null)`

Create a new `WhoisPocEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): IpinfoDeveloperUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AbuseEntity

```php
$abuse = $client->Abuse();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `country` | `string` | No |  |
| `email` | `string` | No |  |
| `name` | `string` | No |  |
| `network` | `string` | No |  |
| `phone` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Abuse()->load(["ip" => "ip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AbuseEntity`

Create a new `AbuseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AsnEntity

```php
$asn = $client->Asn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocated` | `string` | No |  |
| `asn` | `string` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `downstreams` | `array` | No |  |
| `name` | `string` | Yes |  |
| `num_ips` | `int` | No |  |
| `peers` | `array` | No |  |
| `prefixes` | `array` | No |  |
| `prefixes6` | `array` | No |  |
| `registry` | `string` | No |  |
| `route` | `string` | No |  |
| `type` | `string` | Yes |  |
| `upstreams` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Asn()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AsnEntity`

Create a new `AsnEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CarrierEntity

```php
$carrier = $client->Carrier();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mcc` | `string` | Yes |  |
| `mnc` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Carrier()->load(["ip" => "ip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CarrierEntity`

Create a new `CarrierEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CompanyEntity

```php
$company = $client->Company();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Company()->load(["ip" => "ip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CompanyEntity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CoreEntity

```php
$core = $client->Core();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as` | `array` | No |  |
| `geo` | `array` | No |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Core()->load(["ip" => "ip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CoreEntity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainEntity

```php
$domain = $client->Domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domains` | `array` | No |  |
| `id` | `string` | No |  |
| `ip` | `string` | No |  |
| `page` | `int` | No |  |
| `total` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Domain()->load(["id" => "domain_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainEntity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GeneralEntity

```php
$general = $client->General();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `8_8_8_8` | `array` | No |  |
| `8_8_8_8city` | `string` | No |  |
| `summary` | `string` | No |  |
| `value` | `array` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->General()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GeneralEntity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetCurrentInformationEntity

```php
$get_current_information = $client->GetCurrentInformation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `array` | Yes |  |
| `bogon` | `bool` | No |  |
| `carrier` | `array` | Yes |  |
| `city` | `string` | No |  |
| `company` | `array` | Yes |  |
| `country` | `string` | No |  |
| `domains` | `array` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `array` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetCurrentInformation()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetCurrentInformationEntity`

Create a new `GetCurrentInformationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetInformationByIpEntity

```php
$get_information_by_ip = $client->GetInformationByIp();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `array` | Yes |  |
| `bogon` | `bool` | No |  |
| `carrier` | `array` | Yes |  |
| `city` | `string` | No |  |
| `company` | `array` | Yes |  |
| `country` | `string` | No |  |
| `domains` | `array` | Yes |  |
| `hostname` | `string` | No |  |
| `id` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `array` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetInformationByIp()->load(["id" => "get_information_by_ip_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetInformationByIpEntity`

Create a new `GetInformationByIpEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IpinfoCoreEntity

```php
$ipinfo_core = $client->IpinfoCore();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IpinfoCore()->load(["field" => "field"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IpinfoCoreEntity`

Create a new `IpinfoCoreEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IpinfoLiteEntity

```php
$ipinfo_lite = $client->IpinfoLite();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IpinfoLite()->load(["id" => "ipinfo_lite_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IpinfoLiteEntity`

Create a new `IpinfoLiteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## IpinfoPlusEntity

```php
$ipinfo_plus = $client->IpinfoPlus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->IpinfoPlus()->load(["field" => "field"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): IpinfoPlusEntity`

Create a new `IpinfoPlusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LiteEntity

```php
$lite = $client->Lite();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_domain` | `string` | Yes |  |
| `as_name` | `string` | Yes |  |
| `asn` | `string` | Yes |  |
| `continent` | `string` | Yes |  |
| `continent_code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `country_code` | `string` | Yes |  |
| `ip` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Lite()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LiteEntity`

Create a new `LiteEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MaxEntity

```php
$max = $client->Max();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `array` | Yes |  |
| `as` | `array` | Yes |  |
| `geo` | `array` | Yes |  |
| `hostname` | `string` | No |  |
| `id` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |
| `mobile` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Max()->load(["id" => "max_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MaxEntity`

Create a new `MaxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MenEntity

```php
$men = $client->Men();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `features` | `array` | Yes |  |
| `requests` | `array` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Men()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MenEntity`

Create a new `MenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlaceEntity

```php
$place = $client->Place();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes |  |
| `id` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `latitude` | `float` | Yes |  |
| `longitude` | `float` | Yes |  |
| `name` | `string` | Yes |  |
| `ssid` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Place()->load(["id" => "place_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlaceEntity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlusEntity

```php
$plus = $client->Plus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `array` | No |  |
| `as` | `array` | No |  |
| `geo` | `array` | No |  |
| `id` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |
| `mobile` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Plus()->load(["id" => "plus_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlusEntity`

Create a new `PlusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PrivacyEntity

```php
$privacy = $client->Privacy();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hosting` | `bool` | Yes |  |
| `proxy` | `bool` | Yes |  |
| `relay` | `bool` | Yes |  |
| `service` | `string` | Yes |  |
| `tor` | `bool` | Yes |  |
| `vpn` | `bool` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Privacy()->load(["ip" => "ip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PrivacyEntity`

Create a new `PrivacyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PrivacyExtendedEntity

```php
$privacy_extended = $client->PrivacyExtended();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `census` | `bool` | No | Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software. |
| `census_ports` | `array` | No | The ports we've gotten positive results for when running our VPN detection census |
| `confidence` | `int` | No | The level of confidence attributed to the best source associated with this range. |
| `coverage` | `float` | No | For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on. |
| `device_activity` | `bool` | No | Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers) |
| `first_seen` | `string` | No | Date when the activity on an anonymous IP address was first observed. |
| `hosting` | `bool` | Yes | Indicates a hosting/cloud service/data center IP address |
| `inferred` | `bool` | No | Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs |
| `last_seen` | `string` | No | Date when the activity on an anonymous IP address was last/recently observed. |
| `proxy` | `bool` | Yes | Indicates an open web proxy IP address |
| `relay` | `bool` | Yes | Indicates a location-preserving anonymous relay service |
| `service` | `string` | Yes | Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names |
| `tor` | `bool` | Yes | Indicates a Tor (The Onion Router) exit node IP address |
| `vpn` | `bool` | Yes | Indicates Virtual Private Network (VPN) service exit node IP address |
| `vpn_config` | `bool` | No | Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs |
| `whois` | `bool` | No | Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PrivacyExtended()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PrivacyExtendedEntity`

Create a new `PrivacyExtendedEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RangeEntity

```php
$range = $client->Range();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `id` | `string` | No |  |
| `num_ranges` | `string` | Yes |  |
| `ranges` | `array` | Yes |  |
| `redirects_to` | `string` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Range()->load(["id" => "range_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RangeEntity`

Create a new `RangeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResidentialProxyEntity

```php
$residential_proxy = $client->ResidentialProxy();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `string` | Yes | The IPv4 or IPv6 address associated with a residential proxy |
| `last_seen` | `string` | Yes | The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC) |
| `percent_days_seen` | `int` | Yes | The percentage of days the IP was active in the last 7-day period |
| `service` | `string` | Yes | The name of the residential proxy service. |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ResidentialProxy()->load(["ip" => "ip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResidentialProxyEntity`

Create a new `ResidentialProxyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SingleEntity

```php
$single = $client->Single();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Single()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SingleEntity`

Create a new `SingleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WhoisAsnEntity

```php
$whois_asn = $client->WhoisAsn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `string` | No |  |
| `admin` | `string` | No |  |
| `country` | `string` | No |  |
| `id` | `string` | No |  |
| `maintainer` | `string` | No |  |
| `name` | `string` | No |  |
| `org` | `string` | No |  |
| `range` | `string` | No |  |
| `raw` | `string` | No |  |
| `source` | `string` | No |  |
| `status` | `string` | No |  |
| `tech` | `string` | No |  |
| `updated` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->WhoisAsn()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoisAsnEntity`

Create a new `WhoisAsnEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WhoisDomainEntity

```php
$whois_domain = $client->WhoisDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `int` | No |  |
| `records` | `array` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WhoisDomain()->load(["domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoisDomainEntity`

Create a new `WhoisDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WhoisIpEntity

```php
$whois_ip = $client->WhoisIp();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `int` | No |  |
| `records` | `array` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WhoisIp()->load(["whoisip" => "whoisip"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoisIpEntity`

Create a new `WhoisIpEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WhoisNetIdEntity

```php
$whois_net_id = $client->WhoisNetId();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `int` | No |  |
| `records` | `array` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WhoisNetId()->load(["whoisnetid" => "whoisnetid"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoisNetIdEntity`

Create a new `WhoisNetIdEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WhoisOrgEntity

```php
$whois_org = $client->WhoisOrg();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `org` | `string` | No |  |
| `page` | `int` | No |  |
| `records` | `array` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WhoisOrg()->load(["id" => "whois_org_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoisOrgEntity`

Create a new `WhoisOrgEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WhoisPocEntity

```php
$whois_poc = $client->WhoisPoc();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `page` | `int` | No |  |
| `poc` | `string` | No |  |
| `records` | `array` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WhoisPoc()->load(["id" => "whois_poc_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoisPocEntity`

Create a new `WhoisPocEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new IpinfoDeveloperSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

