# IpinfoDeveloper TypeScript SDK



The TypeScript SDK for the IpinfoDeveloper API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases](https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { IpinfoDeveloperSDK } from '@voxgig-sdk/ipinfo-developer'

const client = new IpinfoDeveloperSDK({
  apikey: process.env.IPINFO_DEVELOPER_APIKEY,
})
```

### 3. Load an abuse

```ts
const result = await client.abuse.load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = IpinfoDeveloperSDK.test()

const result = await client.abuse.load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new IpinfoDeveloperSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.abuse

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new IpinfoDeveloperSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IPINFO_DEVELOPER_TEST_LIVE=TRUE
IPINFO_DEVELOPER_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### IpinfoDeveloperSDK

#### Constructor

```ts
new IpinfoDeveloperSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Abuse(data?)` | `AbuseEntity` | Create a Abuse entity instance. |
| `Asn(data?)` | `AsnEntity` | Create a Asn entity instance. |
| `Carrier(data?)` | `CarrierEntity` | Create a Carrier entity instance. |
| `Company(data?)` | `CompanyEntity` | Create a Company entity instance. |
| `Core(data?)` | `CoreEntity` | Create a Core entity instance. |
| `Domain(data?)` | `DomainEntity` | Create a Domain entity instance. |
| `General(data?)` | `GeneralEntity` | Create a General entity instance. |
| `GetCurrentInformation(data?)` | `GetCurrentInformationEntity` | Create a GetCurrentInformation entity instance. |
| `GetInformationByIp(data?)` | `GetInformationByIpEntity` | Create a GetInformationByIp entity instance. |
| `IpinfoCore(data?)` | `IpinfoCoreEntity` | Create a IpinfoCore entity instance. |
| `IpinfoLite(data?)` | `IpinfoLiteEntity` | Create a IpinfoLite entity instance. |
| `IpinfoPlus(data?)` | `IpinfoPlusEntity` | Create a IpinfoPlus entity instance. |
| `Lite(data?)` | `LiteEntity` | Create a Lite entity instance. |
| `Max(data?)` | `MaxEntity` | Create a Max entity instance. |
| `Men(data?)` | `MenEntity` | Create a Men entity instance. |
| `Place(data?)` | `PlaceEntity` | Create a Place entity instance. |
| `Plus(data?)` | `PlusEntity` | Create a Plus entity instance. |
| `Privacy(data?)` | `PrivacyEntity` | Create a Privacy entity instance. |
| `PrivacyExtended(data?)` | `PrivacyExtendedEntity` | Create a PrivacyExtended entity instance. |
| `Range(data?)` | `RangeEntity` | Create a Range entity instance. |
| `ResidentialProxy(data?)` | `ResidentialProxyEntity` | Create a ResidentialProxy entity instance. |
| `Single(data?)` | `SingleEntity` | Create a Single entity instance. |
| `WhoisAsn(data?)` | `WhoisAsnEntity` | Create a WhoisAsn entity instance. |
| `WhoisDomain(data?)` | `WhoisDomainEntity` | Create a WhoisDomain entity instance. |
| `WhoisIp(data?)` | `WhoisIpEntity` | Create a WhoisIp entity instance. |
| `WhoisNetId(data?)` | `WhoisNetIdEntity` | Create a WhoisNetId entity instance. |
| `WhoisOrg(data?)` | `WhoisOrgEntity` | Create a WhoisOrg entity instance. |
| `WhoisPoc(data?)` | `WhoisPocEntity` | Create a WhoisPoc entity instance. |
| `tester(testopts?, sdkopts?)` | `IpinfoDeveloperSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `IpinfoDeveloperSDK.test(testopts?, sdkopts?)` | `IpinfoDeveloperSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): IpinfoDeveloperSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: load.

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

Operations: list.

API path: `/AS{asn}`

#### Carrier

| Field | Description |
| --- | --- |
| `mcc` |  |
| `mnc` |  |
| `name` |  |

Operations: load.

API path: `/{ip}/carrier`

#### Company

| Field | Description |
| --- | --- |
| `domain` |  |
| `name` |  |
| `type` |  |

Operations: load.

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

Operations: load.

API path: `/lookup/{ip}`

#### Domain

| Field | Description |
| --- | --- |
| `domain` |  |
| `ip` |  |
| `page` |  |
| `total` |  |

