<?php
declare(strict_types=1);

// IpinfoDeveloper SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class IpinfoDeveloperSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new IpinfoDeveloperUtility();
        $this->_utility = $utility;

        $config = IpinfoDeveloperConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = IpinfoDeveloperHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = IpinfoDeveloperHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, IpinfoDeveloperFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return IpinfoDeveloperUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): array
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = IpinfoDeveloperHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = IpinfoDeveloperHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = IpinfoDeveloperHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new IpinfoDeveloperSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return [null, $err];
        }

        return ($utility->make_fetch_def)($ctx);
    }

    public function direct(array $fetchargs = []): array
    {
        $utility = $this->_utility;

        [$fetchdef, $err] = $this->prepare($fetchargs);
        if ($err) {
            return [["ok" => false, "err" => $err], null];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = IpinfoDeveloperHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return [["ok" => false, "err" => $fetch_err], null];
        }

        if ($fetched === null) {
            return [[
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ], null];
        }

        if (is_array($fetched)) {
            $status = IpinfoDeveloperHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [[
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ], null];
        }

        return [[
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ], null];
    }


    public function Abuse($data = null)
    {
        require_once __DIR__ . '/entity/abuse_entity.php';
        return new AbuseEntity($this, $data);
    }


    public function Asn($data = null)
    {
        require_once __DIR__ . '/entity/asn_entity.php';
        return new AsnEntity($this, $data);
    }


    public function Carrier($data = null)
    {
        require_once __DIR__ . '/entity/carrier_entity.php';
        return new CarrierEntity($this, $data);
    }


    public function Company($data = null)
    {
        require_once __DIR__ . '/entity/company_entity.php';
        return new CompanyEntity($this, $data);
    }


    public function Core($data = null)
    {
        require_once __DIR__ . '/entity/core_entity.php';
        return new CoreEntity($this, $data);
    }


    public function Domain($data = null)
    {
        require_once __DIR__ . '/entity/domain_entity.php';
        return new DomainEntity($this, $data);
    }


    public function General($data = null)
    {
        require_once __DIR__ . '/entity/general_entity.php';
        return new GeneralEntity($this, $data);
    }


    public function GetCurrentInformation($data = null)
    {
        require_once __DIR__ . '/entity/get_current_information_entity.php';
        return new GetCurrentInformationEntity($this, $data);
    }


    public function GetInformationByIp($data = null)
    {
        require_once __DIR__ . '/entity/get_information_by_ip_entity.php';
        return new GetInformationByIpEntity($this, $data);
    }


    public function IpinfoCore($data = null)
    {
        require_once __DIR__ . '/entity/ipinfo_core_entity.php';
        return new IpinfoCoreEntity($this, $data);
    }


    public function IpinfoLite($data = null)
    {
        require_once __DIR__ . '/entity/ipinfo_lite_entity.php';
        return new IpinfoLiteEntity($this, $data);
    }


    public function IpinfoPlus($data = null)
    {
        require_once __DIR__ . '/entity/ipinfo_plus_entity.php';
        return new IpinfoPlusEntity($this, $data);
    }


    public function Lite($data = null)
    {
        require_once __DIR__ . '/entity/lite_entity.php';
        return new LiteEntity($this, $data);
    }


    public function Max($data = null)
    {
        require_once __DIR__ . '/entity/max_entity.php';
        return new MaxEntity($this, $data);
    }


    public function Men($data = null)
    {
        require_once __DIR__ . '/entity/men_entity.php';
        return new MenEntity($this, $data);
    }


    public function Place($data = null)
    {
        require_once __DIR__ . '/entity/place_entity.php';
        return new PlaceEntity($this, $data);
    }


    public function Plus($data = null)
    {
        require_once __DIR__ . '/entity/plus_entity.php';
        return new PlusEntity($this, $data);
    }


    public function Privacy($data = null)
    {
        require_once __DIR__ . '/entity/privacy_entity.php';
        return new PrivacyEntity($this, $data);
    }


    public function PrivacyExtended($data = null)
    {
        require_once __DIR__ . '/entity/privacy_extended_entity.php';
        return new PrivacyExtendedEntity($this, $data);
    }


    public function Range($data = null)
    {
        require_once __DIR__ . '/entity/range_entity.php';
        return new RangeEntity($this, $data);
    }


    public function ResidentialProxy($data = null)
    {
        require_once __DIR__ . '/entity/residential_proxy_entity.php';
        return new ResidentialProxyEntity($this, $data);
    }


    public function Single($data = null)
    {
        require_once __DIR__ . '/entity/single_entity.php';
        return new SingleEntity($this, $data);
    }


    public function WhoisAsn($data = null)
    {
        require_once __DIR__ . '/entity/whois_asn_entity.php';
        return new WhoisAsnEntity($this, $data);
    }


    public function WhoisDomain($data = null)
    {
        require_once __DIR__ . '/entity/whois_domain_entity.php';
        return new WhoisDomainEntity($this, $data);
    }


    public function WhoisIp($data = null)
    {
        require_once __DIR__ . '/entity/whois_ip_entity.php';
        return new WhoisIpEntity($this, $data);
    }


    public function WhoisNetId($data = null)
    {
        require_once __DIR__ . '/entity/whois_net_id_entity.php';
        return new WhoisNetIdEntity($this, $data);
    }


    public function WhoisOrg($data = null)
    {
        require_once __DIR__ . '/entity/whois_org_entity.php';
        return new WhoisOrgEntity($this, $data);
    }


    public function WhoisPoc($data = null)
    {
        require_once __DIR__ . '/entity/whois_poc_entity.php';
        return new WhoisPocEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new IpinfoDeveloperSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
