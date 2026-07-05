# IpinfoDeveloper Golang SDK Reference

Complete API reference for the IpinfoDeveloper Golang SDK.


## IpinfoDeveloperSDK

### Constructor

```go
func NewIpinfoDeveloperSDK(options map[string]any) *IpinfoDeveloperSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *IpinfoDeveloperSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *IpinfoDeveloperSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Abuse(data map[string]any) IpinfoDeveloperEntity`

Create a new `Abuse` entity instance. Pass `nil` for no initial data.

#### `Asn(data map[string]any) IpinfoDeveloperEntity`

Create a new `Asn` entity instance. Pass `nil` for no initial data.

#### `Carrier(data map[string]any) IpinfoDeveloperEntity`

Create a new `Carrier` entity instance. Pass `nil` for no initial data.

#### `Company(data map[string]any) IpinfoDeveloperEntity`

Create a new `Company` entity instance. Pass `nil` for no initial data.

#### `Core(data map[string]any) IpinfoDeveloperEntity`

Create a new `Core` entity instance. Pass `nil` for no initial data.

#### `Domain(data map[string]any) IpinfoDeveloperEntity`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `General(data map[string]any) IpinfoDeveloperEntity`

Create a new `General` entity instance. Pass `nil` for no initial data.

#### `GetCurrentInformation(data map[string]any) IpinfoDeveloperEntity`

Create a new `GetCurrentInformation` entity instance. Pass `nil` for no initial data.

#### `GetInformationByIp(data map[string]any) IpinfoDeveloperEntity`

Create a new `GetInformationByIp` entity instance. Pass `nil` for no initial data.

#### `IpinfoCore(data map[string]any) IpinfoDeveloperEntity`

Create a new `IpinfoCore` entity instance. Pass `nil` for no initial data.

#### `IpinfoLite(data map[string]any) IpinfoDeveloperEntity`

Create a new `IpinfoLite` entity instance. Pass `nil` for no initial data.

#### `IpinfoPlus(data map[string]any) IpinfoDeveloperEntity`

Create a new `IpinfoPlus` entity instance. Pass `nil` for no initial data.

#### `Lite(data map[string]any) IpinfoDeveloperEntity`

Create a new `Lite` entity instance. Pass `nil` for no initial data.

#### `Max(data map[string]any) IpinfoDeveloperEntity`

Create a new `Max` entity instance. Pass `nil` for no initial data.

#### `Men(data map[string]any) IpinfoDeveloperEntity`

Create a new `Men` entity instance. Pass `nil` for no initial data.

#### `Place(data map[string]any) IpinfoDeveloperEntity`

Create a new `Place` entity instance. Pass `nil` for no initial data.

#### `Plus(data map[string]any) IpinfoDeveloperEntity`

Create a new `Plus` entity instance. Pass `nil` for no initial data.

#### `Privacy(data map[string]any) IpinfoDeveloperEntity`

Create a new `Privacy` entity instance. Pass `nil` for no initial data.

#### `PrivacyExtended(data map[string]any) IpinfoDeveloperEntity`

Create a new `PrivacyExtended` entity instance. Pass `nil` for no initial data.

#### `Range(data map[string]any) IpinfoDeveloperEntity`

Create a new `Range` entity instance. Pass `nil` for no initial data.

#### `ResidentialProxy(data map[string]any) IpinfoDeveloperEntity`

Create a new `ResidentialProxy` entity instance. Pass `nil` for no initial data.

#### `Single(data map[string]any) IpinfoDeveloperEntity`

Create a new `Single` entity instance. Pass `nil` for no initial data.

#### `WhoisAsn(data map[string]any) IpinfoDeveloperEntity`

Create a new `WhoisAsn` entity instance. Pass `nil` for no initial data.

#### `WhoisDomain(data map[string]any) IpinfoDeveloperEntity`

Create a new `WhoisDomain` entity instance. Pass `nil` for no initial data.

#### `WhoisIp(data map[string]any) IpinfoDeveloperEntity`

Create a new `WhoisIp` entity instance. Pass `nil` for no initial data.

#### `WhoisNetId(data map[string]any) IpinfoDeveloperEntity`

Create a new `WhoisNetId` entity instance. Pass `nil` for no initial data.

#### `WhoisOrg(data map[string]any) IpinfoDeveloperEntity`

Create a new `WhoisOrg` entity instance. Pass `nil` for no initial data.

#### `WhoisPoc(data map[string]any) IpinfoDeveloperEntity`

Create a new `WhoisPoc` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AbuseEntity