Operations: load.

API path: `/domains/{ip}`

#### General

| Field | Description |
| --- | --- |
| `8_8_8_8` |  |
| `8_8_8_8city` |  |
| `summary` |  |
| `value` |  |

Operations: create.

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

Operations: load.

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

Operations: load.

API path: `/{ip}`

#### IpinfoCore

| Field | Description |
| --- | --- |
| `city` |  |
| `key` |  |
| `region` |  |

Operations: load.

API path: `/lookup/{ip}/{field}`

#### IpinfoLite

| Field | Description |
| --- | --- |

Operations: load.

API path: `/lite/{ip}/{field}`

#### IpinfoPlus

| Field | Description |
| --- | --- |
| `city` |  |
| `key` |  |
| `region` |  |

Operations: load.

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

Operations: load.

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

Operations: load.

API path: `/max/{ip}`

#### Men

| Field | Description |
| --- | --- |
| `feature` |  |
| `request` |  |
| `token` |  |

Operations: load.

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

Operations: load.

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

Operations: load.

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

Operations: load.

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

Operations: list.

API path: `/{ip}/privacy_extended`

#### Range

| Field | Description |
| --- | --- |
| `domain` |  |
| `num_range` |  |
| `range` |  |
| `redirects_to` |  |

Operations: load.

API path: `/ranges/{domain}`

#### ResidentialProxy

| Field | Description |
| --- | --- |
| `ip` |  |
| `last_seen` |  |
| `percent_days_seen` |  |
| `service` |  |

Operations: load.

API path: `/{ip}/resproxy`

#### Single

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: list.

API path: `/whois/net/AS{asn}`

#### WhoisDomain

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: load.

API path: `/whois/net/{domain}`

#### WhoisIp

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: load.

API path: `/whois/net/{whoisip}`

#### WhoisNetId

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: load.

API path: `/whois/net/{whoisnetid}`

#### WhoisOrg

| Field | Description |
| --- | --- |
| `org` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: load.

API path: `/whois/org/{whoisorgid}`

#### WhoisPoc

| Field | Description |
| --- | --- |
| `page` |  |
| `poc` |  |
| `record` |  |
| `total` |  |

Operations: load.

API path: `/whois/poc/{whoispoc}`



## Entities


### Abuse

Create an instance: `const abuse = client.abuse`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `network` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |

#### Example: Load

```ts
const abuse = await client.abuse.load({ id: 'abuse_id' })
```


### Asn

Create an instance: `const asn = client.asn`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocated` | ``$STRING`` |  |
| `asn` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `domain` | ``$STRING`` |  |
| `downstream` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `num_ip` | ``$INTEGER`` |  |
| `peer` | ``$ARRAY`` |  |
| `prefix` | ``$ARRAY`` |  |
| `prefixes6` | ``$ARRAY`` |  |
| `registry` | ``$STRING`` |  |
| `route` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `upstream` | ``$ARRAY`` |  |

#### Example: List

```ts
const asns = await client.asn.list()
```


### Carrier

Create an instance: `const carrier = client.carrier`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `mcc` | ``$STRING`` |  |
| `mnc` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```ts
const carrier = await client.carrier.load({ id: 'carrier_id' })
```


### Company

Create an instance: `const company = client.company`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const company = await client.company.load({ id: 'company_id' })
```


### Core

Create an instance: `const core = client.core`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as` | ``$OBJECT`` |  |
| `geo` | ``$OBJECT`` |  |
| `hostname` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `is_anonymous` | ``$BOOLEAN`` |  |
| `is_anycast` | ``$BOOLEAN`` |  |
| `is_hosting` | ``$BOOLEAN`` |  |
| `is_mobile` | ``$BOOLEAN`` |  |
| `is_satellite` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const core = await client.core.load({ id: 'core_id' })
```


### Domain

Create an instance: `const domain = client.domain`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | ``$ARRAY`` |  |
| `ip` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```ts
const domain = await client.domain.load({ id: 'domain_id' })
```


### General

Create an instance: `const general = client.general`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `8_8_8_8` | ``$OBJECT`` |  |
| `8_8_8_8city` | ``$STRING`` |  |
| `summary` | ``$STRING`` |  |
| `value` | ``$OBJECT`` |  |

#### Example: Create

```ts
const general = await client.general.create({
})
```


