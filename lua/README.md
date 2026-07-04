# IpinfoDeveloper Lua SDK



The Lua SDK for the IpinfoDeveloper API — an entity-oriented client using Lua conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("ipinfo-developer_sdk")

local client = sdk.new({
  apikey = os.getenv("IPINFO_DEVELOPER_APIKEY"),
})
```

### 3. Load an abuse

```lua
local abuse, err = client:Abuse():load({ id = "example_id" })
if err then error(err) end
print(abuse)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Abuse():load({ id = "test01" })
-- result is the loaded data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### IpinfoDeveloperSDK

```lua
local sdk = require("ipinfo-developer_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IpinfoDeveloperSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local abuse, err = client:Abuse():load({ id = "example_id" })
    if err then error(err) end
    -- abuse is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local abuse = client:Abuse(nil)`

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

```lua
local abuse, err = client:Abuse():load({ id = "abuse_id" })
```


### Asn

Create an instance: `local asn = client:Asn(nil)`

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

```lua
local asns, err = client:Asn():list()
```


### Carrier

Create an instance: `local carrier = client:Carrier(nil)`

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

```lua
local carrier, err = client:Carrier():load({ id = "carrier_id" })
```


### Company

Create an instance: `local company = client:Company(nil)`

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

```lua
local company, err = client:Company():load({ id = "company_id" })
```


### Core

Create an instance: `local core = client:Core(nil)`

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

```lua
local core, err = client:Core():load({ id = "core_id" })
```


### Domain

Create an instance: `local domain = client:Domain(nil)`

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

```lua
local domain, err = client:Domain():load({ id = "domain_id" })
```


### General

Create an instance: `local general = client:General(nil)`

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

```lua
local general, err = client:General():create({
})
```


### GetCurrentInformation

Create an instance: `local get_current_information = client:GetCurrentInformation(nil)`

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

```lua
local get_current_information, err = client:GetCurrentInformation():load({ id = "get_current_information_id" })
```


### GetInformationByIp

Create an instance: `local get_information_by_ip = client:GetInformationByIp(nil)`

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

```lua
local get_information_by_ip, err = client:GetInformationByIp():load({ id = "get_information_by_ip_id" })
```


### IpinfoCore

Create an instance: `local ipinfo_core = client:IpinfoCore(nil)`

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

```lua
local ipinfo_core, err = client:IpinfoCore():load({ id = "ipinfo_core_id" })
```


### IpinfoLite

Create an instance: `local ipinfo_lite = client:IpinfoLite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local ipinfo_lite, err = client:IpinfoLite():load({ id = "ipinfo_lite_id" })
```


### IpinfoPlus

Create an instance: `local ipinfo_plus = client:IpinfoPlus(nil)`

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

```lua
local ipinfo_plus, err = client:IpinfoPlus():load({ id = "ipinfo_plus_id" })
```


### Lite

Create an instance: `local lite = client:Lite(nil)`

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

```lua
local lite, err = client:Lite():load({ id = "lite_id" })
```


### Max

Create an instance: `local max = client:Max(nil)`

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

```lua
local max, err = client:Max():load({ id = "max_id" })
```


### Men

Create an instance: `local men = client:Men(nil)`

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

```lua
local men, err = client:Men():load({ id = "men_id" })
```


### Place

Create an instance: `local place = client:Place(nil)`

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

```lua
local place, err = client:Place():load({ id = "place_id" })
```


### Plus

Create an instance: `local plus = client:Plus(nil)`

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

```lua
local plus, err = client:Plus():load({ id = "plus_id" })
```


### Privacy

Create an instance: `local privacy = client:Privacy(nil)`

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

```lua
local privacy, err = client:Privacy():load({ id = "privacy_id" })
```


### PrivacyExtended

Create an instance: `local privacy_extended = client:PrivacyExtended(nil)`

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

```lua
local privacy_extendeds, err = client:PrivacyExtended():list()
```


### Range

Create an instance: `local range = client:Range(nil)`

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

```lua
local range, err = client:Range():load({ id = "range_id" })
```


### ResidentialProxy

Create an instance: `local residential_proxy = client:ResidentialProxy(nil)`

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

```lua
local residential_proxy, err = client:ResidentialProxy():load({ id = "residential_proxy_id" })
```


### Single

Create an instance: `local single = client:Single(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local single, err = client:Single():load({ id = "single_id" })
```


### WhoisAsn

Create an instance: `local whois_asn = client:WhoisAsn(nil)`

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

```lua
local whois_asns, err = client:WhoisAsn():list()
```


### WhoisDomain

Create an instance: `local whois_domain = client:WhoisDomain(nil)`

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

```lua
local whois_domain, err = client:WhoisDomain():load({ id = "whois_domain_id" })
```


### WhoisIp

Create an instance: `local whois_ip = client:WhoisIp(nil)`

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

```lua
local whois_ip, err = client:WhoisIp():load({ id = "whois_ip_id" })
```


### WhoisNetId

Create an instance: `local whois_net_id = client:WhoisNetId(nil)`

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

```lua
local whois_net_id, err = client:WhoisNetId():load({ id = "whois_net_id_id" })
```


### WhoisOrg

Create an instance: `local whois_org = client:WhoisOrg(nil)`

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

```lua
local whois_org, err = client:WhoisOrg():load({ id = "whois_org_id" })
```


### WhoisPoc

Create an instance: `local whois_poc = client:WhoisPoc(nil)`

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

```lua
local whois_poc, err = client:WhoisPoc():load({ id = "whois_poc_id" })
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── ipinfo-developer_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`ipinfo-developer_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local abuse = client:Abuse()
abuse:load({ id = "example_id" })

-- abuse:data_get() now returns the loaded abuse data
-- abuse:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
