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

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
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


    def Abuse(self, data=None) -> "AbuseEntity":
        """Entity factory: client.Abuse().list() / client.Abuse().load({"id": ...})."""
        from entity.abuse_entity import AbuseEntity
        return AbuseEntity(self, data)


    def Asn(self, data=None) -> "AsnEntity":
        """Entity factory: client.Asn().list() / client.Asn().load({"id": ...})."""
        from entity.asn_entity import AsnEntity
        return AsnEntity(self, data)


    def Carrier(self, data=None) -> "CarrierEntity":
        """Entity factory: client.Carrier().list() / client.Carrier().load({"id": ...})."""
        from entity.carrier_entity import CarrierEntity
        return CarrierEntity(self, data)


    def Company(self, data=None) -> "CompanyEntity":
        """Entity factory: client.Company().list() / client.Company().load({"id": ...})."""
        from entity.company_entity import CompanyEntity
        return CompanyEntity(self, data)


    def Core(self, data=None) -> "CoreEntity":
        """Entity factory: client.Core().list() / client.Core().load({"id": ...})."""
        from entity.core_entity import CoreEntity
        return CoreEntity(self, data)


    def Domain(self, data=None) -> "DomainEntity":
        """Entity factory: client.Domain().list() / client.Domain().load({"id": ...})."""
        from entity.domain_entity import DomainEntity
        return DomainEntity(self, data)


    def General(self, data=None) -> "GeneralEntity":
        """Entity factory: client.General().list() / client.General().load({"id": ...})."""
        from entity.general_entity import GeneralEntity
        return GeneralEntity(self, data)


    def GetCurrentInformation(self, data=None) -> "GetCurrentInformationEntity":
        """Entity factory: client.GetCurrentInformation().list() / client.GetCurrentInformation().load({"id": ...})."""
        from entity.get_current_information_entity import GetCurrentInformationEntity
        return GetCurrentInformationEntity(self, data)


    def GetInformationByIp(self, data=None) -> "GetInformationByIpEntity":
        """Entity factory: client.GetInformationByIp().list() / client.GetInformationByIp().load({"id": ...})."""
        from entity.get_information_by_ip_entity import GetInformationByIpEntity
        return GetInformationByIpEntity(self, data)


    def IpinfoCore(self, data=None) -> "IpinfoCoreEntity":
        """Entity factory: client.IpinfoCore().list() / client.IpinfoCore().load({"id": ...})."""
        from entity.ipinfo_core_entity import IpinfoCoreEntity
        return IpinfoCoreEntity(self, data)


    def IpinfoLite(self, data=None) -> "IpinfoLiteEntity":
        """Entity factory: client.IpinfoLite().list() / client.IpinfoLite().load({"id": ...})."""
        from entity.ipinfo_lite_entity import IpinfoLiteEntity
        return IpinfoLiteEntity(self, data)


    def IpinfoPlus(self, data=None) -> "IpinfoPlusEntity":
        """Entity factory: client.IpinfoPlus().list() / client.IpinfoPlus().load({"id": ...})."""
        from entity.ipinfo_plus_entity import IpinfoPlusEntity
        return IpinfoPlusEntity(self, data)


    def Lite(self, data=None) -> "LiteEntity":
        """Entity factory: client.Lite().list() / client.Lite().load({"id": ...})."""
        from entity.lite_entity import LiteEntity
        return LiteEntity(self, data)


    def Max(self, data=None) -> "MaxEntity":
        """Entity factory: client.Max().list() / client.Max().load({"id": ...})."""
        from entity.max_entity import MaxEntity
        return MaxEntity(self, data)


    def Men(self, data=None) -> "MenEntity":
        """Entity factory: client.Men().list() / client.Men().load({"id": ...})."""
        from entity.men_entity import MenEntity
        return MenEntity(self, data)


    def Place(self, data=None) -> "PlaceEntity":
        """Entity factory: client.Place().list() / client.Place().load({"id": ...})."""
        from entity.place_entity import PlaceEntity
        return PlaceEntity(self, data)


    def Plus(self, data=None) -> "PlusEntity":
        """Entity factory: client.Plus().list() / client.Plus().load({"id": ...})."""
        from entity.plus_entity import PlusEntity
        return PlusEntity(self, data)


    def Privacy(self, data=None) -> "PrivacyEntity":
        """Entity factory: client.Privacy().list() / client.Privacy().load({"id": ...})."""
        from entity.privacy_entity import PrivacyEntity
        return PrivacyEntity(self, data)


    def PrivacyExtended(self, data=None) -> "PrivacyExtendedEntity":
        """Entity factory: client.PrivacyExtended().list() / client.PrivacyExtended().load({"id": ...})."""
        from entity.privacy_extended_entity import PrivacyExtendedEntity
        return PrivacyExtendedEntity(self, data)


    def Range(self, data=None) -> "RangeEntity":
        """Entity factory: client.Range().list() / client.Range().load({"id": ...})."""
        from entity.range_entity import RangeEntity
        return RangeEntity(self, data)


    def ResidentialProxy(self, data=None) -> "ResidentialProxyEntity":
        """Entity factory: client.ResidentialProxy().list() / client.ResidentialProxy().load({"id": ...})."""
        from entity.residential_proxy_entity import ResidentialProxyEntity
        return ResidentialProxyEntity(self, data)


    def Single(self, data=None) -> "SingleEntity":
        """Entity factory: client.Single().list() / client.Single().load({"id": ...})."""
        from entity.single_entity import SingleEntity
        return SingleEntity(self, data)


    def WhoisAsn(self, data=None) -> "WhoisAsnEntity":
        """Entity factory: client.WhoisAsn().list() / client.WhoisAsn().load({"id": ...})."""
        from entity.whois_asn_entity import WhoisAsnEntity
        return WhoisAsnEntity(self, data)


    def WhoisDomain(self, data=None) -> "WhoisDomainEntity":
        """Entity factory: client.WhoisDomain().list() / client.WhoisDomain().load({"id": ...})."""
        from entity.whois_domain_entity import WhoisDomainEntity
        return WhoisDomainEntity(self, data)


    def WhoisIp(self, data=None) -> "WhoisIpEntity":
        """Entity factory: client.WhoisIp().list() / client.WhoisIp().load({"id": ...})."""
        from entity.whois_ip_entity import WhoisIpEntity
        return WhoisIpEntity(self, data)


    def WhoisNetId(self, data=None) -> "WhoisNetIdEntity":
        """Entity factory: client.WhoisNetId().list() / client.WhoisNetId().load({"id": ...})."""
        from entity.whois_net_id_entity import WhoisNetIdEntity
        return WhoisNetIdEntity(self, data)


    def WhoisOrg(self, data=None) -> "WhoisOrgEntity":
        """Entity factory: client.WhoisOrg().list() / client.WhoisOrg().load({"id": ...})."""
        from entity.whois_org_entity import WhoisOrgEntity
        return WhoisOrgEntity(self, data)


    def WhoisPoc(self, data=None) -> "WhoisPocEntity":
        """Entity factory: client.WhoisPoc().list() / client.WhoisPoc().load({"id": ...})."""
        from entity.whois_poc_entity import WhoisPocEntity
        return WhoisPocEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "IpinfoDeveloperSDK":
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


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.abuse_entity import AbuseEntity
    from entity.asn_entity import AsnEntity
    from entity.carrier_entity import CarrierEntity
    from entity.company_entity import CompanyEntity
    from entity.core_entity import CoreEntity
    from entity.domain_entity import DomainEntity
    from entity.general_entity import GeneralEntity
    from entity.get_current_information_entity import GetCurrentInformationEntity
    from entity.get_information_by_ip_entity import GetInformationByIpEntity
    from entity.ipinfo_core_entity import IpinfoCoreEntity
    from entity.ipinfo_lite_entity import IpinfoLiteEntity
    from entity.ipinfo_plus_entity import IpinfoPlusEntity
    from entity.lite_entity import LiteEntity
    from entity.max_entity import MaxEntity
    from entity.men_entity import MenEntity
    from entity.place_entity import PlaceEntity
    from entity.plus_entity import PlusEntity
    from entity.privacy_entity import PrivacyEntity
    from entity.privacy_extended_entity import PrivacyExtendedEntity
    from entity.range_entity import RangeEntity
    from entity.residential_proxy_entity import ResidentialProxyEntity
    from entity.single_entity import SingleEntity
    from entity.whois_asn_entity import WhoisAsnEntity
    from entity.whois_domain_entity import WhoisDomainEntity
    from entity.whois_ip_entity import WhoisIpEntity
    from entity.whois_net_id_entity import WhoisNetIdEntity
    from entity.whois_org_entity import WhoisOrgEntity
    from entity.whois_poc_entity import WhoisPocEntity
