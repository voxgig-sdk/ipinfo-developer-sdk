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
| `address` | ``$STRING`` | No |  |
| `country` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `network` | ``$STRING`` | No |  |
| `phone` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Abuse().load({ id: 'abuse_id' })
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
| `mcc` | ``$STRING`` | Yes |  |
| `mnc` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Carrier().load({ id: 'carrier_id' })
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
| `domain` | ``$STRING`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `type` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Company().load({ id: 'company_id' })
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Core().load({ id: 'core_id' })
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
| `domain` | ``$ARRAY`` | No |  |
| `ip` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `total` | ``$INTEGER`` | Yes |  |

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
| `8_8_8_8` | ``$OBJECT`` | No |  |
| `8_8_8_8city` | ``$STRING`` | No |  |
| `summary` | ``$STRING`` | No |  |
| `value` | ``$OBJECT`` | No |  |

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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetCurrentInformation().load({ id: 'get_current_information_id' })
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
| `city` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpinfoCore().load({ id: 'ipinfo_core_id' })
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
| `city` | ``$STRING`` | No |  |
| `key` | ``$STRING`` | No |  |
| `region` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.IpinfoPlus().load({ id: 'ipinfo_plus_id' })
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
| `as_domain` | ``$STRING`` | Yes |  |
| `as_name` | ``$STRING`` | Yes |  |
| `asn` | ``$STRING`` | Yes |  |
| `continent` | ``$STRING`` | Yes |  |
| `continent_code` | ``$STRING`` | Yes |  |
| `country` | ``$STRING`` | Yes |  |
| `country_code` | ``$STRING`` | Yes |  |
| `ip` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Lite().load({ id: 'lite_id' })
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
| `feature` | ``$OBJECT`` | Yes |  |
| `request` | ``$OBJECT`` | Yes |  |
| `token` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Men().load({ id: 'men_id' })
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
| `category` | ``$STRING`` | Yes |  |
| `ip` | ``$STRING`` | Yes |  |
| `latitude` | ``$NUMBER`` | Yes |  |
| `longitude` | ``$NUMBER`` | Yes |  |
| `name` | ``$STRING`` | Yes |  |
| `ssid` | ``$STRING`` | Yes |  |

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
| `hosting` | ``$BOOLEAN`` | Yes |  |
| `proxy` | ``$BOOLEAN`` | Yes |  |
| `relay` | ``$BOOLEAN`` | Yes |  |
| `service` | ``$STRING`` | Yes |  |
| `tor` | ``$BOOLEAN`` | Yes |  |
| `vpn` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Privacy().load({ id: 'privacy_id' })
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
| `domain` | ``$STRING`` | Yes |  |
| `num_range` | ``$STRING`` | Yes |  |
| `range` | ``$ARRAY`` | Yes |  |
| `redirects_to` | ``$STRING`` | Yes |  |

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
| `ip` | ``$STRING`` | Yes |  |
| `last_seen` | ``$STRING`` | Yes |  |
| `percent_days_seen` | ``$INTEGER`` | Yes |  |
| `service` | ``$STRING`` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ResidentialProxy().load({ id: 'residential_proxy_id' })
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
const result = await client.Single().load({ id: 'single_id' })
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
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisDomain().load({ id: 'whois_domain_id' })
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
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisIp().load({ id: 'whois_ip_id' })
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
| `net` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WhoisNetId().load({ id: 'whois_net_id_id' })
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
| `org` | ``$STRING`` | No |  |
| `page` | ``$INTEGER`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

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
| `page` | ``$INTEGER`` | No |  |
| `poc` | ``$STRING`` | No |  |
| `record` | ``$ARRAY`` | No |  |
| `total` | ``$INTEGER`` | No |  |

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

