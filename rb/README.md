# IpinfoDeveloper Ruby SDK



The Ruby SDK for the IpinfoDeveloper API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Abuse` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases](https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "IpinfoDeveloper_sdk"

client = IpinfoDeveloperSDK.new({
  "apikey" => ENV["IPINFO_DEVELOPER_APIKEY"],
})
```

### 3. Load an abuse

```ruby
begin
  # load returns the bare Abuse record (raises on error).
  abuse = client.Abuse.load()
  puts abuse
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  abuse = client.Abuse.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = IpinfoDeveloperSDK.test

# Entity ops return the bare mock record (raises on error).
abuse = client.Abuse.load()
puts abuse
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = IpinfoDeveloperSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### IpinfoDeveloperSDK

```ruby
require_relative "IpinfoDeveloper_sdk"
client = IpinfoDeveloperSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = IpinfoDeveloperSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IpinfoDeveloperSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Abuse` | `(data) -> AbuseEntity` | Create an Abuse entity instance. |
| `Asn` | `(data) -> AsnEntity` | Create an Asn entity instance. |
| `Carrier` | `(data) -> CarrierEntity` | Create a Carrier entity instance. |
| `Company` | `(data) -> CompanyEntity` | Create a Company entity instance. |
| `Core` | `(data) -> CoreEntity` | Create a Core entity instance. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `General` | `(data) -> GeneralEntity` | Create a General entity instance. |
| `GetCurrentInformation` | `(data) -> GetCurrentInformationEntity` | Create a GetCurrentInformation entity instance. |
| `GetInformationByIp` | `(data) -> GetInformationByIpEntity` | Create a GetInformationByIp entity instance. |
| `IpinfoCore` | `(data) -> IpinfoCoreEntity` | Create an IpinfoCore entity instance. |
| `IpinfoLite` | `(data) -> IpinfoLiteEntity` | Create an IpinfoLite entity instance. |
| `IpinfoPlus` | `(data) -> IpinfoPlusEntity` | Create an IpinfoPlus entity instance. |
| `Lite` | `(data) -> LiteEntity` | Create a Lite entity instance. |
| `Max` | `(data) -> MaxEntity` | Create a Max entity instance. |
| `Men` | `(data) -> MenEntity` | Create a Men entity instance. |
| `Place` | `(data) -> PlaceEntity` | Create a Place entity instance. |
| `Plus` | `(data) -> PlusEntity` | Create a Plus entity instance. |
| `Privacy` | `(data) -> PrivacyEntity` | Create a Privacy entity instance. |
| `PrivacyExtended` | `(data) -> PrivacyExtendedEntity` | Create a PrivacyExtended entity instance. |
| `Range` | `(data) -> RangeEntity` | Create a Range entity instance. |
| `ResidentialProxy` | `(data) -> ResidentialProxyEntity` | Create a ResidentialProxy entity instance. |
| `Single` | `(data) -> SingleEntity` | Create a Single entity instance. |
| `WhoisAsn` | `(data) -> WhoisAsnEntity` | Create a WhoisAsn entity instance. |
| `WhoisDomain` | `(data) -> WhoisDomainEntity` | Create a WhoisDomain entity instance. |
| `WhoisIp` | `(data) -> WhoisIpEntity` | Create a WhoisIp entity instance. |
| `WhoisNetId` | `(data) -> WhoisNetIdEntity` | Create a WhoisNetId entity instance. |
| `WhoisOrg` | `(data) -> WhoisOrgEntity` | Create a WhoisOrg entity instance. |
| `WhoisPoc` | `(data) -> WhoisPocEntity` | Create a WhoisPoc entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `IpinfoDeveloperError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Operations: Load.

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

Operations: List.

API path: `/AS{asn}`

#### Carrier

| Field | Description |
| --- | --- |
| `mcc` |  |
| `mnc` |  |
| `name` |  |

Operations: Load.

API path: `/{ip}/carrier`

#### Company

| Field | Description |
| --- | --- |
| `domain` |  |
| `name` |  |
| `type` |  |

Operations: Load.

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

Operations: Load.

API path: `/lookup/{ip}`

#### Domain

| Field | Description |
| --- | --- |
| `domain` |  |
| `ip` |  |
| `page` |  |
| `total` |  |

