# IpinfoDeveloper Python SDK Reference

Complete API reference for the IpinfoDeveloper Python SDK.


## IpinfoDeveloperSDK

### Constructor

```python
from ipinfodeveloper_sdk import IpinfoDeveloperSDK

client = IpinfoDeveloperSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IpinfoDeveloperSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IpinfoDeveloperSDK.test()
```


### Instance Methods

#### `Abuse(data=None)`

Create a new `AbuseEntity` instance. Pass `None` for no initial data.

#### `Asn(data=None)`

Create a new `AsnEntity` instance. Pass `None` for no initial data.

#### `Carrier(data=None)`

Create a new `CarrierEntity` instance. Pass `None` for no initial data.

#### `Company(data=None)`

Create a new `CompanyEntity` instance. Pass `None` for no initial data.

#### `Core(data=None)`

Create a new `CoreEntity` instance. Pass `None` for no initial data.

#### `Domain(data=None)`

Create a new `DomainEntity` instance. Pass `None` for no initial data.

#### `General(data=None)`

Create a new `GeneralEntity` instance. Pass `None` for no initial data.

#### `GetCurrentInformation(data=None)`

Create a new `GetCurrentInformationEntity` instance. Pass `None` for no initial data.

#### `GetInformationByIp(data=None)`

Create a new `GetInformationByIpEntity` instance. Pass `None` for no initial data.

#### `IpinfoCore(data=None)`

Create a new `IpinfoCoreEntity` instance. Pass `None` for no initial data.

#### `IpinfoLite(data=None)`

Create a new `IpinfoLiteEntity` instance. Pass `None` for no initial data.

#### `IpinfoPlus(data=None)`

Create a new `IpinfoPlusEntity` instance. Pass `None` for no initial data.

#### `Lite(data=None)`

Create a new `LiteEntity` instance. Pass `None` for no initial data.

#### `Max(data=None)`

Create a new `MaxEntity` instance. Pass `None` for no initial data.

#### `Men(data=None)`

Create a new `MenEntity` instance. Pass `None` for no initial data.

#### `Place(data=None)`

Create a new `PlaceEntity` instance. Pass `None` for no initial data.

#### `Plus(data=None)`

Create a new `PlusEntity` instance. Pass `None` for no initial data.

#### `Privacy(data=None)`

Create a new `PrivacyEntity` instance. Pass `None` for no initial data.

#### `PrivacyExtended(data=None)`

Create a new `PrivacyExtendedEntity` instance. Pass `None` for no initial data.

#### `Range(data=None)`

Create a new `RangeEntity` instance. Pass `None` for no initial data.

#### `ResidentialProxy(data=None)`

Create a new `ResidentialProxyEntity` instance. Pass `None` for no initial data.

#### `Single(data=None)`

Create a new `SingleEntity` instance. Pass `None` for no initial data.

#### `WhoisAsn(data=None)`

Create a new `WhoisAsnEntity` instance. Pass `None` for no initial data.

#### `WhoisDomain(data=None)`

Create a new `WhoisDomainEntity` instance. Pass `None` for no initial data.

#### `WhoisIp(data=None)`

Create a new `WhoisIpEntity` instance. Pass `None` for no initial data.

#### `WhoisNetId(data=None)`

Create a new `WhoisNetIdEntity` instance. Pass `None` for no initial data.

#### `WhoisOrg(data=None)`

Create a new `WhoisOrgEntity` instance. Pass `None` for no initial data.

#### `WhoisPoc(data=None)`

Create a new `WhoisPocEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AbuseEntity

```python
abuse = client.Abuse()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No |  |
| `country` | `str` | No |  |
| `email` | `str` | No |  |
| `name` | `str` | No |  |
| `network` | `str` | No |  |
| `phone` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Abuse().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AbuseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AsnEntity

```python
asn = client.Asn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allocated` | `str` | No |  |
| `asn` | `str` | Yes |  |
| `country` | `str` | No |  |
| `domain` | `str` | Yes |  |
| `downstream` | `list` | No |  |
| `name` | `str` | Yes |  |
| `num_ip` | `int` | No |  |
| `peer` | `list` | No |  |
| `prefix` | `list` | No |  |
| `prefixes6` | `list` | No |  |
| `registry` | `str` | No |  |
| `route` | `str` | No |  |
| `type` | `str` | Yes |  |
| `upstream` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Asn().list()
for asn in results:
    print(asn)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AsnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CarrierEntity

