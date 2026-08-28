
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'IpinfoDeveloper',
        slug: "ipinfo-developer",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://ipinfo.io/",

    auth: {
      prefix: 'Basic',
      basic: true,
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      abuse: {
      },

      asn: {
      },

      carrier: {
      },

      company: {
      },

      core: {
      },

      domain: {
      },

      general: {
      },

      get_current_information: {
      },

      get_information_by_ip: {
      },

      ipinfo_core: {
      },

      ipinfo_lite: {
      },

      ipinfo_plus: {
      },

      lite: {
      },

      max: {
      },

      men: {
      },

      place: {
      },

      plus: {
      },

      privacy: {
      },

      privacy_extended: {
      },

      range: {
      },

      residential_proxy: {
      },

      single: {
      },

      whois_asn: {
      },

      whois_domain: {
      },

      whois_ip: {
      },

      whois_net_id: {
      },

      whois_org: {
      },

      whois_poc: {
      },

    }
  }


  entity = {
    "abuse": {
      "fields": [
        {
          "name": "address",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "email",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "network",
          "type": "`$STRING`"
        },
        {
          "name": "phone",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/abuse",
              "parts": [
                "{ip}",
                "abuse"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "asn": {
      "fields": [
        {
          "name": "allocated",
          "type": "`$STRING`"
        },
        {
          "name": "asn",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "domain",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "downstreams",
          "type": "`$ARRAY`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "num_ips",
          "type": "`$INTEGER`"
        },
        {
          "name": "peers",
          "type": "`$ARRAY`"
        },
        {
          "name": "prefixes",
          "type": "`$ARRAY`"
        },
        {
          "name": "prefixes6",
          "type": "`$ARRAY`"
        },
        {
          "name": "registry",
          "type": "`$STRING`"
        },
        {
          "name": "route",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "upstreams",
          "type": "`$ARRAY`"
        }
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/AS{asn}",
              "parts": [
                "AS{asn}"
              ],
              "select": {
                "exist": [
                  "asn"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "carrier": {
      "fields": [
        {
          "name": "mcc",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "mnc",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/carrier",
              "parts": [
                "{ip}",
                "carrier"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "company": {
      "fields": [
        {
          "name": "domain",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/company",
              "parts": [
                "{ip}",
                "company"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "core": {
      "fields": [
        {
          "name": "as",
          "type": "`$OBJECT`"
        },
        {
          "name": "geo",
          "type": "`$OBJECT`"
        },
        {
          "name": "hostname",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "is_anonymous",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_anycast",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_hosting",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_mobile",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_satellite",
          "type": "`$BOOLEAN`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lookup/{ip}",
              "parts": [
                "lookup",
                "{ip}"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/lookup/me",
              "parts": [
                "lookup",
                "me"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "lookup"
          ]
        ]
      }
    },
    "domain": {
      "fields": [
        {
          "name": "domains",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "type": "`$STRING`"
        },
        {
          "name": "page",
          "type": "`$INTEGER`"
        },
        {
          "name": "total",
          "req": true,
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": 100,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/domains/{ip}",
              "parts": [
                "domains",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "limit",
                  "page"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "general": {
      "fields": [
        {
          "name": "8_8_8_8",
          "type": "`$OBJECT`"
        },
        {
          "name": "8_8_8_8city",
          "type": "`$STRING`"
        },
        {
          "name": "summary",
          "type": "`$STRING`"
        },
        {
          "name": "value",
          "type": "`$OBJECT`"
        }
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
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/tools/map",
              "parts": [
                "tools",
                "map"
              ],
              "select": {
                "exist": [
                  "cli"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "cli",
                    "orig": "cli",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/tools/summarize-ips",
              "parts": [
                "tools",
                "summarize-ips"
              ],
              "select": {
                "exist": [
                  "cli"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/batch",
              "parts": [
                "batch"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_current_information": {
      "fields": [
        {
          "name": "asn",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "bogon",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "carrier",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "city",
          "type": "`$STRING`"
        },
        {
          "name": "company",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "domains",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "hostname",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "loc",
          "type": "`$STRING`"
        },
        {
          "name": "org",
          "type": "`$STRING`"
        },
        {
          "name": "postal",
          "type": "`$STRING`"
        },
        {
          "name": "privacy",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "region",
          "type": "`$STRING`"
        },
        {
          "name": "timezone",
          "type": "`$STRING`"
        }
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
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_information_by_ip": {
      "fields": [
        {
          "name": "asn",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "bogon",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "carrier",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "city",
          "type": "`$STRING`"
        },
        {
          "name": "company",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "domains",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "hostname",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "loc",
          "type": "`$STRING`"
        },
        {
          "name": "org",
          "type": "`$STRING`"
        },
        {
          "name": "postal",
          "type": "`$STRING`"
        },
        {
          "name": "privacy",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "region",
          "type": "`$STRING`"
        },
        {
          "name": "timezone",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ipinfo_core": {
      "fields": [
        {
          "name": "city",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "type": "`$STRING`"
        },
        {
          "name": "region",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lookup/{ip}/{field}",
              "parts": [
                "lookup",
                "{ip}",
                "{field}"
              ],
              "select": {
                "exist": [
                  "field",
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "field",
                    "orig": "field",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lookup/me/{field}",
              "parts": [
                "lookup",
                "me",
                "{field}"
              ],
              "select": {
                "exist": [
                  "field"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "me"
          ],
          [
            "lookup"
          ]
        ]
      }
    },
    "ipinfo_lite": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lite/{ip}/{field}",
              "parts": [
                "lite",
                "{ip}",
                "{field}"
              ],
              "select": {
                "exist": [
                  "field",
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "field",
                    "orig": "field",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lite/me/{field}",
              "parts": [
                "lite",
                "me",
                "{field}"
              ],
              "select": {
                "exist": [
                  "field"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/lite/{ip}",
              "parts": [
                "lite",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "me"
          ],
          [
            "lite"
          ]
        ]
      }
    },
    "ipinfo_plus": {
      "fields": [
        {
          "name": "city",
          "type": "`$STRING`"
        },
        {
          "name": "key",
          "type": "`$STRING`"
        },
        {
          "name": "region",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/plus/{ip}/{field}",
              "parts": [
                "plus",
                "{ip}",
                "{field}"
              ],
              "select": {
                "exist": [
                  "field",
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "field",
                    "orig": "field",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/plus/me/{field}",
              "parts": [
                "plus",
                "me",
                "{field}"
              ],
              "select": {
                "exist": [
                  "field"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "me"
          ],
          [
            "plus"
          ]
        ]
      }
    },
    "lite": {
      "fields": [
        {
          "name": "as_domain",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "as_name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "asn",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "continent",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "continent_code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "country_code",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        }
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
                "me"
              ],
              "select": {
                "$action": "me"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "max": {
      "fields": [
        {
          "name": "anonymous",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "as",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "geo",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "hostname",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "is_anonymous",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_anycast",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_hosting",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_mobile",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_satellite",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "mobile",
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/max/{ip}",
              "parts": [
                "max",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "men": {
      "fields": [
        {
          "name": "features",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "requests",
          "req": true,
          "type": "`$OBJECT`"
        },
        {
          "name": "token",
          "req": true,
          "type": "`$STRING`"
        }
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
                "me"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "place": {
      "fields": [
        {
          "name": "category",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "latitude",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "longitude",
          "req": true,
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ssid",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/places/{ip}",
              "parts": [
                "places",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "plus": {
      "fields": [
        {
          "name": "anonymous",
          "type": "`$OBJECT`"
        },
        {
          "name": "as",
          "type": "`$OBJECT`"
        },
        {
          "name": "geo",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "is_anonymous",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_anycast",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_hosting",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_mobile",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "is_satellite",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "mobile",
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/plus/{ip}",
              "parts": [
                "plus",
                "{id}"
              ],
              "rename": {
                "param": {
                  "ip": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/plus/me",
              "parts": [
                "plus",
                "me"
              ],
              "select": {
                "$action": "me"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "privacy": {
      "fields": [
        {
          "name": "hosting",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "proxy",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "relay",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "service",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "tor",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "vpn",
          "req": true,
          "type": "`$BOOLEAN`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/privacy",
              "parts": [
                "{ip}",
                "privacy"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "privacy_extended": {
      "fields": [
        {
          "name": "census",
          "short": "Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "census_ports",
          "short": "The ports we've gotten positive results for when running our VPN detection census",
          "type": "`$ARRAY`"
        },
        {
          "name": "confidence",
          "short": "The level of confidence attributed to the best source associated with this range.",
          "type": "`$INTEGER`"
        },
        {
          "name": "coverage",
          "short": "For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on.",
          "type": "`$NUMBER`"
        },
        {
          "name": "device_activity",
          "short": "Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "first_seen",
          "short": "Date when the activity on an anonymous IP address was first observed.",
          "type": "`$STRING`"
        },
        {
          "name": "hosting",
          "req": true,
          "short": "Indicates a hosting/cloud service/data center IP address",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "inferred",
          "short": "Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "last_seen",
          "short": "Date when the activity on an anonymous IP address was last/recently observed.",
          "type": "`$STRING`"
        },
        {
          "name": "proxy",
          "req": true,
          "short": "Indicates an open web proxy IP address",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "relay",
          "req": true,
          "short": "Indicates a location-preserving anonymous relay service",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "service",
          "req": true,
          "short": "Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names",
          "type": "`$STRING`"
        },
        {
          "name": "tor",
          "req": true,
          "short": "Indicates a Tor (The Onion Router) exit node IP address",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "vpn",
          "req": true,
          "short": "Indicates Virtual Private Network (VPN) service exit node IP address",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "vpn_config",
          "short": "Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "whois",
          "short": "Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers",
          "type": "`$BOOLEAN`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/privacy_extended",
              "parts": [
                "{ip}",
                "privacy_extended"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.census_ports`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "range": {
      "fields": [
        {
          "name": "domain",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "num_ranges",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "ranges",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "redirects_to",
          "req": true,
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/ranges/{domain}",
              "parts": [
                "ranges",
                "{id}"
              ],
              "rename": {
                "param": {
                  "domain": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "residential_proxy": {
      "fields": [
        {
          "name": "ip",
          "req": true,
          "short": "The IPv4 or IPv6 address associated with a residential proxy",
          "type": "`$STRING`"
        },
        {
          "name": "last_seen",
          "req": true,
          "short": "The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)",
          "type": "`$STRING`"
        },
        {
          "name": "percent_days_seen",
          "req": true,
          "short": "The percentage of days the IP was active in the last 7-day period",
          "type": "`$INTEGER`"
        },
        {
          "name": "service",
          "req": true,
          "short": "The name of the residential proxy service.",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/resproxy",
              "parts": [
                "{ip}",
                "resproxy"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/city",
              "parts": [
                "{ip}",
                "city"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/country",
              "parts": [
                "{ip}",
                "country"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/hostname",
              "parts": [
                "{ip}",
                "hostname"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/ip",
              "parts": [
                "{ip}",
                "ip"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/loc",
              "parts": [
                "{ip}",
                "loc"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/org",
              "parts": [
                "{ip}",
                "org"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/postal",
              "parts": [
                "{ip}",
                "postal"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/region",
              "parts": [
                "{ip}",
                "region"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "ip",
                    "orig": "ip",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{ip}/timezone",
              "parts": [
                "{ip}",
                "timezone"
              ],
              "select": {
                "exist": [
                  "ip"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/city",
              "parts": [
                "city"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/country",
              "parts": [
                "country"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/hostname",
              "parts": [
                "hostname"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/ip",
              "parts": [
                "ip"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/loc",
              "parts": [
                "loc"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/org",
              "parts": [
                "org"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/postal",
              "parts": [
                "postal"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/region",
              "parts": [
                "region"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/timezone",
              "parts": [
                "timezone"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "whois_asn": {
      "fields": [
        {
          "name": "abuse",
          "type": "`$STRING`"
        },
        {
          "name": "admin",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "maintainer",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "org",
          "type": "`$STRING`"
        },
        {
          "name": "range",
          "type": "`$STRING`"
        },
        {
          "name": "raw",
          "type": "`$STRING`"
        },
        {
          "name": "source",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        },
        {
          "name": "tech",
          "type": "`$STRING`"
        },
        {
          "name": "updated",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "whoissource",
                    "orig": "whoissource",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/whois/net/AS{asn}",
              "parts": [
                "whois",
                "net",
                "AS{asn}"
              ],
              "select": {
                "exist": [
                  "asn",
                  "page",
                  "whoissource"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.records`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "whois_domain": {
      "fields": [
        {
          "name": "net",
          "type": "`$STRING`"
        },
        {
          "name": "page",
          "type": "`$INTEGER`"
        },
        {
          "name": "records",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "whoissource",
                    "orig": "whoissource",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/whois/net/{domain}",
              "parts": [
                "whois",
                "net",
                "{domain}"
              ],
              "select": {
                "exist": [
                  "domain",
                  "page",
                  "whoissource"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "net"
          ]
        ]
      }
    },
    "whois_ip": {
      "fields": [
        {
          "name": "net",
          "type": "`$STRING`"
        },
        {
          "name": "page",
          "type": "`$INTEGER`"
        },
        {
          "name": "records",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "whoissource",
                    "orig": "whoissource",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/whois/net/{whoisip}",
              "parts": [
                "whois",
                "net",
                "{whoisip}"
              ],
              "select": {
                "exist": [
                  "page",
                  "whoisip",
                  "whoissource"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "net"
          ]
        ]
      }
    },
    "whois_net_id": {
      "fields": [
        {
          "name": "net",
          "type": "`$STRING`"
        },
        {
          "name": "page",
          "type": "`$INTEGER`"
        },
        {
          "name": "records",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "whoissource",
                    "orig": "whoissource",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/whois/net/{whoisnetid}",
              "parts": [
                "whois",
                "net",
                "{whoisnetid}"
              ],
              "select": {
                "exist": [
                  "page",
                  "whoisnetid",
                  "whoissource"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "net"
          ]
        ]
      }
    },
    "whois_org": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "org",
          "type": "`$STRING`"
        },
        {
          "name": "page",
          "type": "`$INTEGER`"
        },
        {
          "name": "records",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "whoissource",
                    "orig": "whoissource",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/whois/org/{whoisorgid}",
              "parts": [
                "whois",
                "org",
                "{id}"
              ],
              "rename": {
                "param": {
                  "whoisorgid": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "page",
                  "whoissource"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "whois_poc": {
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "page",
          "type": "`$INTEGER`"
        },
        {
          "name": "poc",
          "type": "`$STRING`"
        },
        {
          "name": "records",
          "type": "`$ARRAY`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "whoissource",
                    "orig": "whoissource",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/whois/poc/{whoispoc}",
              "parts": [
                "whois",
                "poc",
                "{id}"
              ],
              "rename": {
                "param": {
                  "whoispoc": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "page",
                  "whoissource"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

