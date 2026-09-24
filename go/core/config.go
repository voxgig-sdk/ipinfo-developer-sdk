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
						"title": "Address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "network",
						"title": "Network",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
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
								"parts": []any{
									"{ip}",
									"abuse",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
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
						"title": "Allocated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "asn",
						"title": "Asn",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "downstreams",
						"title": "Downstreams",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "num_ips",
						"title": "Num Ips",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "peers",
						"title": "Peers",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "prefixes",
						"title": "Prefixes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "prefixes6",
						"title": "Prefixes6",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "registry",
						"title": "Registry",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "route",
						"title": "Route",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "upstreams",
						"title": "Upstreams",
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
								"kind": "http",
								"method": "GET",
								"orig": "/AS{asn}",
								"segments": []any{
									map[string]any{
										"lit": "AS{asn}",
									},
								},
								"parts": []any{
									"AS{asn}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "asn",
											"orig": "asn",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"asn",
									},
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
						"title": "Mcc",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "mnc",
						"title": "Mnc",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "carrier",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"carrier",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
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
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "company",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"company",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
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
						"title": "As",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "geo",
						"title": "Geo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "hostname",
						"title": "Hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "is_anonymous",
						"title": "Is Anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_anycast",
						"title": "Is Anycast",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_hosting",
						"title": "Is Hosting",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_mobile",
						"title": "Is Mobile",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_satellite",
						"title": "Is Satellite",
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
								"parts": []any{
									"lookup",
									"{ip}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"lookup",
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
						"type": "`$INTEGER`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/domains/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"domains",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 100,
										},
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"limit",
										"page",
									},
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
						"title": "8 8 8 8",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "8_8_8_8city",
						"title": "8 8 8 8city",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "value",
						"title": "Value",
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
								"parts": []any{
									"tools",
									"map",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cli",
											"orig": "cli",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cli",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"tools",
									"summarize-ips",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "cli",
											"orig": "cli",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"cli",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/batch",
								"segments": []any{
									map[string]any{
										"lit": "batch",
									},
								},
								"parts": []any{
									"batch",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Asn",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "bogon",
						"title": "Bogon",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "hostname",
						"title": "Hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "loc",
						"title": "Loc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"title": "Org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postal",
						"title": "Postal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "privacy",
						"title": "Privacy",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
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
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Asn",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "bogon",
						"title": "Bogon",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "carrier",
						"title": "Carrier",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "hostname",
						"title": "Hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "loc",
						"title": "Loc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"title": "Org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postal",
						"title": "Postal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "privacy",
						"title": "Privacy",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
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
								"kind": "http",
								"method": "GET",
								"orig": "/{ip}",
								"segments": []any{
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"title": "Key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
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
								"parts": []any{
									"lookup",
									"{ip}",
									"{field}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"lookup",
									"me",
									"{field}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ipinfo_lite": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
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
								"parts": []any{
									"lite",
									"{ip}",
									"{field}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"lite",
									"me",
									"{field}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/lite/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "lite",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"lite",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.lite",
						},
					},
				},
			},
			"ipinfo_plus": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "key",
						"title": "Key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
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
								"parts": []any{
									"plus",
									"{ip}",
									"{field}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"plus",
									"me",
									"{field}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "field",
											"orig": "field",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"field",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.plus",
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
								"parts": []any{
									"lite",
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "me",
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
						"title": "Anonymous",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "as",
						"title": "As",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "geo",
						"title": "Geo",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "hostname",
						"title": "Hostname",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "is_anonymous",
						"title": "Is Anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_anycast",
						"title": "Is Anycast",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_hosting",
						"title": "Is Hosting",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_mobile",
						"title": "Is Mobile",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_satellite",
						"title": "Is Satellite",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "mobile",
						"title": "Mobile",
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
								"kind": "http",
								"method": "GET",
								"orig": "/max/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "max",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"max",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Features",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "requests",
						"title": "Requests",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "men",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/me",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
								},
								"parts": []any{
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Category",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ssid",
						"title": "Ssid",
						"type": "`$STRING`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/places/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "places",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"places",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Anonymous",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "as",
						"title": "As",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "geo",
						"title": "Geo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "is_anonymous",
						"title": "Is Anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_anycast",
						"title": "Is Anycast",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_hosting",
						"title": "Is Hosting",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_mobile",
						"title": "Is Mobile",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "is_satellite",
						"title": "Is Satellite",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "mobile",
						"title": "Mobile",
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
								"kind": "http",
								"method": "GET",
								"orig": "/plus/{ip}",
								"segments": []any{
									map[string]any{
										"lit": "plus",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"plus",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"ip": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"plus",
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{
									"$action": "me",
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
						"title": "Hosting",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "proxy",
						"title": "Proxy",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "relay",
						"title": "Relay",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "service",
						"title": "Service",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "tor",
						"title": "Tor",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "vpn",
						"title": "Vpn",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "privacy",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"privacy",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
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
						"title": "Census",
						"type": "`$BOOLEAN`",
						"short": "Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software.",
					},
					map[string]any{
						"name": "census_ports",
						"title": "Census Ports",
						"type": "`$ARRAY`",
						"short": "The ports we've gotten positive results for when running our VPN detection census",
					},
					map[string]any{
						"name": "confidence",
						"title": "Confidence",
						"type": "`$INTEGER`",
						"short": "The level of confidence attributed to the best source associated with this range.",
					},
					map[string]any{
						"name": "coverage",
						"title": "Coverage",
						"type": "`$NUMBER`",
						"short": "For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on.",
					},
					map[string]any{
						"name": "device_activity",
						"title": "Device Activity",
						"type": "`$BOOLEAN`",
						"short": "Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)",
					},
					map[string]any{
						"name": "first_seen",
						"title": "First Seen",
						"type": "`$STRING`",
						"short": "Date when the activity on an anonymous IP address was first observed.",
						"format": "date",
					},
					map[string]any{
						"name": "hosting",
						"title": "Hosting",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates a hosting/cloud service/data center IP address",
					},
					map[string]any{
						"name": "inferred",
						"title": "Inferred",
						"type": "`$BOOLEAN`",
						"short": "Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs",
					},
					map[string]any{
						"name": "last_seen",
						"title": "Last Seen",
						"type": "`$STRING`",
						"short": "Date when the activity on an anonymous IP address was last/recently observed.",
						"format": "date",
					},
					map[string]any{
						"name": "proxy",
						"title": "Proxy",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates an open web proxy IP address",
					},
					map[string]any{
						"name": "relay",
						"title": "Relay",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates a location-preserving anonymous relay service",
					},
					map[string]any{
						"name": "service",
						"title": "Service",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names",
					},
					map[string]any{
						"name": "tor",
						"title": "Tor",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates a Tor (The Onion Router) exit node IP address",
					},
					map[string]any{
						"name": "vpn",
						"title": "Vpn",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Indicates Virtual Private Network (VPN) service exit node IP address",
					},
					map[string]any{
						"name": "vpn_config",
						"title": "Vpn Config",
						"type": "`$BOOLEAN`",
						"short": "Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs",
					},
					map[string]any{
						"name": "whois",
						"title": "Whois",
						"type": "`$BOOLEAN`",
						"short": "Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers",
					},
				},
				"name": "privacy_extended",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"privacy_extended",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.census_ports`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
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
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "num_ranges",
						"title": "Num Ranges",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ranges",
						"title": "Ranges",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "redirects_to",
						"title": "Redirects To",
						"type": "`$STRING`",
						"req": true,
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
								"kind": "http",
								"method": "GET",
								"orig": "/ranges/{domain}",
								"segments": []any{
									map[string]any{
										"lit": "ranges",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"ranges",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Ip",
						"type": "`$STRING`",
						"req": true,
						"short": "The IPv4 or IPv6 address associated with a residential proxy",
					},
					map[string]any{
						"name": "last_seen",
						"title": "Last Seen",
						"type": "`$STRING`",
						"req": true,
						"short": "The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)",
						"format": "date",
					},
					map[string]any{
						"name": "percent_days_seen",
						"title": "Percent Days Seen",
						"type": "`$INTEGER`",
						"req": true,
						"short": "The percentage of days the IP was active in the last 7-day period",
					},
					map[string]any{
						"name": "service",
						"title": "Service",
						"type": "`$STRING`",
						"req": true,
						"short": "The name of the residential proxy service.",
					},
				},
				"name": "residential_proxy",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"resproxy",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
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
								"parts": []any{
									"{ip}",
									"city",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"country",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"hostname",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"ip",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"loc",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"org",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"postal",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"region",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"{ip}",
									"timezone",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "ip",
											"orig": "ip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ip",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/city",
								"segments": []any{
									map[string]any{
										"lit": "city",
									},
								},
								"parts": []any{
									"city",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/country",
								"segments": []any{
									map[string]any{
										"lit": "country",
									},
								},
								"parts": []any{
									"country",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/hostname",
								"segments": []any{
									map[string]any{
										"lit": "hostname",
									},
								},
								"parts": []any{
									"hostname",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ip",
								"segments": []any{
									map[string]any{
										"lit": "ip",
									},
								},
								"parts": []any{
									"ip",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/loc",
								"segments": []any{
									map[string]any{
										"lit": "loc",
									},
								},
								"parts": []any{
									"loc",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/org",
								"segments": []any{
									map[string]any{
										"lit": "org",
									},
								},
								"parts": []any{
									"org",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/postal",
								"segments": []any{
									map[string]any{
										"lit": "postal",
									},
								},
								"parts": []any{
									"postal",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/region",
								"segments": []any{
									map[string]any{
										"lit": "region",
									},
								},
								"parts": []any{
									"region",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/timezone",
								"segments": []any{
									map[string]any{
										"lit": "timezone",
									},
								},
								"parts": []any{
									"timezone",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Abuse",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "admin",
						"title": "Admin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maintainer",
						"title": "Maintainer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"title": "Org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "range",
						"title": "Range",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "raw",
						"title": "Raw",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tech",
						"title": "Tech",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
						"format": "date",
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
								"parts": []any{
									"whois",
									"net",
									"AS{asn}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.records`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "asn",
											"orig": "asn",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"asn",
										"page",
										"whoissource",
									},
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
						"title": "Net",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
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
								"parts": []any{
									"whois",
									"net",
									"{domain}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
										"page",
										"whoissource",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whois_ip": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "net",
						"title": "Net",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
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
								"parts": []any{
									"whois",
									"net",
									"{whoisip}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "whoisip",
											"orig": "whoisip",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"whoisip",
										"whoissource",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whois_net_id": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "net",
						"title": "Net",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
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
								"parts": []any{
									"whois",
									"net",
									"{whoisnetid}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "whoisnetid",
											"orig": "whoisnetid",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"whoisnetid",
										"whoissource",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"whois_org": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "org",
						"title": "Org",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
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
								"kind": "http",
								"method": "GET",
								"orig": "/whois/org/{whoisorgid}",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "whoisorgid",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page",
										"whoissource",
									},
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
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page",
						"title": "Page",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "poc",
						"title": "Poc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "records",
						"title": "Records",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
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
								"kind": "http",
								"method": "GET",
								"orig": "/whois/poc/{whoispoc}",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "whoispoc",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "whoissource",
											"orig": "whoissource",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"page",
										"whoissource",
									},
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
