# IpinfoDeveloper PHP SDK Reference

Complete API reference for the IpinfoDeveloper PHP SDK.


## IpinfoDeveloperSDK

### Constructor

```php
require_once __DIR__ . '/ipinfo-developer_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$abuse = $client->abuse();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | ``$STRING`` | No |  |
| `country` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `network` | ``$STRING`` | No |  |
| `phone` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->abuse()->load(["id" => "abuse_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AbuseEntity`

Create a new `AbuseEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AsnEntity

```php
$asn = $client->asn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocated` | ``$STRING`` | No |  |
| `asn` | ``$STRING`` | Yes |  |
| `country` | ``$STRING`` | No |  |
| `domain` | ``$STRING`` | Yes |  |
| `downstream` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `num_ip` | ``$INTEGER`` | No |  |
| `peer` | ``$ARRAY`` | No |  |
| `prefix` | ``$ARRAY`` | No |  |
| `prefixes6` | ``$ARRAY`` | No |  |
| `registry` | ``$STRING`` | No |  |
| `route` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | Yes |  |
| `upstream` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->asn()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AsnEntity`

Create a new `AsnEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CarrierEntity

```php
$carrier = $client->carrier();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mcc` | ``$STRING`` | Yes |  |
| `mnc` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->carrier()->load(["id" => "carrier_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CarrierEntity`

