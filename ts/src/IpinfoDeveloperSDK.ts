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


  async direct(fetchargs?: any) {
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



  // Entity access: `client.Abuse().list()` / `client.Abuse().load({ id })`.
  Abuse(data?: any) {
    const self = this
    return new AbuseEntity(self,data)
  }


  // Entity access: `client.Asn().list()` / `client.Asn().load({ id })`.
  Asn(data?: any) {
    const self = this
    return new AsnEntity(self,data)
  }


  // Entity access: `client.Carrier().list()` / `client.Carrier().load({ id })`.
  Carrier(data?: any) {
    const self = this
    return new CarrierEntity(self,data)
  }


  // Entity access: `client.Company().list()` / `client.Company().load({ id })`.
  Company(data?: any) {
    const self = this
    return new CompanyEntity(self,data)
  }


  // Entity access: `client.Core().list()` / `client.Core().load({ id })`.
  Core(data?: any) {
    const self = this
    return new CoreEntity(self,data)
  }


  // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
  Domain(data?: any) {
    const self = this
    return new DomainEntity(self,data)
  }


  // Entity access: `client.General().list()` / `client.General().load({ id })`.
  General(data?: any) {
    const self = this
    return new GeneralEntity(self,data)
  }


  // Entity access: `client.GetCurrentInformation().list()` / `client.GetCurrentInformation().load({ id })`.
  GetCurrentInformation(data?: any) {
    const self = this
    return new GetCurrentInformationEntity(self,data)
  }


  // Entity access: `client.GetInformationByIp().list()` / `client.GetInformationByIp().load({ id })`.
  GetInformationByIp(data?: any) {
    const self = this
    return new GetInformationByIpEntity(self,data)
  }


  // Entity access: `client.IpinfoCore().list()` / `client.IpinfoCore().load({ id })`.
  IpinfoCore(data?: any) {
    const self = this
    return new IpinfoCoreEntity(self,data)
  }


  // Entity access: `client.IpinfoLite().list()` / `client.IpinfoLite().load({ id })`.
  IpinfoLite(data?: any) {
    const self = this
    return new IpinfoLiteEntity(self,data)
  }


  // Entity access: `client.IpinfoPlus().list()` / `client.IpinfoPlus().load({ id })`.
  IpinfoPlus(data?: any) {
    const self = this
    return new IpinfoPlusEntity(self,data)
  }


  // Entity access: `client.Lite().list()` / `client.Lite().load({ id })`.
  Lite(data?: any) {
    const self = this
    return new LiteEntity(self,data)
  }


  // Entity access: `client.Max().list()` / `client.Max().load({ id })`.
  Max(data?: any) {
    const self = this
    return new MaxEntity(self,data)
  }


  // Entity access: `client.Men().list()` / `client.Men().load({ id })`.
  Men(data?: any) {
    const self = this
    return new MenEntity(self,data)
  }


  // Entity access: `client.Place().list()` / `client.Place().load({ id })`.
  Place(data?: any) {
    const self = this
    return new PlaceEntity(self,data)
  }


  // Entity access: `client.Plus().list()` / `client.Plus().load({ id })`.
  Plus(data?: any) {
    const self = this
    return new PlusEntity(self,data)
  }


  // Entity access: `client.Privacy().list()` / `client.Privacy().load({ id })`.
  Privacy(data?: any) {
    const self = this
    return new PrivacyEntity(self,data)
  }


  // Entity access: `client.PrivacyExtended().list()` / `client.PrivacyExtended().load({ id })`.
  PrivacyExtended(data?: any) {
    const self = this
    return new PrivacyExtendedEntity(self,data)
  }


  // Entity access: `client.Range().list()` / `client.Range().load({ id })`.
  Range(data?: any) {
    const self = this
    return new RangeEntity(self,data)
  }


  // Entity access: `client.ResidentialProxy().list()` / `client.ResidentialProxy().load({ id })`.
  ResidentialProxy(data?: any) {
    const self = this
    return new ResidentialProxyEntity(self,data)
  }


  // Entity access: `client.Single().list()` / `client.Single().load({ id })`.
  Single(data?: any) {
    const self = this
    return new SingleEntity(self,data)
  }


  // Entity access: `client.WhoisAsn().list()` / `client.WhoisAsn().load({ id })`.
  WhoisAsn(data?: any) {
    const self = this
    return new WhoisAsnEntity(self,data)
  }


  // Entity access: `client.WhoisDomain().list()` / `client.WhoisDomain().load({ id })`.
  WhoisDomain(data?: any) {
    const self = this
    return new WhoisDomainEntity(self,data)
  }


  // Entity access: `client.WhoisIp().list()` / `client.WhoisIp().load({ id })`.
  WhoisIp(data?: any) {
    const self = this
    return new WhoisIpEntity(self,data)
  }


  // Entity access: `client.WhoisNetId().list()` / `client.WhoisNetId().load({ id })`.
  WhoisNetId(data?: any) {
    const self = this
    return new WhoisNetIdEntity(self,data)
  }


  // Entity access: `client.WhoisOrg().list()` / `client.WhoisOrg().load({ id })`.
  WhoisOrg(data?: any) {
    const self = this
    return new WhoisOrgEntity(self,data)
  }


  // Entity access: `client.WhoisPoc().list()` / `client.WhoisPoc().load({ id })`.
  WhoisPoc(data?: any) {
    const self = this
    return new WhoisPocEntity(self,data)
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


