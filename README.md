# IpinfoDeveloper SDK

IP address intelligence with geolocation, ASN, company, privacy, carrier, and WHOIS data across Lite, Core, and Plus tiers

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About IPinfo.io OpenAPI Specification

[IPinfo](https://ipinfo.io/) is an IP address data provider offering geolocation, network ownership, privacy detection, and related intelligence over a single HTTP API. The service is delivered across tiered product lines (Lite, Core, Plus, Max, Enterprise) with daily data refresh and IPv4/IPv6 coverage.

What you can pull from the API:

- Geolocation: city, region, country, coordinates, timezone, postal code
- Network: ASN, organisation, route/prefix, IP range lookups
- Privacy signals: VPN, proxy, Tor, relay, hosting, and residential-proxy detection
- Attribution: company name and domain, hosted domains per IP
- Carrier: mobile network operator and MCC/MNC where applicable
- WHOIS: ASN, domain, IP, net, organisation, and POC records
- Abuse contact details for an IP

Requests authenticate via an API token. The free Lite tier returns a reduced field set; richer attributes (privacy_extended, residential_proxy, carrier, company, etc.) are gated to paid tiers. CORS is enabled, making the API usable directly from browsers.

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

## 30-second quickstart

### TypeScript

```ts
import { IpinfoDeveloperSDK } from 'ipinfo-developer'

const client = new IpinfoDeveloperSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

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
| **Abuse** | Abuse-contact details (email, address, network) associated with an IP. | `/{ip}/abuse` |
| **Asn** | Autonomous System data: ASN number, name, route/prefix, and registry information. | `/AS{asn}` |
| **Carrier** | Mobile carrier attribution including network name and MCC/MNC codes where available. | `/{ip}/carrier` |
| **Company** | Company attribution: name, domain, and ownership type tied to an IP. | `/{ip}/company` |
| **Core** | Core-tier response: city-level geolocation plus VPN/proxy detection and expanded network attributes. | `/lookup/{ip}` |
| **Domain** | Hosted-domains data listing domains observed on a given IP. | `/domains/{ip}` |
| **General** | Top-level requester lookup returning the basic IP details for the calling client (`GET /json`). | `/tools/map` |
| **GetCurrentInformation** | Returns intelligence about the caller's own IP address without specifying one. | `/` |
| **GetInformationByIp** | Looks up intelligence for a specific IP address passed in the path. | `/{ip}` |
| **IpinfoCore** | Core-tier endpoint variant returning city-level geolocation and basic privacy signals. | `/lookup/{ip}/{field}` |
| **IpinfoLite** | Lite-tier endpoint variant exposing the free country-level geolocation and ASN fields. | `/lite/{ip}/{field}` |
| **IpinfoPlus** | Plus-tier endpoint variant returning the extended attribute set with named anonymizers. | `/plus/{ip}/{field}` |
| **Lite** | Free Lite-tier response: country-level geolocation and ASN data with a small attribute set. | `/lite/me` |
| **Max** | Max-tier response with full anonymisation visibility including residential proxy tracking. | `/max/{ip}` |
| **Men** | Mobile/MNO-related grouping covering mobile-network attribution attributes. | `/me` |
| **Place** | Place-level geographic detail such as city, region, and postal location attached to an IP. | `/places/{ip}` |
| **Plus** | Plus-tier response: high-resolution IP data with named anonymizers, geo radius, and change tracking. | `/plus/{ip}` |
| **Privacy** | Privacy detection fields flagging VPN, proxy, Tor, relay, and hosting use. | `/{ip}/privacy` |
| **PrivacyExtended** | Extended privacy signals such as named anonymizer service and richer proxy categorisation. | `/{ip}/privacy_extended` |
| **Range** | IP range lookups returning details about the network block containing an address. | `/ranges/{domain}` |
| **ResidentialProxy** | Residential proxy behaviour indicators for an IP address. | `/{ip}/resproxy` |
| **Single** | Single-IP lookup variant returning a record for one address. | `/{ip}/city` |
| **WhoisAsn** | WHOIS record for an autonomous system (ASN). | `/whois/net/AS{asn}` |
| **WhoisDomain** | WHOIS record for a domain name. | `/whois/net/{domain}` |
| **WhoisIp** | WHOIS record for an IP address. | `/whois/net/{whoisip}` |
| **WhoisNetId** | WHOIS record for a network identifier (net handle). | `/whois/net/{whoisnetid}` |
| **WhoisOrg** | WHOIS record for an organisation handle. | `/whois/org/{whoisorgid}` |
| **WhoisPoc** | WHOIS record for a point-of-contact handle. | `/whois/poc/{whoispoc}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from ipinfodeveloper_sdk import IpinfoDeveloperSDK

client = IpinfoDeveloperSDK({})


# Load a specific abuse
abuse, err = client.Abuse(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'ipinfodeveloper_sdk.php';

$client = new IpinfoDeveloperSDK([]);


// Load a specific abuse
[$abuse, $err] = $client->Abuse(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/ipinfo-developer-sdk/go"

client := sdk.NewIpinfoDeveloperSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "IpinfoDeveloper_sdk"

client = IpinfoDeveloperSDK.new({})


# Load a specific abuse
abuse, err = client.Abuse(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("ipinfo-developer_sdk")

local client = sdk.new({})


-- Load a specific abuse
local abuse, err = client:Abuse(nil):load(
  { id = "example_id" }, nil
)
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
client = IpinfoDeveloperSDK.test(None, None)
result, err = client.Abuse(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = IpinfoDeveloperSDK::test(null, null);
[$result, $err] = $client->Abuse(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Abuse(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = IpinfoDeveloperSDK.test(nil, nil)
result, err = client.Abuse(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Abuse(nil):load(
  { id = "test01" }, nil
)
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

## Using the IPinfo.io OpenAPI Specification

- Upstream: [https://ipinfo.io/](https://ipinfo.io/)
- API docs: [https://ipinfo.io/developers](https://ipinfo.io/developers)

- Commercial service operated by [IPinfo](https://ipinfo.io/)
- Free Lite tier provides country-level geolocation and ASN data with unlimited requests
- Higher tiers (Core, Plus, Max, Enterprise) unlock city-level geolocation, VPN/proxy detection, carrier, company, and WHOIS data
- Token-based authentication is required for tier-specific endpoints; check the [pricing page](https://ipinfo.io/pricing) for current terms

---

Generated from the IPinfo.io OpenAPI Specification OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
