# IpinfoDeveloper Ruby SDK Reference

Complete API reference for the IpinfoDeveloper Ruby SDK.


## IpinfoDeveloperSDK

### Constructor

```ruby
require_relative 'IpinfoDeveloper_sdk'

client = IpinfoDeveloperSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpinfoDeveloperSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IpinfoDeveloperSDK.test
```


### Instance Methods

#### `Abuse(data = nil)`

Create a new `Abuse` entity instance. Pass `nil` for no initial data.

#### `Asn(data = nil)`

Create a new `Asn` entity instance. Pass `nil` for no initial data.

#### `Carrier(data = nil)`

Create a new `Carrier` entity instance. Pass `nil` for no initial data.

#### `Company(data = nil)`

Create a new `Company` entity instance. Pass `nil` for no initial data.

#### `Core(data = nil)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Domain(data = nil)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `General(data = nil)`

Create a new `General` entity instance. Pass `nil` for no initial data.

#### `GetCurrentInformation(data = nil)`

Create a new `GetCurrentInformation` entity instance. Pass `nil` for no initial data.

#### `GetInformationByIp(data = nil)`

Create a new `GetInformationByIp` entity instance. Pass `nil` for no initial data.

#### `IpinfoCore(data = nil)`

Create a new `IpinfoCore` entity instance. Pass `nil` for no initial data.

#### `IpinfoLite(data = nil)`

Create a new `IpinfoLite` entity instance. Pass `nil` for no initial data.

#### `IpinfoPlus(data = nil)`

Create a new `IpinfoPlus` entity instance. Pass `nil` for no initial data.

#### `Lite(data = nil)`

Create a new `Lite` entity instance. Pass `nil` for no initial data.

#### `Max(data = nil)`

Create a new `Max` entity instance. Pass `nil` for no initial data.

#### `Men(data = nil)`

Create a new `Men` entity instance. Pass `nil` for no initial data.

#### `Place(data = nil)`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Plus(data = nil)`

Create a new `Plus` entity instance. Pass `nil` for no initial data.

#### `Privacy(data = nil)`

Create a new `Privacy` entity instance. Pass `nil` for no initial data.

#### `PrivacyExtended(data = nil)`

Create a new `PrivacyExtended` entity instance. Pass `nil` for no initial data.

#### `Range(data = nil)`

Create a new `Range` entity instance. Pass `nil` for no initial data.

#### `ResidentialProxy(data = nil)`

Create a new `ResidentialProxy` entity instance. Pass `nil` for no initial data.

#### `Single(data = nil)`

Create a new `Single` entity instance. Pass `nil` for no initial data.

#### `WhoisAsn(data = nil)`

Create a new `WhoisAsn` entity instance. Pass `nil` for no initial data.

#### `WhoisDomain(data = nil)`

Create a new `WhoisDomain` entity instance. Pass `nil` for no initial data.

#### `WhoisIp(data = nil)`

Create a new `WhoisIp` entity instance. Pass `nil` for no initial data.

#### `WhoisNetId(data = nil)`

Create a new `WhoisNetId` entity instance. Pass `nil` for no initial data.

#### `WhoisOrg(data = nil)`

Create a new `WhoisOrg` entity instance. Pass `nil` for no initial data.

#### `WhoisPoc(data = nil)`

Create a new `WhoisPoc` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AbuseEntity

```ruby
abuse = client.Abuse
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `String` | No |  |
| `country` | `String` | No |  |
| `email` | `String` | No |  |
| `name` | `String` | No |  |
| `network` | `String` | No |  |
| `phone` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Abuse.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AbuseEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AsnEntity

```ruby
asn = client.Asn
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocated` | `String` | No |  |
| `asn` | `String` | Yes |  |
| `country` | `String` | No |  |
| `domain` | `String` | Yes |  |
| `downstream` | `Array` | No |  |
| `name` | `String` | Yes |  |
| `num_ip` | `Integer` | No |  |
| `peer` | `Array` | No |  |
| `prefix` | `Array` | No |  |
| `prefixes6` | `Array` | No |  |
| `registry` | `String` | No |  |
| `route` | `String` | No |  |
| `type` | `String` | Yes |  |
| `upstream` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Asn.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AsnEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CarrierEntity

```ruby
carrier = client.Carrier
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mcc` | `String` | Yes |  |
| `mnc` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Carrier.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CarrierEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CompanyEntity

```ruby
company = client.Company
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `String` | Yes |  |
| `name` | `String` | Yes |  |
| `type` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Company.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CoreEntity

