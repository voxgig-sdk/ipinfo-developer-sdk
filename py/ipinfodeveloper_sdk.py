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
            return None, err

        return utility.make_fetch_def(ctx)

    def direct(self, fetchargs=None):
        utility = self._utility

        fetchdef, err = self.prepare(fetchargs)
        if err is not None:
            return {"ok": False, "err": err}, None

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
            return {"ok": False, "err": fetch_err}, None

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }, None

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
            }, None

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }, None


    def Abuse(self, data=None):
        from entity.abuse_entity import AbuseEntity
        return AbuseEntity(self, data)


    def Asn(self, data=None):
        from entity.asn_entity import AsnEntity
        return AsnEntity(self, data)


    def Carrier(self, data=None):
        from entity.carrier_entity import CarrierEntity
        return CarrierEntity(self, data)


    def Company(self, data=None):
        from entity.company_entity import CompanyEntity
        return CompanyEntity(self, data)


    def Core(self, data=None):
        from entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    def Domain(self, data=None):
        from entity.domain_entity import DomainEntity
        return DomainEntity(self, data)


    def General(self, data=None):
        from entity.general_entity import GeneralEntity
        return GeneralEntity(self, data)


    def GetCurrentInformation(self, data=None):
        from entity.get_current_information_entity import GetCurrentInformationEntity
        return GetCurrentInformationEntity(self, data)


    def GetInformationByIp(self, data=None):
        from entity.get_information_by_ip_entity import GetInformationByIpEntity
        return GetInformationByIpEntity(self, data)


    def IpinfoCore(self, data=None):
        from entity.ipinfo_core_entity import IpinfoCoreEntity
        return IpinfoCoreEntity(self, data)


    def IpinfoLite(self, data=None):
        from entity.ipinfo_lite_entity import IpinfoLiteEntity
        return IpinfoLiteEntity(self, data)


    def IpinfoPlus(self, data=None):
        from entity.ipinfo_plus_entity import IpinfoPlusEntity
        return IpinfoPlusEntity(self, data)


    def Lite(self, data=None):
        from entity.lite_entity import LiteEntity
        return LiteEntity(self, data)


    def Max(self, data=None):
        from entity.max_entity import MaxEntity
        return MaxEntity(self, data)


    def Men(self, data=None):
        from entity.men_entity import MenEntity
        return MenEntity(self, data)


    def Place(self, data=None):
        from entity.place_entity import PlaceEntity
        return PlaceEntity(self, data)


    def Plus(self, data=None):
        from entity.plus_entity import PlusEntity
        return PlusEntity(self, data)


    def Privacy(self, data=None):
        from entity.privacy_entity import PrivacyEntity
        return PrivacyEntity(self, data)


    def PrivacyExtended(self, data=None):
        from entity.privacy_extended_entity import PrivacyExtendedEntity
        return PrivacyExtendedEntity(self, data)


    def Range(self, data=None):
        from entity.range_entity import RangeEntity
        return RangeEntity(self, data)


    def ResidentialProxy(self, data=None):
        from entity.residential_proxy_entity import ResidentialProxyEntity
        return ResidentialProxyEntity(self, data)


    def Single(self, data=None):
        from entity.single_entity import SingleEntity
        return SingleEntity(self, data)


    def WhoisAsn(self, data=None):
        from entity.whois_asn_entity import WhoisAsnEntity
        return WhoisAsnEntity(self, data)


    def WhoisDomain(self, data=None):
        from entity.whois_domain_entity import WhoisDomainEntity
        return WhoisDomainEntity(self, data)


    def WhoisIp(self, data=None):
        from entity.whois_ip_entity import WhoisIpEntity
        return WhoisIpEntity(self, data)


    def WhoisNetId(self, data=None):
        from entity.whois_net_id_entity import WhoisNetIdEntity
        return WhoisNetIdEntity(self, data)


    def WhoisOrg(self, data=None):
        from entity.whois_org_entity import WhoisOrgEntity
        return WhoisOrgEntity(self, data)


    def WhoisPoc(self, data=None):
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
