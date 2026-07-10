# IpinfoDeveloper Golang SDK



The Golang SDK for the IpinfoDeveloper API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Abuse(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/ipinfo-developer-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/ipinfo-developer-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/ipinfo-developer-sdk/go=../ipinfo-developer-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/ipinfo-developer-sdk/go"
)

func main() {
    client := sdk.NewIpinfoDeveloperSDK(map[string]any{
        "apikey": os.Getenv("IPINFO_DEVELOPER_APIKEY"),
    })

    // Load a single abuse — the value is the loaded record.
    abuse, err := client.Abuse(nil).Load(map[string]any{"ip": "example_ip"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(abuse)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
abuse, err := client.Abuse(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = abuse
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

abuse, err := client.Abuse(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(abuse) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewIpinfoDeveloperSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewIpinfoDeveloperSDK

```go
func NewIpinfoDeveloperSDK(options map[string]any) *IpinfoDeveloperSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *IpinfoDeveloperSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IpinfoDeveloperSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Abuse` | `(data map[string]any) IpinfoDeveloperEntity` | Create an Abuse entity instance. |
| `Asn` | `(data map[string]any) IpinfoDeveloperEntity` | Create an Asn entity instance. |
| `Carrier` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Carrier entity instance. |
| `Company` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Company entity instance. |
| `Core` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Core entity instance. |
| `Domain` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Domain entity instance. |
| `General` | `(data map[string]any) IpinfoDeveloperEntity` | Create a General entity instance. |
| `GetCurrentInformation` | `(data map[string]any) IpinfoDeveloperEntity` | Create a GetCurrentInformation entity instance. |
| `GetInformationByIp` | `(data map[string]any) IpinfoDeveloperEntity` | Create a GetInformationByIp entity instance. |
| `IpinfoCore` | `(data map[string]any) IpinfoDeveloperEntity` | Create an IpinfoCore entity instance. |
| `IpinfoLite` | `(data map[string]any) IpinfoDeveloperEntity` | Create an IpinfoLite entity instance. |
| `IpinfoPlus` | `(data map[string]any) IpinfoDeveloperEntity` | Create an IpinfoPlus entity instance. |
| `Lite` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Lite entity instance. |
| `Max` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Max entity instance. |
| `Men` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Men entity instance. |
| `Place` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Place entity instance. |
| `Plus` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Plus entity instance. |
| `Privacy` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Privacy entity instance. |
| `PrivacyExtended` | `(data map[string]any) IpinfoDeveloperEntity` | Create a PrivacyExtended entity instance. |
| `Range` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Range entity instance. |
| `ResidentialProxy` | `(data map[string]any) IpinfoDeveloperEntity` | Create a ResidentialProxy entity instance. |
| `Single` | `(data map[string]any) IpinfoDeveloperEntity` | Create a Single entity instance. |
| `WhoisAsn` | `(data map[string]any) IpinfoDeveloperEntity` | Create a WhoisAsn entity instance. |
| `WhoisDomain` | `(data map[string]any) IpinfoDeveloperEntity` | Create a WhoisDomain entity instance. |
| `WhoisIp` | `(data map[string]any) IpinfoDeveloperEntity` | Create a WhoisIp entity instance. |
| `WhoisNetId` | `(data map[string]any) IpinfoDeveloperEntity` | Create a WhoisNetId entity instance. |
| `WhoisOrg` | `(data map[string]any) IpinfoDeveloperEntity` | Create a WhoisOrg entity instance. |
| `WhoisPoc` | `(data map[string]any) IpinfoDeveloperEntity` | Create a WhoisPoc entity instance. |

### Entity interface (IpinfoDeveloperEntity)

All entities implement the `IpinfoDeveloperEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    abuse, err := client.Abuse(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // abuse is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Abuse

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"country"` |  |
| `"email"` |  |
| `"name"` |  |
| `"network"` |  |
| `"phone"` |  |

Operations: Load.

API path: `/{ip}/abuse`

#### Asn

| Field | Description |
| --- | --- |
| `"allocated"` |  |
| `"asn"` |  |
| `"country"` |  |
| `"domain"` |  |
| `"downstream"` |  |
| `"name"` |  |
| `"num_ip"` |  |
| `"peer"` |  |
| `"prefix"` |  |
| `"prefixes6"` |  |
| `"registry"` |  |
| `"route"` |  |
| `"type"` |  |
| `"upstream"` |  |

Operations: List.

API path: `/AS{asn}`

#### Carrier

| Field | Description |
| --- | --- |
| `"mcc"` |  |
| `"mnc"` |  |
| `"name"` |  |

Operations: Load.

API path: `/{ip}/carrier`

#### Company

| Field | Description |
| --- | --- |
| `"domain"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: Load.

API path: `/{ip}/company`

#### Core

| Field | Description |
| --- | --- |
| `"as"` |  |
| `"geo"` |  |
| `"hostname"` |  |
| `"ip"` |  |
| `"is_anonymous"` |  |
| `"is_anycast"` |  |
| `"is_hosting"` |  |
| `"is_mobile"` |  |
| `"is_satellite"` |  |

Operations: Load.

API path: `/lookup/{ip}`

#### Domain

| Field | Description |
| --- | --- |
| `"domain"` |  |
| `"ip"` |  |
| `"page"` |  |
| `"total"` |  |

Operations: Load.

API path: `/domains/{ip}`

#### General

| Field | Description |
| --- | --- |
| `"8_8_8_8"` |  |
| `"8_8_8_8city"` |  |
| `"summary"` |  |
| `"value"` |  |

Operations: Create.

API path: `/tools/map`

#### GetCurrentInformation

| Field | Description |
| --- | --- |
| `"asn"` |  |
| `"bogon"` |  |
| `"carrier"` |  |
| `"city"` |  |
| `"company"` |  |
| `"country"` |  |
| `"domain"` |  |
| `"hostname"` |  |
| `"ip"` |  |
| `"loc"` |  |
| `"org"` |  |
| `"postal"` |  |
| `"privacy"` |  |
| `"region"` |  |
| `"timezone"` |  |

Operations: Load.

API path: `/`

#### GetInformationByIp

| Field | Description |
| --- | --- |
| `"asn"` |  |
| `"bogon"` |  |
| `"carrier"` |  |
| `"city"` |  |
| `"company"` |  |
| `"country"` |  |
| `"domain"` |  |
| `"hostname"` |  |
| `"ip"` |  |
| `"loc"` |  |
| `"org"` |  |
| `"postal"` |  |
| `"privacy"` |  |
| `"region"` |  |
| `"timezone"` |  |

Operations: Load.

API path: `/{ip}`

#### IpinfoCore

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"key"` |  |
| `"region"` |  |

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
| `"city"` |  |
| `"key"` |  |
| `"region"` |  |

Operations: Load.

API path: `/plus/{ip}/{field}`

#### Lite

| Field | Description |
| --- | --- |
| `"as_domain"` |  |
| `"as_name"` |  |
| `"asn"` |  |
| `"continent"` |  |
| `"continent_code"` |  |
| `"country"` |  |
| `"country_code"` |  |
| `"ip"` |  |

Operations: Load.

API path: `/lite/me`

#### Max

| Field | Description |
| --- | --- |
| `"anonymous"` |  |
| `"as"` |  |
| `"geo"` |  |
| `"hostname"` |  |
| `"ip"` |  |
| `"is_anonymous"` |  |
| `"is_anycast"` |  |
| `"is_hosting"` |  |
| `"is_mobile"` |  |
| `"is_satellite"` |  |
| `"mobile"` |  |

Operations: Load.

API path: `/max/{ip}`

#### Men

| Field | Description |
| --- | --- |
| `"feature"` |  |
| `"request"` |  |
| `"token"` |  |

Operations: Load.

API path: `/me`

#### Place

| Field | Description |
| --- | --- |
| `"category"` |  |
| `"ip"` |  |
| `"latitude"` |  |
| `"longitude"` |  |
| `"name"` |  |
| `"ssid"` |  |

Operations: Load.

API path: `/places/{ip}`

#### Plus

| Field | Description |
| --- | --- |
| `"anonymous"` |  |
| `"as"` |  |
| `"geo"` |  |
| `"ip"` |  |
| `"is_anonymous"` |  |
| `"is_anycast"` |  |
| `"is_hosting"` |  |
| `"is_mobile"` |  |
| `"is_satellite"` |  |
| `"mobile"` |  |

Operations: Load.

API path: `/plus/{ip}`

#### Privacy

| Field | Description |
| --- | --- |
| `"hosting"` |  |
| `"proxy"` |  |
| `"relay"` |  |
| `"service"` |  |
| `"tor"` |  |
| `"vpn"` |  |

Operations: Load.

API path: `/{ip}/privacy`

#### PrivacyExtended

| Field | Description |
| --- | --- |
| `"census"` |  |
| `"census_port"` |  |
| `"confidence"` |  |
| `"coverage"` |  |
| `"device_activity"` |  |
| `"first_seen"` |  |
| `"hosting"` |  |
| `"inferred"` |  |
| `"last_seen"` |  |
| `"proxy"` |  |
| `"relay"` |  |
| `"service"` |  |
| `"tor"` |  |
| `"vpn"` |  |
| `"vpn_config"` |  |
| `"whoi"` |  |

Operations: List.

API path: `/{ip}/privacy_extended`

#### Range

| Field | Description |
| --- | --- |
| `"domain"` |  |
| `"num_range"` |  |
| `"range"` |  |
| `"redirects_to"` |  |

Operations: Load.

API path: `/ranges/{domain}`

#### ResidentialProxy

| Field | Description |
| --- | --- |
| `"ip"` |  |
| `"last_seen"` |  |
| `"percent_days_seen"` |  |
| `"service"` |  |

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
| `"abuse"` |  |
| `"admin"` |  |
| `"country"` |  |
| `"id"` |  |
| `"maintainer"` |  |
| `"name"` |  |
| `"org"` |  |
| `"range"` |  |
| `"raw"` |  |
| `"source"` |  |
| `"status"` |  |
| `"tech"` |  |
| `"updated"` |  |

Operations: List.

API path: `/whois/net/AS{asn}`

#### WhoisDomain

| Field | Description |
| --- | --- |
| `"net"` |  |
| `"page"` |  |
| `"record"` |  |
| `"total"` |  |

Operations: Load.

API path: `/whois/net/{domain}`

#### WhoisIp

| Field | Description |
| --- | --- |
| `"net"` |  |
| `"page"` |  |
| `"record"` |  |
| `"total"` |  |

Operations: Load.

API path: `/whois/net/{whoisip}`

#### WhoisNetId

| Field | Description |
| --- | --- |
| `"net"` |  |
| `"page"` |  |
| `"record"` |  |
| `"total"` |  |

Operations: Load.

API path: `/whois/net/{whoisnetid}`

#### WhoisOrg

| Field | Description |
| --- | --- |
| `"org"` |  |
| `"page"` |  |
| `"record"` |  |
| `"total"` |  |

Operations: Load.

API path: `/whois/org/{whoisorgid}`

#### WhoisPoc

| Field | Description |
| --- | --- |
| `"page"` |  |
| `"poc"` |  |
| `"record"` |  |
| `"total"` |  |

Operations: Load.

API path: `/whois/poc/{whoispoc}`



## Entities


### Abuse

Create an instance: `abuse := client.Abuse(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
abuse, err := client.Abuse(nil).Load(map[string]any{"ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(abuse) // the loaded record
```


### Asn

Create an instance: `asn := client.Asn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allocated` | `string` |  |
| `asn` | `string` |  |
| `country` | `string` |  |
| `domain` | `string` |  |
| `downstream` | `[]any` |  |
| `name` | `string` |  |
| `num_ip` | `int` |  |
| `peer` | `[]any` |  |
| `prefix` | `[]any` |  |
| `prefixes6` | `[]any` |  |
| `registry` | `string` |  |
| `route` | `string` |  |
| `type` | `string` |  |
| `upstream` | `[]any` |  |

#### Example: List

```go
asns, err := client.Asn(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(asns) // the array of records
```


### Carrier

Create an instance: `carrier := client.Carrier(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `mcc` | `string` |  |
| `mnc` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```go
carrier, err := client.Carrier(nil).Load(map[string]any{"ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(carrier) // the loaded record
```


### Company

Create an instance: `company := client.Company(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
company, err := client.Company(nil).Load(map[string]any{"ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(company) // the loaded record
```


### Core

Create an instance: `core := client.Core(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as` | `map[string]any` |  |
| `geo` | `map[string]any` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |

#### Example: Load

```go
core, err := client.Core(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(core) // the loaded record
```


### Domain

Create an instance: `domain := client.Domain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `[]any` |  |
| `ip` | `string` |  |
| `page` | `int` |  |
| `total` | `int` |  |

#### Example: Load

```go
domain, err := client.Domain(nil).Load(map[string]any{"id": "domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(domain) // the loaded record
```


### General

Create an instance: `general := client.General(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `8_8_8_8` | `map[string]any` |  |
| `8_8_8_8city` | `string` |  |
| `summary` | `string` |  |
| `value` | `map[string]any` |  |

#### Example: Create

```go
result, err := client.General(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### GetCurrentInformation

Create an instance: `getCurrentInformation := client.GetCurrentInformation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `map[string]any` |  |
| `bogon` | `bool` |  |
| `carrier` | `map[string]any` |  |
| `city` | `string` |  |
| `company` | `map[string]any` |  |
| `country` | `string` |  |
| `domain` | `map[string]any` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `loc` | `string` |  |
| `org` | `string` |  |
| `postal` | `string` |  |
| `privacy` | `map[string]any` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```go
getCurrentInformation, err := client.GetCurrentInformation(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getCurrentInformation) // the loaded record
```


### GetInformationByIp

Create an instance: `getInformationByIp := client.GetInformationByIp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asn` | `map[string]any` |  |
| `bogon` | `bool` |  |
| `carrier` | `map[string]any` |  |
| `city` | `string` |  |
| `company` | `map[string]any` |  |
| `country` | `string` |  |
| `domain` | `map[string]any` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `loc` | `string` |  |
| `org` | `string` |  |
| `postal` | `string` |  |
| `privacy` | `map[string]any` |  |
| `region` | `string` |  |
| `timezone` | `string` |  |

#### Example: Load

```go
getInformationByIp, err := client.GetInformationByIp(nil).Load(map[string]any{"id": "get_information_by_ip_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(getInformationByIp) // the loaded record
```


### IpinfoCore

Create an instance: `ipinfoCore := client.IpinfoCore(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `key` | `string` |  |
| `region` | `string` |  |

#### Example: Load

```go
ipinfoCore, err := client.IpinfoCore(nil).Load(map[string]any{"field": "field"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ipinfoCore) // the loaded record
```


### IpinfoLite

Create an instance: `ipinfoLite := client.IpinfoLite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
ipinfoLite, err := client.IpinfoLite(nil).Load(map[string]any{"id": "ipinfo_lite_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ipinfoLite) // the loaded record
```


### IpinfoPlus

Create an instance: `ipinfoPlus := client.IpinfoPlus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `key` | `string` |  |
| `region` | `string` |  |

#### Example: Load

```go
ipinfoPlus, err := client.IpinfoPlus(nil).Load(map[string]any{"field": "field"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ipinfoPlus) // the loaded record
```


### Lite

Create an instance: `lite := client.Lite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
lite, err := client.Lite(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(lite) // the loaded record
```


### Max

Create an instance: `max := client.Max(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `map[string]any` |  |
| `as` | `map[string]any` |  |
| `geo` | `map[string]any` |  |
| `hostname` | `string` |  |
| `ip` | `string` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |
| `mobile` | `map[string]any` |  |

#### Example: Load

```go
max, err := client.Max(nil).Load(map[string]any{"id": "max_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(max) // the loaded record
```


### Men

Create an instance: `men := client.Men(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `feature` | `map[string]any` |  |
| `request` | `map[string]any` |  |
| `token` | `string` |  |

#### Example: Load

```go
men, err := client.Men(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(men) // the loaded record
```


### Place

Create an instance: `place := client.Place(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `ip` | `string` |  |
| `latitude` | `float64` |  |
| `longitude` | `float64` |  |
| `name` | `string` |  |
| `ssid` | `string` |  |

#### Example: Load

```go
place, err := client.Place(nil).Load(map[string]any{"id": "place_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(place) // the loaded record
```


### Plus

Create an instance: `plus := client.Plus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | `map[string]any` |  |
| `as` | `map[string]any` |  |
| `geo` | `map[string]any` |  |
| `ip` | `string` |  |
| `is_anonymous` | `bool` |  |
| `is_anycast` | `bool` |  |
| `is_hosting` | `bool` |  |
| `is_mobile` | `bool` |  |
| `is_satellite` | `bool` |  |
| `mobile` | `map[string]any` |  |

#### Example: Load

```go
plus, err := client.Plus(nil).Load(map[string]any{"id": "plus_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(plus) // the loaded record
```


### Privacy

Create an instance: `privacy := client.Privacy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hosting` | `bool` |  |
| `proxy` | `bool` |  |
| `relay` | `bool` |  |
| `service` | `string` |  |
| `tor` | `bool` |  |
| `vpn` | `bool` |  |

#### Example: Load

```go
privacy, err := client.Privacy(nil).Load(map[string]any{"ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(privacy) // the loaded record
```


### PrivacyExtended

Create an instance: `privacyExtended := client.PrivacyExtended(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `census` | `bool` |  |
| `census_port` | `[]any` |  |
| `confidence` | `int` |  |
| `coverage` | `float64` |  |
| `device_activity` | `bool` |  |
| `first_seen` | `string` |  |
| `hosting` | `bool` |  |
| `inferred` | `bool` |  |
| `last_seen` | `string` |  |
| `proxy` | `bool` |  |
| `relay` | `bool` |  |
| `service` | `string` |  |
| `tor` | `bool` |  |
| `vpn` | `bool` |  |
| `vpn_config` | `bool` |  |
| `whoi` | `bool` |  |

#### Example: List

```go
privacyExtendeds, err := client.PrivacyExtended(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(privacyExtendeds) // the array of records
```


### Range

Create an instance: `range_ := client.Range(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `num_range` | `string` |  |
| `range` | `[]any` |  |
| `redirects_to` | `string` |  |

#### Example: Load

```go
range_, err := client.Range(nil).Load(map[string]any{"id": "range_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(range_) // the loaded record
```


### ResidentialProxy

Create an instance: `residentialProxy := client.ResidentialProxy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ip` | `string` |  |
| `last_seen` | `string` |  |
| `percent_days_seen` | `int` |  |
| `service` | `string` |  |

#### Example: Load

```go
residentialProxy, err := client.ResidentialProxy(nil).Load(map[string]any{"ip": "ip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(residentialProxy) // the loaded record
```


### Single

Create an instance: `single := client.Single(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
single, err := client.Single(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(single) // the loaded record
```


### WhoisAsn

Create an instance: `whoisAsn := client.WhoisAsn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
whoisAsns, err := client.WhoisAsn(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(whoisAsns) // the array of records
```


### WhoisDomain

Create an instance: `whoisDomain := client.WhoisDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `int` |  |
| `record` | `[]any` |  |
| `total` | `int` |  |

#### Example: Load

```go
whoisDomain, err := client.WhoisDomain(nil).Load(map[string]any{"domain": "domain"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whoisDomain) // the loaded record
```


### WhoisIp

Create an instance: `whoisIp := client.WhoisIp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `int` |  |
| `record` | `[]any` |  |
| `total` | `int` |  |

#### Example: Load

```go
whoisIp, err := client.WhoisIp(nil).Load(map[string]any{"whoisip": "whoisip"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whoisIp) // the loaded record
```


### WhoisNetId

Create an instance: `whoisNetId := client.WhoisNetId(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | `string` |  |
| `page` | `int` |  |
| `record` | `[]any` |  |
| `total` | `int` |  |

#### Example: Load

```go
whoisNetId, err := client.WhoisNetId(nil).Load(map[string]any{"whoisnetid": "whoisnetid"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whoisNetId) // the loaded record
```


### WhoisOrg

Create an instance: `whoisOrg := client.WhoisOrg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `org` | `string` |  |
| `page` | `int` |  |
| `record` | `[]any` |  |
| `total` | `int` |  |

#### Example: Load

```go
whoisOrg, err := client.WhoisOrg(nil).Load(map[string]any{"id": "whois_org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whoisOrg) // the loaded record
```


### WhoisPoc

Create an instance: `whoisPoc := client.WhoisPoc(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page` | `int` |  |
| `poc` | `string` |  |
| `record` | `[]any` |  |
| `total` | `int` |  |

#### Example: Load

```go
whoisPoc, err := client.WhoisPoc(nil).Load(map[string]any{"id": "whois_poc_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whoisPoc) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/ipinfo-developer-sdk/go/
├── ipinfo-developer.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/ipinfo-developer-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
abuse := client.Abuse(nil)
abuse.Load(nil, nil)

// abuse.Data() now returns the abuse data from the last load
// abuse.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