```ruby
core = client.Core
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as` | `Hash` | No |  |
| `geo` | `Hash` | No |  |
| `hostname` | `String` | No |  |
| `ip` | `String` | Yes |  |
| `is_anonymous` | `Boolean` | No |  |
| `is_anycast` | `Boolean` | No |  |
| `is_hosting` | `Boolean` | No |  |
| `is_mobile` | `Boolean` | No |  |
| `is_satellite` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Core.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainEntity

```ruby
domain = client.Domain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `Array` | No |  |
| `ip` | `String` | No |  |
| `page` | `Integer` | No |  |
| `total` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Domain.load({ "id" => "domain_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GeneralEntity

```ruby
general = client.General
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `8_8_8_8` | `Hash` | No |  |
| `8_8_8_8city` | `String` | No |  |
| `summary` | `String` | No |  |
| `value` | `Hash` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.General.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetCurrentInformationEntity

```ruby
get_current_information = client.GetCurrentInformation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `Hash` | Yes |  |
| `bogon` | `Boolean` | No |  |
| `carrier` | `Hash` | Yes |  |
| `city` | `String` | No |  |
| `company` | `Hash` | Yes |  |
| `country` | `String` | No |  |
| `domain` | `Hash` | Yes |  |
| `hostname` | `String` | No |  |
| `ip` | `String` | Yes |  |
| `loc` | `String` | No |  |
| `org` | `String` | No |  |
| `postal` | `String` | No |  |
| `privacy` | `Hash` | Yes |  |
| `region` | `String` | No |  |
| `timezone` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetCurrentInformation.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetCurrentInformationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetInformationByIpEntity

```ruby
get_information_by_ip = client.GetInformationByIp
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `Hash` | Yes |  |
| `bogon` | `Boolean` | No |  |
| `carrier` | `Hash` | Yes |  |
| `city` | `String` | No |  |
| `company` | `Hash` | Yes |  |
| `country` | `String` | No |  |
| `domain` | `Hash` | Yes |  |
| `hostname` | `String` | No |  |
| `ip` | `String` | Yes |  |
| `loc` | `String` | No |  |
| `org` | `String` | No |  |
| `postal` | `String` | No |  |
| `privacy` | `Hash` | Yes |  |
| `region` | `String` | No |  |
| `timezone` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.GetInformationByIp.load({ "id" => "get_information_by_ip_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetInformationByIpEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IpinfoCoreEntity

```ruby
ipinfo_core = client.IpinfoCore
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | No |  |
| `key` | `String` | No |  |
| `region` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IpinfoCore.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IpinfoCoreEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IpinfoLiteEntity

```ruby
ipinfo_lite = client.IpinfoLite
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IpinfoLite.load({ "id" => "ipinfo_lite_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IpinfoLiteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## IpinfoPlusEntity

```ruby
ipinfo_plus = client.IpinfoPlus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | No |  |
| `key` | `String` | No |  |
| `region` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.IpinfoPlus.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `IpinfoPlusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LiteEntity

```ruby
lite = client.Lite
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_domain` | `String` | Yes |  |
| `as_name` | `String` | Yes |  |
| `asn` | `String` | Yes |  |
| `continent` | `String` | Yes |  |
| `continent_code` | `String` | Yes |  |
| `country` | `String` | Yes |  |
| `country_code` | `String` | Yes |  |
| `ip` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Lite.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LiteEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MaxEntity

```ruby
max = client.Max
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `Hash` | Yes |  |
| `as` | `Hash` | Yes |  |
| `geo` | `Hash` | Yes |  |
| `hostname` | `String` | No |  |
| `ip` | `String` | Yes |  |
| `is_anonymous` | `Boolean` | No |  |
| `is_anycast` | `Boolean` | No |  |
| `is_hosting` | `Boolean` | No |  |
| `is_mobile` | `Boolean` | No |  |
| `is_satellite` | `Boolean` | No |  |
| `mobile` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Max.load({ "id" => "max_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MaxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MenEntity

```ruby
men = client.Men
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | `Hash` | Yes |  |
| `request` | `Hash` | Yes |  |
| `token` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Men.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlaceEntity

```ruby
place = client.Place
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `String` | Yes |  |
| `ip` | `String` | Yes |  |
| `latitude` | `Float` | Yes |  |
| `longitude` | `Float` | Yes |  |
| `name` | `String` | Yes |  |
| `ssid` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Place.load({ "id" => "place_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlusEntity

```ruby
plus = client.Plus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `Hash` | No |  |
| `as` | `Hash` | No |  |
| `geo` | `Hash` | No |  |
| `ip` | `String` | Yes |  |
| `is_anonymous` | `Boolean` | No |  |
| `is_anycast` | `Boolean` | No |  |
| `is_hosting` | `Boolean` | No |  |
| `is_mobile` | `Boolean` | No |  |
| `is_satellite` | `Boolean` | No |  |
| `mobile` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Plus.load({ "id" => "plus_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PrivacyEntity

```ruby
privacy = client.Privacy
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hosting` | `Boolean` | Yes |  |
| `proxy` | `Boolean` | Yes |  |
| `relay` | `Boolean` | Yes |  |
| `service` | `String` | Yes |  |
| `tor` | `Boolean` | Yes |  |
| `vpn` | `Boolean` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Privacy.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PrivacyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PrivacyExtendedEntity

```ruby
privacy_extended = client.PrivacyExtended
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `census` | `Boolean` | No |  |
| `census_port` | `Array` | No |  |
| `confidence` | `Integer` | No |  |
| `coverage` | `Float` | No |  |
| `device_activity` | `Boolean` | No |  |
| `first_seen` | `String` | No |  |
| `hosting` | `Boolean` | Yes |  |
| `inferred` | `Boolean` | No |  |
| `last_seen` | `String` | No |  |
| `proxy` | `Boolean` | Yes |  |
| `relay` | `Boolean` | Yes |  |
| `service` | `String` | Yes |  |
| `tor` | `Boolean` | Yes |  |
| `vpn` | `Boolean` | Yes |  |
| `vpn_config` | `Boolean` | No |  |
| `whoi` | `Boolean` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PrivacyExtended.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PrivacyExtendedEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RangeEntity

```ruby
range = client.Range
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `String` | Yes |  |
| `num_range` | `String` | Yes |  |
| `range` | `Array` | Yes |  |
| `redirects_to` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Range.load({ "id" => "range_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RangeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ResidentialProxyEntity

```ruby
residential_proxy = client.ResidentialProxy
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `String` | Yes |  |
| `last_seen` | `String` | Yes |  |
| `percent_days_seen` | `Integer` | Yes |  |
| `service` | `String` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ResidentialProxy.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ResidentialProxyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SingleEntity

```ruby
single = client.Single
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Single.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SingleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WhoisAsnEntity

```ruby
whois_asn = client.WhoisAsn
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `String` | No |  |
| `admin` | `String` | No |  |
| `country` | `String` | No |  |
| `id` | `String` | No |  |
| `maintainer` | `String` | No |  |
| `name` | `String` | No |  |
| `org` | `String` | No |  |
| `range` | `String` | No |  |
| `raw` | `String` | No |  |
| `source` | `String` | No |  |
| `status` | `String` | No |  |
| `tech` | `String` | No |  |
| `updated` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.WhoisAsn.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WhoisAsnEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WhoisDomainEntity

```ruby
whois_domain = client.WhoisDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `String` | No |  |
| `page` | `Integer` | No |  |
| `record` | `Array` | No |  |
| `total` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WhoisDomain.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WhoisDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WhoisIpEntity

```ruby
whois_ip = client.WhoisIp
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `String` | No |  |
| `page` | `Integer` | No |  |
| `record` | `Array` | No |  |
| `total` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WhoisIp.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WhoisIpEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WhoisNetIdEntity

```ruby
whois_net_id = client.WhoisNetId
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `String` | No |  |
| `page` | `Integer` | No |  |
| `record` | `Array` | No |  |
| `total` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WhoisNetId.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WhoisNetIdEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WhoisOrgEntity

```ruby
whois_org = client.WhoisOrg
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `org` | `String` | No |  |
| `page` | `Integer` | No |  |
| `record` | `Array` | No |  |
| `total` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WhoisOrg.load({ "id" => "whois_org_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WhoisOrgEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WhoisPocEntity

```ruby
whois_poc = client.WhoisPoc
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `Integer` | No |  |
| `poc` | `String` | No |  |
| `record` | `Array` | No |  |
| `total` | `Integer` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WhoisPoc.load({ "id" => "whois_poc_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WhoisPocEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = IpinfoDeveloperSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

