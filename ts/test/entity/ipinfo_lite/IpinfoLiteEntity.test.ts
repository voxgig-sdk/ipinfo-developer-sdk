

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


describe('IpinfoLiteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.IpinfoLite()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ipinfo_lite.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"ipinfo_lite","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /lite/{ip}/{field}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"field","or":"field","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"ip","or":"ip","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/lite/{ip}/{field}","q":{"exist":["field","ip"]},"r":{},"s":[{"lit":"lite"},{"var":"ip"},{"var":"field"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /lite/me/{field}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"field","or":"field","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lite/me/{field}","q":{"exist":["field"]},"r":{},"s":[{"lit":"lite"},{"lit":"me"},{"var":"field"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /lite/{ip}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/lite/{ip}","q":{"exist":["id"]},"r":{"param":{"ip":"id"}},"s":[{"lit":"lite"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.lite"]]},"key$":"ipinfo_lite","name__orig":"ipinfo_lite","Name":"IpinfoLite","name_":"ipinfo_lite","name-":"ipinfo-lite","NAME":"IPINFO_LITE","index$":10}, {"active":true,"entity":"ipinfo_lite","key$":"BasicIpinfoLiteFlow","kind":"basic","name":"BasicIpinfoLiteFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ipinfo_lite_ref01","srcdatavar":"ipinfo_lite_ref01_data","suffix":"_dt0"},"m":{"id":"ipinfo_lite01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ipinfo_lite_ref01"}}],"index$":0}]}, 'IpinfoLite', {"GET /lite/{ip}/{field}":{"protocol":"http","operationId":"getLiteFieldByIp","responses":{"200":{"description":"A specific field value from the lite response.","content":{"text/plain":{"schema":{"type":"string","example":"United States"}}},"x-ref":"#/components/responses/LiteField"},"400":{"description":"Bad request error (invalid IP format).","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"Please provide a valid IP address"}},"x-ref":"#/components/schemas/LiteErrorBadRequest"}}},"x-ref":"#/components/responses/LiteBadRequest"},"403":{"description":"Forbidden error (authentication issues).","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":403},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}}}},"x-ref":"#/components/schemas/LiteErrorForbidden"}}},"x-ref":"#/components/responses/LiteForbidden"},"404":{"description":"Invalid field name error.","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"invalid_field is not a valid field."}},"x-ref":"#/components/schemas/LiteErrorInvalidField"}}},"x-ref":"#/components/responses/LiteInvalidField"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"ip","in":"path","description":"A single IPv4 or IPv6 IP address.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Ip","index$":0},{"name":"field","in":"path","description":"A specific field from the lite response (ip, asn, as_name, as_domain, country_code, country, continent_code, continent).","required":true,"schema":{"type":"string","enum":["ip","asn","as_name","as_domain","country_code","country","continent_code","continent"]},"x-ref":"#/components/parameters/LiteField","index$":1}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}},"GET /lite/me/{field}":{"protocol":"http","operationId":"getCurrentLiteField","responses":{"200":{"description":"A specific field value from the lite response.","content":{"text/plain":{"schema":{"type":"string","example":"United States"}}},"x-ref":"#/components/responses/LiteField"},"403":{"description":"Forbidden error (authentication issues).","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":403},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}}}},"x-ref":"#/components/schemas/LiteErrorForbidden"}}},"x-ref":"#/components/responses/LiteForbidden"},"404":{"description":"Invalid field name error.","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"invalid_field is not a valid field."}},"x-ref":"#/components/schemas/LiteErrorInvalidField"}}},"x-ref":"#/components/responses/LiteInvalidField"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"field","in":"path","description":"A specific field from the lite response (ip, asn, as_name, as_domain, country_code, country, continent_code, continent).","required":true,"schema":{"type":"string","enum":["ip","asn","as_name","as_domain","country_code","country","continent_code","continent"]},"x-ref":"#/components/parameters/LiteField","index$":0}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}},"GET /lite/{ip}":{"protocol":"http","operationId":"getLiteInformationByIp","responses":{"200":{"description":"Lite response object or bogon response.","content":{"application/json":{"schema":{"oneOf":[{"type":"object","required":["ip","asn","as_name","as_domain","country_code","country","continent_code","continent"],"properties":{"ip":{"example":"8.8.8.8","key$":"ip","type":"string"},"asn":{"example":"AS15169","key$":"asn","type":"string"},"as_name":{"example":"Google LLC","key$":"as_name","type":"string"},"as_domain":{"example":"google.com","key$":"as_domain","type":"string"},"country_code":{"example":"US","key$":"country_code","type":"string"},"country":{"example":"United States","key$":"country","type":"string"},"continent_code":{"example":"NA","key$":"continent_code","type":"string"},"continent":{"example":"North America","key$":"continent","type":"string"}},"x-ref":"#/components/schemas/LiteResponse"},{"type":"object","required":["ip","bogon"],"properties":{"ip":{"type":"string","example":"192.168.1.1"},"bogon":{"type":"boolean","example":true}},"x-ref":"#/components/schemas/LiteBogonResponse"}]}}}},"400":{"description":"Bad request error (invalid IP format).","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"Please provide a valid IP address"}},"x-ref":"#/components/schemas/LiteErrorBadRequest"}}},"x-ref":"#/components/responses/LiteBadRequest"},"403":{"description":"Forbidden error (authentication issues).","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":403},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}}}},"x-ref":"#/components/schemas/LiteErrorForbidden"}}},"x-ref":"#/components/responses/LiteForbidden"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"ip","in":"path","description":"A single IPv4 or IPv6 IP address.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Ip","index$":0}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ipinfo_lite_ref01_data = Object.values(setup.data.existing.ipinfo_lite)[0] as any

    // LOAD
    const ipinfo_lite_ref01_ent = client.IpinfoLite()
    const ipinfo_lite_ref01_match_dt0: any = {}
    ipinfo_lite_ref01_match_dt0.id = ipinfo_lite_ref01_data.id
    const ipinfo_lite_ref01_data_dt0 = (await ipinfo_lite_ref01_ent.load(ipinfo_lite_ref01_match_dt0)).data()
    assert(ipinfo_lite_ref01_data_dt0.id === ipinfo_lite_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ipinfo_lite/IpinfoLiteTestData.json')

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
    ['ipinfo_lite01','ipinfo_lite02','ipinfo_lite03','lite01','lite02','lite03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_IPINFO_LITE_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_IPINFO_LITE_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_IPINFO_LITE_ENTID']
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
  
