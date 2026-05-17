# IpinfoDeveloper SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


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

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/ipinfo-developer-sdk/go"

client := sdk.NewIpinfoDeveloperSDK(map[string]any{
    "apikey": os.Getenv("IPINFO-DEVELOPER_APIKEY"),
})

```

### Lua

```lua
local sdk = require("ipinfo-developer_sdk")

local client = sdk.new({
  apikey = os.getenv("IPINFO-DEVELOPER_APIKEY"),
})


-- Load a specific abuse
local abuse, err = client:Abuse(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'ipinfodeveloper_sdk.php';

$client = new IpinfoDeveloperSDK([
    "apikey" => getenv("IPINFO-DEVELOPER_APIKEY"),
]);


// Load a specific abuse
[$abuse, $err] = $client->Abuse(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from ipinfodeveloper_sdk import IpinfoDeveloperSDK

client = IpinfoDeveloperSDK({
    "apikey": os.environ.get("IPINFO-DEVELOPER_APIKEY"),
})


# Load a specific abuse
abuse, err = client.Abuse(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "IpinfoDeveloper_sdk"

client = IpinfoDeveloperSDK.new({
  "apikey" => ENV["IPINFO-DEVELOPER_APIKEY"],
})


# Load a specific abuse
abuse, err = client.Abuse(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { IpinfoDeveloperSDK } from 'ipinfo-developer'

const client = new IpinfoDeveloperSDK({
  apikey: process.env.IPINFO-DEVELOPER_APIKEY,
})

```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Abuse(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Abuse(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = IpinfoDeveloperSDK::test(null, null);
[$result, $err] = $client->Abuse(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = IpinfoDeveloperSDK.test(None, None)
result, err = client.Abuse(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = IpinfoDeveloperSDK.test(nil, nil)
result, err = client.Abuse(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = IpinfoDeveloperSDK.test()
const result = await client.Abuse().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

