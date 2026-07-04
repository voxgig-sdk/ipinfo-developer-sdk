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
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

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



  _abuse?: AbuseEntity

  // Idiomatic facade: `client.abuse.list()` / `client.abuse.load({ id })`.
  get abuse(): AbuseEntity {
    return (this._abuse ??= new AbuseEntity(this, undefined))
  }

  /** @deprecated Use `client.abuse` instead. */
  Abuse(data?: any) {
    const self = this
    return new AbuseEntity(self,data)
  }


  _asn?: AsnEntity

  // Idiomatic facade: `client.asn.list()` / `client.asn.load({ id })`.
  get asn(): AsnEntity {
    return (this._asn ??= new AsnEntity(this, undefined))
  }

  /** @deprecated Use `client.asn` instead. */
  Asn(data?: any) {
    const self = this
    return new AsnEntity(self,data)
  }


  _carrier?: CarrierEntity

  // Idiomatic facade: `client.carrier.list()` / `client.carrier.load({ id })`.
  get carrier(): CarrierEntity {
    return (this._carrier ??= new CarrierEntity(this, undefined))
  }

  /** @deprecated Use `client.carrier` instead. */
  Carrier(data?: any) {
    const self = this
    return new CarrierEntity(self,data)
  }


  _company?: CompanyEntity

  // Idiomatic facade: `client.company.list()` / `client.company.load({ id })`.
  get company(): CompanyEntity {
    return (this._company ??= new CompanyEntity(this, undefined))
  }

  /** @deprecated Use `client.company` instead. */
  Company(data?: any) {
    const self = this
    return new CompanyEntity(self,data)
  }


  _core?: CoreEntity

  // Idiomatic facade: `client.core.list()` / `client.core.load({ id })`.
  get core(): CoreEntity {
    return (this._core ??= new CoreEntity(this, undefined))
  }

  /** @deprecated Use `client.core` instead. */
  Core(data?: any) {
    const self = this
    return new CoreEntity(self,data)
  }


  _domain?: DomainEntity

  // Idiomatic facade: `client.domain.list()` / `client.domain.load({ id })`.
  get domain(): DomainEntity {
    return (this._domain ??= new DomainEntity(this, undefined))
  }

  /** @deprecated Use `client.domain` instead. */
  Domain(data?: any) {
    const self = this
    return new DomainEntity(self,data)
  }


  _general?: GeneralEntity

  // Idiomatic facade: `client.general.list()` / `client.general.load({ id })`.
  get general(): GeneralEntity {
    return (this._general ??= new GeneralEntity(this, undefined))
  }

  /** @deprecated Use `client.general` instead. */
  General(data?: any) {
    const self = this
    return new GeneralEntity(self,data)
  }


  _get_current_information?: GetCurrentInformationEntity

  // Idiomatic facade: `client.get_current_information.list()` / `client.get_current_information.load({ id })`.
  get get_current_information(): GetCurrentInformationEntity {
    return (this._get_current_information ??= new GetCurrentInformationEntity(this, undefined))
  }

  /** @deprecated Use `client.get_current_information` instead. */
  GetCurrentInformation(data?: any) {
    const self = this
    return new GetCurrentInformationEntity(self,data)
  }


  _get_information_by_ip?: GetInformationByIpEntity

  // Idiomatic facade: `client.get_information_by_ip.list()` / `client.get_information_by_ip.load({ id })`.
  get get_information_by_ip(): GetInformationByIpEntity {
    return (this._get_information_by_ip ??= new GetInformationByIpEntity(this, undefined))
  }

  /** @deprecated Use `client.get_information_by_ip` instead. */
  GetInformationByIp(data?: any) {
    const self = this
    return new GetInformationByIpEntity(self,data)
  }


  _ipinfo_core?: IpinfoCoreEntity

  // Idiomatic facade: `client.ipinfo_core.list()` / `client.ipinfo_core.load({ id })`.
  get ipinfo_core(): IpinfoCoreEntity {
    return (this._ipinfo_core ??= new IpinfoCoreEntity(this, undefined))
  }

  /** @deprecated Use `client.ipinfo_core` instead. */
  IpinfoCore(data?: any) {
    const self = this
    return new IpinfoCoreEntity(self,data)
  }


  _ipinfo_lite?: IpinfoLiteEntity

  // Idiomatic facade: `client.ipinfo_lite.list()` / `client.ipinfo_lite.load({ id })`.
  get ipinfo_lite(): IpinfoLiteEntity {
    return (this._ipinfo_lite ??= new IpinfoLiteEntity(this, undefined))
  }

  /** @deprecated Use `client.ipinfo_lite` instead. */
  IpinfoLite(data?: any) {
    const self = this
    return new IpinfoLiteEntity(self,data)
  }


  _ipinfo_plus?: IpinfoPlusEntity

  // Idiomatic facade: `client.ipinfo_plus.list()` / `client.ipinfo_plus.load({ id })`.
  get ipinfo_plus(): IpinfoPlusEntity {
    return (this._ipinfo_plus ??= new IpinfoPlusEntity(this, undefined))
  }

  /** @deprecated Use `client.ipinfo_plus` instead. */
  IpinfoPlus(data?: any) {
    const self = this
    return new IpinfoPlusEntity(self,data)
  }


  _lite?: LiteEntity

  // Idiomatic facade: `client.lite.list()` / `client.lite.load({ id })`.
  get lite(): LiteEntity {
    return (this._lite ??= new LiteEntity(this, undefined))
  }

  /** @deprecated Use `client.lite` instead. */
  Lite(data?: any) {
    const self = this
    return new LiteEntity(self,data)
  }


  _max?: MaxEntity

  // Idiomatic facade: `client.max.list()` / `client.max.load({ id })`.
  get max(): MaxEntity {
    return (this._max ??= new MaxEntity(this, undefined))
  }

  /** @deprecated Use `client.max` instead. */
  Max(data?: any) {
    const self = this
    return new MaxEntity(self,data)
  }


  _men?: MenEntity

  // Idiomatic facade: `client.men.list()` / `client.men.load({ id })`.
  get men(): MenEntity {
    return (this._men ??= new MenEntity(this, undefined))
  }

  /** @deprecated Use `client.men` instead. */
  Men(data?: any) {
    const self = this
    return new MenEntity(self,data)
  }


  _place?: PlaceEntity

  // Idiomatic facade: `client.place.list()` / `client.place.load({ id })`.
  get place(): PlaceEntity {
    return (this._place ??= new PlaceEntity(this, undefined))
  }

  /** @deprecated Use `client.place` instead. */
  Place(data?: any) {
    const self = this
    return new PlaceEntity(self,data)
  }


  _plus?: PlusEntity

  // Idiomatic facade: `client.plus.list()` / `client.plus.load({ id })`.
  get plus(): PlusEntity {
    return (this._plus ??= new PlusEntity(this, undefined))
  }

  /** @deprecated Use `client.plus` instead. */
  Plus(data?: any) {
    const self = this
    return new PlusEntity(self,data)
  }


  _privacy?: PrivacyEntity

  // Idiomatic facade: `client.privacy.list()` / `client.privacy.load({ id })`.
  get privacy(): PrivacyEntity {
    return (this._privacy ??= new PrivacyEntity(this, undefined))
  }

  /** @deprecated Use `client.privacy` instead. */
  Privacy(data?: any) {
    const self = this
    return new PrivacyEntity(self,data)
  }


  _privacy_extended?: PrivacyExtendedEntity

  // Idiomatic facade: `client.privacy_extended.list()` / `client.privacy_extended.load({ id })`.
  get privacy_extended(): PrivacyExtendedEntity {
    return (this._privacy_extended ??= new PrivacyExtendedEntity(this, undefined))
  }

  /** @deprecated Use `client.privacy_extended` instead. */
  PrivacyExtended(data?: any) {
    const self = this
    return new PrivacyExtendedEntity(self,data)
  }


  _range?: RangeEntity

  // Idiomatic facade: `client.range.list()` / `client.range.load({ id })`.
  get range(): RangeEntity {
    return (this._range ??= new RangeEntity(this, undefined))
  }

  /** @deprecated Use `client.range` instead. */
  Range(data?: any) {
    const self = this
    return new RangeEntity(self,data)
  }


  _residential_proxy?: ResidentialProxyEntity

  // Idiomatic facade: `client.residential_proxy.list()` / `client.residential_proxy.load({ id })`.
  get residential_proxy(): ResidentialProxyEntity {
    return (this._residential_proxy ??= new ResidentialProxyEntity(this, undefined))
  }

  /** @deprecated Use `client.residential_proxy` instead. */
  ResidentialProxy(data?: any) {
    const self = this
    return new ResidentialProxyEntity(self,data)
  }


  _single?: SingleEntity

  // Idiomatic facade: `client.single.list()` / `client.single.load({ id })`.
  get single(): SingleEntity {
    return (this._single ??= new SingleEntity(this, undefined))
  }

  /** @deprecated Use `client.single` instead. */
  Single(data?: any) {
    const self = this
    return new SingleEntity(self,data)
  }


  _whois_asn?: WhoisAsnEntity

  // Idiomatic facade: `client.whois_asn.list()` / `client.whois_asn.load({ id })`.
  get whois_asn(): WhoisAsnEntity {
    return (this._whois_asn ??= new WhoisAsnEntity(this, undefined))
  }

  /** @deprecated Use `client.whois_asn` instead. */
  WhoisAsn(data?: any) {
    const self = this
    return new WhoisAsnEntity(self,data)
  }


  _whois_domain?: WhoisDomainEntity

  // Idiomatic facade: `client.whois_domain.list()` / `client.whois_domain.load({ id })`.
  get whois_domain(): WhoisDomainEntity {
    return (this._whois_domain ??= new WhoisDomainEntity(this, undefined))
  }

  /** @deprecated Use `client.whois_domain` instead. */
  WhoisDomain(data?: any) {
    const self = this
    return new WhoisDomainEntity(self,data)
  }


  _whois_ip?: WhoisIpEntity

  // Idiomatic facade: `client.whois_ip.list()` / `client.whois_ip.load({ id })`.
  get whois_ip(): WhoisIpEntity {
    return (this._whois_ip ??= new WhoisIpEntity(this, undefined))
  }

  /** @deprecated Use `client.whois_ip` instead. */
  WhoisIp(data?: any) {
    const self = this
    return new WhoisIpEntity(self,data)
  }


  _whois_net_id?: WhoisNetIdEntity

  // Idiomatic facade: `client.whois_net_id.list()` / `client.whois_net_id.load({ id })`.
  get whois_net_id(): WhoisNetIdEntity {
    return (this._whois_net_id ??= new WhoisNetIdEntity(this, undefined))
  }

  /** @deprecated Use `client.whois_net_id` instead. */
  WhoisNetId(data?: any) {
    const self = this
    return new WhoisNetIdEntity(self,data)
  }


  _whois_org?: WhoisOrgEntity

  // Idiomatic facade: `client.whois_org.list()` / `client.whois_org.load({ id })`.
  get whois_org(): WhoisOrgEntity {
    return (this._whois_org ??= new WhoisOrgEntity(this, undefined))
  }

  /** @deprecated Use `client.whois_org` instead. */
  WhoisOrg(data?: any) {
    const self = this
    return new WhoisOrgEntity(self,data)
  }


  _whois_poc?: WhoisPocEntity

  // Idiomatic facade: `client.whois_poc.list()` / `client.whois_poc.load({ id })`.
  get whois_poc(): WhoisPocEntity {
    return (this._whois_poc ??= new WhoisPocEntity(this, undefined))
  }

  /** @deprecated Use `client.whois_poc` instead. */
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

  BaseFeature,
  IpinfoDeveloperEntityBase,

  IpinfoDeveloperSDK,
  SDK,
}


