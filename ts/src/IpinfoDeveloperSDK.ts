// IpinfoDeveloper Ts SDK

import { AbuseEntity } from './entity/AbuseEntity'
import { AsnEntity } from './entity/AsnEntity'
import { CarrierEntity } from './entity/CarrierEntity'
import { CompanyEntity } from './entity/CompanyEntity'
import { CoreEntity } from './entity/CoreEntity'
import { DomainEntity } from './entity/DomainEntity'
import { GeneralEntity } from './entity/GeneralEntity'
import { GetCurrentInformationEntity } from './entity/GetCurrentInformationEntity'
import { GetInformationByIpEntity } from './entity/GetInformationByIpEntity'
import { IpinfoCoreEntity } from './entity/IpinfoCoreEntity'
import { IpinfoLiteEntity } from './entity/IpinfoLiteEntity'
import { IpinfoPlusEntity } from './entity/IpinfoPlusEntity'
import { LiteEntity } from './entity/LiteEntity'
import { MaxEntity } from './entity/MaxEntity'
import { MenEntity } from './entity/MenEntity'
import { PlaceEntity } from './entity/PlaceEntity'
import { PlusEntity } from './entity/PlusEntity'
import { PrivacyEntity } from './entity/PrivacyEntity'
import { PrivacyExtendedEntity } from './entity/PrivacyExtendedEntity'
import { RangeEntity } from './entity/RangeEntity'
import { ResidentialProxyEntity } from './entity/ResidentialProxyEntity'
import { SingleEntity } from './entity/SingleEntity'
import { WhoisAsnEntity } from './entity/WhoisAsnEntity'
import { WhoisDomainEntity } from './entity/WhoisDomainEntity'
import { WhoisIpEntity } from './entity/WhoisIpEntity'
import { WhoisNetIdEntity } from './entity/WhoisNetIdEntity'
import { WhoisOrgEntity } from './entity/WhoisOrgEntity'
import { WhoisPocEntity } from './entity/WhoisPocEntity'

