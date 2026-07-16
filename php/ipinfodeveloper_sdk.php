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

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
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

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = IpinfoDeveloperHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = IpinfoDeveloperHelpers::to_map($feature_opts[$fname] ?? null);
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

    public function prepare(array $fetchargs = []): mixed
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
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
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
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
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

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_abuse = null;

    // Canonical facade: $client->Abuse()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->abuse()
    // resolves here too.
    public function Abuse($data = null)
    {
        require_once __DIR__ . '/entity/abuse_entity.php';
        if ($data === null) {
            if ($this->_abuse === null) {
                $this->_abuse = new AbuseEntity($this, null);
            }
            return $this->_abuse;
        }
        return new AbuseEntity($this, $data);
    }


    private $_asn = null;

    // Canonical facade: $client->Asn()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->asn()
    // resolves here too.
    public function Asn($data = null)
    {
        require_once __DIR__ . '/entity/asn_entity.php';
        if ($data === null) {
            if ($this->_asn === null) {
                $this->_asn = new AsnEntity($this, null);
            }
            return $this->_asn;
        }
        return new AsnEntity($this, $data);
    }


    private $_carrier = null;

    // Canonical facade: $client->Carrier()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->carrier()
    // resolves here too.
    public function Carrier($data = null)
    {
        require_once __DIR__ . '/entity/carrier_entity.php';
        if ($data === null) {
            if ($this->_carrier === null) {
                $this->_carrier = new CarrierEntity($this, null);
            }
            return $this->_carrier;
        }
        return new CarrierEntity($this, $data);
    }


    private $_company = null;

    // Canonical facade: $client->Company()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->company()
    // resolves here too.
    public function Company($data = null)
    {
        require_once __DIR__ . '/entity/company_entity.php';
        if ($data === null) {
            if ($this->_company === null) {
                $this->_company = new CompanyEntity($this, null);
            }
            return $this->_company;
        }
        return new CompanyEntity($this, $data);
    }


    private $_core = null;

    // Canonical facade: $client->Core()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->core()
    // resolves here too.
    public function Core($data = null)
    {
        require_once __DIR__ . '/entity/core_entity.php';
        if ($data === null) {
            if ($this->_core === null) {
                $this->_core = new CoreEntity($this, null);
            }
            return $this->_core;
        }
        return new CoreEntity($this, $data);
    }


    private $_domain = null;

    // Canonical facade: $client->Domain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->domain()
    // resolves here too.
    public function Domain($data = null)
    {
        require_once __DIR__ . '/entity/domain_entity.php';
        if ($data === null) {
            if ($this->_domain === null) {
                $this->_domain = new DomainEntity($this, null);
            }
            return $this->_domain;
        }
        return new DomainEntity($this, $data);
    }


    private $_general = null;

    // Canonical facade: $client->General()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->general()
    // resolves here too.
    public function General($data = null)
    {
        require_once __DIR__ . '/entity/general_entity.php';
        if ($data === null) {
            if ($this->_general === null) {
                $this->_general = new GeneralEntity($this, null);
            }
            return $this->_general;
        }
        return new GeneralEntity($this, $data);
    }


    private $_get_current_information = null;

    // Canonical facade: $client->GetCurrentInformation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->get_current_information()
    // resolves here too.
    public function GetCurrentInformation($data = null)
    {
        require_once __DIR__ . '/entity/get_current_information_entity.php';
        if ($data === null) {
            if ($this->_get_current_information === null) {
                $this->_get_current_information = new GetCurrentInformationEntity($this, null);
            }
            return $this->_get_current_information;
        }
        return new GetCurrentInformationEntity($this, $data);
    }


    private $_get_information_by_ip = null;

    // Canonical facade: $client->GetInformationByIp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->get_information_by_ip()
    // resolves here too.
    public function GetInformationByIp($data = null)
    {
        require_once __DIR__ . '/entity/get_information_by_ip_entity.php';
        if ($data === null) {
            if ($this->_get_information_by_ip === null) {
                $this->_get_information_by_ip = new GetInformationByIpEntity($this, null);
            }
            return $this->_get_information_by_ip;
        }
        return new GetInformationByIpEntity($this, $data);
    }


    private $_ipinfo_core = null;

    // Canonical facade: $client->IpinfoCore()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ipinfo_core()
    // resolves here too.
    public function IpinfoCore($data = null)
    {
        require_once __DIR__ . '/entity/ipinfo_core_entity.php';
        if ($data === null) {
            if ($this->_ipinfo_core === null) {
                $this->_ipinfo_core = new IpinfoCoreEntity($this, null);
            }
            return $this->_ipinfo_core;
        }
        return new IpinfoCoreEntity($this, $data);
    }


    private $_ipinfo_lite = null;

    // Canonical facade: $client->IpinfoLite()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ipinfo_lite()
    // resolves here too.
    public function IpinfoLite($data = null)
    {
        require_once __DIR__ . '/entity/ipinfo_lite_entity.php';
        if ($data === null) {
            if ($this->_ipinfo_lite === null) {
                $this->_ipinfo_lite = new IpinfoLiteEntity($this, null);
            }
            return $this->_ipinfo_lite;
        }
        return new IpinfoLiteEntity($this, $data);
    }


    private $_ipinfo_plus = null;

    // Canonical facade: $client->IpinfoPlus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ipinfo_plus()
    // resolves here too.
    public function IpinfoPlus($data = null)
    {
        require_once __DIR__ . '/entity/ipinfo_plus_entity.php';
        if ($data === null) {
            if ($this->_ipinfo_plus === null) {
                $this->_ipinfo_plus = new IpinfoPlusEntity($this, null);
            }
            return $this->_ipinfo_plus;
        }
        return new IpinfoPlusEntity($this, $data);
    }


    private $_lite = null;

    // Canonical facade: $client->Lite()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->lite()
    // resolves here too.
    public function Lite($data = null)
    {
        require_once __DIR__ . '/entity/lite_entity.php';
        if ($data === null) {
            if ($this->_lite === null) {
                $this->_lite = new LiteEntity($this, null);
            }
            return $this->_lite;
        }
        return new LiteEntity($this, $data);
    }


    private $_max = null;

    // Canonical facade: $client->Max()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->max()
    // resolves here too.
    public function Max($data = null)
    {
        require_once __DIR__ . '/entity/max_entity.php';
        if ($data === null) {
            if ($this->_max === null) {
                $this->_max = new MaxEntity($this, null);
            }
            return $this->_max;
        }
        return new MaxEntity($this, $data);
    }


    private $_men = null;

    // Canonical facade: $client->Men()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->men()
    // resolves here too.
    public function Men($data = null)
    {
        require_once __DIR__ . '/entity/men_entity.php';
        if ($data === null) {
            if ($this->_men === null) {
                $this->_men = new MenEntity($this, null);
            }
            return $this->_men;
        }
        return new MenEntity($this, $data);
    }


    private $_place = null;

    // Canonical facade: $client->Place()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->place()
    // resolves here too.
    public function Place($data = null)
    {
        require_once __DIR__ . '/entity/place_entity.php';
        if ($data === null) {
            if ($this->_place === null) {
                $this->_place = new PlaceEntity($this, null);
            }
            return $this->_place;
        }
        return new PlaceEntity($this, $data);
    }


    private $_plus = null;

    // Canonical facade: $client->Plus()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->plus()
    // resolves here too.
    public function Plus($data = null)
    {
        require_once __DIR__ . '/entity/plus_entity.php';
        if ($data === null) {
            if ($this->_plus === null) {
                $this->_plus = new PlusEntity($this, null);
            }
            return $this->_plus;
        }
        return new PlusEntity($this, $data);
    }


    private $_privacy = null;

    // Canonical facade: $client->Privacy()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->privacy()
    // resolves here too.
    public function Privacy($data = null)
    {
        require_once __DIR__ . '/entity/privacy_entity.php';
        if ($data === null) {
            if ($this->_privacy === null) {
                $this->_privacy = new PrivacyEntity($this, null);
            }
            return $this->_privacy;
        }
        return new PrivacyEntity($this, $data);
    }


    private $_privacy_extended = null;

    // Canonical facade: $client->PrivacyExtended()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->privacy_extended()
    // resolves here too.
    public function PrivacyExtended($data = null)
    {
        require_once __DIR__ . '/entity/privacy_extended_entity.php';
        if ($data === null) {
            if ($this->_privacy_extended === null) {
                $this->_privacy_extended = new PrivacyExtendedEntity($this, null);
            }
            return $this->_privacy_extended;
        }
        return new PrivacyExtendedEntity($this, $data);
    }


    private $_range = null;

    // Canonical facade: $client->Range()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->range()
    // resolves here too.
    public function Range($data = null)
    {
        require_once __DIR__ . '/entity/range_entity.php';
        if ($data === null) {
            if ($this->_range === null) {
                $this->_range = new RangeEntity($this, null);
            }
            return $this->_range;
        }
        return new RangeEntity($this, $data);
    }


    private $_residential_proxy = null;

    // Canonical facade: $client->ResidentialProxy()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->residential_proxy()
    // resolves here too.
    public function ResidentialProxy($data = null)
    {
        require_once __DIR__ . '/entity/residential_proxy_entity.php';
        if ($data === null) {
            if ($this->_residential_proxy === null) {
                $this->_residential_proxy = new ResidentialProxyEntity($this, null);
            }
            return $this->_residential_proxy;
        }
        return new ResidentialProxyEntity($this, $data);
    }


    private $_single = null;

    // Canonical facade: $client->Single()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->single()
    // resolves here too.
    public function Single($data = null)
    {
        require_once __DIR__ . '/entity/single_entity.php';
        if ($data === null) {
            if ($this->_single === null) {
                $this->_single = new SingleEntity($this, null);
            }
            return $this->_single;
        }
        return new SingleEntity($this, $data);
    }


    private $_whois_asn = null;

    // Canonical facade: $client->WhoisAsn()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->whois_asn()
    // resolves here too.
    public function WhoisAsn($data = null)
    {
        require_once __DIR__ . '/entity/whois_asn_entity.php';
        if ($data === null) {
            if ($this->_whois_asn === null) {
                $this->_whois_asn = new WhoisAsnEntity($this, null);
            }
            return $this->_whois_asn;
        }
        return new WhoisAsnEntity($this, $data);
    }


    private $_whois_domain = null;

    // Canonical facade: $client->WhoisDomain()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->whois_domain()
    // resolves here too.
    public function WhoisDomain($data = null)
    {
        require_once __DIR__ . '/entity/whois_domain_entity.php';
        if ($data === null) {
            if ($this->_whois_domain === null) {
                $this->_whois_domain = new WhoisDomainEntity($this, null);
            }
            return $this->_whois_domain;
        }
        return new WhoisDomainEntity($this, $data);
    }


    private $_whois_ip = null;

    // Canonical facade: $client->WhoisIp()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->whois_ip()
    // resolves here too.
    public function WhoisIp($data = null)
    {
        require_once __DIR__ . '/entity/whois_ip_entity.php';
        if ($data === null) {
            if ($this->_whois_ip === null) {
                $this->_whois_ip = new WhoisIpEntity($this, null);
            }
            return $this->_whois_ip;
        }
        return new WhoisIpEntity($this, $data);
    }


    private $_whois_net_id = null;

    // Canonical facade: $client->WhoisNetId()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->whois_net_id()
    // resolves here too.
    public function WhoisNetId($data = null)
    {
        require_once __DIR__ . '/entity/whois_net_id_entity.php';
        if ($data === null) {
            if ($this->_whois_net_id === null) {
                $this->_whois_net_id = new WhoisNetIdEntity($this, null);
            }
            return $this->_whois_net_id;
        }
        return new WhoisNetIdEntity($this, $data);
    }


    private $_whois_org = null;

    // Canonical facade: $client->WhoisOrg()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->whois_org()
    // resolves here too.
    public function WhoisOrg($data = null)
    {
        require_once __DIR__ . '/entity/whois_org_entity.php';
        if ($data === null) {
            if ($this->_whois_org === null) {
                $this->_whois_org = new WhoisOrgEntity($this, null);
            }
            return $this->_whois_org;
        }
        return new WhoisOrgEntity($this, $data);
    }


    private $_whois_poc = null;

    // Canonical facade: $client->WhoisPoc()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->whois_poc()
    // resolves here too.
    public function WhoisPoc($data = null)
    {
        require_once __DIR__ . '/entity/whois_poc_entity.php';
        if ($data === null) {
            if ($this->_whois_poc === null) {
                $this->_whois_poc = new WhoisPocEntity($this, null);
            }
            return $this->_whois_poc;
        }
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