Create a new `CarrierEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CompanyEntity

```php
$company = $client->company();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `type` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->company()->load(["id" => "company_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CompanyEntity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CoreEntity

```php
$core = $client->core();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as` | ``$OBJECT`` | No |  |
| `geo` | ``$OBJECT`` | No |  |
| `hostname` | ``$STRING`` | No |  |
| `ip` | ``$STRING`` | Yes |  |
| `is_anonymous` | ``$BOOLEAN`` | No |  |
| `is_anycast` | ``$BOOLEAN`` | No |  |
| `is_hosting` | ``$BOOLEAN`` | No |  |
| `is_mobile` | ``$BOOLEAN`` | No |  |
| `is_satellite` | ``$BOOLEAN`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->core()->load(["id" => "core_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CoreEntity`

Create a new `CoreEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DomainEntity

```php
$domain = $client->domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$ARRAY`` | No |  |
| `ip` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `total` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->domain()->load(["id" => "domain_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DomainEntity`

Create a new `DomainEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GeneralEntity

```php
$general = $client->general();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `8_8_8_8` | ``$OBJECT`` | No |  |
| `8_8_8_8city` | ``$STRING`` | No |  |
| `summary` | ``$STRING`` | No |  |
| `value` | ``$OBJECT`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->general()->create([
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GeneralEntity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetCurrentInformationEntity

```php
$get_current_information = $client->get_current_information();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | ``$OBJECT`` | Yes |  |
| `bogon` | ``$BOOLEAN`` | No |  |
| `carrier` | ``$OBJECT`` | Yes |  |
| `city` | ``$STRING`` | No |  |
| `company` | ``$OBJECT`` | Yes |  |
| `country` | ``$STRING`` | No |  |
| `domain` | ``$OBJECT`` | Yes |  |
| `hostname` | ``$STRING`` | No |  |
| `ip` | ``$STRING`` | Yes |  |
| `loc` | ``$STRING`` | No |  |
| `org` | ``$STRING`` | No |  |
| `postal` | ``$STRING`` | No |  |
| `privacy` | ``$OBJECT`` | Yes |  |
| `region` | ``$STRING`` | No |  |
| `timezone` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->get_current_information()->load(["id" => "get_current_information_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetCurrentInformationEntity`

Create a new `GetCurrentInformationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetInformationByIpEntity

```php
$get_information_by_ip = $client->get_information_by_ip();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | ``$OBJECT`` | Yes |  |
| `bogon` | ``$BOOLEAN`` | No |  |
| `carrier` | ``$OBJECT`` | Yes |  |
| `city` | ``$STRING`` | No |  |
| `company` | ``$OBJECT`` | Yes |  |
| `country` | ``$STRING`` | No |  |
| `domain` | ``$OBJECT`` | Yes |  |
| `hostname` | ``$STRING`` | No |  |
| `ip` | ``$STRING`` | Yes |  |
| `loc` | ``$STRING`` | No |  |
| `org` | ``$STRING`` | No |  |
| `postal` | ``$STRING`` | No |  |
| `privacy` | ``$OBJECT`` | Yes |  |
| `region` | ``$STRING`` | No |  |
| `timezone` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->get_information_by_ip()->load(["id" => "get_information_by_ip_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetInformationByIpEntity`

Create a new `GetInformationByIpEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IpinfoCoreEntity

```php
$ipinfo_core = $client->ipinfo_core();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ipinfo_core()->load(["id" => "ipinfo_core_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IpinfoCoreEntity`

Create a new `IpinfoCoreEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IpinfoLiteEntity

```php
$ipinfo_lite = $client->ipinfo_lite();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ipinfo_lite()->load(["id" => "ipinfo_lite_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IpinfoLiteEntity`

Create a new `IpinfoLiteEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## IpinfoPlusEntity

```php
$ipinfo_plus = $client->ipinfo_plus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ipinfo_plus()->load(["id" => "ipinfo_plus_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): IpinfoPlusEntity`

Create a new `IpinfoPlusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LiteEntity

```php
$lite = $client->lite();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_domain` | ``$STRING`` | Yes |  |
| `as_name` | ``$STRING`` | Yes |  |
| `asn` | ``$STRING`` | Yes |  |
| `continent` | ``$STRING`` | Yes |  |
| `continent_code` | ``$STRING`` | Yes |  |
| `country` | ``$STRING`` | Yes |  |
| `country_code` | ``$STRING`` | Yes |  |
| `ip` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->lite()->load(["id" => "lite_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LiteEntity`

Create a new `LiteEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MaxEntity

```php
$max = $client->max();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | ``$OBJECT`` | Yes |  |
| `as` | ``$OBJECT`` | Yes |  |
| `geo` | ``$OBJECT`` | Yes |  |
| `hostname` | ``$STRING`` | No |  |
| `ip` | ``$STRING`` | Yes |  |
| `is_anonymous` | ``$BOOLEAN`` | No |  |
| `is_anycast` | ``$BOOLEAN`` | No |  |
| `is_hosting` | ``$BOOLEAN`` | No |  |
| `is_mobile` | ``$BOOLEAN`` | No |  |
| `is_satellite` | ``$BOOLEAN`` | No |  |
| `mobile` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->max()->load(["id" => "max_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MaxEntity`

Create a new `MaxEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MenEntity

```php
$men = $client->men();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | ``$OBJECT`` | Yes |  |
| `request` | ``$OBJECT`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->men()->load(["id" => "men_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MenEntity`

Create a new `MenEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlaceEntity

```php
$place = $client->place();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | ``$STRING`` | Yes |  |
| `ip` | ``$STRING`` | Yes |  |
| `latitude` | ``$NUMBER`` | Yes |  |
| `longitude` | ``$NUMBER`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `ssid` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->place()->load(["id" => "place_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlaceEntity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlusEntity

```php
$plus = $client->plus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | ``$OBJECT`` | No |  |
| `as` | ``$OBJECT`` | No |  |
| `geo` | ``$OBJECT`` | No |  |
| `ip` | ``$STRING`` | Yes |  |
| `is_anonymous` | ``$BOOLEAN`` | No |  |
| `is_anycast` | ``$BOOLEAN`` | No |  |
| `is_hosting` | ``$BOOLEAN`` | No |  |
| `is_mobile` | ``$BOOLEAN`` | No |  |
| `is_satellite` | ``$BOOLEAN`` | No |  |
| `mobile` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->plus()->load(["id" => "plus_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlusEntity`

Create a new `PlusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PrivacyEntity

```php
$privacy = $client->privacy();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hosting` | ``$BOOLEAN`` | Yes |  |
| `proxy` | ``$BOOLEAN`` | Yes |  |
| `relay` | ``$BOOLEAN`` | Yes |  |
| `service` | ``$STRING`` | Yes |  |
| `tor` | ``$BOOLEAN`` | Yes |  |
| `vpn` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->privacy()->load(["id" => "privacy_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PrivacyEntity`

Create a new `PrivacyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PrivacyExtendedEntity

```php
$privacy_extended = $client->privacy_extended();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `census` | ``$BOOLEAN`` | No |  |
| `census_port` | ``$ARRAY`` | No |  |
| `confidence` | ``$INTEGER`` | No |  |
| `coverage` | ``$NUMBER`` | No |  |
| `device_activity` | ``$BOOLEAN`` | No |  |
| `first_seen` | ``$STRING`` | No |  |
| `hosting` | ``$BOOLEAN`` | Yes |  |
| `inferred` | ``$BOOLEAN`` | No |  |
| `last_seen` | ``$STRING`` | No |  |
| `proxy` | ``$BOOLEAN`` | Yes |  |
| `relay` | ``$BOOLEAN`` | Yes |  |
| `service` | ``$STRING`` | Yes |  |
| `tor` | ``$BOOLEAN`` | Yes |  |
| `vpn` | ``$BOOLEAN`` | Yes |  |
| `vpn_config` | ``$BOOLEAN`` | No |  |
| `whoi` | ``$BOOLEAN`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->privacy_extended()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PrivacyExtendedEntity`

Create a new `PrivacyExtendedEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RangeEntity

```php
$range = $client->range();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | Yes |  |
| `num_range` | ``$STRING`` | Yes |  |
| `range` | ``$ARRAY`` | Yes |  |
| `redirects_to` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->range()->load(["id" => "range_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RangeEntity`

Create a new `RangeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ResidentialProxyEntity

```php
$residential_proxy = $client->residential_proxy();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | ``$STRING`` | Yes |  |
| `last_seen` | ``$STRING`` | Yes |  |
| `percent_days_seen` | ``$INTEGER`` | Yes |  |
| `service` | ``$STRING`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->residential_proxy()->load(["id" => "residential_proxy_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ResidentialProxyEntity`

Create a new `ResidentialProxyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SingleEntity

```php
$single = $client->single();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->single()->load(["id" => "single_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SingleEntity`

Create a new `SingleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WhoisAsnEntity

```php
$whois_asn = $client->whois_asn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | ``$STRING`` | No |  |
| `admin` | ``$STRING`` | No |  |
| `country` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `maintainer` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `org` | ``$STRING`` | No |  |
| `range` | ``$STRING`` | No |  |
| `raw` | ``$STRING`` | No |  |
| `source` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `tech` | ``$STRING`` | No |  |
| `updated` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->whois_asn()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WhoisAsnEntity`

Create a new `WhoisAsnEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WhoisDomainEntity

```php
$whois_domain = $client->whois_domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->whois_domain()->load(["id" => "whois_domain_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WhoisDomainEntity`

Create a new `WhoisDomainEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WhoisIpEntity

```php
$whois_ip = $client->whois_ip();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->whois_ip()->load(["id" => "whois_ip_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WhoisIpEntity`

Create a new `WhoisIpEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WhoisNetIdEntity

```php
$whois_net_id = $client->whois_net_id();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->whois_net_id()->load(["id" => "whois_net_id_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WhoisNetIdEntity`

Create a new `WhoisNetIdEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WhoisOrgEntity

```php
$whois_org = $client->whois_org();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `org` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->whois_org()->load(["id" => "whois_org_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WhoisOrgEntity`

Create a new `WhoisOrgEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## WhoisPocEntity

```php
$whois_poc = $client->whois_poc();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | ``$INTEGER`` | No |  |
| `poc` | ``$STRING`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->whois_poc()->load(["id" => "whois_poc_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): WhoisPocEntity`

Create a new `WhoisPocEntity` instance with the same client and
options.

#### `getName(): string`

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

