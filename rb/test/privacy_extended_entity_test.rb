# PrivacyExtended entity test

require "minitest/autorun"
require "json"
require_relative "../IpinfoDeveloper_sdk"
require_relative "runner"

class PrivacyExtendedEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IpinfoDeveloperSDK.test(nil, nil)
    ent = testsdk.PrivacyExtended(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = privacy_extended_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "privacy_extended." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IPINFODEVELOPER_TEST_PRIVACY_EXTENDED_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    privacy_extended_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.privacy_extended")))
    privacy_extended_ref01_data = nil
    if privacy_extended_ref01_data_raw.length > 0
      privacy_extended_ref01_data = Helpers.to_map(privacy_extended_ref01_data_raw[0][1])
    end

    # LIST
    privacy_extended_ref01_ent = client.PrivacyExtended(nil)
    privacy_extended_ref01_match = {
      "ip" => setup[:idmap]["ip01"],
    }

    privacy_extended_ref01_list_result, err = privacy_extended_ref01_ent.list(privacy_extended_ref01_match, nil)
    assert_nil err
    assert privacy_extended_ref01_list_result.is_a?(Array)

  end
end

def privacy_extended_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "privacy_extended", "PrivacyExtendedTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IpinfoDeveloperSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["privacy_extended01", "privacy_extended02", "privacy_extended03", "ip01"],
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
  entid_env_raw = ENV["IPINFODEVELOPER_TEST_PRIVACY_EXTENDED_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IPINFODEVELOPER_TEST_PRIVACY_EXTENDED_ENTID" => idmap,
    "IPINFODEVELOPER_TEST_LIVE" => "FALSE",
    "IPINFODEVELOPER_TEST_EXPLAIN" => "FALSE",
    "IPINFODEVELOPER_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["IPINFODEVELOPER_TEST_PRIVACY_EXTENDED_ENTID"])
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
