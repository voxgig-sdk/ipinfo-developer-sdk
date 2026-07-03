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

func TestRangeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Range(nil)
		if ent == nil {
			t.Fatal("expected non-nil RangeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := rangeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "range." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set IPINFODEVELOPER_TEST_RANGE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		rangeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.range", setup.data)))
		var rangeRef01Data map[string]any
		if len(rangeRef01DataRaw) > 0 {
			rangeRef01Data = core.ToMapAny(rangeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = rangeRef01Data

		// LOAD
		rangeRef01Ent := client.Range(nil)
		rangeRef01MatchDt0 := map[string]any{}
		rangeRef01DataDt0Loaded, err := rangeRef01Ent.Load(rangeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if rangeRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func rangeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "range", "RangeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read range test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse range test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"range01", "range02", "range03"},
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
	entidEnvRaw := os.Getenv("IPINFODEVELOPER_TEST_RANGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IPINFODEVELOPER_TEST_RANGE_ENTID": idmap,
		"IPINFODEVELOPER_TEST_LIVE":      "FALSE",
		"IPINFODEVELOPER_TEST_EXPLAIN":   "FALSE",
		"IPINFODEVELOPER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IPINFODEVELOPER_TEST_RANGE_ENTID"])
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