export type * from './IpinfoDeveloperTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { IpinfoDeveloperEntityBase } from './IpinfoDeveloperEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class IpinfoDeveloperSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
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
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('IpinfoDeveloperSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
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
  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('IpinfoDeveloperSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('IpinfoDeveloperSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Abuse().list()` / `client.Abuse().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Abuse(entopts?: Record<string, any>) {
    const self = this
    return new AbuseEntity(self, entopts)
  }


  // Entity access: `client.Asn().list()` / `client.Asn().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Asn(entopts?: Record<string, any>) {
    const self = this
    return new AsnEntity(self, entopts)
  }


  // Entity access: `client.Carrier().list()` / `client.Carrier().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Carrier(entopts?: Record<string, any>) {
    const self = this
    return new CarrierEntity(self, entopts)
  }


  // Entity access: `client.Company().list()` / `client.Company().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Company(entopts?: Record<string, any>) {
    const self = this
    return new CompanyEntity(self, entopts)
  }


  // Entity access: `client.Core().list()` / `client.Core().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Core(entopts?: Record<string, any>) {
    const self = this
    return new CoreEntity(self, entopts)
  }


  // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Domain(entopts?: Record<string, any>) {
    const self = this
    return new DomainEntity(self, entopts)
  }


  // Entity access: `client.General().list()` / `client.General().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  General(entopts?: Record<string, any>) {
    const self = this
    return new GeneralEntity(self, entopts)
  }


  // Entity access: `client.GetCurrentInformation().list()` / `client.GetCurrentInformation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GetCurrentInformation(entopts?: Record<string, any>) {
    const self = this
    return new GetCurrentInformationEntity(self, entopts)
  }


  // Entity access: `client.GetInformationByIp().list()` / `client.GetInformationByIp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GetInformationByIp(entopts?: Record<string, any>) {
    const self = this
    return new GetInformationByIpEntity(self, entopts)
  }


  // Entity access: `client.IpinfoCore().list()` / `client.IpinfoCore().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IpinfoCore(entopts?: Record<string, any>) {
    const self = this
    return new IpinfoCoreEntity(self, entopts)
  }


  // Entity access: `client.IpinfoLite().list()` / `client.IpinfoLite().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IpinfoLite(entopts?: Record<string, any>) {
    const self = this
    return new IpinfoLiteEntity(self, entopts)
  }


  // Entity access: `client.IpinfoPlus().list()` / `client.IpinfoPlus().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IpinfoPlus(entopts?: Record<string, any>) {
    const self = this
    return new IpinfoPlusEntity(self, entopts)
  }


  // Entity access: `client.Lite().list()` / `client.Lite().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Lite(entopts?: Record<string, any>) {
    const self = this
    return new LiteEntity(self, entopts)
  }


  // Entity access: `client.Max().list()` / `client.Max().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Max(entopts?: Record<string, any>) {
    const self = this
    return new MaxEntity(self, entopts)
  }


  // Entity access: `client.Men().list()` / `client.Men().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Men(entopts?: Record<string, any>) {
    const self = this
    return new MenEntity(self, entopts)
  }


  // Entity access: `client.Place().list()` / `client.Place().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Place(entopts?: Record<string, any>) {
    const self = this
    return new PlaceEntity(self, entopts)
  }


  // Entity access: `client.Plus().list()` / `client.Plus().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Plus(entopts?: Record<string, any>) {
    const self = this
    return new PlusEntity(self, entopts)
  }


  // Entity access: `client.Privacy().list()` / `client.Privacy().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Privacy(entopts?: Record<string, any>) {
    const self = this
    return new PrivacyEntity(self, entopts)
  }


  // Entity access: `client.PrivacyExtended().list()` / `client.PrivacyExtended().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PrivacyExtended(entopts?: Record<string, any>) {
    const self = this
    return new PrivacyExtendedEntity(self, entopts)
  }


  // Entity access: `client.Range().list()` / `client.Range().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Range(entopts?: Record<string, any>) {
    const self = this
    return new RangeEntity(self, entopts)
  }


  // Entity access: `client.ResidentialProxy().list()` / `client.ResidentialProxy().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ResidentialProxy(entopts?: Record<string, any>) {
    const self = this
    return new ResidentialProxyEntity(self, entopts)
  }


  // Entity access: `client.Single().list()` / `client.Single().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Single(entopts?: Record<string, any>) {
    const self = this
    return new SingleEntity(self, entopts)
  }


  // Entity access: `client.WhoisAsn().list()` / `client.WhoisAsn().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WhoisAsn(entopts?: Record<string, any>) {
    const self = this
    return new WhoisAsnEntity(self, entopts)
  }


  // Entity access: `client.WhoisDomain().list()` / `client.WhoisDomain().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WhoisDomain(entopts?: Record<string, any>) {
    const self = this
    return new WhoisDomainEntity(self, entopts)
  }


  // Entity access: `client.WhoisIp().list()` / `client.WhoisIp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WhoisIp(entopts?: Record<string, any>) {
    const self = this
    return new WhoisIpEntity(self, entopts)
  }


  // Entity access: `client.WhoisNetId().list()` / `client.WhoisNetId().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WhoisNetId(entopts?: Record<string, any>) {
    const self = this
    return new WhoisNetIdEntity(self, entopts)
  }


  // Entity access: `client.WhoisOrg().list()` / `client.WhoisOrg().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WhoisOrg(entopts?: Record<string, any>) {
    const self = this
    return new WhoisOrgEntity(self, entopts)
  }


  // Entity access: `client.WhoisPoc().list()` / `client.WhoisPoc().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WhoisPoc(entopts?: Record<string, any>) {
    const self = this
    return new WhoisPocEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new IpinfoDeveloperSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return IpinfoDeveloperSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'IpinfoDeveloper' }
  }

  toString() {
    return 'IpinfoDeveloper ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = IpinfoDeveloperSDK


export {
  stdutil,
  config,

  BaseFeature,
  IpinfoDeveloperEntityBase,

  IpinfoDeveloperSDK,
  SDK,
}


