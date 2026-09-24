# IPinfo.io OpenAPI Specification

Official OpenAPI Specification for IPinfo&#39;s comprehensive IP intelligence API. This specification defines all endpoints for IP geolocation, ASN data, company information, privacy detection, and specialized data services. ## Authentication All endpoints support three authentication methods: - **HTTP Basic Auth**: Use your token as the username with empty password - **Bearer Token**: Include token in Authorization header - **Query Parameter**: Pass token as `?token=YOUR_TOKEN` [Learn more about authentication](https://ipinfo.io/developers#authentication) ## IPinfo API Tiers IPinfo offers three main API tiers with different feature sets: ### IPinfo Lite Lightweight IP geolocation with essential information including ASN details, country, and continent data. Perfect for basic geolocation needs with fast response times. Unlimited requests on paid plans. - Endpoints: `/lite/me`, `/lite/&#123;ip&#125;`, `/lite/&#123;ip&#125;/&#123;field&#125;` - Base URL: `https://api.ipinfo.io/` - [Documentation](https://ipinfo.io/developers/lite-api) ### IPinfo Core Comprehensive IP information with detailed geolocation data (city, region, coordinates, postal code, timezone), ASN information, and classification boolean flags (anycast, hosting, mobile, satellite). - Endpoints: `/lookup/me`, `/lookup/&#123;ip&#125;`, `/lookup/&#123;ip&#125;/&#123;field&#125;` - Base URL: `https://api.ipinfo.io/` - [Documentation](https://ipinfo.io/developers/core-api) ### IPinfo Plus All Core features plus mobile/carrier detection, anonymity analysis (VPN, proxy, Tor, relay detection), service identification, and extended geographic metadata. Ideal for security, fraud prevention, and advanced analytics. - Endpoints: `/plus/me`, `/plus/&#123;ip&#125;`, `/plus/&#123;ip&#125;/&#123;field&#125;` - Base URL: `https://api.ipinfo.io/` - [Documentation](https://ipinfo.io/developers/plus-api) ## Specialized Detection APIs ### Residential Proxy Detection Detect residential, mobile, and datacenter proxy IPs with activity insights, last seen dates, and proxy service identification. - Endpoints: `/&#123;ip&#125;/resproxy` - [Documentation](https://ipinfo.io/developers/residential-proxy-api) ### Privacy Detection Standard Detect VPNs, proxies, Tor exit nodes, relays, and hosting providers associated with an IP address. Returns core privacy signals including service provider identification. - Endpoints: `/&#123;ip&#125;/privacy` - [Documentation](https://ipinfo.io/developers/privacy-standard-api) ### Privacy Detection Extended Advanced anonymous IP detection with detailed methodologies, confidence metrics, and metadata for VPNs, proxies, Tor, hosting providers, and relays. - Endpoints: `/&#123;ip&#125;/privacy_extended` - [Documentation](https://ipinfo.io/developers/privacy-extended-api) ## Legacy API Products For backwards compatibility, legacy endpoints remain available: - [IP to Geolocation API](https://ipinfo.io/products/ip-geolocation-api) - Use Core or Plus instead - [IP to Privacy Detection API](https://ipinfo.io/products/proxy-vpn-detection-api) - Use Plus instead - [ASN API](https://ipinfo.io/products/asn-api) - `/AS&#123;asn&#125;` endpoint - [IP to Company API](https://ipinfo.io/products/ip-company-api) - `/&#123;ip&#125;/company` endpoint - [Hosted Domains API](https://ipinfo.io/products/reverse-ip-api) - `/domains/&#123;ip&#125;` endpoint - [IP to Phone Carrier Detection API](https://ipinfo.io/products/ip-carrier-api) - `/&#123;ip&#125;/carrier` endpoint - [IP to Abuse Contact API](https://ipinfo.io/products/ip-abuse-contact-api) - `/&#123;ip&#125;/abuse` endpoint - [IP WHOIS API](https://ipinfo.io/products/whois-api) - `/whois/*` endpoints ## Special Endpoints - **Token Info**: `/me` - View request limits and API access for your token - **Batch Requests**: `/batch` - Enrich multiple IPs in a single request - **IP Summarization**: `/tools/summarize-ips` - Analyze up to 500,000 IPs - **IP Mapping**: `/tools/map` - Visualize up to 500,000 IPs on an interactive map - **Single Field**: `/&#123;ip&#125;/&#123;field&#125;` - Get specific field values as plaintext ## Rate Limits - **IPinfo Lite**: Unlimited requests on paid plans - **Paid Plans**: Monthly request limits with configurable alerts and automatic metered billing - **Rate Limit Exceeded**: 429 HTTP status code when limit reached [View pricing and limits](https://ipinfo.io/pricing) ## Resources - **Developer Portal**: [https://ipinfo.io/developers](https://ipinfo.io/developers) - **API Libraries**: Official libraries for Python, Node.js, Java, Ruby, PHP, Go, and more - **Sign Up**: [Free account](https://ipinfo.io/signup) with up to 50,000 requests/month - **Community Support**: [https://community.ipinfo.io/](https://community.ipinfo.io/) - **Email Support**: support@ipinfo.io ---

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 28 entities and 53 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Abuse

