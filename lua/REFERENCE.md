# IpinfoDeveloper Lua SDK Reference

Complete API reference for the IpinfoDeveloper Lua SDK.


## IpinfoDeveloperSDK

### Constructor

```lua
local sdk = require("ipinfo-developer_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Abuse(data)`

Create a new `Abuse` entity instance. Pass `nil` for no initial data.

#### `Asn(data)`

Create a new `Asn` entity instance. Pass `nil` for no initial data.

#### `Carrier(data)`

Create a new `Carrier` entity instance. Pass `nil` for no initial data.

#### `Company(data)`

Create a new `Company` entity instance. Pass `nil` for no initial data.

#### `Core(data)`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Domain(data)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `General(data)`

Create a new `General` entity instance. Pass `nil` for no initial data.

#### `GetCurrentInformation(data)`

Create a new `GetCurrentInformation` entity instance. Pass `nil` for no initial data.

#### `GetInformationByIp(data)`

Create a new `GetInformationByIp` entity instance. Pass `nil` for no initial data.

#### `IpinfoCore(data)`

Create a new `IpinfoCore` entity instance. Pass `nil` for no initial data.

#### `IpinfoLite(data)`

Create a new `IpinfoLite` entity instance. Pass `nil` for no initial data.

#### `IpinfoPlus(data)`

Create a new `IpinfoPlus` entity instance. Pass `nil` for no initial data.

#### `Lite(data)`

Create a new `Lite` entity instance. Pass `nil` for no initial data.

#### `Max(data)`

Create a new `Max` entity instance. Pass `nil` for no initial data.

#### `Men(data)`

Create a new `Men` entity instance. Pass `nil` for no initial data.

#### `Place(data)`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Plus(data)`

Create a new `Plus` entity instance. Pass `nil` for no initial data.

#### `Privacy(data)`

Create a new `Privacy` entity instance. Pass `nil` for no initial data.

#### `PrivacyExtended(data)`

Create a new `PrivacyExtended` entity instance. Pass `nil` for no initial data.

#### `Range(data)`

Create a new `Range` entity instance. Pass `nil` for no initial data.

#### `ResidentialProxy(data)`

Create a new `ResidentialProxy` entity instance. Pass `nil` for no initial data.

#### `Single(data)`

Create a new `Single` entity instance. Pass `nil` for no initial data.

#### `WhoisAsn(data)`

Create a new `WhoisAsn` entity instance. Pass `nil` for no initial data.

#### `WhoisDomain(data)`

Create a new `WhoisDomain` entity instance. Pass `nil` for no initial data.

#### `WhoisIp(data)`

Create a new `WhoisIp` entity instance. Pass `nil` for no initial data.

#### `WhoisNetId(data)`

Create a new `WhoisNetId` entity instance. Pass `nil` for no initial data.

#### `WhoisOrg(data)`

Create a new `WhoisOrg` entity instance. Pass `nil` for no initial data.

#### `WhoisPoc(data)`

Create a new `WhoisPoc` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AbuseEntity

```lua
local abuse = client:Abuse(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Abuse():load({ id = "abuse_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AbuseEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AsnEntity

```lua
local asn = client:Asn(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Asn():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AsnEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CarrierEntity

```lua
local carrier = client:Carrier(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mcc` | ``$STRING`` | Yes |  |
| `mnc` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Carrier():load({ id = "carrier_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CarrierEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CompanyEntity

```lua
local company = client:Company(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `type` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Company():load({ id = "company_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CoreEntity

```lua
local core = client:Core(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Core():load({ id = "core_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainEntity

```lua
local domain = client:Domain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$ARRAY`` | No |  |
| `ip` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `total` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Domain():load({ id = "domain_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GeneralEntity

```lua
local general = client:General(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `8_8_8_8` | ``$OBJECT`` | No |  |
| `8_8_8_8city` | ``$STRING`` | No |  |
| `summary` | ``$STRING`` | No |  |
| `value` | ``$OBJECT`` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:General():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GetCurrentInformationEntity

```lua
local get_current_information = client:GetCurrentInformation(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GetCurrentInformation():load({ id = "get_current_information_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetCurrentInformationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GetInformationByIpEntity

```lua
local get_information_by_ip = client:GetInformationByIp(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GetInformationByIp():load({ id = "get_information_by_ip_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetInformationByIpEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IpinfoCoreEntity

```lua
local ipinfo_core = client:IpinfoCore(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IpinfoCore():load({ id = "ipinfo_core_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpinfoCoreEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IpinfoLiteEntity

```lua
local ipinfo_lite = client:IpinfoLite(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IpinfoLite():load({ id = "ipinfo_lite_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpinfoLiteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## IpinfoPlusEntity

```lua
local ipinfo_plus = client:IpinfoPlus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IpinfoPlus():load({ id = "ipinfo_plus_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpinfoPlusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LiteEntity

```lua
local lite = client:Lite(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Lite():load({ id = "lite_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiteEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MaxEntity

```lua
local max = client:Max(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Max():load({ id = "max_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MaxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MenEntity

```lua
local men = client:Men(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | ``$OBJECT`` | Yes |  |
| `request` | ``$OBJECT`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Men():load({ id = "men_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlaceEntity

```lua
local place = client:Place(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Place():load({ id = "place_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlusEntity

```lua
local plus = client:Plus(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Plus():load({ id = "plus_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PrivacyEntity

```lua
local privacy = client:Privacy(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Privacy():load({ id = "privacy_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PrivacyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PrivacyExtendedEntity

```lua
local privacy_extended = client:PrivacyExtended(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PrivacyExtended():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PrivacyExtendedEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RangeEntity

```lua
local range = client:Range(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | Yes |  |
| `num_range` | ``$STRING`` | Yes |  |
| `range` | ``$ARRAY`` | Yes |  |
| `redirects_to` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Range():load({ id = "range_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RangeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResidentialProxyEntity

```lua
local residential_proxy = client:ResidentialProxy(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | ``$STRING`` | Yes |  |
| `last_seen` | ``$STRING`` | Yes |  |
| `percent_days_seen` | ``$INTEGER`` | Yes |  |
| `service` | ``$STRING`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ResidentialProxy():load({ id = "residential_proxy_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResidentialProxyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SingleEntity

```lua
local single = client:Single(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Single():load({ id = "single_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SingleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WhoisAsnEntity

```lua
local whois_asn = client:WhoisAsn(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:WhoisAsn():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisAsnEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WhoisDomainEntity

```lua
local whois_domain = client:WhoisDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisDomain():load({ id = "whois_domain_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WhoisIpEntity

```lua
local whois_ip = client:WhoisIp(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisIp():load({ id = "whois_ip_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisIpEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WhoisNetIdEntity

```lua
local whois_net_id = client:WhoisNetId(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisNetId():load({ id = "whois_net_id_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisNetIdEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WhoisOrgEntity

```lua
local whois_org = client:WhoisOrg(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `org` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisOrg():load({ id = "whois_org_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisOrgEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WhoisPocEntity

```lua
local whois_poc = client:WhoisPoc(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | ``$INTEGER`` | No |  |
| `poc` | ``$STRING`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisPoc():load({ id = "whois_poc_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisPocEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

