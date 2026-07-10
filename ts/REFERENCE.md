# IpinfoDeveloper TypeScript SDK Reference

Complete API reference for the IpinfoDeveloper TypeScript SDK.


## IpinfoDeveloperSDK

### Constructor

```ts
new IpinfoDeveloperSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpinfoDeveloperSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = IpinfoDeveloperSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `IpinfoDeveloperSDK` instance in test mode.


### Instance Methods

#### `Abuse(data?: object)`

Create a new `Abuse` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AbuseEntity` instance.

#### `Asn(data?: object)`

Create a new `Asn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AsnEntity` instance.

#### `Carrier(data?: object)`

Create a new `Carrier` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CarrierEntity` instance.

#### `Company(data?: object)`

Create a new `Company` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CompanyEntity` instance.

#### `Core(data?: object)`

Create a new `Core` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CoreEntity` instance.

#### `Domain(data?: object)`

Create a new `Domain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainEntity` instance.

#### `General(data?: object)`

Create a new `General` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GeneralEntity` instance.

#### `GetCurrentInformation(data?: object)`

Create a new `GetCurrentInformation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetCurrentInformationEntity` instance.

#### `GetInformationByIp(data?: object)`

Create a new `GetInformationByIp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetInformationByIpEntity` instance.

#### `IpinfoCore(data?: object)`

Create a new `IpinfoCore` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IpinfoCoreEntity` instance.

#### `IpinfoLite(data?: object)`

Create a new `IpinfoLite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IpinfoLiteEntity` instance.

#### `IpinfoPlus(data?: object)`

Create a new `IpinfoPlus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IpinfoPlusEntity` instance.

#### `Lite(data?: object)`

Create a new `Lite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LiteEntity` instance.

#### `Max(data?: object)`

Create a new `Max` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MaxEntity` instance.

#### `Men(data?: object)`

Create a new `Men` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MenEntity` instance.

#### `Place(data?: object)`

Create a new `Place` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlaceEntity` instance.

#### `Plus(data?: object)`

Create a new `Plus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlusEntity` instance.

#### `Privacy(data?: object)`

Create a new `Privacy` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PrivacyEntity` instance.

#### `PrivacyExtended(data?: object)`

Create a new `PrivacyExtended` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PrivacyExtendedEntity` instance.

#### `Range(data?: object)`

Create a new `Range` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RangeEntity` instance.

#### `ResidentialProxy(data?: object)`

Create a new `ResidentialProxy` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ResidentialProxyEntity` instance.

#### `Single(data?: object)`

Create a new `Single` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SingleEntity` instance.

#### `WhoisAsn(data?: object)`

Create a new `WhoisAsn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WhoisAsnEntity` instance.

#### `WhoisDomain(data?: object)`

Create a new `WhoisDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WhoisDomainEntity` instance.

#### `WhoisIp(data?: object)`

Create a new `WhoisIp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WhoisIpEntity` instance.

#### `WhoisNetId(data?: object)`

Create a new `WhoisNetId` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WhoisNetIdEntity` instance.

#### `WhoisOrg(data?: object)`

