# IpinfoDeveloper SDK

IPinfo.io OpenAPI Specification client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## Try it

**TypeScript**
```bash
npm install ipinfo-developer
```

**Python**
```bash
pip install ipinfo-developer-sdk
```

**PHP**
```bash
composer require voxgig/ipinfo-developer-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/ipinfo-developer-sdk/go
```

**Ruby**
```bash
gem install ipinfo-developer-sdk
```

**Lua**
```bash
luarocks install ipinfo-developer-sdk
```

## Quickstart

### TypeScript

```ts
import { IpinfoDeveloperSDK } from 'ipinfo-developer'

const client = new IpinfoDeveloperSDK({
  apikey: process.env.IPINFO-DEVELOPER_APIKEY,
})

// Load abuse data
const abuse = await client.Abuse().load({})
console.log(abuse.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o ipinfo-developer-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "ipinfo-developer": {
      "command": "/abs/path/to/ipinfo-developer-mcp"
    }
  }
}
```

## Entities

The API exposes 28 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Abuse** |  | `/{ip}/abuse` |
| **Asn** |  | `/AS{asn}` |
| **Carrier** |  | `/{ip}/carrier` |
| **Company** |  | `/{ip}/company` |
| **Core** |  | `/lookup/{ip}` |
| **Domain** |  | `/domains/{ip}` |
| **General** |  | `/tools/map` |
| **GetCurrentInformation** |  | `/` |
| **GetInformationByIp** |  | `/{ip}` |
| **IpinfoCore** |  | `/lookup/{ip}/{field}` |
| **IpinfoLite** |  | `/lite/{ip}/{field}` |
| **IpinfoPlus** |  | `/plus/{ip}/{field}` |
| **Lite** |  | `/lite/me` |
| **Max** |  | `/max/{ip}` |
| **Men** |  | `/me` |
| **Place** |  | `/places/{ip}` |
| **Plus** |  | `/plus/{ip}` |
| **Privacy** |  | `/{ip}/privacy` |
| **PrivacyExtended** |  | `/{ip}/privacy_extended` |
| **Range** |  | `/ranges/{domain}` |
| **ResidentialProxy** |  | `/{ip}/resproxy` |
| **Single** |  | `/{ip}/city` |
| **WhoisAsn** |  | `/whois/net/AS{asn}` |
| **WhoisDomain** |  | `/whois/net/{domain}` |
| **WhoisIp** |  | `/whois/net/{whoisip}` |
| **WhoisNetId** |  | `/whois/net/{whoisnetid}` |
| **WhoisOrg** |  | `/whois/org/{whoisorgid}` |
| **WhoisPoc** |  | `/whois/poc/{whoispoc}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from ipinfodeveloper_sdk import IpinfoDeveloperSDK

client = IpinfoDeveloperSDK({
    "apikey": os.environ.get("IPINFO-DEVELOPER_APIKEY"),
})


# Load a specific abuse
abuse, err = client.Abuse().load({"id": "example_id"})
print(abuse)
```

### PHP

```php
<?php
require_once 'ipinfodeveloper_sdk.php';

$client = new IpinfoDeveloperSDK([
    "apikey" => getenv("IPINFO-DEVELOPER_APIKEY"),
]);


// Load a specific abuse
[$abuse, $err] = $client->Abuse()->load(["id" => "example_id"]);
print_r($abuse);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ipinfo-developer-sdk/go"

client := sdk.NewIpinfoDeveloperSDK(map[string]any{
    "apikey": os.Getenv("IPINFO-DEVELOPER_APIKEY"),
})

// Load abuse data
abuse, err := client.Abuse(nil).Load(map[string]any{}, nil)
fmt.Println(abuse)
```

### Ruby

```ruby
require_relative "IpinfoDeveloper_sdk"

client = IpinfoDeveloperSDK.new({
  "apikey" => ENV["IPINFO-DEVELOPER_APIKEY"],
})


# Load a specific abuse
abuse, err = client.Abuse().load({ "id" => "example_id" })
puts abuse
```

### Lua

```lua
local sdk = require("ipinfo-developer_sdk")

local client = sdk.new({
  apikey = os.getenv("IPINFO-DEVELOPER_APIKEY"),
})


-- Load a specific abuse
local abuse, err = client:Abuse():load({ id = "example_id" })
print(abuse)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = IpinfoDeveloperSDK.test()
const result = await client.Abuse().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = IpinfoDeveloperSDK.test()
result, err = client.Abuse().load({"id": "test01"})
```

### PHP

```php
$client = IpinfoDeveloperSDK::test();
[$result, $err] = $client->Abuse()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Abuse(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IpinfoDeveloperSDK.test
result, err = client.Abuse().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Abuse():load({ id = "test01" })
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

---

Generated from the IPinfo.io OpenAPI Specification OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
