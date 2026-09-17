package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "IpinfoDeveloper",
			"slug": "ipinfo-developer",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://ipinfo.io/",
			"auth": map[string]any{
				"prefix": "Basic",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"abuse": map[string]any{},
				"asn": map[string]any{},
				"carrier": map[string]any{},
				"company": map[string]any{},
				"core": map[string]any{},
				"domain": map[string]any{},
				"general": map[string]any{},
				"get_current_information": map[string]any{},
				"get_information_by_ip": map[string]any{},
				"ipinfo_core": map[string]any{},
				"ipinfo_lite": map[string]any{},
				"ipinfo_plus": map[string]any{},
				"lite": map[string]any{},
				"max": map[string]any{},
				"men": map[string]any{},
				"place": map[string]any{},
				"plus": map[string]any{},
				"privacy": map[string]any{},
				"privacy_extended": map[string]any{},
				"range": map[string]any{},
				"residential_proxy": map[string]any{},
				"single": map[string]any{},
				"whois_asn": map[string]any{},
				"whois_domain": map[string]any{},
				"whois_ip": map[string]any{},
				"whois_net_id": map[string]any{},
				"whois_org": map[string]any{},
				"whois_poc": map[string]any{},
			},
		},
		"entity": map[string]any{
			"abuse": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "network",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"type": "`$STRING`",
					},
				},
				"name": "abuse",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/abuse",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "abuse",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"abuse",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"asn": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "allocated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "asn",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "downstreams",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "num_ips",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "peers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "prefixes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "prefixes6",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "registry",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "route",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "upstreams",
						"type": "`$ARRAY`",
					},
				},
				"name": "asn",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "asn",
											"orig": "asn",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/AS{asn}",
								"segments": []any{
									map[string]any{
										"lit": "AS{asn}",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"asn",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"AS{asn}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"carrier": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "mcc",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mnc",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "carrier",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/carrier",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "carrier",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"carrier",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"company": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "company",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/company",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "company",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"company",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"core": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "geo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_anycast",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_hosting",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_mobile",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_satellite",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "core",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"var": "ip",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"{ip}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/me",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"me",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"lookup",
						},
					},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "domain",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 100,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/domains/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"page",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"domains",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"general": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "8_8_8_8",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "8_8_8_8city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"type": "`$OBJECT`",
					},
				},
				"name": "general",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "cli",
											"orig": "cli",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/tools/map",
								"segments": []any{
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "map",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cli",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"tools",
									"map",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "cli",
											"orig": "cli",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/tools/summarize-ips",
								"segments": []any{
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "summarize-ips",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cli",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"tools",
									"summarize-ips",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/batch",
								"segments": []any{
									map[string]any{
										"lit": "batch",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"batch",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_current_information": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asn",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "bogon",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "carrier",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domains",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "loc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "privacy",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"type": "`$STRING`",
					},
				},
				"name": "get_current_information",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_information_by_ip": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "asn",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "bogon",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "carrier",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domains",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "loc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "privacy",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "get_information_by_ip",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ipinfo_core": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"ip",
						"field",
					},
					"sep": "/",
				},
				"name": "ipinfo_core",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "field",
											"orig": "field",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/{ip}/{field}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"var": "field",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"{ip}",
									"{field}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "field",
											"orig": "field",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/me/{field}",
								"segments": []any{
									map[string]any{
										"lit": "lookup",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"var": "field",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lookup",
									"me",
									"{field}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"me",
						},
						[]any{
							"lookup",
						},
					},
				},
			},
			"ipinfo_lite": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "ipinfo_lite",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "field",
											"orig": "field",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lite/{ip}/{field}",
								"segments": []any{
									map[string]any{
										"lit": "lite",
									},
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"var": "field",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lite",
									"{ip}",
									"{field}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "field",
											"orig": "field",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lite/me/{field}",
								"segments": []any{
									map[string]any{
										"lit": "lite",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"var": "field",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lite",
									"me",
									"{field}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/lite/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "lite",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lite",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"me",
						},
						[]any{
							"lite",
						},
					},
				},
			},
			"ipinfo_plus": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"ip",
						"field",
					},
					"sep": "/",
				},
				"name": "ipinfo_plus",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "field",
											"orig": "field",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/plus/{ip}/{field}",
								"segments": []any{
									map[string]any{
										"lit": "plus",
									},
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"var": "field",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"plus",
									"{ip}",
									"{field}",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "field",
											"orig": "field",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/plus/me/{field}",
								"segments": []any{
									map[string]any{
										"lit": "plus",
									},
									map[string]any{
										"lit": "me",
									},
									map[string]any{
										"var": "field",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"plus",
									"me",
									"{field}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"me",
						},
						[]any{
							"plus",
						},
					},
				},
			},
			"lite": map[string]any{
				"fields": []any{},
				"name": "lite",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/lite/me",
								"segments": []any{
									map[string]any{
										"lit": "lite",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{
									"$action": "me",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"lite",
									"me",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"max": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "anonymous",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "as",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "geo",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_anycast",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_hosting",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_mobile",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_satellite",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "mobile",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "max",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/max/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "max",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"max",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"men": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "features",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "requests",
						"req": true,
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "token",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "men",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/me",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"me",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"place": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ssid",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "place",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/places/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "places",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"places",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"plus": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "anonymous",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "as",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "geo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "is_anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_anycast",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_hosting",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_mobile",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_satellite",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "mobile",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "plus",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/plus/{ip}",
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "plus",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"plus",
									"{id}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/plus/me",
								"segments": []any{
									map[string]any{
										"lit": "plus",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{
									"$action": "me",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"plus",
									"me",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"privacy": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "hosting",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "proxy",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "relay",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "service",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tor",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "vpn",
						"req": true,
						"type": "`$BOOLEAN`",
					},
				},
				"name": "privacy",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/privacy",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "privacy",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"privacy",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"privacy_extended": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "census",
						"short": "Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "census_ports",
						"short": "The ports we've gotten positive results for when running our VPN detection census",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "confidence",
						"short": "The level of confidence attributed to the best source associated with this range.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "coverage",
						"short": "For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on.",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "device_activity",
						"short": "Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "date",
						"name": "first_seen",
						"short": "Date when the activity on an anonymous IP address was first observed.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hosting",
						"req": true,
						"short": "Indicates a hosting/cloud service/data center IP address",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "inferred",
						"short": "Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "date",
						"name": "last_seen",
						"short": "Date when the activity on an anonymous IP address was last/recently observed.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "proxy",
						"req": true,
						"short": "Indicates an open web proxy IP address",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "relay",
						"req": true,
						"short": "Indicates a location-preserving anonymous relay service",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "service",
						"req": true,
						"short": "Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tor",
						"req": true,
						"short": "Indicates a Tor (The Onion Router) exit node IP address",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "vpn",
						"req": true,
						"short": "Indicates Virtual Private Network (VPN) service exit node IP address",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "vpn_config",
						"short": "Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "whois",
						"short": "Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "privacy_extended",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/privacy_extended",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "privacy_extended",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.census_ports`",
								},
								"parts": []any{
									"{ip}",
									"privacy_extended",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"range": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "num_ranges",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ranges",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "redirects_to",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "range",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ranges/{domain}",
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "ranges",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"ranges",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"residential_proxy": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ip",
						"req": true,
						"short": "The IPv4 or IPv6 address associated with a residential proxy",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "last_seen",
						"req": true,
						"short": "The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "percent_days_seen",
						"req": true,
						"short": "The percentage of days the IP was active in the last 7-day period",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "service",
						"req": true,
						"short": "The name of the residential proxy service.",
						"type": "`$STRING`",
					},
				},
				"name": "residential_proxy",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/resproxy",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "resproxy",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"resproxy",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"single": map[string]any{
				"fields": []any{},
				"name": "single",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/city",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "city",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"city",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/country",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "country",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"country",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/hostname",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "hostname",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"hostname",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/ip",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "ip",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"ip",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/loc",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "loc",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"loc",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/org",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "org",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"org",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/postal",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "postal",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"postal",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/region",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "region",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"region",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "ip",
											"orig": "ip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}/timezone",
								"segments": []any{
									map[string]any{
										"var": "ip",
									},
									map[string]any{
										"lit": "timezone",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"{ip}",
									"timezone",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/city",
								"segments": []any{
									map[string]any{
										"lit": "city",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"city",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/country",
								"segments": []any{
									map[string]any{
										"lit": "country",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"country",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/hostname",
								"segments": []any{
									map[string]any{
										"lit": "hostname",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"hostname",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/ip",
								"segments": []any{
									map[string]any{
										"lit": "ip",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"ip",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/loc",
								"segments": []any{
									map[string]any{
										"lit": "loc",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"loc",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/org",
								"segments": []any{
									map[string]any{
										"lit": "org",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"org",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/postal",
								"segments": []any{
									map[string]any{
										"lit": "postal",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"postal",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/region",
								"segments": []any{
									map[string]any{
										"lit": "region",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"region",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/timezone",
								"segments": []any{
									map[string]any{
										"lit": "timezone",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"timezone",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whois_asn": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "abuse",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "admin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maintainer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "range",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "raw",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tech",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "updated",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "whois_asn",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "asn",
											"orig": "asn",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/whois/net/AS{asn}",
								"segments": []any{
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "net",
									},
									map[string]any{
										"lit": "AS{asn}",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"asn",
										"page",
										"whoissource",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.records`",
								},
								"parts": []any{
									"whois",
									"net",
									"AS{asn}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whois_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "net",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
				},
				"name": "whois_domain",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "domain",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/whois/net/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "net",
									},
									map[string]any{
										"var": "domain",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"page",
										"whoissource",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"whois",
									"net",
									"{domain}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"net",
						},
					},
				},
			},
			"whois_ip": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "net",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
				},
				"name": "whois_ip",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "whoisip",
											"orig": "whoisip",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/whois/net/{whoisip}",
								"segments": []any{
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "net",
									},
									map[string]any{
										"var": "whoisip",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"whoisip",
										"whoissource",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"whois",
									"net",
									"{whoisip}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"net",
						},
					},
				},
			},
			"whois_net_id": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "net",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
				},
				"name": "whois_net_id",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "whoisnetid",
											"orig": "whoisnetid",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/whois/net/{whoisnetid}",
								"segments": []any{
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "net",
									},
									map[string]any{
										"var": "whoisnetid",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"whoisnetid",
										"whoissource",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"whois",
									"net",
									"{whoisnetid}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"net",
						},
					},
				},
			},
			"whois_org": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "whois_org",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "whoisorgid",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/whois/org/{whoisorgid}",
								"rename": map[string]any{
									"param": map[string]any{
										"whoisorgid": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "org",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page",
										"whoissource",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"whois",
									"org",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whois_poc": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "poc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "whois_poc",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "whoispoc",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/whois/poc/{whoispoc}",
								"rename": map[string]any{
									"param": map[string]any{
										"whoispoc": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "whois",
									},
									map[string]any{
										"lit": "poc",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page",
										"whoissource",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"whois",
									"poc",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