### GetCurrentInformation

Create an instance: `const get_current_information = client.get_current_information`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | ``$OBJECT`` |  |
| `bogon` | ``$BOOLEAN`` |  |
| `carrier` | ``$OBJECT`` |  |
| `city` | ``$STRING`` |  |
| `company` | ``$OBJECT`` |  |
| `country` | ``$STRING`` |  |
| `domain` | ``$OBJECT`` |  |
| `hostname` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `loc` | ``$STRING`` |  |
| `org` | ``$STRING`` |  |
| `postal` | ``$STRING`` |  |
| `privacy` | ``$OBJECT`` |  |
| `region` | ``$STRING`` |  |
| `timezone` | ``$STRING`` |  |

#### Example: Load

```ts
const get_current_information = await client.get_current_information.load({ id: 'get_current_information_id' })
```


### GetInformationByIp

Create an instance: `const get_information_by_ip = client.get_information_by_ip`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | ``$OBJECT`` |  |
| `bogon` | ``$BOOLEAN`` |  |
| `carrier` | ``$OBJECT`` |  |
| `city` | ``$STRING`` |  |
| `company` | ``$OBJECT`` |  |
| `country` | ``$STRING`` |  |
| `domain` | ``$OBJECT`` |  |
| `hostname` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `loc` | ``$STRING`` |  |
| `org` | ``$STRING`` |  |
| `postal` | ``$STRING`` |  |
| `privacy` | ``$OBJECT`` |  |
| `region` | ``$STRING`` |  |
| `timezone` | ``$STRING`` |  |

#### Example: Load

```ts
const get_information_by_ip = await client.get_information_by_ip.load({ id: 'get_information_by_ip_id' })
```


### IpinfoCore

Create an instance: `const ipinfo_core = client.ipinfo_core`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `key` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |

#### Example: Load

```ts
const ipinfo_core = await client.ipinfo_core.load({ id: 'ipinfo_core_id' })
```


### IpinfoLite

Create an instance: `const ipinfo_lite = client.ipinfo_lite`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const ipinfo_lite = await client.ipinfo_lite.load({ id: 'ipinfo_lite_id' })
```


### IpinfoPlus

Create an instance: `const ipinfo_plus = client.ipinfo_plus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `key` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |

#### Example: Load

```ts
const ipinfo_plus = await client.ipinfo_plus.load({ id: 'ipinfo_plus_id' })
```


### Lite

Create an instance: `const lite = client.lite`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_domain` | ``$STRING`` |  |
| `as_name` | ``$STRING`` |  |
| `asn` | ``$STRING`` |  |
| `continent` | ``$STRING`` |  |
| `continent_code` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |

#### Example: Load

```ts
const lite = await client.lite.load({ id: 'lite_id' })
```


### Max

Create an instance: `const max = client.max`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | ``$OBJECT`` |  |
| `as` | ``$OBJECT`` |  |
| `geo` | ``$OBJECT`` |  |
| `hostname` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `is_anonymous` | ``$BOOLEAN`` |  |
| `is_anycast` | ``$BOOLEAN`` |  |
| `is_hosting` | ``$BOOLEAN`` |  |
| `is_mobile` | ``$BOOLEAN`` |  |
| `is_satellite` | ``$BOOLEAN`` |  |
| `mobile` | ``$OBJECT`` |  |

#### Example: Load

```ts
const max = await client.max.load({ id: 'max_id' })
```


### Men

Create an instance: `const men = client.men`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `feature` | ``$OBJECT`` |  |
| `request` | ``$OBJECT`` |  |
| `token` | ``$STRING`` |  |

#### Example: Load

```ts
const men = await client.men.load({ id: 'men_id' })
```


### Place

Create an instance: `const place = client.place`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `ssid` | ``$STRING`` |  |

#### Example: Load

```ts
const place = await client.place.load({ id: 'place_id' })
```


### Plus

Create an instance: `const plus = client.plus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | ``$OBJECT`` |  |
| `as` | ``$OBJECT`` |  |
| `geo` | ``$OBJECT`` |  |
| `ip` | ``$STRING`` |  |
| `is_anonymous` | ``$BOOLEAN`` |  |
| `is_anycast` | ``$BOOLEAN`` |  |
| `is_hosting` | ``$BOOLEAN`` |  |
| `is_mobile` | ``$BOOLEAN`` |  |
| `is_satellite` | ``$BOOLEAN`` |  |
| `mobile` | ``$OBJECT`` |  |

