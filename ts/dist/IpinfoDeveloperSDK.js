"use strict";
// IpinfoDeveloper Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.IpinfoDeveloperSDK = exports.IpinfoDeveloperEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AbuseEntity_1 = require("./entity/AbuseEntity");
const AsnEntity_1 = require("./entity/AsnEntity");
const CarrierEntity_1 = require("./entity/CarrierEntity");
const CompanyEntity_1 = require("./entity/CompanyEntity");
const CoreEntity_1 = require("./entity/CoreEntity");
const DomainEntity_1 = require("./entity/DomainEntity");
const GeneralEntity_1 = require("./entity/GeneralEntity");
const GetCurrentInformationEntity_1 = require("./entity/GetCurrentInformationEntity");
const GetInformationByIpEntity_1 = require("./entity/GetInformationByIpEntity");
const IpinfoCoreEntity_1 = require("./entity/IpinfoCoreEntity");
const IpinfoLiteEntity_1 = require("./entity/IpinfoLiteEntity");
const IpinfoPlusEntity_1 = require("./entity/IpinfoPlusEntity");
const LiteEntity_1 = require("./entity/LiteEntity");
const MaxEntity_1 = require("./entity/MaxEntity");
const MenEntity_1 = require("./entity/MenEntity");
const PlaceEntity_1 = require("./entity/PlaceEntity");
const PlusEntity_1 = require("./entity/PlusEntity");
const PrivacyEntity_1 = require("./entity/PrivacyEntity");
const PrivacyExtendedEntity_1 = require("./entity/PrivacyExtendedEntity");
const RangeEntity_1 = require("./entity/RangeEntity");
const ResidentialProxyEntity_1 = require("./entity/ResidentialProxyEntity");
const SingleEntity_1 = require("./entity/SingleEntity");
const WhoisAsnEntity_1 = require("./entity/WhoisAsnEntity");
const WhoisDomainEntity_1 = require("./entity/WhoisDomainEntity");
const WhoisIpEntity_1 = require("./entity/WhoisIpEntity");
const WhoisNetIdEntity_1 = require("./entity/WhoisNetIdEntity");
const WhoisOrgEntity_1 = require("./entity/WhoisOrgEntity");
const WhoisPocEntity_1 = require("./entity/WhoisPocEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const IpinfoDeveloperEntityBase_1 = require("./IpinfoDeveloperEntityBase");
Object.defineProperty(exports, "IpinfoDeveloperEntityBase", { enumerable: true, get: function () { return IpinfoDeveloperEntityBase_1.IpinfoDeveloperEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class IpinfoDeveloperSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('IpinfoDeveloperSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path `direct` uses, with the
    // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report a
    // failed query as ok.
    //
    // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('IpinfoDeveloperSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('IpinfoDeveloperSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Abuse().list()` / `client.Abuse().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Abuse(entopts) {
        const self = this;
        return new AbuseEntity_1.AbuseEntity(self, entopts);
    }
    // Entity access: `client.Asn().list()` / `client.Asn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Asn(entopts) {
        const self = this;
        return new AsnEntity_1.AsnEntity(self, entopts);
    }
    // Entity access: `client.Carrier().list()` / `client.Carrier().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Carrier(entopts) {
        const self = this;
        return new CarrierEntity_1.CarrierEntity(self, entopts);
    }
    // Entity access: `client.Company().list()` / `client.Company().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Company(entopts) {
        const self = this;
        return new CompanyEntity_1.CompanyEntity(self, entopts);
    }
    // Entity access: `client.Core().list()` / `client.Core().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Core(entopts) {
        const self = this;
        return new CoreEntity_1.CoreEntity(self, entopts);
    }
    // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Domain(entopts) {
        const self = this;
        return new DomainEntity_1.DomainEntity(self, entopts);
    }
    // Entity access: `client.General().list()` / `client.General().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    General(entopts) {
        const self = this;
        return new GeneralEntity_1.GeneralEntity(self, entopts);
    }
    // Entity access: `client.GetCurrentInformation().list()` / `client.GetCurrentInformation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GetCurrentInformation(entopts) {
        const self = this;
        return new GetCurrentInformationEntity_1.GetCurrentInformationEntity(self, entopts);
    }
    // Entity access: `client.GetInformationByIp().list()` / `client.GetInformationByIp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GetInformationByIp(entopts) {
        const self = this;
        return new GetInformationByIpEntity_1.GetInformationByIpEntity(self, entopts);
    }
    // Entity access: `client.IpinfoCore().list()` / `client.IpinfoCore().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IpinfoCore(entopts) {
        const self = this;
        return new IpinfoCoreEntity_1.IpinfoCoreEntity(self, entopts);
    }
    // Entity access: `client.IpinfoLite().list()` / `client.IpinfoLite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IpinfoLite(entopts) {
        const self = this;
        return new IpinfoLiteEntity_1.IpinfoLiteEntity(self, entopts);
    }
    // Entity access: `client.IpinfoPlus().list()` / `client.IpinfoPlus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IpinfoPlus(entopts) {
        const self = this;
        return new IpinfoPlusEntity_1.IpinfoPlusEntity(self, entopts);
    }
    // Entity access: `client.Lite().list()` / `client.Lite().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Lite(entopts) {
        const self = this;
        return new LiteEntity_1.LiteEntity(self, entopts);
    }
    // Entity access: `client.Max().list()` / `client.Max().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Max(entopts) {
        const self = this;
        return new MaxEntity_1.MaxEntity(self, entopts);
    }
    // Entity access: `client.Men().list()` / `client.Men().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Men(entopts) {
        const self = this;
        return new MenEntity_1.MenEntity(self, entopts);
    }
    // Entity access: `client.Place().list()` / `client.Place().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Place(entopts) {
        const self = this;
        return new PlaceEntity_1.PlaceEntity(self, entopts);
    }
    // Entity access: `client.Plus().list()` / `client.Plus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Plus(entopts) {
        const self = this;
        return new PlusEntity_1.PlusEntity(self, entopts);
    }
    // Entity access: `client.Privacy().list()` / `client.Privacy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Privacy(entopts) {
        const self = this;
        return new PrivacyEntity_1.PrivacyEntity(self, entopts);
    }
    // Entity access: `client.PrivacyExtended().list()` / `client.PrivacyExtended().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PrivacyExtended(entopts) {
        const self = this;
        return new PrivacyExtendedEntity_1.PrivacyExtendedEntity(self, entopts);
    }
    // Entity access: `client.Range().list()` / `client.Range().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Range(entopts) {
        const self = this;
        return new RangeEntity_1.RangeEntity(self, entopts);
    }
    // Entity access: `client.ResidentialProxy().list()` / `client.ResidentialProxy().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ResidentialProxy(entopts) {
        const self = this;
        return new ResidentialProxyEntity_1.ResidentialProxyEntity(self, entopts);
    }
    // Entity access: `client.Single().list()` / `client.Single().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Single(entopts) {
        const self = this;
        return new SingleEntity_1.SingleEntity(self, entopts);
    }
    // Entity access: `client.WhoisAsn().list()` / `client.WhoisAsn().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WhoisAsn(entopts) {
        const self = this;
        return new WhoisAsnEntity_1.WhoisAsnEntity(self, entopts);
    }
    // Entity access: `client.WhoisDomain().list()` / `client.WhoisDomain().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WhoisDomain(entopts) {
        const self = this;
        return new WhoisDomainEntity_1.WhoisDomainEntity(self, entopts);
    }
    // Entity access: `client.WhoisIp().list()` / `client.WhoisIp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WhoisIp(entopts) {
        const self = this;
        return new WhoisIpEntity_1.WhoisIpEntity(self, entopts);
    }
    // Entity access: `client.WhoisNetId().list()` / `client.WhoisNetId().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WhoisNetId(entopts) {
        const self = this;
        return new WhoisNetIdEntity_1.WhoisNetIdEntity(self, entopts);
    }
    // Entity access: `client.WhoisOrg().list()` / `client.WhoisOrg().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WhoisOrg(entopts) {
        const self = this;
        return new WhoisOrgEntity_1.WhoisOrgEntity(self, entopts);
    }
    // Entity access: `client.WhoisPoc().list()` / `client.WhoisPoc().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WhoisPoc(entopts) {
        const self = this;
        return new WhoisPocEntity_1.WhoisPocEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new IpinfoDeveloperSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return IpinfoDeveloperSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'IpinfoDeveloper' };
    }
    toString() {
        return 'IpinfoDeveloper ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.IpinfoDeveloperSDK = IpinfoDeveloperSDK;
const SDK = IpinfoDeveloperSDK;
exports.SDK = SDK;
//# sourceMappingURL=IpinfoDeveloperSDK.js.map