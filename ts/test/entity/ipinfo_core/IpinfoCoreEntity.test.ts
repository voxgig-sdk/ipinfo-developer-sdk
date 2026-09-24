

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IpinfoDeveloperSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('IpinfoCoreEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.IpinfoCore()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ipinfo_core.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"city":{"a":true,"h":"City","n":"city","r":false,"t":"`$STRING`","key$":"city","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"key":{"a":true,"h":"Key","n":"key","r":false,"t":"`$STRING`","key$":"key","index$":2},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$STRING`","key$":"region","index$":3}},"id":{"field":"id","name":"id","parts":["ip","field"],"sep":"/"},"name":"ipinfo_core","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /lookup/{ip}/{field}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"field","or":"field","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"ip","or":"ip","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/lookup/{ip}/{field}","q":{"exist":["field","ip"]},"r":{},"s":[{"lit":"lookup"},{"var":"ip"},{"var":"field"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /lookup/me/{field}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"field","or":"field","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lookup/me/{field}","q":{"exist":["field"]},"r":{},"s":[{"lit":"lookup"},{"lit":"me"},{"var":"field"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ipinfo_core","name__orig":"ipinfo_core","Name":"IpinfoCore","name_":"ipinfo_core","name-":"ipinfo-core","NAME":"IPINFO_CORE","index$":9}, {"active":true,"entity":"ipinfo_core","key$":"BasicIpinfoCoreFlow","kind":"basic","name":"BasicIpinfoCoreFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ipinfo_core_ref01","srcdatavar":"ipinfo_core_ref01_data","suffix":"_dt0"},"m":{"id":"ipinfo_core01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ipinfo_core_ref01"}}],"index$":0}]}, 'IpinfoCore', {"GET /lookup/{ip}/{field}":{"protocol":"http","operationId":"getCoreFieldByIp","responses":{"200":{"description":"A specific field value from the core response.","content":{"text/plain":{"schema":{"type":"string","example":"Mountain View"}},"application/json":{"schema":{"type":"object","example":{"city":"Mountain View","region":"California","key$":"example"}}}},"x-ref":"#/components/responses/CoreField"},"400":{"description":"Bad request error (invalid IP format).","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"Please provide a valid IP address"}},"x-ref":"#/components/schemas/CoreErrorBadRequest"}}},"x-ref":"#/components/responses/CoreBadRequest"},"403":{"description":"Forbidden error (authentication issues).","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":403},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}}}},"x-ref":"#/components/schemas/CoreErrorForbidden"}}},"x-ref":"#/components/responses/CoreForbidden"},"404":{"description":"Invalid field name error.","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"invalid_field is not a valid field."}},"x-ref":"#/components/schemas/CoreErrorInvalidField"}}},"x-ref":"#/components/responses/CoreInvalidField"},"429":{"description":"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Rate limit exceeded"},"message":{"type":"string","example":"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support"}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/TooManyRequests"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"ip","in":"path","description":"A single IPv4 or IPv6 IP address.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Ip","index$":0},{"name":"field","in":"path","description":"A specific field from the core response or nested geo/as fields.","required":true,"schema":{"type":"string","enum":["ip","hostname","geo","geo/city","geo/region","geo/region_code","geo/country","geo/country_code","geo/continent","geo/continent_code","geo/latitude","geo/longitude","geo/timezone","geo/postal_code","as","as/asn","as/name","as/domain","as/type","is_anonymous","is_anycast","is_hosting","is_mobile","is_satellite"]},"x-ref":"#/components/parameters/CoreField","index$":1}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}},"GET /lookup/me/{field}":{"protocol":"http","operationId":"getCurrentCoreField","responses":{"200":{"description":"A specific field value from the core response.","content":{"text/plain":{"schema":{"type":"string","example":"Mountain View"}},"application/json":{"schema":{"type":"object","example":{"city":"Mountain View","region":"California","key$":"example"}}}},"x-ref":"#/components/responses/CoreField"},"403":{"description":"Forbidden error (authentication issues).","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":403},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}}}},"x-ref":"#/components/schemas/CoreErrorForbidden"}}},"x-ref":"#/components/responses/CoreForbidden"},"404":{"description":"Invalid field name error.","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"invalid_field is not a valid field."}},"x-ref":"#/components/schemas/CoreErrorInvalidField"}}},"x-ref":"#/components/responses/CoreInvalidField"},"429":{"description":"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Rate limit exceeded"},"message":{"type":"string","example":"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support"}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/TooManyRequests"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"field","in":"path","description":"A specific field from the core response or nested geo/as fields.","required":true,"schema":{"type":"string","enum":["ip","hostname","geo","geo/city","geo/region","geo/region_code","geo/country","geo/country_code","geo/continent","geo/continent_code","geo/latitude","geo/longitude","geo/timezone","geo/postal_code","as","as/asn","as/name","as/domain","as/type","is_anonymous","is_anycast","is_hosting","is_mobile","is_satellite"]},"x-ref":"#/components/parameters/CoreField","index$":0}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ipinfo_core_ref01_data = Object.values(setup.data.existing.ipinfo_core)[0] as any

    // LOAD
    const ipinfo_core_ref01_ent = client.IpinfoCore()
    const ipinfo_core_ref01_match_dt0: any = {}
    ipinfo_core_ref01_match_dt0.id = ipinfo_core_ref01_data.id
    const ipinfo_core_ref01_data_dt0 = (await ipinfo_core_ref01_ent.load(ipinfo_core_ref01_match_dt0)).data()
    assert(ipinfo_core_ref01_data_dt0.id === ipinfo_core_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ipinfo_core/IpinfoCoreTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IpinfoDeveloperSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ipinfo_core01','ipinfo_core02','ipinfo_core03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_IPINFO_CORE_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_IPINFO_CORE_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_IPINFO_CORE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IpinfoDeveloperSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.IPINFO_DEVELOPER_APIKEY,
        secret: env.IPINFO_DEVELOPER_SECRET,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.IPINFO_DEVELOPER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
