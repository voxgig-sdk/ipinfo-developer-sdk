# IpinfoDeveloper Python SDK



The Python SDK for the IpinfoDeveloper API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Abuse()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from ipinfodeveloper_sdk import IpinfoDeveloperSDK

client = IpinfoDeveloperSDK({
    "apikey": os.environ.get("IPINFO_DEVELOPER_APIKEY"),
})
```

### 3. Load a core

Core is nested under ip, so provide the `ip`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    core = client.Core().load({"ip": "example_ip"})
    print(core)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    domain = client.Domain().load({"id": "example_id"})
    print(domain)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = IpinfoDeveloperSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
domain = client.Domain().load({"id": "test01"})
# domain contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = IpinfoDeveloperSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### IpinfoDeveloperSDK

```python
from ipinfodeveloper_sdk import IpinfoDeveloperSDK

client = IpinfoDeveloperSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = IpinfoDeveloperSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### IpinfoDeveloperSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
| `downstreams` |  |
| `name` |  |
| `num_ips` |  |
| `peers` |  |
| `prefixes` |  |
| `prefixes6` |  |
| `registry` |  |
| `route` |  |
| `type` |  |
| `upstreams` |  |

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
| `domains` |  |
| `id` |  |
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
| `domains` |  |
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
| `domains` |  |
| `hostname` |  |
| `id` |  |
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
| `id` |  |

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
| `id` |  |
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
| `features` |  |
| `requests` |  |
| `token` |  |

Operations: Load.

API path: `/me`

#### Place

| Field | Description |
| --- | --- |
| `category` |  |
| `id` |  |
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
| `id` |  |
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
| `census` | Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software. |
| `census_ports` | The ports we've gotten positive results for when running our VPN detection census |
| `confidence` | The level of confidence attributed to the best source associated with this range. |
| `coverage` | For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on. |
| `device_activity` | Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers) |
| `first_seen` | Date when the activity on an anonymous IP address was first observed. |
| `hosting` | Indicates a hosting/cloud service/data center IP address |
| `inferred` | Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs |
| `last_seen` | Date when the activity on an anonymous IP address was last/recently observed. |
| `proxy` | Indicates an open web proxy IP address |
| `relay` | Indicates a location-preserving anonymous relay service |
| `service` | Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names |
| `tor` | Indicates a Tor (The Onion Router) exit node IP address |
| `vpn` | Indicates Virtual Private Network (VPN) service exit node IP address |
| `vpn_config` | Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs |
| `whois` | Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers |

Operations: List.

API path: `/{ip}/privacy_extended`

#### Range

| Field | Description |
| --- | --- |
| `domain` |  |
| `id` |  |
| `num_ranges` |  |
| `ranges` |  |
| `redirects_to` |  |

Operations: Load.

API path: `/ranges/{domain}`

#### ResidentialProxy

| Field | Description |
| --- | --- |
| `ip` | The IPv4 or IPv6 address associated with a residential proxy |
| `last_seen` | The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC) |
| `percent_days_seen` | The percentage of days the IP was active in the last 7-day period |
| `service` | The name of the residential proxy service. |

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
| `records` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{domain}`

#### WhoisIp

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `records` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{whoisip}`

#### WhoisNetId

| Field | Description |
| --- | --- |
| `net` |  |
| `page` |  |
| `records` |  |
| `total` |  |

Operations: Load.

API path: `/whois/net/{whoisnetid}`

#### WhoisOrg

| Field | Description |
| --- | --- |
| `id` |  |
| `org` |  |
| `page` |  |
| `records` |  |
| `total` |  |

Operations: Load.

API path: `/whois/org/{whoisorgid}`

#### WhoisPoc

| Field | Description |
| --- | --- |
| `id` |  |
| `page` |  |
| `poc` |  |
| `records` |  |
| `total` |  |

Operations: Load.

API path: `/whois/poc/{whoispoc}`



## Entities


### Abuse

Create an instance: `abuse = client.Abuse()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `country` | `str` |  |
| `email` | `str` |  |
| `name` | `str` |  |
| `network` | `str` |  |
| `phone` | `str` |  |

#### Example: Load

```python
abuse = client.Abuse().load({"ip": "ip"})
```


### Asn

Create an instance: `asn = client.Asn()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocated` | `str` |  |
| `asn` | `str` |  |
| `country` | `str` |  |
| `domain` | `str` |  |
| `downstreams` | `list` |  |
| `name` | `str` |  |
| `num_ips` | `int` |  |
| `peers` | `list` |  |
| `prefixes` | `list` |  |
| `prefixes6` | `list` |  |
| `registry` | `str` |  |
| `route` | `str` |  |
| `type` | `str` |  |
| `upstreams` | `list` |  |

#### Example: List

```python
asns = client.Asn().list({"asn": 1})
```


### Carrier

Create an instance: `carrier = client.Carrier()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `mcc` | `str` |  |
| `mnc` | `str` |  |
| `name` | `str` |  |

