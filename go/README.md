# IpinfoDeveloper Golang SDK



The Golang SDK for the IpinfoDeveloper API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

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
    abuse, err := client.Abuse(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(abuse)
}
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
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(abuse) // the loaded mock data
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
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    abuse, err := client.Abuse(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // abuse is the loaded record

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
| `address` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `network` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |

#### Example: Load

```go
abuse, err := client.Abuse(nil).Load(map[string]any{"id": "abuse_id"}, nil)
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
| `mcc` | ``$STRING`` |  |
| `mnc` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
carrier, err := client.Carrier(nil).Load(map[string]any{"id": "carrier_id"}, nil)
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
| `domain` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```go
company, err := client.Company(nil).Load(map[string]any{"id": "company_id"}, nil)
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

```go
core, err := client.Core(nil).Load(map[string]any{"id": "core_id"}, nil)
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
| `domain` | ``$ARRAY`` |  |
| `ip` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `total` | ``$INTEGER`` |  |

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
| `8_8_8_8` | ``$OBJECT`` |  |
| `8_8_8_8city` | ``$STRING`` |  |
| `summary` | ``$STRING`` |  |
| `value` | ``$OBJECT`` |  |

#### Example: Create

```go
result, err := client.General(nil).Create(map[string]any{
}, nil)
```


### GetCurrentInformation

Create an instance: `get_current_information := client.GetCurrentInformation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
get_current_information, err := client.GetCurrentInformation(nil).Load(map[string]any{"id": "get_current_information_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(get_current_information) // the loaded record
```


### GetInformationByIp

Create an instance: `get_information_by_ip := client.GetInformationByIp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
get_information_by_ip, err := client.GetInformationByIp(nil).Load(map[string]any{"id": "get_information_by_ip_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(get_information_by_ip) // the loaded record
```


### IpinfoCore

Create an instance: `ipinfo_core := client.IpinfoCore(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `key` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |

#### Example: Load

```go
ipinfo_core, err := client.IpinfoCore(nil).Load(map[string]any{"id": "ipinfo_core_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ipinfo_core) // the loaded record
```


### IpinfoLite

Create an instance: `ipinfo_lite := client.IpinfoLite(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
ipinfo_lite, err := client.IpinfoLite(nil).Load(map[string]any{"id": "ipinfo_lite_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ipinfo_lite) // the loaded record
```


### IpinfoPlus

Create an instance: `ipinfo_plus := client.IpinfoPlus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | ``$STRING`` |  |
| `key` | ``$STRING`` |  |
| `region` | ``$STRING`` |  |

#### Example: Load

```go
ipinfo_plus, err := client.IpinfoPlus(nil).Load(map[string]any{"id": "ipinfo_plus_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ipinfo_plus) // the loaded record
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
| `as_domain` | ``$STRING`` |  |
| `as_name` | ``$STRING`` |  |
| `asn` | ``$STRING`` |  |
| `continent` | ``$STRING`` |  |
| `continent_code` | ``$STRING`` |  |
| `country` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |

#### Example: Load

```go
lite, err := client.Lite(nil).Load(map[string]any{"id": "lite_id"}, nil)
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
| `feature` | ``$OBJECT`` |  |
| `request` | ``$OBJECT`` |  |
| `token` | ``$STRING`` |  |

#### Example: Load

```go
men, err := client.Men(nil).Load(map[string]any{"id": "men_id"}, nil)
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
| `category` | ``$STRING`` |  |
| `ip` | ``$STRING`` |  |
| `latitude` | ``$NUMBER`` |  |
| `longitude` | ``$NUMBER`` |  |
| `name` | ``$STRING`` |  |
| `ssid` | ``$STRING`` |  |

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
| `hosting` | ``$BOOLEAN`` |  |
| `proxy` | ``$BOOLEAN`` |  |
| `relay` | ``$BOOLEAN`` |  |
| `service` | ``$STRING`` |  |
| `tor` | ``$BOOLEAN`` |  |
| `vpn` | ``$BOOLEAN`` |  |

#### Example: Load

```go
privacy, err := client.Privacy(nil).Load(map[string]any{"id": "privacy_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(privacy) // the loaded record
```


### PrivacyExtended

Create an instance: `privacy_extended := client.PrivacyExtended(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
privacy_extendeds, err := client.PrivacyExtended(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(privacy_extendeds) // the array of records
```


### Range

Create an instance: `range := client.Range(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | ``$STRING`` |  |
| `num_range` | ``$STRING`` |  |
| `range` | ``$ARRAY`` |  |
| `redirects_to` | ``$STRING`` |  |

#### Example: Load

```go
range, err := client.Range(nil).Load(map[string]any{"id": "range_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(range) // the loaded record
```


### ResidentialProxy

Create an instance: `residential_proxy := client.ResidentialProxy(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ip` | ``$STRING`` |  |
| `last_seen` | ``$STRING`` |  |
| `percent_days_seen` | ``$INTEGER`` |  |
| `service` | ``$STRING`` |  |

#### Example: Load

```go
residential_proxy, err := client.ResidentialProxy(nil).Load(map[string]any{"id": "residential_proxy_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(residential_proxy) // the loaded record
```


### Single

Create an instance: `single := client.Single(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
single, err := client.Single(nil).Load(map[string]any{"id": "single_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(single) // the loaded record
```


### WhoisAsn

Create an instance: `whois_asn := client.WhoisAsn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
whois_asns, err := client.WhoisAsn(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(whois_asns) // the array of records
```


### WhoisDomain

Create an instance: `whois_domain := client.WhoisDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```go
whois_domain, err := client.WhoisDomain(nil).Load(map[string]any{"id": "whois_domain_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whois_domain) // the loaded record
```


### WhoisIp

Create an instance: `whois_ip := client.WhoisIp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```go
whois_ip, err := client.WhoisIp(nil).Load(map[string]any{"id": "whois_ip_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whois_ip) // the loaded record
```


### WhoisNetId

Create an instance: `whois_net_id := client.WhoisNetId(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `net` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```go
whois_net_id, err := client.WhoisNetId(nil).Load(map[string]any{"id": "whois_net_id_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whois_net_id) // the loaded record
```


### WhoisOrg

Create an instance: `whois_org := client.WhoisOrg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `org` | ``$STRING`` |  |
| `page` | ``$INTEGER`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```go
whois_org, err := client.WhoisOrg(nil).Load(map[string]any{"id": "whois_org_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whois_org) // the loaded record
```


### WhoisPoc

Create an instance: `whois_poc := client.WhoisPoc(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page` | ``$INTEGER`` |  |
| `poc` | ``$STRING`` |  |
| `record` | ``$ARRAY`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```go
whois_poc, err := client.WhoisPoc(nil).Load(map[string]any{"id": "whois_poc_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(whois_poc) // the loaded record
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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
abuse.Load(map[string]any{"id": "example_id"}, nil)

// abuse.Data() now returns the loaded abuse data
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