```go
abuse := client.Abuse(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Abuse(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AbuseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AsnEntity

```go
asn := client.Asn(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocated` | `string` | No |  |
| `asn` | `string` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `downstream` | `[]any` | No |  |
| `name` | `string` | Yes |  |
| `num_ip` | `int` | No |  |
| `peer` | `[]any` | No |  |
| `prefix` | `[]any` | No |  |
| `prefixes6` | `[]any` | No |  |
| `registry` | `string` | No |  |
| `route` | `string` | No |  |
| `type` | `string` | Yes |  |
| `upstream` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Asn(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AsnEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CarrierEntity

```go
carrier := client.Carrier(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mcc` | `string` | Yes |  |
| `mnc` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Carrier(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CarrierEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CompanyEntity

```go
company := client.Company(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Company(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CompanyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CoreEntity

```go
core := client.Core(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as` | `map[string]any` | No |  |
| `geo` | `map[string]any` | No |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Core(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CoreEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DomainEntity

```go
domain := client.Domain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `[]any` | No |  |
| `ip` | `string` | No |  |
| `page` | `int` | No |  |
| `total` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Domain(nil).Load(map[string]any{"id": "domain_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GeneralEntity

```go
general := client.General(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `8_8_8_8` | `map[string]any` | No |  |
| `8_8_8_8city` | `string` | No |  |
| `summary` | `string` | No |  |
| `value` | `map[string]any` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.General(nil).Create(map[string]any{
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GeneralEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetCurrentInformationEntity

```go
get_current_information := client.GetCurrentInformation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `map[string]any` | Yes |  |
| `bogon` | `bool` | No |  |
| `carrier` | `map[string]any` | Yes |  |
| `city` | `string` | No |  |
| `company` | `map[string]any` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `map[string]any` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `map[string]any` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetCurrentInformation(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetCurrentInformationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetInformationByIpEntity

```go
get_information_by_ip := client.GetInformationByIp(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `map[string]any` | Yes |  |
| `bogon` | `bool` | No |  |
| `carrier` | `map[string]any` | Yes |  |
| `city` | `string` | No |  |
| `company` | `map[string]any` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `map[string]any` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `map[string]any` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.GetInformationByIp(nil).Load(map[string]any{"id": "get_information_by_ip_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetInformationByIpEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IpinfoCoreEntity

```go
ipinfo_core := client.IpinfoCore(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IpinfoCore(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IpinfoCoreEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IpinfoLiteEntity

```go
ipinfo_lite := client.IpinfoLite(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IpinfoLite(nil).Load(map[string]any{"id": "ipinfo_lite_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IpinfoLiteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IpinfoPlusEntity

```go
ipinfo_plus := client.IpinfoPlus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.IpinfoPlus(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IpinfoPlusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LiteEntity

```go
lite := client.Lite(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Lite(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LiteEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MaxEntity

```go
max := client.Max(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `map[string]any` | Yes |  |
| `as` | `map[string]any` | Yes |  |
| `geo` | `map[string]any` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |
| `mobile` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Max(nil).Load(map[string]any{"id": "max_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MaxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MenEntity

```go
men := client.Men(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | `map[string]any` | Yes |  |
| `request` | `map[string]any` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Men(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlaceEntity

```go
place := client.Place(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes |  |
| `ip` | `string` | Yes |  |
| `latitude` | `float64` | Yes |  |
| `longitude` | `float64` | Yes |  |
| `name` | `string` | Yes |  |
| `ssid` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Place(nil).Load(map[string]any{"id": "place_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlaceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlusEntity

```go
plus := client.Plus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `map[string]any` | No |  |
| `as` | `map[string]any` | No |  |
| `geo` | `map[string]any` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |
| `mobile` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Plus(nil).Load(map[string]any{"id": "plus_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PrivacyEntity

```go
privacy := client.Privacy(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Privacy(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PrivacyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PrivacyExtendedEntity

```go
privacy_extended := client.PrivacyExtended(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `census` | `bool` | No |  |
| `census_port` | `[]any` | No |  |
| `confidence` | `int` | No |  |
| `coverage` | `float64` | No |  |
| `device_activity` | `bool` | No |  |
| `first_seen` | `string` | No |  |
| `hosting` | `bool` | Yes |  |
| `inferred` | `bool` | No |  |
| `last_seen` | `string` | No |  |
| `proxy` | `bool` | Yes |  |
| `relay` | `bool` | Yes |  |
| `service` | `string` | Yes |  |
| `tor` | `bool` | Yes |  |
| `vpn` | `bool` | Yes |  |
| `vpn_config` | `bool` | No |  |
| `whoi` | `bool` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PrivacyExtended(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PrivacyExtendedEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RangeEntity

```go
range := client.Range(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `num_range` | `string` | Yes |  |
| `range` | `[]any` | Yes |  |
| `redirects_to` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Range(nil).Load(map[string]any{"id": "range_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RangeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResidentialProxyEntity

```go
residential_proxy := client.ResidentialProxy(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `string` | Yes |  |
| `last_seen` | `string` | Yes |  |
| `percent_days_seen` | `int` | Yes |  |
| `service` | `string` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ResidentialProxy(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResidentialProxyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SingleEntity

```go
single := client.Single(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Single(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SingleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WhoisAsnEntity

```go
whois_asn := client.WhoisAsn(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.WhoisAsn(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WhoisAsnEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WhoisDomainEntity

```go
whois_domain := client.WhoisDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `int` | No |  |
| `record` | `[]any` | No |  |
| `total` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WhoisDomain(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WhoisDomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WhoisIpEntity

```go
whois_ip := client.WhoisIp(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `int` | No |  |
| `record` | `[]any` | No |  |
| `total` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WhoisIp(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WhoisIpEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WhoisNetIdEntity

```go
whois_net_id := client.WhoisNetId(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `int` | No |  |
| `record` | `[]any` | No |  |
| `total` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WhoisNetId(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WhoisNetIdEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WhoisOrgEntity

```go
whois_org := client.WhoisOrg(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `org` | `string` | No |  |
| `page` | `int` | No |  |
| `record` | `[]any` | No |  |
| `total` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WhoisOrg(nil).Load(map[string]any{"id": "whois_org_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WhoisOrgEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WhoisPocEntity

```go
whois_poc := client.WhoisPoc(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `int` | No |  |
| `poc` | `string` | No |  |
| `record` | `[]any` | No |  |
| `total` | `int` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WhoisPoc(nil).Load(map[string]any{"id": "whois_poc_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WhoisPocEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewIpinfoDeveloperSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