Operations: Load.

API path: `/domains/{ip}`

#### General

| Field | Description |
| --- | --- |
| `8_8_8_8` |  |
| `8_8_8_8city` |  |
| `summary` |  |
| `value` |  |

Operations: Create.

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

Operations: Load.

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

Operations: Load.

API path: `/{ip}`

#### IpinfoCore

| Field | Description |
| --- | --- |
| `city` |  |
| `key` |  |
| `region` |  |

Operations: Load.

API path: `/lookup/{ip}/{field}`

#### IpinfoLite

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/lite/{ip}/{field}`

#### IpinfoPlus

| Field | Description |
| --- | --- |
| `city` |  |
| `key` |  |
| `region` |  |

Operations: Load.

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

Operations: Load.

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

Operations: Load.

API path: `/max/{ip}`

#### Men

| Field | Description |
| --- | --- |
| `feature` |  |
| `request` |  |
| `token` |  |

Operations: Load.

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

Operations: Load.

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

Operations: Load.

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

Operations: Load.

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

Operations: List.

API path: `/{ip}/privacy_extended`

#### Range

| Field | Description |
| --- | --- |
| `domain` |  |
| `num_range` |  |
| `range` |  |
| `redirects_to` |  |

Operations: Load.

API path: `/ranges/{domain}`

#### ResidentialProxy

| Field | Description |
| --- | --- |
| `ip` |  |
| `last_seen` |  |
| `percent_days_seen` |  |
| `service` |  |

Operations: Load.

API path: `/{ip}/resproxy`

#### Single

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: List.

API path: `/whois/net/AS{asn}`

#### WhoisDomain

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{domain}`

#### WhoisIp

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{whoisip}`

#### WhoisNetId

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{whoisnetid}`

#### WhoisOrg

| Field | Description |
| --- | --- |
| `org` |  |
| `page` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/org/{whoisorgid}`

#### WhoisPoc

| Field | Description |
| --- | --- |
| `page` |  |
| `poc` |  |
| `record` |  |
| `total` |  |

Operations: Load.

API path: `/whois/poc/{whoispoc}`



## Entities


### Abuse

Create an instance: `abuse = client.Abuse`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `String` |  |
| `country` | `String` |  |
| `email` | `String` |  |
| `name` | `String` |  |
| `network` | `String` |  |
| `phone` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Abuse record (raises on error).
abuse = client.Abuse.load()
```


### Asn

Create an instance: `asn = client.Asn`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocated` | `String` |  |
| `asn` | `String` |  |
| `country` | `String` |  |
| `domain` | `String` |  |
| `downstream` | `Array` |  |
| `name` | `String` |  |
| `num_ip` | `Integer` |  |
| `peer` | `Array` |  |
| `prefix` | `Array` |  |
| `prefixes6` | `Array` |  |
| `registry` | `String` |  |
| `route` | `String` |  |
| `type` | `String` |  |
| `upstream` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Asn records (raises on error).
asns = client.Asn.list
```


### Carrier

Create an instance: `carrier = client.Carrier`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `mcc` | `String` |  |
| `mnc` | `String` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Carrier record (raises on error).
carrier = client.Carrier.load()
```


### Company

Create an instance: `company = client.Company`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `String` |  |
| `name` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Company record (raises on error).
company = client.Company.load()
```


### Core

Create an instance: `core = client.Core`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as` | `Hash` |  |
| `geo` | `Hash` |  |
| `hostname` | `String` |  |
| `ip` | `String` |  |
| `is_anonymous` | `Boolean` |  |
| `is_anycast` | `Boolean` |  |
| `is_hosting` | `Boolean` |  |
| `is_mobile` | `Boolean` |  |
| `is_satellite` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Core record (raises on error).
core = client.Core.load()
```


### Domain

