# IpinfoPlus entity test

require "minitest/autorun"
require "json"
require_relative "../IpinfoDeveloper_sdk"
require_relative "runner"

class IpinfoPlusEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IpinfoDeveloperSDK.test(nil, nil)
    ent = testsdk.IpinfoPlus(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = ipinfo_plus_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ipinfo_plus." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IPINFODEVELOPER_TEST_IPINFO_PLUS_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    ipinfo_plus_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.ipinfo_plus")))
    ipinfo_plus_ref01_data = nil
    if ipinfo_plus_ref01_data_raw.length > 0
      ipinfo_plus_ref01_data = Helpers.to_map(ipinfo_plus_ref01_data_raw[0][1])
    end

    # LOAD
    ipinfo_plus_ref01_ent = client.IpinfoPlus(nil)
    ipinfo_plus_ref01_match_dt0 = {}
    ipinfo_plus_ref01_data_dt0_loaded, err = ipinfo_plus_ref01_ent.load(ipinfo_plus_ref01_match_dt0, nil)
    assert_nil err
    assert !ipinfo_plus_ref01_data_dt0_loaded.nil?

  end
end

def ipinfo_plus_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ipinfo_plus", "IpinfoPlusTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IpinfoDeveloperSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ipinfo_plus01", "ipinfo_plus02", "ipinfo_plus03", "me01", "me02", "me03", "plus01", "plus02", "plus03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["IPINFODEVELOPER_TEST_IPINFO_PLUS_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IPINFODEVELOPER_TEST_IPINFO_PLUS_ENTID" => idmap,
    "IPINFODEVELOPER_TEST_LIVE" => "FALSE",
    "IPINFODEVELOPER_TEST_EXPLAIN" => "FALSE",
    "IPINFODEVELOPER_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["IPINFODEVELOPER_TEST_IPINFO_PLUS_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IPINFODEVELOPER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["IPINFODEVELOPER_APIKEY"],
      },
      extra || {},
    ])
    client = IpinfoDeveloperSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IPINFODEVELOPER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IPINFODEVELOPER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