Results: Abuse response object.

SDK operations: `load`.

### Asn

Results: ASN response object.

SDK operations: `list`.

### Carrier

Results: Carrier detection response object.

SDK operations: `load`.

### Company

Results: Company response object.

SDK operations: `load`.

### Core

Results: Core response object.

SDK operations: `load`.

### Domain

Results: Domains response object.

SDK operations: `load`.

### General

Results: Map response object.; Summarize response object.; Batch response object.

SDK operations: `create`.

### GetCurrentInformation

Results: Full response object.

SDK operations: `load`.

### GetInformationByIp

Results: Full response object.

SDK operations: `load`.

### IpinfoCore

Results: A specific field value from the core response.

SDK operations: `load`.

### IpinfoLite

Results: A specific field value from the lite response.; Lite response object or bogon response.

SDK operations: `load`.

### IpinfoPlus

Results: A specific field value from the plus response.

SDK operations: `load`.

### Lite

Results: Lite response object.

SDK operations: `load`.

### Max

Results: Max API response object.

SDK operations: `load`.

### Men

Results: IPinfo access token rate and access information.

SDK operations: `load`.

### Place

Results: Places API response object.

SDK operations: `load`.

### Plus

Results: Plus response object.

SDK operations: `load`.

### Privacy

Results: Privacy response.

SDK operations: `load`.

### PrivacyExtended

Results: Privacy Detection Extended response with detailed methodologies.

SDK operations: `list`.

Key fields to recognise:

- `census`: Ranges where we&#39;ve observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software. Ranges with the census flag are those where these scans obtained positive results
- `census_ports`: The ports we&#39;ve gotten positive results for when running our VPN detection census
- `confidence`: The level of confidence attributed to the best source associated with this range. Level 3 - Direct observation of commercial use (vpn_config). Level 2 - Direct observation of VPN software running on the range (census) + registrar information associated with VPNs or specific providers OR highly convincing device activity. Level 1 - Direct observation of VPN software running on the range (census) without known association to specific providers or VPNs in general OR suspicious device data not associated with hosting ranges
- `coverage`: For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on. For IPs/ranges we&#39;ve fully directly observed VPN evidence on, this value is 1.0
- `device_activity`: Ranges on which we&#39;ve observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)

### Range

Results: Ranges response object.

SDK operations: `load`.

### ResidentialProxy

Results: Residential Proxy detection response.

SDK operations: `load`.

Key fields to recognise:

- `ip`: The IPv4 or IPv6 address associated with a residential proxy
- `last_seen`: The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)
- `percent_days_seen`: The percentage of days the IP was active in the last 7-day period
- `service`: The name of the residential proxy service. Suffixed with _mobile for carrier/mobile or _datacenter for datacenter proxies

### Single

Results: The city name of the IP address.; Name of the country in the 2 letter ISO 3166-1 alpha-2 for the IP address.; Hostname of the IP address.; Public IP address.; Geographic coordinate of the IP address in the format of `&lt;latitude&gt;, &lt;longitude&gt;`.; ASN and AS organization name for the IP address.; Postal code or zip code for the IP address.; The name of the region or state of the IP address.; Timezone of the located IP address in the format of IANA Time Zones.

SDK operations: `load`.

### WhoisAsn

Results: WHOIS ASN response.

SDK operations: `list`.

### WhoisDomain

Results: WHOIS Domain response.

SDK operations: `load`.

### WhoisIp

Results: WHOIS IP and IP range response.

SDK operations: `load`.

### WhoisNetId

Results: WHOIS Network (NET) ID response.

SDK operations: `load`.

### WhoisOrg

