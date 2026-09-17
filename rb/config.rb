# IpinfoDeveloper SDK configuration

module IpinfoDeveloperConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "IpinfoDeveloper",
        "slug" => "ipinfo-developer",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://ipinfo.io/",
        "auth" => {
          "prefix" => "Basic",
          "basic" => true,
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "abuse" => {},
          "asn" => {},
          "carrier" => {},
          "company" => {},
          "core" => {},
          "domain" => {},
          "general" => {},
          "get_current_information" => {},
          "get_information_by_ip" => {},
          "ipinfo_core" => {},
          "ipinfo_lite" => {},
          "ipinfo_plus" => {},
          "lite" => {},
          "max" => {},
          "men" => {},
          "place" => {},
          "plus" => {},
          "privacy" => {},
          "privacy_extended" => {},
          "range" => {},
          "residential_proxy" => {},
          "single" => {},
          "whois_asn" => {},
          "whois_domain" => {},
          "whois_ip" => {},
          "whois_net_id" => {},
          "whois_org" => {},
          "whois_poc" => {},
        },
      },
      "entity" => {
        "abuse" => {
          "fields" => [
            {
              "name" => "address",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "network",
              "type" => "`$STRING`",
            },
            {
              "name" => "phone",
              "type" => "`$STRING`",
            },
          ],
          "name" => "abuse",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/abuse",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "abuse",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "abuse",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "asn" => {
          "fields" => [
            {
              "name" => "allocated",
              "type" => "`$STRING`",
            },
            {
              "name" => "asn",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "domain",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "downstreams",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "num_ips",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "peers",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "prefixes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "prefixes6",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "registry",
              "type" => "`$STRING`",
            },
            {
              "name" => "route",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "upstreams",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "asn",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "asn",
                        "orig" => "asn",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/AS{asn}",
                  "segments" => [
                    {
                      "lit" => "AS{asn}",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "asn",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "AS{asn}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "carrier" => {
          "fields" => [
            {
              "name" => "mcc",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "mnc",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "carrier",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/carrier",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "carrier",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "carrier",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "company" => {
          "fields" => [
            {
              "name" => "domain",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "company",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/company",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "company",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "company",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "core" => {
          "fields" => [
            {
              "name" => "as",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "geo",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hostname",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "is_anonymous",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_anycast",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_hosting",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_mobile",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_satellite",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "core",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lookup/{ip}",
                  "segments" => [
                    {
                      "lit" => "lookup",
                    },
                    {
                      "var" => "ip",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lookup",
                    "{ip}",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lookup/me",
                  "segments" => [
                    {
                      "lit" => "lookup",
                    },
                    {
                      "lit" => "me",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lookup",
                    "me",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "lookup",
              ],
            ],
          },
        },
        "domain" => {
          "fields" => [
            {
              "name" => "domains",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "type" => "`$STRING`",
            },
            {
              "name" => "page",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "total",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "domain",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => 100,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/domains/{ip}",
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "domains",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "limit",
                      "page",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "domains",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "general" => {
          "fields" => [
            {
              "name" => "8_8_8_8",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "8_8_8_8city",
              "type" => "`$STRING`",
            },
            {
              "name" => "summary",
              "type" => "`$STRING`",
            },
            {
              "name" => "value",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "general",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "cli",
                        "orig" => "cli",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/tools/map",
                  "segments" => [
                    {
                      "lit" => "tools",
                    },
                    {
                      "lit" => "map",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cli",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "tools",
                    "map",
                  ],
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "cli",
                        "orig" => "cli",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/tools/summarize-ips",
                  "segments" => [
                    {
                      "lit" => "tools",
                    },
                    {
                      "lit" => "summarize-ips",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cli",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "tools",
                    "summarize-ips",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/batch",
                  "segments" => [
                    {
                      "lit" => "batch",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "batch",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_current_information" => {
          "fields" => [
            {
              "name" => "asn",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "bogon",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "carrier",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "company",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "domains",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hostname",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "loc",
              "type" => "`$STRING`",
            },
            {
              "name" => "org",
              "type" => "`$STRING`",
            },
            {
              "name" => "postal",
              "type" => "`$STRING`",
            },
            {
              "name" => "privacy",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "region",
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_current_information",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "segments" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_information_by_ip" => {
          "fields" => [
            {
              "name" => "asn",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "bogon",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "carrier",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "company",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "domains",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hostname",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "loc",
              "type" => "`$STRING`",
            },
            {
              "name" => "org",
              "type" => "`$STRING`",
            },
            {
              "name" => "postal",
              "type" => "`$STRING`",
            },
            {
              "name" => "privacy",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "region",
              "type" => "`$STRING`",
            },
            {
              "name" => "timezone",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_information_by_ip",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}",
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "ipinfo_core" => {
          "fields" => [
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "type" => "`$STRING`",
            },
            {
              "name" => "region",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
            "parts" => [
              "ip",
              "field",
            ],
            "sep" => "/",
          },
          "name" => "ipinfo_core",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lookup/{ip}/{field}",
                  "segments" => [
                    {
                      "lit" => "lookup",
                    },
                    {
                      "var" => "ip",
                    },
                    {
                      "var" => "field",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lookup",
                    "{ip}",
                    "{field}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lookup/me/{field}",
                  "segments" => [
                    {
                      "lit" => "lookup",
                    },
                    {
                      "lit" => "me",
                    },
                    {
                      "var" => "field",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lookup",
                    "me",
                    "{field}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "me",
              ],
              [
                "lookup",
              ],
            ],
          },
        },
        "ipinfo_lite" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "ipinfo_lite",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lite/{ip}/{field}",
                  "segments" => [
                    {
                      "lit" => "lite",
                    },
                    {
                      "var" => "ip",
                    },
                    {
                      "var" => "field",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lite",
                    "{ip}",
                    "{field}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lite/me/{field}",
                  "segments" => [
                    {
                      "lit" => "lite",
                    },
                    {
                      "lit" => "me",
                    },
                    {
                      "var" => "field",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lite",
                    "me",
                    "{field}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lite/{ip}",
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "lite",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lite",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "me",
              ],
              [
                "lite",
              ],
            ],
          },
        },
        "ipinfo_plus" => {
          "fields" => [
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "key",
              "type" => "`$STRING`",
            },
            {
              "name" => "region",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
            "parts" => [
              "ip",
              "field",
            ],
            "sep" => "/",
          },
          "name" => "ipinfo_plus",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/plus/{ip}/{field}",
                  "segments" => [
                    {
                      "lit" => "plus",
                    },
                    {
                      "var" => "ip",
                    },
                    {
                      "var" => "field",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "plus",
                    "{ip}",
                    "{field}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "field",
                        "orig" => "field",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/plus/me/{field}",
                  "segments" => [
                    {
                      "lit" => "plus",
                    },
                    {
                      "lit" => "me",
                    },
                    {
                      "var" => "field",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "field",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "plus",
                    "me",
                    "{field}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "me",
              ],
              [
                "plus",
              ],
            ],
          },
        },
        "lite" => {
          "fields" => [],
          "name" => "lite",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/lite/me",
                  "segments" => [
                    {
                      "lit" => "lite",
                    },
                    {
                      "lit" => "me",
                    },
                  ],
                  "select" => {
                    "$action" => "me",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "lite",
                    "me",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "max" => {
          "fields" => [
            {
              "name" => "anonymous",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "as",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "geo",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "hostname",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "is_anonymous",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_anycast",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_hosting",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_mobile",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_satellite",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "mobile",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "max",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/max/{ip}",
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "max",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "max",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "men" => {
          "fields" => [
            {
              "name" => "features",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "requests",
              "req" => true,
              "type" => "`$OBJECT`",
            },
            {
              "name" => "token",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "men",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/me",
                  "segments" => [
                    {
                      "lit" => "me",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "me",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "place" => {
          "fields" => [
            {
              "name" => "category",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "latitude",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "ssid",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "place",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/places/{ip}",
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "places",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "places",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "plus" => {
          "fields" => [
            {
              "name" => "anonymous",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "as",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "geo",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "is_anonymous",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_anycast",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_hosting",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_mobile",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "is_satellite",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "mobile",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "plus",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/plus/{ip}",
                  "rename" => {
                    "param" => {
                      "ip" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "plus",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "plus",
                    "{id}",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/plus/me",
                  "segments" => [
                    {
                      "lit" => "plus",
                    },
                    {
                      "lit" => "me",
                    },
                  ],
                  "select" => {
                    "$action" => "me",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "plus",
                    "me",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "privacy" => {
          "fields" => [
            {
              "name" => "hosting",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "proxy",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "relay",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "service",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "tor",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "vpn",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "privacy",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/privacy",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "privacy",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "privacy",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "privacy_extended" => {
          "fields" => [
            {
              "name" => "census",
              "short" => "Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "census_ports",
              "short" => "The ports we've gotten positive results for when running our VPN detection census",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "confidence",
              "short" => "The level of confidence attributed to the best source associated with this range.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "coverage",
              "short" => "For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on.",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "device_activity",
              "short" => "Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "date",
              "name" => "first_seen",
              "short" => "Date when the activity on an anonymous IP address was first observed.",
              "type" => "`$STRING`",
            },
            {
              "name" => "hosting",
              "req" => true,
              "short" => "Indicates a hosting/cloud service/data center IP address",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "inferred",
              "short" => "Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "date",
              "name" => "last_seen",
              "short" => "Date when the activity on an anonymous IP address was last/recently observed.",
              "type" => "`$STRING`",
            },
            {
              "name" => "proxy",
              "req" => true,
              "short" => "Indicates an open web proxy IP address",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "relay",
              "req" => true,
              "short" => "Indicates a location-preserving anonymous relay service",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "service",
              "req" => true,
              "short" => "Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names",
              "type" => "`$STRING`",
            },
            {
              "name" => "tor",
              "req" => true,
              "short" => "Indicates a Tor (The Onion Router) exit node IP address",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "vpn",
              "req" => true,
              "short" => "Indicates Virtual Private Network (VPN) service exit node IP address",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "vpn_config",
              "short" => "Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "whois",
              "short" => "Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "privacy_extended",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/privacy_extended",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "privacy_extended",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.census_ports`",
                  },
                  "parts" => [
                    "{ip}",
                    "privacy_extended",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "range" => {
          "fields" => [
            {
              "name" => "domain",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "num_ranges",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "ranges",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "redirects_to",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "range",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ranges/{domain}",
                  "rename" => {
                    "param" => {
                      "domain" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "ranges",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "ranges",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "residential_proxy" => {
          "fields" => [
            {
              "name" => "ip",
              "req" => true,
              "short" => "The IPv4 or IPv6 address associated with a residential proxy",
              "type" => "`$STRING`",
            },
            {
              "format" => "date",
              "name" => "last_seen",
              "req" => true,
              "short" => "The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)",
              "type" => "`$STRING`",
            },
            {
              "name" => "percent_days_seen",
              "req" => true,
              "short" => "The percentage of days the IP was active in the last 7-day period",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "service",
              "req" => true,
              "short" => "The name of the residential proxy service.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "residential_proxy",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/resproxy",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "resproxy",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "resproxy",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "single" => {
          "fields" => [],
          "name" => "single",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/city",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "city",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "city",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/country",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "country",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "country",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/hostname",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "hostname",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "hostname",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/ip",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "ip",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "ip",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/loc",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "loc",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "loc",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/org",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "org",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "org",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/postal",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "postal",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "postal",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/region",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "region",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "region",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "ip",
                        "orig" => "ip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{ip}/timezone",
                  "segments" => [
                    {
                      "var" => "ip",
                    },
                    {
                      "lit" => "timezone",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "{ip}",
                    "timezone",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/city",
                  "segments" => [
                    {
                      "lit" => "city",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "city",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/country",
                  "segments" => [
                    {
                      "lit" => "country",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "country",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/hostname",
                  "segments" => [
                    {
                      "lit" => "hostname",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "hostname",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ip",
                  "segments" => [
                    {
                      "lit" => "ip",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "ip",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/loc",
                  "segments" => [
                    {
                      "lit" => "loc",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "loc",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/org",
                  "segments" => [
                    {
                      "lit" => "org",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "org",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/postal",
                  "segments" => [
                    {
                      "lit" => "postal",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "postal",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/region",
                  "segments" => [
                    {
                      "lit" => "region",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "region",
                  ],
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/timezone",
                  "segments" => [
                    {
                      "lit" => "timezone",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "timezone",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "whois_asn" => {
          "fields" => [
            {
              "name" => "abuse",
              "type" => "`$STRING`",
            },
            {
              "name" => "admin",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "maintainer",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "org",
              "type" => "`$STRING`",
            },
            {
              "name" => "range",
              "type" => "`$STRING`",
            },
            {
              "name" => "raw",
              "type" => "`$STRING`",
            },
            {
              "name" => "source",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "type" => "`$STRING`",
            },
            {
              "name" => "tech",
              "type" => "`$STRING`",
            },
            {
              "format" => "date",
              "name" => "updated",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "whois_asn",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "asn",
                        "orig" => "asn",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "whoissource",
                        "orig" => "whoissource",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whois/net/AS{asn}",
                  "segments" => [
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "net",
                    },
                    {
                      "lit" => "AS{asn}",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "asn",
                      "page",
                      "whoissource",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.records`",
                  },
                  "parts" => [
                    "whois",
                    "net",
                    "AS{asn}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "whois_domain" => {
          "fields" => [
            {
              "name" => "net",
              "type" => "`$STRING`",
            },
            {
              "name" => "page",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "records",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "whois_domain",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "domain",
                        "orig" => "domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "whoissource",
                        "orig" => "whoissource",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whois/net/{domain}",
                  "segments" => [
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "net",
                    },
                    {
                      "var" => "domain",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "domain",
                      "page",
                      "whoissource",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "whois",
                    "net",
                    "{domain}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "net",
              ],
            ],
          },
        },
        "whois_ip" => {
          "fields" => [
            {
              "name" => "net",
              "type" => "`$STRING`",
            },
            {
              "name" => "page",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "records",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "whois_ip",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "whoisip",
                        "orig" => "whoisip",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "whoissource",
                        "orig" => "whoissource",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whois/net/{whoisip}",
                  "segments" => [
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "net",
                    },
                    {
                      "var" => "whoisip",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "whoisip",
                      "whoissource",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "whois",
                    "net",
                    "{whoisip}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "net",
              ],
            ],
          },
        },
        "whois_net_id" => {
          "fields" => [
            {
              "name" => "net",
              "type" => "`$STRING`",
            },
            {
              "name" => "page",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "records",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "whois_net_id",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "whoisnetid",
                        "orig" => "whoisnetid",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "whoissource",
                        "orig" => "whoissource",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whois/net/{whoisnetid}",
                  "segments" => [
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "net",
                    },
                    {
                      "var" => "whoisnetid",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "page",
                      "whoisnetid",
                      "whoissource",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "whois",
                    "net",
                    "{whoisnetid}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "net",
              ],
            ],
          },
        },
        "whois_org" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "org",
              "type" => "`$STRING`",
            },
            {
              "name" => "page",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "records",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "whois_org",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "whoisorgid",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "whoissource",
                        "orig" => "whoissource",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whois/org/{whoisorgid}",
                  "rename" => {
                    "param" => {
                      "whoisorgid" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "org",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "page",
                      "whoissource",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "whois",
                    "org",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "whois_poc" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "page",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "poc",
              "type" => "`$STRING`",
            },
            {
              "name" => "records",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "total",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "whois_poc",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "whoispoc",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "whoissource",
                        "orig" => "whoissource",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whois/poc/{whoispoc}",
                  "rename" => {
                    "param" => {
                      "whoispoc" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "whois",
                    },
                    {
                      "lit" => "poc",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "page",
                      "whoissource",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "whois",
                    "poc",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IpinfoDeveloperFeatures.make_feature(name)
  end
end