Create an instance: `domain = client.Domain`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `Array` |  |
| `ip` | `String` |  |
| `page` | `Integer` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Domain record (raises on error).
domain = client.Domain.load({ "id" => "domain_id" })
```


### General

Create an instance: `general = client.General`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `8_8_8_8` | `Hash` |  |
| `8_8_8_8city` | `String` |  |
| `summary` | `String` |  |
| `value` | `Hash` |  |

#### Example: Create

```ruby
general = client.General.create({
})
```


### GetCurrentInformation

Create an instance: `get_current_information = client.GetCurrentInformation`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `Hash` |  |
| `bogon` | `Boolean` |  |
| `carrier` | `Hash` |  |
| `city` | `String` |  |
| `company` | `Hash` |  |
| `country` | `String` |  |
| `domain` | `Hash` |  |
| `hostname` | `String` |  |
| `ip` | `String` |  |
| `loc` | `String` |  |
| `org` | `String` |  |
| `postal` | `String` |  |
| `privacy` | `Hash` |  |
| `region` | `String` |  |
| `timezone` | `String` |  |

#### Example: Load

```ruby
# load returns the bare GetCurrentInformation record (raises on error).
get_current_information = client.GetCurrentInformation.load()
```


### GetInformationByIp

Create an instance: `get_information_by_ip = client.GetInformationByIp`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `Hash` |  |
| `bogon` | `Boolean` |  |
| `carrier` | `Hash` |  |
| `city` | `String` |  |
| `company` | `Hash` |  |
| `country` | `String` |  |
| `domain` | `Hash` |  |
| `hostname` | `String` |  |
| `ip` | `String` |  |
| `loc` | `String` |  |
| `org` | `String` |  |
| `postal` | `String` |  |
| `privacy` | `Hash` |  |
| `region` | `String` |  |
| `timezone` | `String` |  |

#### Example: Load

```ruby
# load returns the bare GetInformationByIp record (raises on error).
get_information_by_ip = client.GetInformationByIp.load({ "id" => "get_information_by_ip_id" })
```


### IpinfoCore

Create an instance: `ipinfo_core = client.IpinfoCore`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `String` |  |
| `key` | `String` |  |
| `region` | `String` |  |

#### Example: Load

```ruby
# load returns the bare IpinfoCore record (raises on error).
ipinfo_core = client.IpinfoCore.load()
```


### IpinfoLite

Create an instance: `ipinfo_lite = client.IpinfoLite`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare IpinfoLite record (raises on error).
ipinfo_lite = client.IpinfoLite.load({ "id" => "ipinfo_lite_id" })
```


### IpinfoPlus

Create an instance: `ipinfo_plus = client.IpinfoPlus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `String` |  |
| `key` | `String` |  |
| `region` | `String` |  |

#### Example: Load

```ruby
# load returns the bare IpinfoPlus record (raises on error).
ipinfo_plus = client.IpinfoPlus.load()
```


### Lite

Create an instance: `lite = client.Lite`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_domain` | `String` |  |
| `as_name` | `String` |  |
| `asn` | `String` |  |
| `continent` | `String` |  |
| `continent_code` | `String` |  |
| `country` | `String` |  |
| `country_code` | `String` |  |
| `ip` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Lite record (raises on error).
lite = client.Lite.load()
```


### Max

Create an instance: `max = client.Max`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `Hash` |  |
| `as` | `Hash` |  |
| `geo` | `Hash` |  |
| `hostname` | `String` |  |
| `ip` | `String` |  |
| `is_anonymous` | `Boolean` |  |
| `is_anycast` | `Boolean` |  |
| `is_hosting` | `Boolean` |  |
| `is_mobile` | `Boolean` |  |
| `is_satellite` | `Boolean` |  |
| `mobile` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Max record (raises on error).
max = client.Max.load({ "id" => "max_id" })
```


### Men

Create an instance: `men = client.Men`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `feature` | `Hash` |  |
| `request` | `Hash` |  |
| `token` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Men record (raises on error).
men = client.Men.load()
```


### Place

Create an instance: `place = client.Place`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `String` |  |
| `ip` | `String` |  |
| `latitude` | `Float` |  |
| `longitude` | `Float` |  |
| `name` | `String` |  |
| `ssid` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Place record (raises on error).
place = client.Place.load({ "id" => "place_id" })
```


### Plus

