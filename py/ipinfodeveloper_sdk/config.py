# IpinfoDeveloper SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "IpinfoDeveloper",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://ipinfo.io/",
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "abuse": {},
                "asn": {},
                "carrier": {},
                "company": {},
                "core": {},
                "domain": {},
                "general": {},
                "get_current_information": {},
                "get_information_by_ip": {},
                "ipinfo_core": {},
                "ipinfo_lite": {},
                "ipinfo_plus": {},
                "lite": {},
                "max": {},
                "men": {},
                "place": {},
                "plus": {},
                "privacy": {},
                "privacy_extended": {},
                "range": {},
                "residential_proxy": {},
                "single": {},
                "whois_asn": {},
                "whois_domain": {},
                "whois_ip": {},
                "whois_net_id": {},
                "whois_org": {},
                "whois_poc": {},
            },
        },
        "entity": {
      "abuse": {
        "fields": [
          {
            "name": "address",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "network",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "type": "`$STRING`",
          },
        ],
        "name": "abuse",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/abuse",
                "parts": [
                  "{ip}",
                  "abuse",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "asn": {
        "fields": [
          {
            "name": "allocated",
            "type": "`$STRING`",
          },
          {
            "name": "asn",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "domain",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "downstreams",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "num_ips",
            "type": "`$INTEGER`",
          },
          {
            "name": "peers",
            "type": "`$ARRAY`",
          },
          {
            "name": "prefixes",
            "type": "`$ARRAY`",
          },
          {
            "name": "prefixes6",
            "type": "`$ARRAY`",
          },
          {
            "name": "registry",
            "type": "`$STRING`",
          },
          {
            "name": "route",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "upstreams",
            "type": "`$ARRAY`",
          },
        ],
        "name": "asn",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "asn",
                      "orig": "asn",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/AS{asn}",
                "parts": [
                  "AS{asn}",
                ],
                "select": {
                  "exist": [
                    "asn",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "carrier": {
        "fields": [
          {
            "name": "mcc",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "mnc",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "carrier",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/carrier",
                "parts": [
                  "{ip}",
                  "carrier",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "company": {
        "fields": [
          {
            "name": "domain",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "company",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/company",
                "parts": [
                  "{ip}",
                  "company",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "core": {
        "fields": [
          {
            "name": "as",
            "type": "`$OBJECT`",
          },
          {
            "name": "geo",
            "type": "`$OBJECT`",
          },
          {
            "name": "hostname",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "is_anonymous",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_anycast",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_hosting",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_mobile",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_satellite",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "core",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lookup/{ip}",
                "parts": [
                  "lookup",
                  "{ip}",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/lookup/me",
                "parts": [
                  "lookup",
                  "me",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "lookup",
            ],
          ],
        },
      },
      "domain": {
        "fields": [
          {
            "name": "domains",
            "type": "`$ARRAY`",
          },
          {
            "name": "ip",
            "type": "`$STRING`",
          },
          {
            "name": "page",
            "type": "`$INTEGER`",
          },
          {
            "name": "total",
            "req": True,
            "type": "`$INTEGER`",
          },
        ],
        "name": "domain",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": 100,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/domains/{ip}",
                "parts": [
                  "domains",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "limit",
                    "page",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "general": {
        "fields": [
          {
            "name": "8_8_8_8",
            "type": "`$OBJECT`",
          },
          {
            "name": "8_8_8_8city",
            "type": "`$STRING`",
          },
          {
            "name": "summary",
            "type": "`$STRING`",
          },
          {
            "name": "value",
            "type": "`$OBJECT`",
          },
        ],
        "name": "general",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "cli",
                      "orig": "cli",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/tools/map",
                "parts": [
                  "tools",
                  "map",
                ],
                "select": {
                  "exist": [
                    "cli",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "example": 1,
                      "kind": "query",
                      "name": "cli",
                      "orig": "cli",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/tools/summarize-ips",
                "parts": [
                  "tools",
                  "summarize-ips",
                ],
                "select": {
                  "exist": [
                    "cli",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/batch",
                "parts": [
                  "batch",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_current_information": {
        "fields": [
          {
            "name": "asn",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "bogon",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "carrier",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "city",
            "type": "`$STRING`",
          },
          {
            "name": "company",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "domains",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "hostname",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "loc",
            "type": "`$STRING`",
          },
          {
            "name": "org",
            "type": "`$STRING`",
          },
          {
            "name": "postal",
            "type": "`$STRING`",
          },
          {
            "name": "privacy",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "region",
            "type": "`$STRING`",
          },
          {
            "name": "timezone",
            "type": "`$STRING`",
          },
        ],
        "name": "get_current_information",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_information_by_ip": {
        "fields": [
          {
            "name": "asn",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "bogon",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "carrier",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "city",
            "type": "`$STRING`",
          },
          {
            "name": "company",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "domains",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "hostname",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "loc",
            "type": "`$STRING`",
          },
          {
            "name": "org",
            "type": "`$STRING`",
          },
          {
            "name": "postal",
            "type": "`$STRING`",
          },
          {
            "name": "privacy",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "region",
            "type": "`$STRING`",
          },
          {
            "name": "timezone",
            "type": "`$STRING`",
          },
        ],
        "name": "get_information_by_ip",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ipinfo_core": {
        "fields": [
          {
            "name": "city",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "type": "`$STRING`",
          },
        ],
        "name": "ipinfo_core",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "field",
                      "orig": "field",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lookup/{ip}/{field}",
                "parts": [
                  "lookup",
                  "{ip}",
                  "{field}",
                ],
                "select": {
                  "exist": [
                    "field",
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "field",
                      "orig": "field",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lookup/me/{field}",
                "parts": [
                  "lookup",
                  "me",
                  "{field}",
                ],
                "select": {
                  "exist": [
                    "field",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "me",
            ],
            [
              "lookup",
            ],
          ],
        },
      },
      "ipinfo_lite": {
        "fields": [],
        "name": "ipinfo_lite",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "field",
                      "orig": "field",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lite/{ip}/{field}",
                "parts": [
                  "lite",
                  "{ip}",
                  "{field}",
                ],
                "select": {
                  "exist": [
                    "field",
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "field",
                      "orig": "field",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lite/me/{field}",
                "parts": [
                  "lite",
                  "me",
                  "{field}",
                ],
                "select": {
                  "exist": [
                    "field",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/lite/{ip}",
                "parts": [
                  "lite",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "me",
            ],
            [
              "lite",
            ],
          ],
        },
      },
      "ipinfo_plus": {
        "fields": [
          {
            "name": "city",
            "type": "`$STRING`",
          },
          {
            "name": "key",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "type": "`$STRING`",
          },
        ],
        "name": "ipinfo_plus",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "field",
                      "orig": "field",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/plus/{ip}/{field}",
                "parts": [
                  "plus",
                  "{ip}",
                  "{field}",
                ],
                "select": {
                  "exist": [
                    "field",
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "field",
                      "orig": "field",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/plus/me/{field}",
                "parts": [
                  "plus",
                  "me",
                  "{field}",
                ],
                "select": {
                  "exist": [
                    "field",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "me",
            ],
            [
              "plus",
            ],
          ],
        },
      },
      "lite": {
        "fields": [
          {
            "name": "as_domain",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "as_name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "asn",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "continent",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "continent_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "lite",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/lite/me",
                "parts": [
                  "lite",
                  "me",
                ],
                "select": {
                  "$action": "me",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "max": {
        "fields": [
          {
            "name": "anonymous",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "as",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "geo",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "hostname",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "is_anonymous",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_anycast",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_hosting",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_mobile",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_satellite",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "mobile",
            "type": "`$OBJECT`",
          },
        ],
        "name": "max",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/max/{ip}",
                "parts": [
                  "max",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "men": {
        "fields": [
          {
            "name": "features",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "requests",
            "req": True,
            "type": "`$OBJECT`",
          },
          {
            "name": "token",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "men",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/me",
                "parts": [
                  "me",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "place": {
        "fields": [
          {
            "name": "category",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "latitude",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "longitude",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "ssid",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "place",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/places/{ip}",
                "parts": [
                  "places",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "plus": {
        "fields": [
          {
            "name": "anonymous",
            "type": "`$OBJECT`",
          },
          {
            "name": "as",
            "type": "`$OBJECT`",
          },
          {
            "name": "geo",
            "type": "`$OBJECT`",
          },
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "is_anonymous",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_anycast",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_hosting",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_mobile",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "is_satellite",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "mobile",
            "type": "`$OBJECT`",
          },
        ],
        "name": "plus",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/plus/{ip}",
                "parts": [
                  "plus",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "ip": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/plus/me",
                "parts": [
                  "plus",
                  "me",
                ],
                "select": {
                  "$action": "me",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "privacy": {
        "fields": [
          {
            "name": "hosting",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "proxy",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "relay",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "service",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "tor",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "vpn",
            "req": True,
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "privacy",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/privacy",
                "parts": [
                  "{ip}",
                  "privacy",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "privacy_extended": {
        "fields": [
          {
            "name": "census",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "census_ports",
            "type": "`$ARRAY`",
          },
          {
            "name": "confidence",
            "type": "`$INTEGER`",
          },
          {
            "name": "coverage",
            "type": "`$NUMBER`",
          },
          {
            "name": "device_activity",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "first_seen",
            "type": "`$STRING`",
          },
          {
            "name": "hosting",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "inferred",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "last_seen",
            "type": "`$STRING`",
          },
          {
            "name": "proxy",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "relay",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "service",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "tor",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "vpn",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "vpn_config",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "whois",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "privacy_extended",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/privacy_extended",
                "parts": [
                  "{ip}",
                  "privacy_extended",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.census_ports`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "range": {
        "fields": [
          {
            "name": "domain",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "num_ranges",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "ranges",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "redirects_to",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "range",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "domain",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/ranges/{domain}",
                "parts": [
                  "ranges",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "domain": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "residential_proxy": {
        "fields": [
          {
            "name": "ip",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "last_seen",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "percent_days_seen",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "service",
            "req": True,
            "type": "`$STRING`",
          },
        ],
        "name": "residential_proxy",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/resproxy",
                "parts": [
                  "{ip}",
                  "resproxy",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "single": {
        "fields": [],
        "name": "single",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/city",
                "parts": [
                  "{ip}",
                  "city",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/country",
                "parts": [
                  "{ip}",
                  "country",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/hostname",
                "parts": [
                  "{ip}",
                  "hostname",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/ip",
                "parts": [
                  "{ip}",
                  "ip",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/loc",
                "parts": [
                  "{ip}",
                  "loc",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/org",
                "parts": [
                  "{ip}",
                  "org",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/postal",
                "parts": [
                  "{ip}",
                  "postal",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/region",
                "parts": [
                  "{ip}",
                  "region",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "ip",
                      "orig": "ip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{ip}/timezone",
                "parts": [
                  "{ip}",
                  "timezone",
                ],
                "select": {
                  "exist": [
                    "ip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/city",
                "parts": [
                  "city",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/country",
                "parts": [
                  "country",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/hostname",
                "parts": [
                  "hostname",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/ip",
                "parts": [
                  "ip",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/loc",
                "parts": [
                  "loc",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/org",
                "parts": [
                  "org",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/postal",
                "parts": [
                  "postal",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/region",
                "parts": [
                  "region",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/timezone",
                "parts": [
                  "timezone",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "whois_asn": {
        "fields": [
          {
            "name": "abuse",
            "type": "`$STRING`",
          },
          {
            "name": "admin",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "maintainer",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "org",
            "type": "`$STRING`",
          },
          {
            "name": "range",
            "type": "`$STRING`",
          },
          {
            "name": "raw",
            "type": "`$STRING`",
          },
          {
            "name": "source",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "tech",
            "type": "`$STRING`",
          },
          {
            "name": "updated",
            "type": "`$STRING`",
          },
        ],
        "name": "whois_asn",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "asn",
                      "orig": "asn",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "whoissource",
                      "orig": "whoissource",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/whois/net/AS{asn}",
                "parts": [
                  "whois",
                  "net",
                  "AS{asn}",
                ],
                "select": {
                  "exist": [
                    "asn",
                    "page",
                    "whoissource",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.records`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "whois_domain": {
        "fields": [
          {
            "name": "net",
            "type": "`$STRING`",
          },
          {
            "name": "page",
            "type": "`$INTEGER`",
          },
          {
            "name": "records",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "type": "`$INTEGER`",
          },
        ],
        "name": "whois_domain",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "domain",
                      "orig": "domain",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "whoissource",
                      "orig": "whoissource",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/whois/net/{domain}",
                "parts": [
                  "whois",
                  "net",
                  "{domain}",
                ],
                "select": {
                  "exist": [
                    "domain",
                    "page",
                    "whoissource",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "net",
            ],
          ],
        },
      },
      "whois_ip": {
        "fields": [
          {
            "name": "net",
            "type": "`$STRING`",
          },
          {
            "name": "page",
            "type": "`$INTEGER`",
          },
          {
            "name": "records",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "type": "`$INTEGER`",
          },
        ],
        "name": "whois_ip",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "whoisip",
                      "orig": "whoisip",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "whoissource",
                      "orig": "whoissource",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/whois/net/{whoisip}",
                "parts": [
                  "whois",
                  "net",
                  "{whoisip}",
                ],
                "select": {
                  "exist": [
                    "page",
                    "whoisip",
                    "whoissource",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "net",
            ],
          ],
        },
      },
      "whois_net_id": {
        "fields": [
          {
            "name": "net",
            "type": "`$STRING`",
          },
          {
            "name": "page",
            "type": "`$INTEGER`",
          },
          {
            "name": "records",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "type": "`$INTEGER`",
          },
        ],
        "name": "whois_net_id",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "whoisnetid",
                      "orig": "whoisnetid",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "whoissource",
                      "orig": "whoissource",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/whois/net/{whoisnetid}",
                "parts": [
                  "whois",
                  "net",
                  "{whoisnetid}",
                ],
                "select": {
                  "exist": [
                    "page",
                    "whoisnetid",
                    "whoissource",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "net",
            ],
          ],
        },
      },
      "whois_org": {
        "fields": [
          {
            "name": "org",
            "type": "`$STRING`",
          },
          {
            "name": "page",
            "type": "`$INTEGER`",
          },
          {
            "name": "records",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "type": "`$INTEGER`",
          },
        ],
        "name": "whois_org",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "whoisorgid",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "whoissource",
                      "orig": "whoissource",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/whois/org/{whoisorgid}",
                "parts": [
                  "whois",
                  "org",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "whoisorgid": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "page",
                    "whoissource",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "whois_poc": {
        "fields": [
          {
            "name": "page",
            "type": "`$INTEGER`",
          },
          {
            "name": "poc",
            "type": "`$STRING`",
          },
          {
            "name": "records",
            "type": "`$ARRAY`",
          },
          {
            "name": "total",
            "type": "`$INTEGER`",
          },
        ],
        "name": "whois_poc",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "whoispoc",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "whoissource",
                      "orig": "whoissource",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/whois/poc/{whoispoc}",
                "parts": [
                  "whois",
                  "poc",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "whoispoc": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "page",
                    "whoissource",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
