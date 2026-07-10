# IpinfoDeveloper TypeScript SDK



The TypeScript SDK for the IpinfoDeveloper API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Abuse()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

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

### 3. Load an ipinfocore

IpinfoCore is nested under field, so provide the `field`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const ipinfocore = await client.IpinfoCore().load({
    field: 'example_field',
  })
  console.log(ipinfocore)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const abuse = await client.Abuse().load()
  console.log(abuse)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
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

if (result instanceof Error) {
  throw result
}
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

const abuse = await client.Abuse().load()
// abuse is a bare entity populated with mock response data
console.log(abuse)
```

You can also use the instance method:

```ts
const client = new IpinfoDeveloperSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Abuse()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
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
| `Abuse(data?)` | `AbuseEntity` | Create an Abuse entity instance. |
| `Asn(data?)` | `AsnEntity` | Create an Asn entity instance. |
| `Carrier(data?)` | `CarrierEntity` | Create a Carrier entity instance. |
| `Company(data?)` | `CompanyEntity` | Create a Company entity instance. |
| `Core(data?)` | `CoreEntity` | Create a Core entity instance. |
| `Domain(data?)` | `DomainEntity` | Create a Domain entity instance. |
| `General(data?)` | `GeneralEntity` | Create a General entity instance. |
| `GetCurrentInformation(data?)` | `GetCurrentInformationEntity` | Create a GetCurrentInformation entity instance. |
| `GetInformationByIp(data?)` | `GetInformationByIpEntity` | Create a GetInformationByIp entity instance. |
| `IpinfoCore(data?)` | `IpinfoCoreEntity` | Create an IpinfoCore entity instance. |
| `IpinfoLite(data?)` | `IpinfoLiteEntity` | Create an IpinfoLite entity instance. |
| `IpinfoPlus(data?)` | `IpinfoPlusEntity` | Create an IpinfoPlus entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): IpinfoDeveloperSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

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

Create an instance: `const abuse = client.Abuse()`

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

```ts
const abuse = await client.Abuse().load({ ip: 'ip' })
```


### Asn

Create an instance: `const asn = client.Asn()`

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
| `downstream` | `any[]` |  |
| `name` | `string` |  |
| `num_ip` | `number` |  |
| `peer` | `any[]` |  |
| `prefix` | `any[]` |  |
| `prefixes6` | `any[]` |  |
| `registry` | `string` |  |
| `route` | `string` |  |
| `type` | `string` |  |
| `upstream` | `any[]` |  |

#### Example: List

```ts
const asns = await client.Asn().list()
```


### Carrier

Create an instance: `const carrier = client.Carrier()`

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

```ts
const carrier = await client.Carrier().load({ ip: 'ip' })
```


### Company

Create an instance: `const company = client.Company()`

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

```ts
const company = await client.Company().load({ ip: 'ip' })
```


### Core

Create an instance: `const core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as` | `Record<string, any>` |  |
| `geo` | `Record<string, any>` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `is_anonymous` | `boolean` |  |
| `is_anycast` | `boolean` |  |
| `is_hosting` | `boolean` |  |
| `is_mobile` | `boolean` |  |
| `is_satellite` | `boolean` |  |

#### Example: Load

```ts
const core = await client.Core().load()
```


### Domain

Create an instance: `const domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `any[]` |  |
| `ip` | `string` |  |
| `page` | `number` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const domain = await client.Domain().load({ id: 'domain_id' })
```


### General

Create an instance: `const general = client.General()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `8_8_8_8` | `Record<string, any>` |  |
| `8_8_8_8city` | `string` |  |
| `summary` | `string` |  |
| `value` | `Record<string, any>` |  |

#### Example: Create

```ts
const general = await client.General().create({
})
```


### GetCurrentInformation

Create an instance: `const get_current_information = client.GetCurrentInformation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `Record<string, any>` |  |
| `bogon` | `boolean` |  |
| `carrier` | `Record<string, any>` |  |
| `city` | `string` |  |
| `company` | `Record<string, any>` |  |
| `country` | `string` |  |
| `domain` | `Record<string, any>` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `loc` | `string` |  |
| `org` | `string` |  |
| `postal` | `string` |  |
| `privacy` | `Record<string, any>` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```ts
const get_current_information = await client.GetCurrentInformation().load()
```


### GetInformationByIp

Create an instance: `const get_information_by_ip = client.GetInformationByIp()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `Record<string, any>` |  |
| `bogon` | `boolean` |  |
| `carrier` | `Record<string, any>` |  |
| `city` | `string` |  |
| `company` | `Record<string, any>` |  |
| `country` | `string` |  |
| `domain` | `Record<string, any>` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `loc` | `string` |  |
| `org` | `string` |  |
| `postal` | `string` |  |
| `privacy` | `Record<string, any>` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```ts
const get_information_by_ip = await client.GetInformationByIp().load({ id: 'get_information_by_ip_id' })
```


### IpinfoCore

Create an instance: `const ipinfo_core = client.IpinfoCore()`

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

```ts
const ipinfo_core = await client.IpinfoCore().load({ field: 'field' })
```


### IpinfoLite

Create an instance: `const ipinfo_lite = client.IpinfoLite()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const ipinfo_lite = await client.IpinfoLite().load({ id: 'ipinfo_lite_id' })
```


### IpinfoPlus

Create an instance: `const ipinfo_plus = client.IpinfoPlus()`

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

```ts
const ipinfo_plus = await client.IpinfoPlus().load({ field: 'field' })
```


### Lite

Create an instance: `const lite = client.Lite()`

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

```ts
const lite = await client.Lite().load()
```


### Max

Create an instance: `const max = client.Max()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `Record<string, any>` |  |
| `as` | `Record<string, any>` |  |
| `geo` | `Record<string, any>` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `is_anonymous` | `boolean` |  |
| `is_anycast` | `boolean` |  |
| `is_hosting` | `boolean` |  |
| `is_mobile` | `boolean` |  |
| `is_satellite` | `boolean` |  |
| `mobile` | `Record<string, any>` |  |