#### Example: Load

```python
carrier = client.Carrier().load({"ip": "ip"})
```


### Company

Create an instance: `company = client.Company()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `str` |  |
| `name` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
company = client.Company().load({"ip": "ip"})
```


### Core

Create an instance: `core = client.Core()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as` | `dict` |  |
| `geo` | `dict` |  |
| `hostname` | `str` |  |
| `ip` | `str` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |

#### Example: Load

```python
core = client.Core().load({"ip": "ip"})
```


### Domain

Create an instance: `domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domains` | `list` |  |
| `id` | `str` |  |
| `ip` | `str` |  |
| `page` | `int` |  |
| `total` | `int` |  |

#### Example: Load

```python
domain = client.Domain().load({"id": "domain_id"})
```


### General

Create an instance: `general = client.General()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `8_8_8_8` | `dict` |  |
| `8_8_8_8city` | `str` |  |
| `summary` | `str` |  |
| `value` | `dict` |  |

#### Example: Create

```python
general = client.General().create({
})
```


### GetCurrentInformation

Create an instance: `get_current_information = client.GetCurrentInformation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `dict` |  |
| `bogon` | `bool` |  |
| `carrier` | `dict` |  |
| `city` | `str` |  |
| `company` | `dict` |  |
| `country` | `str` |  |
| `domains` | `dict` |  |
| `hostname` | `str` |  |
| `ip` | `str` |  |
| `loc` | `str` |  |
| `org` | `str` |  |
| `postal` | `str` |  |
| `privacy` | `dict` |  |
| `region` | `str` |  |
| `timezone` | `str` |  |

#### Example: Load

```python
get_current_information = client.GetCurrentInformation().load()
```


### GetInformationByIp

Create an instance: `get_information_by_ip = client.GetInformationByIp()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `dict` |  |
| `bogon` | `bool` |  |
| `carrier` | `dict` |  |
| `city` | `str` |  |
| `company` | `dict` |  |
| `country` | `str` |  |
| `domains` | `dict` |  |
| `hostname` | `str` |  |
| `id` | `str` |  |
| `ip` | `str` |  |
| `loc` | `str` |  |
| `org` | `str` |  |
| `postal` | `str` |  |
| `privacy` | `dict` |  |
| `region` | `str` |  |
| `timezone` | `str` |  |

#### Example: Load

```python
get_information_by_ip = client.GetInformationByIp().load({"id": "get_information_by_ip_id"})
```


### IpinfoCore

Create an instance: `ipinfo_core = client.IpinfoCore()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `key` | `str` |  |
| `region` | `str` |  |

#### Example: Load

```python
ipinfo_core = client.IpinfoCore().load({"field": "field"})
```


### IpinfoLite

Create an instance: `ipinfo_lite = client.IpinfoLite()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
ipinfo_lite = client.IpinfoLite().load({"id": "ipinfo_lite_id"})
```


### IpinfoPlus

Create an instance: `ipinfo_plus = client.IpinfoPlus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `key` | `str` |  |
| `region` | `str` |  |

#### Example: Load

```python
ipinfo_plus = client.IpinfoPlus().load({"field": "field"})
```


### Lite

Create an instance: `lite = client.Lite()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_domain` | `str` |  |
| `as_name` | `str` |  |
| `asn` | `str` |  |
| `continent` | `str` |  |
| `continent_code` | `str` |  |
| `country` | `str` |  |
| `country_code` | `str` |  |
| `ip` | `str` |  |

#### Example: Load

```python
lite = client.Lite().load()
```


### Max

Create an instance: `max = client.Max()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `dict` |  |
| `as` | `dict` |  |
| `geo` | `dict` |  |
| `hostname` | `str` |  |
| `id` | `str` |  |
| `ip` | `str` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |
| `mobile` | `dict` |  |

#### Example: Load

```python
max = client.Max().load({"id": "max_id"})
```


### Men

Create an instance: `men = client.Men()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `features` | `dict` |  |
| `requests` | `dict` |  |
| `token` | `str` |  |

#### Example: Load

```python
men = client.Men().load()
```


### Place

Create an instance: `place = client.Place()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` |  |
| `id` | `str` |  |
| `ip` | `str` |  |
| `latitude` | `float` |  |
| `longitude` | `float` |  |
| `name` | `str` |  |
| `ssid` | `str` |  |

#### Example: Load

```python
place = client.Place().load({"id": "place_id"})
```


### Plus

Create an instance: `plus = client.Plus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `dict` |  |
| `as` | `dict` |  |
| `geo` | `dict` |  |
| `id` | `str` |  |
| `ip` | `str` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |
| `mobile` | `dict` |  |

#### Example: Load

