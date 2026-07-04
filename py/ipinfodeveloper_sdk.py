# IpinfoDeveloper SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import IpinfoDeveloperUtility
from core.spec import IpinfoDeveloperSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import IpinfoDeveloperBaseFeature
from features import _make_feature


class IpinfoDeveloperSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = IpinfoDeveloperUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return IpinfoDeveloperUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = IpinfoDeveloperSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def abuse(self):
        """Idiomatic facade: client.abuse.list() / client.abuse.load({"id": ...})."""
        from entity.abuse_entity import AbuseEntity
        cached = getattr(self, "_abuse", None)
        if cached is None:
            cached = AbuseEntity(self, None)
            self._abuse = cached
        return cached

    def Abuse(self, data=None):
        # Deprecated: use client.abuse instead.
        from entity.abuse_entity import AbuseEntity
        return AbuseEntity(self, data)


    @property
    def asn(self):
        """Idiomatic facade: client.asn.list() / client.asn.load({"id": ...})."""
        from entity.asn_entity import AsnEntity
        cached = getattr(self, "_asn", None)
        if cached is None:
            cached = AsnEntity(self, None)
            self._asn = cached
        return cached

    def Asn(self, data=None):
        # Deprecated: use client.asn instead.
        from entity.asn_entity import AsnEntity
        return AsnEntity(self, data)


    @property
    def carrier(self):
        """Idiomatic facade: client.carrier.list() / client.carrier.load({"id": ...})."""
        from entity.carrier_entity import CarrierEntity
        cached = getattr(self, "_carrier", None)
        if cached is None:
            cached = CarrierEntity(self, None)
            self._carrier = cached
        return cached

    def Carrier(self, data=None):
        # Deprecated: use client.carrier instead.
        from entity.carrier_entity import CarrierEntity
        return CarrierEntity(self, data)


    @property
    def company(self):
        """Idiomatic facade: client.company.list() / client.company.load({"id": ...})."""
        from entity.company_entity import CompanyEntity
        cached = getattr(self, "_company", None)
        if cached is None:
            cached = CompanyEntity(self, None)
            self._company = cached
        return cached

    def Company(self, data=None):
        # Deprecated: use client.company instead.
        from entity.company_entity import CompanyEntity
        return CompanyEntity(self, data)


    @property
    def core(self):
        """Idiomatic facade: client.core.list() / client.core.load({"id": ...})."""
        from entity.core_entity import CoreEntity
        cached = getattr(self, "_core", None)
        if cached is None:
            cached = CoreEntity(self, None)
            self._core = cached
        return cached

    def Core(self, data=None):
        # Deprecated: use client.core instead.
        from entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    @property
    def domain(self):
        """Idiomatic facade: client.domain.list() / client.domain.load({"id": ...})."""
        from entity.domain_entity import DomainEntity
        cached = getattr(self, "_domain", None)
        if cached is None:
            cached = DomainEntity(self, None)
            self._domain = cached
        return cached

    def Domain(self, data=None):
        # Deprecated: use client.domain instead.
        from entity.domain_entity import DomainEntity
        return DomainEntity(self, data)


    @property
    def general(self):
        """Idiomatic facade: client.general.list() / client.general.load({"id": ...})."""
        from entity.general_entity import GeneralEntity
        cached = getattr(self, "_general", None)
        if cached is None:
            cached = GeneralEntity(self, None)
            self._general = cached
        return cached

    def General(self, data=None):
        # Deprecated: use client.general instead.
        from entity.general_entity import GeneralEntity
        return GeneralEntity(self, data)


    @property
    def get_current_information(self):
        """Idiomatic facade: client.get_current_information.list() / client.get_current_information.load({"id": ...})."""
        from entity.get_current_information_entity import GetCurrentInformationEntity
        cached = getattr(self, "_get_current_information", None)
        if cached is None:
            cached = GetCurrentInformationEntity(self, None)
            self._get_current_information = cached
        return cached

    def GetCurrentInformation(self, data=None):
        # Deprecated: use client.get_current_information instead.
        from entity.get_current_information_entity import GetCurrentInformationEntity
        return GetCurrentInformationEntity(self, data)


    @property
    def get_information_by_ip(self):
        """Idiomatic facade: client.get_information_by_ip.list() / client.get_information_by_ip.load({"id": ...})."""
        from entity.get_information_by_ip_entity import GetInformationByIpEntity
        cached = getattr(self, "_get_information_by_ip", None)
        if cached is None:
            cached = GetInformationByIpEntity(self, None)
            self._get_information_by_ip = cached
        return cached

    def GetInformationByIp(self, data=None):
        # Deprecated: use client.get_information_by_ip instead.
        from entity.get_information_by_ip_entity import GetInformationByIpEntity
        return GetInformationByIpEntity(self, data)


    @property
    def ipinfo_core(self):
        """Idiomatic facade: client.ipinfo_core.list() / client.ipinfo_core.load({"id": ...})."""
        from entity.ipinfo_core_entity import IpinfoCoreEntity
        cached = getattr(self, "_ipinfo_core", None)
        if cached is None:
            cached = IpinfoCoreEntity(self, None)
            self._ipinfo_core = cached
        return cached

    def IpinfoCore(self, data=None):
        # Deprecated: use client.ipinfo_core instead.
        from entity.ipinfo_core_entity import IpinfoCoreEntity
        return IpinfoCoreEntity(self, data)


    @property
    def ipinfo_lite(self):
        """Idiomatic facade: client.ipinfo_lite.list() / client.ipinfo_lite.load({"id": ...})."""
        from entity.ipinfo_lite_entity import IpinfoLiteEntity
        cached = getattr(self, "_ipinfo_lite", None)
        if cached is None:
            cached = IpinfoLiteEntity(self, None)
            self._ipinfo_lite = cached
        return cached

    def IpinfoLite(self, data=None):
        # Deprecated: use client.ipinfo_lite instead.
        from entity.ipinfo_lite_entity import IpinfoLiteEntity
        return IpinfoLiteEntity(self, data)


    @property
    def ipinfo_plus(self):
        """Idiomatic facade: client.ipinfo_plus.list() / client.ipinfo_plus.load({"id": ...})."""
        from entity.ipinfo_plus_entity import IpinfoPlusEntity
        cached = getattr(self, "_ipinfo_plus", None)
        if cached is None:
            cached = IpinfoPlusEntity(self, None)
            self._ipinfo_plus = cached
        return cached

    def IpinfoPlus(self, data=None):
        # Deprecated: use client.ipinfo_plus instead.
        from entity.ipinfo_plus_entity import IpinfoPlusEntity
        return IpinfoPlusEntity(self, data)


    @property
    def lite(self):
        """Idiomatic facade: client.lite.list() / client.lite.load({"id": ...})."""
        from entity.lite_entity import LiteEntity
        cached = getattr(self, "_lite", None)
        if cached is None:
            cached = LiteEntity(self, None)
            self._lite = cached
        return cached

    def Lite(self, data=None):
        # Deprecated: use client.lite instead.
        from entity.lite_entity import LiteEntity
        return LiteEntity(self, data)


    @property
    def max(self):
        """Idiomatic facade: client.max.list() / client.max.load({"id": ...})."""
        from entity.max_entity import MaxEntity
        cached = getattr(self, "_max", None)
        if cached is None:
            cached = MaxEntity(self, None)
            self._max = cached
        return cached

    def Max(self, data=None):
        # Deprecated: use client.max instead.
        from entity.max_entity import MaxEntity
        return MaxEntity(self, data)


    @property
    def men(self):
        """Idiomatic facade: client.men.list() / client.men.load({"id": ...})."""
        from entity.men_entity import MenEntity
        cached = getattr(self, "_men", None)
        if cached is None:
            cached = MenEntity(self, None)
            self._men = cached
        return cached

    def Men(self, data=None):
        # Deprecated: use client.men instead.
        from entity.men_entity import MenEntity
        return MenEntity(self, data)


    @property
    def place(self):
        """Idiomatic facade: client.place.list() / client.place.load({"id": ...})."""
        from entity.place_entity import PlaceEntity
        cached = getattr(self, "_place", None)
        if cached is None:
            cached = PlaceEntity(self, None)
            self._place = cached
        return cached

    def Place(self, data=None):
        # Deprecated: use client.place instead.
        from entity.place_entity import PlaceEntity
        return PlaceEntity(self, data)


    @property
    def plus(self):
        """Idiomatic facade: client.plus.list() / client.plus.load({"id": ...})."""
        from entity.plus_entity import PlusEntity
        cached = getattr(self, "_plus", None)
        if cached is None:
            cached = PlusEntity(self, None)
            self._plus = cached
        return cached

    def Plus(self, data=None):
        # Deprecated: use client.plus instead.
        from entity.plus_entity import PlusEntity
        return PlusEntity(self, data)


    @property
    def privacy(self):
        """Idiomatic facade: client.privacy.list() / client.privacy.load({"id": ...})."""
        from entity.privacy_entity import PrivacyEntity
        cached = getattr(self, "_privacy", None)
        if cached is None:
            cached = PrivacyEntity(self, None)
            self._privacy = cached
        return cached

    def Privacy(self, data=None):
        # Deprecated: use client.privacy instead.
        from entity.privacy_entity import PrivacyEntity
        return PrivacyEntity(self, data)


    @property
    def privacy_extended(self):
        """Idiomatic facade: client.privacy_extended.list() / client.privacy_extended.load({"id": ...})."""
        from entity.privacy_extended_entity import PrivacyExtendedEntity
        cached = getattr(self, "_privacy_extended", None)
        if cached is None:
            cached = PrivacyExtendedEntity(self, None)
            self._privacy_extended = cached
        return cached

    def PrivacyExtended(self, data=None):
        # Deprecated: use client.privacy_extended instead.
        from entity.privacy_extended_entity import PrivacyExtendedEntity
        return PrivacyExtendedEntity(self, data)


    @property
    def range(self):
        """Idiomatic facade: client.range.list() / client.range.load({"id": ...})."""
        from entity.range_entity import RangeEntity
        cached = getattr(self, "_range", None)
        if cached is None:
            cached = RangeEntity(self, None)
            self._range = cached
        return cached

    def Range(self, data=None):
        # Deprecated: use client.range instead.
        from entity.range_entity import RangeEntity
        return RangeEntity(self, data)


    @property
    def residential_proxy(self):
        """Idiomatic facade: client.residential_proxy.list() / client.residential_proxy.load({"id": ...})."""
        from entity.residential_proxy_entity import ResidentialProxyEntity
        cached = getattr(self, "_residential_proxy", None)
        if cached is None:
            cached = ResidentialProxyEntity(self, None)
            self._residential_proxy = cached
        return cached

    def ResidentialProxy(self, data=None):
        # Deprecated: use client.residential_proxy instead.
        from entity.residential_proxy_entity import ResidentialProxyEntity
        return ResidentialProxyEntity(self, data)


    @property
    def single(self):
        """Idiomatic facade: client.single.list() / client.single.load({"id": ...})."""
        from entity.single_entity import SingleEntity
        cached = getattr(self, "_single", None)
        if cached is None:
            cached = SingleEntity(self, None)
            self._single = cached
        return cached

    def Single(self, data=None):
        # Deprecated: use client.single instead.
        from entity.single_entity import SingleEntity
        return SingleEntity(self, data)


    @property
    def whois_asn(self):
        """Idiomatic facade: client.whois_asn.list() / client.whois_asn.load({"id": ...})."""
        from entity.whois_asn_entity import WhoisAsnEntity
        cached = getattr(self, "_whois_asn", None)
        if cached is None:
            cached = WhoisAsnEntity(self, None)
            self._whois_asn = cached
        return cached

    def WhoisAsn(self, data=None):
        # Deprecated: use client.whois_asn instead.
        from entity.whois_asn_entity import WhoisAsnEntity
        return WhoisAsnEntity(self, data)


    @property
    def whois_domain(self):
        """Idiomatic facade: client.whois_domain.list() / client.whois_domain.load({"id": ...})."""
        from entity.whois_domain_entity import WhoisDomainEntity
        cached = getattr(self, "_whois_domain", None)
        if cached is None:
            cached = WhoisDomainEntity(self, None)
            self._whois_domain = cached
        return cached

    def WhoisDomain(self, data=None):
        # Deprecated: use client.whois_domain instead.
        from entity.whois_domain_entity import WhoisDomainEntity
        return WhoisDomainEntity(self, data)


    @property
    def whois_ip(self):
        """Idiomatic facade: client.whois_ip.list() / client.whois_ip.load({"id": ...})."""
        from entity.whois_ip_entity import WhoisIpEntity
        cached = getattr(self, "_whois_ip", None)
        if cached is None:
            cached = WhoisIpEntity(self, None)
            self._whois_ip = cached
        return cached

    def WhoisIp(self, data=None):
        # Deprecated: use client.whois_ip instead.
        from entity.whois_ip_entity import WhoisIpEntity
        return WhoisIpEntity(self, data)


    @property
    def whois_net_id(self):
        """Idiomatic facade: client.whois_net_id.list() / client.whois_net_id.load({"id": ...})."""
        from entity.whois_net_id_entity import WhoisNetIdEntity
        cached = getattr(self, "_whois_net_id", None)
        if cached is None:
            cached = WhoisNetIdEntity(self, None)
            self._whois_net_id = cached
        return cached

    def WhoisNetId(self, data=None):
        # Deprecated: use client.whois_net_id instead.
        from entity.whois_net_id_entity import WhoisNetIdEntity
        return WhoisNetIdEntity(self, data)


    @property
    def whois_org(self):
        """Idiomatic facade: client.whois_org.list() / client.whois_org.load({"id": ...})."""
        from entity.whois_org_entity import WhoisOrgEntity
        cached = getattr(self, "_whois_org", None)
        if cached is None:
            cached = WhoisOrgEntity(self, None)
            self._whois_org = cached
        return cached

    def WhoisOrg(self, data=None):
        # Deprecated: use client.whois_org instead.
        from entity.whois_org_entity import WhoisOrgEntity
        return WhoisOrgEntity(self, data)


    @property
    def whois_poc(self):
        """Idiomatic facade: client.whois_poc.list() / client.whois_poc.load({"id": ...})."""
        from entity.whois_poc_entity import WhoisPocEntity
        cached = getattr(self, "_whois_poc", None)
        if cached is None:
            cached = WhoisPocEntity(self, None)
            self._whois_poc = cached
        return cached

    def WhoisPoc(self, data=None):
        # Deprecated: use client.whois_poc instead.
        from entity.whois_poc_entity import WhoisPocEntity
        return WhoisPocEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
