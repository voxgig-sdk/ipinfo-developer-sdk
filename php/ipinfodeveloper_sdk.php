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

    // Idiomatic facade: $client->abuse()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Abuse() (PHP method
    // names are case-insensitive).
    public function abuse($data = null)
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

    // Idiomatic facade: $client->asn()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Asn() (PHP method
    // names are case-insensitive).
    public function asn($data = null)
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

    // Idiomatic facade: $client->carrier()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Carrier() (PHP method
    // names are case-insensitive).
    public function carrier($data = null)
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

    // Idiomatic facade: $client->company()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Company() (PHP method
    // names are case-insensitive).
    public function company($data = null)
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

    // Idiomatic facade: $client->core()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Core() (PHP method
    // names are case-insensitive).
    public function core($data = null)
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

    // Idiomatic facade: $client->domain()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Domain() (PHP method
    // names are case-insensitive).
    public function domain($data = null)
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

    // Idiomatic facade: $client->general()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias General() (PHP method
    // names are case-insensitive).
    public function general($data = null)
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

    // Idiomatic facade: $client->get_current_information()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias GetCurrentInformation() (PHP method
    // names are case-insensitive).
    public function get_current_information($data = null)
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

    // Idiomatic facade: $client->get_information_by_ip()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias GetInformationByIp() (PHP method
    // names are case-insensitive).
    public function get_information_by_ip($data = null)
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

    // Idiomatic facade: $client->ipinfo_core()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias IpinfoCore() (PHP method
    // names are case-insensitive).
    public function ipinfo_core($data = null)
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

    // Idiomatic facade: $client->ipinfo_lite()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias IpinfoLite() (PHP method
    // names are case-insensitive).
    public function ipinfo_lite($data = null)
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

    // Idiomatic facade: $client->ipinfo_plus()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias IpinfoPlus() (PHP method
    // names are case-insensitive).
    public function ipinfo_plus($data = null)
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

    // Idiomatic facade: $client->lite()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Lite() (PHP method
    // names are case-insensitive).
    public function lite($data = null)
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

    // Idiomatic facade: $client->max()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Max() (PHP method
    // names are case-insensitive).
    public function max($data = null)
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

    // Idiomatic facade: $client->men()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Men() (PHP method
    // names are case-insensitive).
    public function men($data = null)
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

    // Idiomatic facade: $client->place()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Place() (PHP method
    // names are case-insensitive).
    public function place($data = null)
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

    // Idiomatic facade: $client->plus()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Plus() (PHP method
    // names are case-insensitive).
    public function plus($data = null)
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

    // Idiomatic facade: $client->privacy()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Privacy() (PHP method
    // names are case-insensitive).
    public function privacy($data = null)
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

    // Idiomatic facade: $client->privacy_extended()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias PrivacyExtended() (PHP method
    // names are case-insensitive).
    public function privacy_extended($data = null)
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

    // Idiomatic facade: $client->range()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Range() (PHP method
    // names are case-insensitive).
    public function range($data = null)
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

    // Idiomatic facade: $client->residential_proxy()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias ResidentialProxy() (PHP method
    // names are case-insensitive).
    public function residential_proxy($data = null)
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

    // Idiomatic facade: $client->single()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Single() (PHP method
    // names are case-insensitive).
    public function single($data = null)
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

    // Idiomatic facade: $client->whois_asn()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias WhoisAsn() (PHP method
    // names are case-insensitive).
    public function whois_asn($data = null)
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

    // Idiomatic facade: $client->whois_domain()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias WhoisDomain() (PHP method
    // names are case-insensitive).
    public function whois_domain($data = null)
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

    // Idiomatic facade: $client->whois_ip()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias WhoisIp() (PHP method
    // names are case-insensitive).
    public function whois_ip($data = null)
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

    // Idiomatic facade: $client->whois_net_id()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias WhoisNetId() (PHP method
    // names are case-insensitive).
    public function whois_net_id($data = null)
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

    // Idiomatic facade: $client->whois_org()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias WhoisOrg() (PHP method
    // names are case-insensitive).
    public function whois_org($data = null)
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

    // Idiomatic facade: $client->whois_poc()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias WhoisPoc() (PHP method
    // names are case-insensitive).
    public function whois_poc($data = null)
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