```python
plus = client.Plus().load({"id": "plus_id"})
```


### Privacy

Create an instance: `privacy = client.Privacy()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hosting` | `bool` |  |
| `proxy` | `bool` |  |
| `relay` | `bool` |  |
| `service` | `str` |  |
| `tor` | `bool` |  |
| `vpn` | `bool` |  |

#### Example: Load

```python
privacy = client.Privacy().load({"ip": "ip"})
```


### PrivacyExtended

Create an instance: `privacy_extended = client.PrivacyExtended()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `census` | `bool` | Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software. |
| `census_ports` | `list` | The ports we've gotten positive results for when running our VPN detection census |
| `confidence` | `int` | The level of confidence attributed to the best source associated with this range. |
| `coverage` | `float` | For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on. |
| `device_activity` | `bool` | Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers) |
| `first_seen` | `str` | Date when the activity on an anonymous IP address was first observed. |
| `hosting` | `bool` | Indicates a hosting/cloud service/data center IP address |
| `inferred` | `bool` | Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs |
| `last_seen` | `str` | Date when the activity on an anonymous IP address was last/recently observed. |
| `proxy` | `bool` | Indicates an open web proxy IP address |
| `relay` | `bool` | Indicates a location-preserving anonymous relay service |
| `service` | `str` | Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names |
| `tor` | `bool` | Indicates a Tor (The Onion Router) exit node IP address |
| `vpn` | `bool` | Indicates Virtual Private Network (VPN) service exit node IP address |
| `vpn_config` | `bool` | Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs |
| `whois` | `bool` | Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers |

#### Example: List

```python
privacy_extendeds = client.PrivacyExtended().list({"ip": "example"})
```


### Range

Create an instance: `range = client.Range()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `str` |  |
| `id` | `str` |  |
| `num_ranges` | `str` |  |
| `ranges` | `list` |  |
| `redirects_to` | `str` |  |

#### Example: Load

```python
range = client.Range().load({"id": "range_id"})
```


### ResidentialProxy

Create an instance: `residential_proxy = client.ResidentialProxy()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ip` | `str` | The IPv4 or IPv6 address associated with a residential proxy |
| `last_seen` | `str` | The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC) |
| `percent_days_seen` | `int` | The percentage of days the IP was active in the last 7-day period |
| `service` | `str` | The name of the residential proxy service. |

#### Example: Load

```python
residential_proxy = client.ResidentialProxy().load({"ip": "ip"})
```


### Single

Create an instance: `single = client.Single()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
single = client.Single().load()
```


### WhoisAsn

Create an instance: `whois_asn = client.WhoisAsn()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abuse` | `str` |  |
| `admin` | `str` |  |
| `country` | `str` |  |
| `id` | `str` |  |
| `maintainer` | `str` |  |
| `name` | `str` |  |
| `org` | `str` |  |
| `range` | `str` |  |
| `raw` | `str` |  |
| `source` | `str` |  |
| `status` | `str` |  |
| `tech` | `str` |  |
| `updated` | `str` |  |

#### Example: List

```python
whois_asns = client.WhoisAsn().list({"asn": 1})
```


### WhoisDomain

Create an instance: `whois_domain = client.WhoisDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `str` |  |
| `page` | `int` |  |
| `records` | `list` |  |
| `total` | `int` |  |

#### Example: Load

```python
whois_domain = client.WhoisDomain().load({"domain": "domain"})
```


### WhoisIp

Create an instance: `whois_ip = client.WhoisIp()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `str` |  |
| `page` | `int` |  |
| `records` | `list` |  |
| `total` | `int` |  |

#### Example: Load

```python
whois_ip = client.WhoisIp().load({"whoisip": "whoisip"})
```


### WhoisNetId

Create an instance: `whois_net_id = client.WhoisNetId()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `str` |  |
| `page` | `int` |  |
| `records` | `list` |  |
| `total` | `int` |  |

#### Example: Load

```python
whois_net_id = client.WhoisNetId().load({"whoisnetid": "whoisnetid"})
```


### WhoisOrg

Create an instance: `whois_org = client.WhoisOrg()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `org` | `str` |  |
| `page` | `int` |  |
| `records` | `list` |  |
| `total` | `int` |  |

#### Example: Load

```python
whois_org = client.WhoisOrg().load({"id": "whois_org_id"})
```


### WhoisPoc

Create an instance: `whois_poc = client.WhoisPoc()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `page` | `int` |  |
| `poc` | `str` |  |
| `records` | `list` |  |
| `total` | `int` |  |

#### Example: Load

```python
whois_poc = client.WhoisPoc().load({"id": "whois_poc_id"})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── ipinfodeveloper_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`ipinfodeveloper_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
domain = client.Domain()
domain.load({"id": "example_id"})

# domain.data_get() now returns the domain data from the last load
# domain.match_get() returns the last match criteria
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
