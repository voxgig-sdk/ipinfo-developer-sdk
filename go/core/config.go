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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
								"parts": []any{
									"{ip}",
									"abuse",
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
								"parts": []any{
									"AS{asn}",
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
								"parts": []any{
									"{ip}",
									"carrier",
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
								"parts": []any{
									"{ip}",
									"company",
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
								"parts": []any{
									"lookup",
									"{ip}",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/lookup/me",
								"parts": []any{
									"lookup",
									"me",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"domains",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
								"parts": []any{
									"tools",
									"map",
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
								"parts": []any{
									"tools",
									"summarize-ips",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/batch",
								"parts": []any{
									"batch",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
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
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
						"name": "key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"lookup",
									"{ip}",
									"{field}",
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
								"parts": []any{
									"lookup",
									"me",
									"{field}",
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
								"parts": []any{
									"lite",
									"{ip}",
									"{field}",
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
								"parts": []any{
									"lite",
									"me",
									"{field}",
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
								"parts": []any{
									"lite",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
						"name": "key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"plus",
									"{ip}",
									"{field}",
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
								"parts": []any{
									"plus",
									"me",
									"{field}",
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
				"fields": []any{
					map[string]any{
						"name": "as_domain",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "as_name",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "asn",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "continent_code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"req": true,
						"type": "`$STRING`",
					},
				},
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
								"parts": []any{
									"lite",
									"me",
								},
								"select": map[string]any{
									"$action": "me",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"max",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
								"parts": []any{
									"me",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"places",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
								"parts": []any{
									"plus",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/plus/me",
								"parts": []any{
									"plus",
									"me",
								},
								"select": map[string]any{
									"$action": "me",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"{ip}",
									"privacy",
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
								"parts": []any{
									"{ip}",
									"privacy_extended",
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
								"parts": []any{
									"ranges",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "id",
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
								"parts": []any{
									"{ip}",
									"resproxy",
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
								"parts": []any{
									"{ip}",
									"city",
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
								"parts": []any{
									"{ip}",
									"country",
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
								"parts": []any{
									"{ip}",
									"hostname",
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
								"parts": []any{
									"{ip}",
									"ip",
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
								"parts": []any{
									"{ip}",
									"loc",
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
								"parts": []any{
									"{ip}",
									"org",
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
								"parts": []any{
									"{ip}",
									"postal",
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
								"parts": []any{
									"{ip}",
									"region",
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
								"parts": []any{
									"{ip}",
									"timezone",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/city",
								"parts": []any{
									"city",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/country",
								"parts": []any{
									"country",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/hostname",
								"parts": []any{
									"hostname",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/ip",
								"parts": []any{
									"ip",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/loc",
								"parts": []any{
									"loc",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/org",
								"parts": []any{
									"org",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/postal",
								"parts": []any{
									"postal",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/region",
								"parts": []any{
									"region",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/timezone",
								"parts": []any{
									"timezone",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"name": "updated",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"whois",
									"net",
									"AS{asn}",
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
								"parts": []any{
									"whois",
									"net",
									"{domain}",
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
								"parts": []any{
									"whois",
									"net",
									"{whoisip}",
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
								"parts": []any{
									"whois",
									"net",
									"{whoisnetid}",
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
								"parts": []any{
									"whois",
									"org",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"whoisorgid": "id",
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
								"parts": []any{
									"whois",
									"poc",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"whoispoc": "id",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
