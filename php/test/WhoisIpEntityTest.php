<?php
declare(strict_types=1);

// WhoisIp entity test

require_once __DIR__ . '/../ipinfodeveloper_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class WhoisIpEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IpinfoDeveloperSDK::test(null, null);
        $ent = $testsdk->WhoisIp(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = whois_ip_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "whois_ip." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IPINFODEVELOPER_TEST_WHOIS_IP_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $whois_ip_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.whois_ip")));
        $whois_ip_ref01_data = null;
        if (count($whois_ip_ref01_data_raw) > 0) {
            $whois_ip_ref01_data = Helpers::to_map($whois_ip_ref01_data_raw[0][1]);
        }

        // LOAD
        $whois_ip_ref01_ent = $client->WhoisIp(null);
        $whois_ip_ref01_match_dt0 = [];
        [$whois_ip_ref01_data_dt0_loaded, $err] = $whois_ip_ref01_ent->load($whois_ip_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($whois_ip_ref01_data_dt0_loaded);

    }
}

function whois_ip_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/whois_ip/WhoisIpTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IpinfoDeveloperSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["whois_ip01", "whois_ip02", "whois_ip03", "net01", "net02", "net03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IPINFODEVELOPER_TEST_WHOIS_IP_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IPINFODEVELOPER_TEST_WHOIS_IP_ENTID" => $idmap,
        "IPINFODEVELOPER_TEST_LIVE" => "FALSE",
        "IPINFODEVELOPER_TEST_EXPLAIN" => "FALSE",
        "IPINFODEVELOPER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IPINFODEVELOPER_TEST_WHOIS_IP_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IPINFODEVELOPER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["IPINFODEVELOPER_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new IpinfoDeveloperSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IPINFODEVELOPER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IPINFODEVELOPER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
