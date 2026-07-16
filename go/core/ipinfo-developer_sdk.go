package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/ipinfo-developer-sdk/go/utility/struct"
)

type IpinfoDeveloperSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewIpinfoDeveloperSDK(options map[string]any) *IpinfoDeveloperSDK {
	sdk := &IpinfoDeveloperSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *IpinfoDeveloperSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *IpinfoDeveloperSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *IpinfoDeveloperSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *IpinfoDeveloperSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *IpinfoDeveloperSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Abuse returns a Abuse entity bound to this client.
// Idiomatic usage: client.Abuse(nil).List(nil, nil) or
// client.Abuse(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Abuse(data map[string]any) IpinfoDeveloperEntity {
	return NewAbuseEntityFunc(sdk, data)
}


// Asn returns a Asn entity bound to this client.
// Idiomatic usage: client.Asn(nil).List(nil, nil) or
// client.Asn(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Asn(data map[string]any) IpinfoDeveloperEntity {
	return NewAsnEntityFunc(sdk, data)
}


// Carrier returns a Carrier entity bound to this client.
// Idiomatic usage: client.Carrier(nil).List(nil, nil) or
// client.Carrier(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Carrier(data map[string]any) IpinfoDeveloperEntity {
	return NewCarrierEntityFunc(sdk, data)
}


// Company returns a Company entity bound to this client.
// Idiomatic usage: client.Company(nil).List(nil, nil) or
// client.Company(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Company(data map[string]any) IpinfoDeveloperEntity {
	return NewCompanyEntityFunc(sdk, data)
}


// Core returns a Core entity bound to this client.
// Idiomatic usage: client.Core(nil).List(nil, nil) or
// client.Core(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Core(data map[string]any) IpinfoDeveloperEntity {
	return NewCoreEntityFunc(sdk, data)
}


// Domain returns a Domain entity bound to this client.
// Idiomatic usage: client.Domain(nil).List(nil, nil) or
// client.Domain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Domain(data map[string]any) IpinfoDeveloperEntity {
	return NewDomainEntityFunc(sdk, data)
}


// General returns a General entity bound to this client.
// Idiomatic usage: client.General(nil).List(nil, nil) or
// client.General(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) General(data map[string]any) IpinfoDeveloperEntity {
	return NewGeneralEntityFunc(sdk, data)
}


// GetCurrentInformation returns a GetCurrentInformation entity bound to this client.
// Idiomatic usage: client.GetCurrentInformation(nil).List(nil, nil) or
// client.GetCurrentInformation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) GetCurrentInformation(data map[string]any) IpinfoDeveloperEntity {
	return NewGetCurrentInformationEntityFunc(sdk, data)
}


// GetInformationByIp returns a GetInformationByIp entity bound to this client.
// Idiomatic usage: client.GetInformationByIp(nil).List(nil, nil) or
// client.GetInformationByIp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) GetInformationByIp(data map[string]any) IpinfoDeveloperEntity {
	return NewGetInformationByIpEntityFunc(sdk, data)
}


// IpinfoCore returns a IpinfoCore entity bound to this client.
// Idiomatic usage: client.IpinfoCore(nil).List(nil, nil) or
// client.IpinfoCore(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) IpinfoCore(data map[string]any) IpinfoDeveloperEntity {
	return NewIpinfoCoreEntityFunc(sdk, data)
}


// IpinfoLite returns a IpinfoLite entity bound to this client.
// Idiomatic usage: client.IpinfoLite(nil).List(nil, nil) or
// client.IpinfoLite(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) IpinfoLite(data map[string]any) IpinfoDeveloperEntity {
	return NewIpinfoLiteEntityFunc(sdk, data)
}


// IpinfoPlus returns a IpinfoPlus entity bound to this client.
// Idiomatic usage: client.IpinfoPlus(nil).List(nil, nil) or
// client.IpinfoPlus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) IpinfoPlus(data map[string]any) IpinfoDeveloperEntity {
	return NewIpinfoPlusEntityFunc(sdk, data)
}


// Lite returns a Lite entity bound to this client.
// Idiomatic usage: client.Lite(nil).List(nil, nil) or
// client.Lite(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Lite(data map[string]any) IpinfoDeveloperEntity {
	return NewLiteEntityFunc(sdk, data)
}