Create an instance: `plus = client.Plus`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `Hash` |  |
| `as` | `Hash` |  |
| `geo` | `Hash` |  |
| `ip` | `String` |  |
| `is_anonymous` | `Boolean` |  |
| `is_anycast` | `Boolean` |  |
| `is_hosting` | `Boolean` |  |
| `is_mobile` | `Boolean` |  |
| `is_satellite` | `Boolean` |  |
| `mobile` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Plus record (raises on error).
plus = client.Plus.load({ "id" => "plus_id" })
```


### Privacy

Create an instance: `privacy = client.Privacy`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hosting` | `Boolean` |  |
| `proxy` | `Boolean` |  |
| `relay` | `Boolean` |  |
| `service` | `String` |  |
| `tor` | `Boolean` |  |
| `vpn` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Privacy record (raises on error).
privacy = client.Privacy.load()
```


### PrivacyExtended

Create an instance: `privacy_extended = client.PrivacyExtended`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `census` | `Boolean` |  |
| `census_port` | `Array` |  |
| `confidence` | `Integer` |  |
| `coverage` | `Float` |  |
| `device_activity` | `Boolean` |  |
| `first_seen` | `String` |  |
| `hosting` | `Boolean` |  |
| `inferred` | `Boolean` |  |
| `last_seen` | `String` |  |
| `proxy` | `Boolean` |  |
| `relay` | `Boolean` |  |
| `service` | `String` |  |
| `tor` | `Boolean` |  |
| `vpn` | `Boolean` |  |
| `vpn_config` | `Boolean` |  |
| `whoi` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of PrivacyExtended records (raises on error).
privacy_extendeds = client.PrivacyExtended.list
```


### Range

Create an instance: `range = client.Range`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `String` |  |
| `num_range` | `String` |  |
| `range` | `Array` |  |
| `redirects_to` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Range record (raises on error).
range = client.Range.load({ "id" => "range_id" })
```


### ResidentialProxy

Create an instance: `residential_proxy = client.ResidentialProxy`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ip` | `String` |  |
| `last_seen` | `String` |  |
| `percent_days_seen` | `Integer` |  |
| `service` | `String` |  |

#### Example: Load

```ruby
# load returns the bare ResidentialProxy record (raises on error).
residential_proxy = client.ResidentialProxy.load()
```


### Single

Create an instance: `single = client.Single`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the bare Single record (raises on error).
single = client.Single.load()
```


### WhoisAsn

Create an instance: `whois_asn = client.WhoisAsn`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abuse` | `String` |  |
| `admin` | `String` |  |
| `country` | `String` |  |
| `id` | `String` |  |
| `maintainer` | `String` |  |
| `name` | `String` |  |
| `org` | `String` |  |
| `range` | `String` |  |
| `raw` | `String` |  |
| `source` | `String` |  |
| `status` | `String` |  |
| `tech` | `String` |  |
| `updated` | `String` |  |

#### Example: List

```ruby
# list returns an Array of WhoisAsn records (raises on error).
whois_asns = client.WhoisAsn.list
```


### WhoisDomain

Create an instance: `whois_domain = client.WhoisDomain`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `String` |  |
| `page` | `Integer` |  |
| `record` | `Array` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare WhoisDomain record (raises on error).
whois_domain = client.WhoisDomain.load()
```


### WhoisIp

Create an instance: `whois_ip = client.WhoisIp`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `String` |  |
| `page` | `Integer` |  |
| `record` | `Array` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare WhoisIp record (raises on error).
whois_ip = client.WhoisIp.load()
```


### WhoisNetId

Create an instance: `whois_net_id = client.WhoisNetId`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `String` |  |
| `page` | `Integer` |  |
| `record` | `Array` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare WhoisNetId record (raises on error).
whois_net_id = client.WhoisNetId.load()
```


### WhoisOrg

Create an instance: `whois_org = client.WhoisOrg`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `org` | `String` |  |
| `page` | `Integer` |  |
| `record` | `Array` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare WhoisOrg record (raises on error).
whois_org = client.WhoisOrg.load({ "id" => "whois_org_id" })
```


### WhoisPoc

Create an instance: `whois_poc = client.WhoisPoc`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page` | `Integer` |  |
| `poc` | `String` |  |
| `record` | `Array` |  |
| `total` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare WhoisPoc record (raises on error).
whois_poc = client.WhoisPoc.load({ "id" => "whois_poc_id" })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── IpinfoDeveloper_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`IpinfoDeveloper_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
abuse = client.Abuse
abuse.load()

# abuse.data_get now returns the abuse data from the last load
# abuse.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