Results: WHOIS organization (ORG) ID response.

SDK operations: `load`.

### WhoisPoc

Results: WHOIS Point of Contact (POC) response.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Abuse | `load` | `GET /{ip}/abuse` | Required |
| Asn | `list` | `GET /AS{asn}` | Required |
| Carrier | `load` | `GET /{ip}/carrier` | Required |
| Company | `load` | `GET /{ip}/company` | Required |
| Core | `load` | `GET /lookup/{ip}` | Required |
| Core | `load` | `GET /lookup/me` | Required |
| Domain | `load` | `GET /domains/{ip}` | Required |
| General | `create` | `POST /tools/map` | Required |
| General | `create` | `POST /tools/summarize-ips` | Required |
| General | `create` | `POST /batch` | Required |
| GetCurrentInformation | `load` | `GET /` | Required |
| GetInformationByIp | `load` | `GET /{ip}` | Required |
| IpinfoCore | `load` | `GET /lookup/{ip}/{field}` | Required |
| IpinfoCore | `load` | `GET /lookup/me/{field}` | Required |
| IpinfoLite | `load` | `GET /lite/{ip}/{field}` | Required |
| IpinfoLite | `load` | `GET /lite/me/{field}` | Required |
| IpinfoLite | `load` | `GET /lite/{ip}` | Required |
| IpinfoPlus | `load` | `GET /plus/{ip}/{field}` | Required |
| IpinfoPlus | `load` | `GET /plus/me/{field}` | Required |
| Lite | `load` | `GET /lite/me` | Required |
| Max | `load` | `GET /max/{ip}` | Required |
| Men | `load` | `GET /me` | Required |
| Place | `load` | `GET /places/{ip}` | Required |
| Plus | `load` | `GET /plus/{ip}` | Required |
| Plus | `load` | `GET /plus/me` | Required |
| Privacy | `load` | `GET /{ip}/privacy` | Required |
| PrivacyExtended | `list` | `GET /{ip}/privacy_extended` | Required |
| Range | `load` | `GET /ranges/{domain}` | Required |
| ResidentialProxy | `load` | `GET /{ip}/resproxy` | Required |
| Single | `load` | `GET /{ip}/city` | Required |
| Single | `load` | `GET /{ip}/country` | Required |
| Single | `load` | `GET /{ip}/hostname` | Required |
| Single | `load` | `GET /{ip}/ip` | Required |
| Single | `load` | `GET /{ip}/loc` | Required |
| Single | `load` | `GET /{ip}/org` | Required |
| Single | `load` | `GET /{ip}/postal` | Required |
| Single | `load` | `GET /{ip}/region` | Required |
| Single | `load` | `GET /{ip}/timezone` | Required |
| Single | `load` | `GET /city` | Required |
| Single | `load` | `GET /country` | Required |
| Single | `load` | `GET /hostname` | Required |
| Single | `load` | `GET /ip` | Required |
| Single | `load` | `GET /loc` | Required |
| Single | `load` | `GET /org` | Required |
| Single | `load` | `GET /postal` | Required |
| Single | `load` | `GET /region` | Required |
| Single | `load` | `GET /timezone` | Required |
| WhoisAsn | `list` | `GET /whois/net/AS{asn}` | Required |
| WhoisDomain | `load` | `GET /whois/net/{domain}` | Required |
| WhoisIp | `load` | `GET /whois/net/{whoisip}` | Required |
| WhoisNetId | `load` | `GET /whois/net/{whoisnetid}` | Required |
| WhoisOrg | `load` | `GET /whois/org/{whoisorgid}` | Required |
| WhoisPoc | `load` | `GET /whois/poc/{whoispoc}` | Required |

## Connect to the API

- API server: `https://ipinfo.io/`
- API server: `https://v6.ipinfo.io/`
- API server: `https://api.ipinfo.io/`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `ipinfo-developer_list`: List records for an entity. Supported entities: `asn`, `privacy_extended`, `whois_asn`.
- `ipinfo-developer_load`: Load one record for an entity. Supported entities: `abuse`, `carrier`, `company`, `core`, `domain`, `get_current_information`, `get_information_by_ip`, `ipinfo_core`, `ipinfo_lite`, `ipinfo_plus`, `lite`, `max`, `men`, `place`, `plus`, `privacy`, `range`, `residential_proxy`, `single`, `whois_domain`, `whois_ip`, `whois_net_id`, `whois_org`, `whois_poc`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