```python
carrier = client.Carrier()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mcc` | `str` | Yes |  |
| `mnc` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Carrier().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CarrierEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CompanyEntity

```python
company = client.Company()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `str` | Yes |  |
| `name` | `str` | Yes |  |
| `type` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Company().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CompanyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CoreEntity

```python
core = client.Core()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as` | `dict` | No |  |
| `geo` | `dict` | No |  |
| `hostname` | `str` | No |  |
| `ip` | `str` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Core().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CoreEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainEntity

```python
domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `list` | No |  |
| `ip` | `str` | No |  |
| `page` | `int` | No |  |
| `total` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Domain().load({"id": "domain_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GeneralEntity

```python
general = client.General()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `8_8_8_8` | `dict` | No |  |
| `8_8_8_8city` | `str` | No |  |
| `summary` | `str` | No |  |
| `value` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.General().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeneralEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetCurrentInformationEntity

```python
get_current_information = client.GetCurrentInformation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `dict` | Yes |  |
| `bogon` | `bool` | No |  |
| `carrier` | `dict` | Yes |  |
| `city` | `str` | No |  |
| `company` | `dict` | Yes |  |
| `country` | `str` | No |  |
| `domain` | `dict` | Yes |  |
| `hostname` | `str` | No |  |
| `ip` | `str` | Yes |  |
| `loc` | `str` | No |  |
| `org` | `str` | No |  |
| `postal` | `str` | No |  |
| `privacy` | `dict` | Yes |  |
| `region` | `str` | No |  |
| `timezone` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetCurrentInformation().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetCurrentInformationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetInformationByIpEntity

```python
get_information_by_ip = client.GetInformationByIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asn` | `dict` | Yes |  |
| `bogon` | `bool` | No |  |
| `carrier` | `dict` | Yes |  |
| `city` | `str` | No |  |
| `company` | `dict` | Yes |  |
| `country` | `str` | No |  |
| `domain` | `dict` | Yes |  |
| `hostname` | `str` | No |  |
| `ip` | `str` | Yes |  |
| `loc` | `str` | No |  |
| `org` | `str` | No |  |
| `postal` | `str` | No |  |
| `privacy` | `dict` | Yes |  |
| `region` | `str` | No |  |
| `timezone` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.GetInformationByIp().load({"id": "get_information_by_ip_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetInformationByIpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IpinfoCoreEntity

```python
ipinfo_core = client.IpinfoCore()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | No |  |
| `key` | `str` | No |  |
| `region` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IpinfoCore().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpinfoCoreEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IpinfoLiteEntity

```python
ipinfo_lite = client.IpinfoLite()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IpinfoLite().load({"id": "ipinfo_lite_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpinfoLiteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IpinfoPlusEntity

```python
ipinfo_plus = client.IpinfoPlus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | No |  |
| `key` | `str` | No |  |
| `region` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.IpinfoPlus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IpinfoPlusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LiteEntity

```python
lite = client.Lite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_domain` | `str` | Yes |  |
| `as_name` | `str` | Yes |  |
| `asn` | `str` | Yes |  |
| `continent` | `str` | Yes |  |
| `continent_code` | `str` | Yes |  |
| `country` | `str` | Yes |  |
| `country_code` | `str` | Yes |  |
| `ip` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Lite().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiteEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MaxEntity

```python
max = client.Max()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `dict` | Yes |  |
| `as` | `dict` | Yes |  |
| `geo` | `dict` | Yes |  |
| `hostname` | `str` | No |  |
| `ip` | `str` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |
| `mobile` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Max().load({"id": "max_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MaxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MenEntity

```python
men = client.Men()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `feature` | `dict` | Yes |  |
| `request` | `dict` | Yes |  |
| `token` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Men().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlaceEntity

```python
place = client.Place()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | Yes |  |
| `ip` | `str` | Yes |  |
| `latitude` | `float` | Yes |  |
| `longitude` | `float` | Yes |  |
| `name` | `str` | Yes |  |
| `ssid` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Place().load({"id": "place_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlusEntity

```python
plus = client.Plus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anonymous` | `dict` | No |  |
| `as` | `dict` | No |  |
| `geo` | `dict` | No |  |
| `ip` | `str` | Yes |  |
| `is_anonymous` | `bool` | No |  |
| `is_anycast` | `bool` | No |  |
| `is_hosting` | `bool` | No |  |
| `is_mobile` | `bool` | No |  |
| `is_satellite` | `bool` | No |  |
| `mobile` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Plus().load({"id": "plus_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PrivacyEntity

```python
privacy = client.Privacy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hosting` | `bool` | Yes |  |
| `proxy` | `bool` | Yes |  |
| `relay` | `bool` | Yes |  |
| `service` | `str` | Yes |  |
| `tor` | `bool` | Yes |  |
| `vpn` | `bool` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Privacy().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PrivacyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PrivacyExtendedEntity

```python
privacy_extended = client.PrivacyExtended()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `census` | `bool` | No |  |
| `census_port` | `list` | No |  |
| `confidence` | `int` | No |  |
| `coverage` | `float` | No |  |
| `device_activity` | `bool` | No |  |
| `first_seen` | `str` | No |  |
| `hosting` | `bool` | Yes |  |
| `inferred` | `bool` | No |  |
| `last_seen` | `str` | No |  |
| `proxy` | `bool` | Yes |  |
| `relay` | `bool` | Yes |  |
| `service` | `str` | Yes |  |
| `tor` | `bool` | Yes |  |
| `vpn` | `bool` | Yes |  |
| `vpn_config` | `bool` | No |  |
| `whoi` | `bool` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PrivacyExtended().list()
for privacy_extended in results:
    print(privacy_extended)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PrivacyExtendedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RangeEntity

```python
range = client.Range()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `str` | Yes |  |
| `num_range` | `str` | Yes |  |
| `range` | `list` | Yes |  |
| `redirects_to` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Range().load({"id": "range_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RangeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ResidentialProxyEntity

```python
residential_proxy = client.ResidentialProxy()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ip` | `str` | Yes |  |
| `last_seen` | `str` | Yes |  |
| `percent_days_seen` | `int` | Yes |  |
| `service` | `str` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ResidentialProxy().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResidentialProxyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SingleEntity

```python
single = client.Single()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Single().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SingleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WhoisAsnEntity

```python
whois_asn = client.WhoisAsn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abuse` | `str` | No |  |
| `admin` | `str` | No |  |
| `country` | `str` | No |  |
| `id` | `str` | No |  |
| `maintainer` | `str` | No |  |
| `name` | `str` | No |  |
| `org` | `str` | No |  |
| `range` | `str` | No |  |
| `raw` | `str` | No |  |
| `source` | `str` | No |  |
| `status` | `str` | No |  |
| `tech` | `str` | No |  |
| `updated` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.WhoisAsn().list()
for whois_asn in results:
    print(whois_asn)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisAsnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WhoisDomainEntity

```python
whois_domain = client.WhoisDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `str` | No |  |
| `page` | `int` | No |  |
| `record` | `list` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WhoisDomain().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WhoisIpEntity

```python
whois_ip = client.WhoisIp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `str` | No |  |
| `page` | `int` | No |  |
| `record` | `list` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WhoisIp().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisIpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WhoisNetIdEntity

```python
whois_net_id = client.WhoisNetId()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `net` | `str` | No |  |
| `page` | `int` | No |  |
| `record` | `list` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WhoisNetId().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisNetIdEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WhoisOrgEntity

```python
whois_org = client.WhoisOrg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `org` | `str` | No |  |
| `page` | `int` | No |  |
| `record` | `list` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WhoisOrg().load({"id": "whois_org_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisOrgEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WhoisPocEntity

```python
whois_poc = client.WhoisPoc()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | `int` | No |  |
| `poc` | `str` | No |  |
| `record` | `list` | No |  |
| `total` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WhoisPoc().load({"id": "whois_poc_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoisPocEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = IpinfoDeveloperSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