#### Example: Load

```ts
const plus = await client.plus.load({ id: 'plus_id' })
```


### Privacy

Create an instance: `const privacy = client.privacy`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hosting` | ``$BOOLEAN`` |  |
| `proxy` | ``$BOOLEAN`` |  |
| `relay` | ``$BOOLEAN`` |  |
| `service` | ``$STRING`` |  |
| `tor` | ``$BOOLEAN`` |  |
| `vpn` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const privacy = await client.privacy.load({ id: 'privacy_id' })
```


### PrivacyExtended

Create an instance: `const privacy_extended = client.privacy_extended`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `census` | ``$BOOLEAN`` |  |
| `census_port` | ``$ARRAY`` |  |
| `confidence` | ``$INTEGER`` |  |
| `coverage` | ``$NUMBER`` |  |
| `device_activity` | ``$BOOLEAN`` |  |
| `first_seen` | ``$STRING`` |  |
| `hosting` | ``$BOOLEAN`` |  |
| `inferred` | ``$BOOLEAN`` |  |
| `last_seen` | ``$STRING`` |  |
| `proxy` | ``$BOOLEAN`` |  |
| `relay` | ``$BOOLEAN`` |  |
| `service` | ``$STRING`` |  |
| `tor` | ``$BOOLEAN`` |  |
| `vpn` | ``$BOOLEAN`` |  |
| `vpn_config` | ``$BOOLEAN`` |  |
| `whoi` | ``$BOOLEAN`` |  |

#### Example: List

```ts
const privacy_extendeds = await client.privacy_extended.list()
```


### Range

Create an instance: `const range = client.range`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | ``$STRING`` |  |
| `num_range` | ``$STRING`` |  |
| `range` | ``$ARRAY`` |  |
| `redirects_to` | ``$STRING`` |  |

#### Example: Load

```ts
const range = await client.range.load({ id: 'range_id' })
```


### ResidentialProxy

Create an instance: `const residential_proxy = client.residential_proxy`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ip` | ``$STRING`` |  |
| `last_seen` | ``$STRING`` |  |
| `percent_days_seen` | ``$INTEGER`` |  |
| `service` | ``$STRING`` |  |

#### Example: Load

```ts
const residential_proxy = await client.residential_proxy.load({ id: 'residential_proxy_id' })
```


### Single

Create an instance: `const single = client.single`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const single = await client.single.load({ id: 'single_id' })
```


### WhoisAsn

Create an instance: `const whois_asn = client.whois_asn`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abuse` | ``$STRING`` |  |
| `admin` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `maintainer` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `org` | ``$STRING`` |  |
| `range` | ``$STRING`` |  |
| `raw` | ``$STRING`` |  |
| `source` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `tech` | ``$STRING`` |  |
| `updated` | ``$STRING`` |  |

#### Example: List

```ts
const whois_asns = await client.whois_asn.list()
```


### WhoisDomain

Create an instance: `const whois_domain = client.whois_domain`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```ts
const whois_domain = await client.whois_domain.load({ id: 'whois_domain_id' })
```


### WhoisIp

Create an instance: `const whois_ip = client.whois_ip`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```ts
const whois_ip = await client.whois_ip.load({ id: 'whois_ip_id' })
```


### WhoisNetId

Create an instance: `const whois_net_id = client.whois_net_id`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```ts
const whois_net_id = await client.whois_net_id.load({ id: 'whois_net_id_id' })
```


### WhoisOrg

Create an instance: `const whois_org = client.whois_org`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `org` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```ts
const whois_org = await client.whois_org.load({ id: 'whois_org_id' })
```


### WhoisPoc

Create an instance: `const whois_poc = client.whois_poc`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page` | ``$INTEGER`` |  |
| `poc` | ``$STRING`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```ts
const whois_poc = await client.whois_poc.load({ id: 'whois_poc_id' })
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
ipinfo-developer/
├── src/
│   ├── IpinfoDeveloperSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { IpinfoDeveloperSDK } from '@voxgig-sdk/ipinfo-developer'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const abuse = client.abuse
await abuse.load({ id: "example_id" })

// abuse.data() now returns the loaded abuse data
// abuse.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