#### Example: Load

```ts
const max = await client.Max().load({ id: 'max_id' })
```


### Men

Create an instance: `const men = client.Men()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `feature` | `Record<string, any>` |  |
| `request` | `Record<string, any>` |  |
| `token` | `string` |  |

#### Example: Load

```ts
const men = await client.Men().load()
```


### Place

Create an instance: `const place = client.Place()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `ip` | `string` |  |
| `latitude` | `number` |  |
| `longitude` | `number` |  |
| `name` | `string` |  |
| `ssid` | `string` |  |

#### Example: Load

```ts
const place = await client.Place().load({ id: 'place_id' })
```


### Plus

Create an instance: `const plus = client.Plus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `Record<string, any>` |  |
| `as` | `Record<string, any>` |  |
| `geo` | `Record<string, any>` |  |
| `ip` | `string` |  |
| `is_anonymous` | `boolean` |  |
| `is_anycast` | `boolean` |  |
| `is_hosting` | `boolean` |  |
| `is_mobile` | `boolean` |  |
| `is_satellite` | `boolean` |  |
| `mobile` | `Record<string, any>` |  |

#### Example: Load

```ts
const plus = await client.Plus().load({ id: 'plus_id' })
```


### Privacy

Create an instance: `const privacy = client.Privacy()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hosting` | `boolean` |  |
| `proxy` | `boolean` |  |
| `relay` | `boolean` |  |
| `service` | `string` |  |
| `tor` | `boolean` |  |
| `vpn` | `boolean` |  |

#### Example: Load

```ts
const privacy = await client.Privacy().load({ ip: 'ip' })
```


### PrivacyExtended

Create an instance: `const privacy_extended = client.PrivacyExtended()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `census` | `boolean` |  |
| `census_port` | `any[]` |  |
| `confidence` | `number` |  |
| `coverage` | `number` |  |
| `device_activity` | `boolean` |  |
| `first_seen` | `string` |  |
| `hosting` | `boolean` |  |
| `inferred` | `boolean` |  |
| `last_seen` | `string` |  |
| `proxy` | `boolean` |  |
| `relay` | `boolean` |  |
| `service` | `string` |  |
| `tor` | `boolean` |  |
| `vpn` | `boolean` |  |
| `vpn_config` | `boolean` |  |
| `whoi` | `boolean` |  |

#### Example: List

```ts
const privacy_extendeds = await client.PrivacyExtended().list()
```


### Range

Create an instance: `const range = client.Range()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `num_range` | `string` |  |
| `range` | `any[]` |  |
| `redirects_to` | `string` |  |

#### Example: Load

```ts
const range = await client.Range().load({ id: 'range_id' })
```


### ResidentialProxy

Create an instance: `const residential_proxy = client.ResidentialProxy()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ip` | `string` |  |
| `last_seen` | `string` |  |
| `percent_days_seen` | `number` |  |
| `service` | `string` |  |

#### Example: Load

```ts
const residential_proxy = await client.ResidentialProxy().load({ ip: 'ip' })
```


### Single

Create an instance: `const single = client.Single()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const single = await client.Single().load()
```


### WhoisAsn

Create an instance: `const whois_asn = client.WhoisAsn()`

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

```ts
const whois_asns = await client.WhoisAsn().list()
```


### WhoisDomain

Create an instance: `const whois_domain = client.WhoisDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `number` |  |
| `record` | `any[]` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const whois_domain = await client.WhoisDomain().load({ domain: 'domain' })
```


### WhoisIp

Create an instance: `const whois_ip = client.WhoisIp()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `number` |  |
| `record` | `any[]` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const whois_ip = await client.WhoisIp().load({ whoisip: 'whoisip' })
```


### WhoisNetId

Create an instance: `const whois_net_id = client.WhoisNetId()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `number` |  |
| `record` | `any[]` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const whois_net_id = await client.WhoisNetId().load({ whoisnetid: 'whoisnetid' })
```


### WhoisOrg

Create an instance: `const whois_org = client.WhoisOrg()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `org` | `string` |  |
| `page` | `number` |  |
| `record` | `any[]` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const whois_org = await client.WhoisOrg().load({ id: 'whois_org_id' })
```


### WhoisPoc

Create an instance: `const whois_poc = client.WhoisPoc()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page` | `number` |  |
| `poc` | `string` |  |
| `record` | `any[]` |  |
| `total` | `number` |  |

#### Example: Load

```ts
const whois_poc = await client.WhoisPoc().load({ id: 'whois_poc_id' })
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
const abuse = client.Abuse()
await abuse.load()

// abuse.data() now returns the abuse data from the last `load`
// abuse.match() returns the last match criteria
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