// Max returns a Max entity bound to this client.
// Idiomatic usage: client.Max(nil).List(nil, nil) or
// client.Max(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Max(data map[string]any) IpinfoDeveloperEntity {
	return NewMaxEntityFunc(sdk, data)
}


// Men returns a Men entity bound to this client.
// Idiomatic usage: client.Men(nil).List(nil, nil) or
// client.Men(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Men(data map[string]any) IpinfoDeveloperEntity {
	return NewMenEntityFunc(sdk, data)
}


// Place returns a Place entity bound to this client.
// Idiomatic usage: client.Place(nil).List(nil, nil) or
// client.Place(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Place(data map[string]any) IpinfoDeveloperEntity {
	return NewPlaceEntityFunc(sdk, data)
}


// Plus returns a Plus entity bound to this client.
// Idiomatic usage: client.Plus(nil).List(nil, nil) or
// client.Plus(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Plus(data map[string]any) IpinfoDeveloperEntity {
	return NewPlusEntityFunc(sdk, data)
}


// Privacy returns a Privacy entity bound to this client.
// Idiomatic usage: client.Privacy(nil).List(nil, nil) or
// client.Privacy(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Privacy(data map[string]any) IpinfoDeveloperEntity {
	return NewPrivacyEntityFunc(sdk, data)
}


// PrivacyExtended returns a PrivacyExtended entity bound to this client.
// Idiomatic usage: client.PrivacyExtended(nil).List(nil, nil) or
// client.PrivacyExtended(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) PrivacyExtended(data map[string]any) IpinfoDeveloperEntity {
	return NewPrivacyExtendedEntityFunc(sdk, data)
}


// Range returns a Range entity bound to this client.
// Idiomatic usage: client.Range(nil).List(nil, nil) or
// client.Range(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Range(data map[string]any) IpinfoDeveloperEntity {
	return NewRangeEntityFunc(sdk, data)
}


// ResidentialProxy returns a ResidentialProxy entity bound to this client.
// Idiomatic usage: client.ResidentialProxy(nil).List(nil, nil) or
// client.ResidentialProxy(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) ResidentialProxy(data map[string]any) IpinfoDeveloperEntity {
	return NewResidentialProxyEntityFunc(sdk, data)
}


// Single returns a Single entity bound to this client.
// Idiomatic usage: client.Single(nil).List(nil, nil) or
// client.Single(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) Single(data map[string]any) IpinfoDeveloperEntity {
	return NewSingleEntityFunc(sdk, data)
}


// WhoisAsn returns a WhoisAsn entity bound to this client.
// Idiomatic usage: client.WhoisAsn(nil).List(nil, nil) or
// client.WhoisAsn(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) WhoisAsn(data map[string]any) IpinfoDeveloperEntity {
	return NewWhoisAsnEntityFunc(sdk, data)
}


// WhoisDomain returns a WhoisDomain entity bound to this client.
// Idiomatic usage: client.WhoisDomain(nil).List(nil, nil) or
// client.WhoisDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) WhoisDomain(data map[string]any) IpinfoDeveloperEntity {
	return NewWhoisDomainEntityFunc(sdk, data)
}


// WhoisIp returns a WhoisIp entity bound to this client.
// Idiomatic usage: client.WhoisIp(nil).List(nil, nil) or
// client.WhoisIp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) WhoisIp(data map[string]any) IpinfoDeveloperEntity {
	return NewWhoisIpEntityFunc(sdk, data)
}


// WhoisNetId returns a WhoisNetId entity bound to this client.
// Idiomatic usage: client.WhoisNetId(nil).List(nil, nil) or
// client.WhoisNetId(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) WhoisNetId(data map[string]any) IpinfoDeveloperEntity {
	return NewWhoisNetIdEntityFunc(sdk, data)
}


// WhoisOrg returns a WhoisOrg entity bound to this client.
// Idiomatic usage: client.WhoisOrg(nil).List(nil, nil) or
// client.WhoisOrg(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) WhoisOrg(data map[string]any) IpinfoDeveloperEntity {
	return NewWhoisOrgEntityFunc(sdk, data)
}


// WhoisPoc returns a WhoisPoc entity bound to this client.
// Idiomatic usage: client.WhoisPoc(nil).List(nil, nil) or
// client.WhoisPoc(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *IpinfoDeveloperSDK) WhoisPoc(data map[string]any) IpinfoDeveloperEntity {
	return NewWhoisPocEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *IpinfoDeveloperSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewIpinfoDeveloperSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
