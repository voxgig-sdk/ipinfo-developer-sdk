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
| `address` | `string` | No |  |
| `country` | `string` | No |  |
| `email` | `string` | No |  |
| `name` | `string` | No |  |
| `network` | `string` | No |  |
| `phone` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Abuse():load({ ip = "ip" })
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
| `allocated` | `string` | No |  |
| `asn` | `string` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `downstream` | `table` | No |  |
| `name` | `string` | Yes |  |
| `num_ip` | `number` | No |  |
| `peer` | `table` | No |  |
| `prefix` | `table` | No |  |
| `prefixes6` | `table` | No |  |
| `registry` | `string` | No |  |
| `route` | `string` | No |  |
| `type` | `string` | Yes |  |
| `upstream` | `table` | No |  |

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
| `mcc` | `string` | Yes |  |
| `mnc` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Carrier():load({ ip = "ip" })
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
| `domain` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Company():load({ ip = "ip" })
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
| `as` | `table` | No |  |
| `geo` | `table` | No |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `boolean` | No |  |
| `is_anycast` | `boolean` | No |  |
| `is_hosting` | `boolean` | No |  |
| `is_mobile` | `boolean` | No |  |
| `is_satellite` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Core():load()
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
| `domain` | `table` | No |  |
| `ip` | `string` | No |  |
| `page` | `number` | No |  |
| `total` | `number` | Yes |  |

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
| `8_8_8_8` | `table` | No |  |
| `8_8_8_8city` | `string` | No |  |
| `summary` | `string` | No |  |
| `value` | `table` | No |  |

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
| `asn` | `table` | Yes |  |
| `bogon` | `boolean` | No |  |
| `carrier` | `table` | Yes |  |
| `city` | `string` | No |  |
| `company` | `table` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `table` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `table` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:GetCurrentInformation():load()
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
| `asn` | `table` | Yes |  |
| `bogon` | `boolean` | No |  |
| `carrier` | `table` | Yes |  |
| `city` | `string` | No |  |
| `company` | `table` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `table` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `table` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

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
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IpinfoCore():load({ field = "field" })
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
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:IpinfoPlus():load({ field = "field" })
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
| `as_domain` | `string` | Yes |  |
| `as_name` | `string` | Yes |  |
| `asn` | `string` | Yes |  |
| `continent` | `string` | Yes |  |
| `continent_code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `country_code` | `string` | Yes |  |
| `ip` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Lite():load()
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
| `anonymous` | `table` | Yes |  |
| `as` | `table` | Yes |  |
| `geo` | `table` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `boolean` | No |  |
| `is_anycast` | `boolean` | No |  |
| `is_hosting` | `boolean` | No |  |
| `is_mobile` | `boolean` | No |  |
| `is_satellite` | `boolean` | No |  |
| `mobile` | `table` | No |  |

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
| `feature` | `table` | Yes |  |
| `request` | `table` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Men():load()
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
| `category` | `string` | Yes |  |
| `ip` | `string` | Yes |  |
| `latitude` | `number` | Yes |  |
| `longitude` | `number` | Yes |  |
| `name` | `string` | Yes |  |
| `ssid` | `string` | Yes |  |

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
| `anonymous` | `table` | No |  |
| `as` | `table` | No |  |
| `geo` | `table` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `boolean` | No |  |
| `is_anycast` | `boolean` | No |  |
| `is_hosting` | `boolean` | No |  |
| `is_mobile` | `boolean` | No |  |
| `is_satellite` | `boolean` | No |  |
| `mobile` | `table` | No |  |

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
| `hosting` | `boolean` | Yes |  |
| `proxy` | `boolean` | Yes |  |
| `relay` | `boolean` | Yes |  |
| `service` | `string` | Yes |  |
| `tor` | `boolean` | Yes |  |
| `vpn` | `boolean` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Privacy():load({ ip = "ip" })
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
| `census` | `boolean` | No |  |
| `census_port` | `table` | No |  |
| `confidence` | `number` | No |  |
| `coverage` | `number` | No |  |
| `device_activity` | `boolean` | No |  |
| `first_seen` | `string` | No |  |
| `hosting` | `boolean` | Yes |  |
| `inferred` | `boolean` | No |  |
| `last_seen` | `string` | No |  |
| `proxy` | `boolean` | Yes |  |
| `relay` | `boolean` | Yes |  |
| `service` | `string` | Yes |  |
| `tor` | `boolean` | Yes |  |
| `vpn` | `boolean` | Yes |  |
| `vpn_config` | `boolean` | No |  |
| `whoi` | `boolean` | No |  |

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
| `domain` | `string` | Yes |  |
| `num_range` | `string` | Yes |  |
| `range` | `table` | Yes |  |
| `redirects_to` | `string` | Yes |  |

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
| `ip` | `string` | Yes |  |
| `last_seen` | `string` | Yes |  |
| `percent_days_seen` | `number` | Yes |  |
| `service` | `string` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ResidentialProxy():load({ ip = "ip" })
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
local result, err = client:Single():load()
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
| `net` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `table` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisDomain():load({ domain = "domain" })
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
| `net` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `table` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisIp():load({ whoisip = "whoisip" })
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
| `net` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `table` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WhoisNetId():load({ whoisnetid = "whoisnetid" })
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
| `org` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `table` | No |  |
| `total` | `number` | No |  |

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
| `page` | `number` | No |  |
| `poc` | `string` | No |  |
| `record` | `table` | No |  |
| `total` | `number` | No |  |

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

