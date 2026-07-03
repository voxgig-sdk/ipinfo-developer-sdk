package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ipinfo-developer-sdk/go"
	"github.com/voxgig-sdk/ipinfo-developer-sdk/go/core"

	vs "github.com/voxgig-sdk/ipinfo-developer-sdk/go/utility/struct"
)

func TestWhoisAsnEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.WhoisAsn(nil)
		if ent == nil {
			t.Fatal("expected non-nil WhoisAsnEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := whois_asnBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "whois_asn." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set IPINFODEVELOPER_TEST_WHOIS_ASN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		whoisAsnRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.whois_asn", setup.data)))
		var whoisAsnRef01Data map[string]any
		if len(whoisAsnRef01DataRaw) > 0 {
			whoisAsnRef01Data = core.ToMapAny(whoisAsnRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = whoisAsnRef01Data

		// LIST
		whoisAsnRef01Ent := client.WhoisAsn(nil)
		whoisAsnRef01Match := map[string]any{
			"asn": setup.idmap["asn01"],
		}

		whoisAsnRef01ListResult, err := whoisAsnRef01Ent.List(whoisAsnRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, whoisAsnRef01ListOk := whoisAsnRef01ListResult.([]any)
		if !whoisAsnRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", whoisAsnRef01ListResult)
		}

	})
}

func whois_asnBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "whois_asn", "WhoisAsnTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read whois_asn test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse whois_asn test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"whois_asn01", "whois_asn02", "whois_asn03", "asn01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("IPINFODEVELOPER_TEST_WHOIS_ASN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IPINFODEVELOPER_TEST_WHOIS_ASN_ENTID": idmap,
		"IPINFODEVELOPER_TEST_LIVE":      "FALSE",
		"IPINFODEVELOPER_TEST_EXPLAIN":   "FALSE",
		"IPINFODEVELOPER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IPINFODEVELOPER_TEST_WHOIS_ASN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IPINFODEVELOPER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["IPINFODEVELOPER_APIKEY"],
			},
			extra,
		})
		client = sdk.NewIpinfoDeveloperSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IPINFODEVELOPER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IPINFODEVELOPER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