Create a new `WhoisOrg` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WhoisOrgEntity` instance.

#### `WhoisPoc(data?: object)`

Create a new `WhoisPoc` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WhoisPocEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `IpinfoDeveloperSDK.test()`.

**Returns:** `IpinfoDeveloperSDK` instance in test mode.


---

## AbuseEntity

```ts
const abuse = client.Abuse()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Abuse().load({ ip: 'ip' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AbuseEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AsnEntity

```ts
const asn = client.Asn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocated` | `string` | No |  |
| `asn` | `string` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `downstream` | `any[]` | No |  |
| `name` | `string` | Yes |  |
| `num_ip` | `number` | No |  |
| `peer` | `any[]` | No |  |
| `prefix` | `any[]` | No |  |
| `prefixes6` | `any[]` | No |  |
| `registry` | `string` | No |  |
| `route` | `string` | No |  |
| `type` | `string` | Yes |  |
| `upstream` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Asn().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AsnEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CarrierEntity

```ts
const carrier = client.Carrier()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mcc` | `string` | Yes |  |
| `mnc` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Carrier().load({ ip: 'ip' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CarrierEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CompanyEntity

```ts
const company = client.Company()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `name` | `string` | Yes |  |
| `type` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Company().load({ ip: 'ip' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CompanyEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CoreEntity

```ts
const core = client.Core()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as` | `Record<string, any>` | No |  |
| `geo` | `Record<string, any>` | No |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `boolean` | No |  |
| `is_anycast` | `boolean` | No |  |
| `is_hosting` | `boolean` | No |  |
| `is_mobile` | `boolean` | No |  |
| `is_satellite` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Core().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CoreEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainEntity

```ts
const domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `any[]` | No |  |
| `ip` | `string` | No |  |
| `page` | `number` | No |  |
| `total` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Domain().load({ id: 'domain_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GeneralEntity

```ts
const general = client.General()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `8_8_8_8` | `Record<string, any>` | No |  |
| `8_8_8_8city` | `string` | No |  |
| `summary` | `string` | No |  |
| `value` | `Record<string, any>` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.General().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GeneralEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetCurrentInformationEntity

```ts
const get_current_information = client.GetCurrentInformation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `Record<string, any>` | Yes |  |
| `bogon` | `boolean` | No |  |
| `carrier` | `Record<string, any>` | Yes |  |
| `city` | `string` | No |  |
| `company` | `Record<string, any>` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `Record<string, any>` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `Record<string, any>` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetCurrentInformation().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetCurrentInformationEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetInformationByIpEntity

```ts
const get_information_by_ip = client.GetInformationByIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `Record<string, any>` | Yes |  |
| `bogon` | `boolean` | No |  |
| `carrier` | `Record<string, any>` | Yes |  |
| `city` | `string` | No |  |
| `company` | `Record<string, any>` | Yes |  |
| `country` | `string` | No |  |
| `domain` | `Record<string, any>` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `loc` | `string` | No |  |
| `org` | `string` | No |  |
| `postal` | `string` | No |  |
| `privacy` | `Record<string, any>` | Yes |  |
| `region` | `string` | No |  |
| `timezone` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetInformationByIp().load({ id: 'get_information_by_ip_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetInformationByIpEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IpinfoCoreEntity

```ts
const ipinfo_core = client.IpinfoCore()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpinfoCore().load({ field: 'field' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IpinfoCoreEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IpinfoLiteEntity

```ts
const ipinfo_lite = client.IpinfoLite()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpinfoLite().load({ id: 'ipinfo_lite_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IpinfoLiteEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IpinfoPlusEntity

```ts
const ipinfo_plus = client.IpinfoPlus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | No |  |
| `key` | `string` | No |  |
| `region` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpinfoPlus().load({ field: 'field' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IpinfoPlusEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LiteEntity

```ts
const lite = client.Lite()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Lite().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LiteEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MaxEntity

```ts
const max = client.Max()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `Record<string, any>` | Yes |  |
| `as` | `Record<string, any>` | Yes |  |
| `geo` | `Record<string, any>` | Yes |  |
| `hostname` | `string` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `boolean` | No |  |
| `is_anycast` | `boolean` | No |  |
| `is_hosting` | `boolean` | No |  |
| `is_mobile` | `boolean` | No |  |
| `is_satellite` | `boolean` | No |  |
| `mobile` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Max().load({ id: 'max_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MaxEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MenEntity

```ts
const men = client.Men()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | `Record<string, any>` | Yes |  |
| `request` | `Record<string, any>` | Yes |  |
| `token` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Men().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MenEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlaceEntity

```ts
const place = client.Place()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Place().load({ id: 'place_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlaceEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlusEntity

```ts
const plus = client.Plus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `Record<string, any>` | No |  |
| `as` | `Record<string, any>` | No |  |
| `geo` | `Record<string, any>` | No |  |
| `ip` | `string` | Yes |  |
| `is_anonymous` | `boolean` | No |  |
| `is_anycast` | `boolean` | No |  |
| `is_hosting` | `boolean` | No |  |
| `is_mobile` | `boolean` | No |  |
| `is_satellite` | `boolean` | No |  |
| `mobile` | `Record<string, any>` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Plus().load({ id: 'plus_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlusEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PrivacyEntity

```ts
const privacy = client.Privacy()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Privacy().load({ ip: 'ip' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PrivacyEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PrivacyExtendedEntity

```ts
const privacy_extended = client.PrivacyExtended()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `census` | `boolean` | No |  |
| `census_port` | `any[]` | No |  |
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PrivacyExtended().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PrivacyExtendedEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RangeEntity

```ts
const range = client.Range()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `num_range` | `string` | Yes |  |
| `range` | `any[]` | Yes |  |
| `redirects_to` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Range().load({ id: 'range_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RangeEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ResidentialProxyEntity

```ts
const residential_proxy = client.ResidentialProxy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `string` | Yes |  |
| `last_seen` | `string` | Yes |  |
| `percent_days_seen` | `number` | Yes |  |
| `service` | `string` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ResidentialProxy().load({ ip: 'ip' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ResidentialProxyEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SingleEntity

```ts
const single = client.Single()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Single().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SingleEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WhoisAsnEntity

```ts
const whois_asn = client.WhoisAsn()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.WhoisAsn().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WhoisAsnEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WhoisDomainEntity

```ts
const whois_domain = client.WhoisDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `any[]` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisDomain().load({ domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WhoisDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WhoisIpEntity

```ts
const whois_ip = client.WhoisIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `any[]` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisIp().load({ whoisip: 'whoisip' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WhoisIpEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WhoisNetIdEntity

```ts
const whois_net_id = client.WhoisNetId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `any[]` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisNetId().load({ whoisnetid: 'whoisnetid' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WhoisNetIdEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WhoisOrgEntity

```ts
const whois_org = client.WhoisOrg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `org` | `string` | No |  |
| `page` | `number` | No |  |
| `record` | `any[]` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisOrg().load({ id: 'whois_org_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WhoisOrgEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WhoisPocEntity

```ts
const whois_poc = client.WhoisPoc()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `number` | No |  |
| `poc` | `string` | No |  |
| `record` | `any[]` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisPoc().load({ id: 'whois_poc_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WhoisPocEntity` instance with the same client and
options.

#### `client()`

Return the parent `IpinfoDeveloperSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new IpinfoDeveloperSDK({
  feature: {
    test: { active: true },
  }
})
```

