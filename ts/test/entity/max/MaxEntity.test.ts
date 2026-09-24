

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


describe('MaxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.Max()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'max.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"anonymous":{"a":true,"h":"Anonymous","n":"anonymous","r":true,"t":"`$OBJECT`","key$":"anonymous","index$":0},"as":{"a":true,"h":"As","n":"as","r":true,"t":"`$OBJECT`","key$":"as","index$":1},"geo":{"a":true,"h":"Geo","n":"geo","r":true,"t":"`$OBJECT`","key$":"geo","index$":2},"hostname":{"a":true,"h":"Hostname","n":"hostname","r":false,"t":"`$STRING`","key$":"hostname","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"ip":{"a":true,"h":"Ip","n":"ip","r":true,"t":"`$STRING`","key$":"ip","index$":5},"is_anonymous":{"a":true,"h":"Is Anonymous","n":"is_anonymous","r":false,"t":"`$BOOLEAN`","key$":"is_anonymous","index$":6},"is_anycast":{"a":true,"h":"Is Anycast","n":"is_anycast","r":false,"t":"`$BOOLEAN`","key$":"is_anycast","index$":7},"is_hosting":{"a":true,"h":"Is Hosting","n":"is_hosting","r":false,"t":"`$BOOLEAN`","key$":"is_hosting","index$":8},"is_mobile":{"a":true,"h":"Is Mobile","n":"is_mobile","r":false,"t":"`$BOOLEAN`","key$":"is_mobile","index$":9},"is_satellite":{"a":true,"h":"Is Satellite","n":"is_satellite","r":false,"t":"`$BOOLEAN`","key$":"is_satellite","index$":10},"mobile":{"a":true,"h":"Mobile","n":"mobile","r":false,"t":"`$OBJECT`","key$":"mobile","index$":11}},"id":{"field":"id","name":"id"},"name":"max","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /max/{ip}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/max/{ip}","q":{"exist":["id"]},"r":{"param":{"ip":"id"}},"s":[{"lit":"max"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"max","name__orig":"max","Name":"Max","name_":"max","name-":"max","NAME":"MAX","index$":13}, {"active":true,"entity":"max","key$":"BasicMaxFlow","kind":"basic","name":"BasicMaxFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"max_ref01","srcdatavar":"max_ref01_data","suffix":"_dt0"},"m":{"id":"max01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-max_ref01"}}],"index$":0}]}, 'Max', {"GET /max/{ip}":{"protocol":"http","operationId":"getMaxInformationByIp","responses":{"200":{"description":"Max API response object.","content":{"application/json":{"schema":{"type":"object","required":["ip","geo","as","anonymous"],"properties":{"ip":{"type":"string","example":"1.0.126.158","key$":"ip"},"hostname":{"type":"string","example":"158.126.0.1.megaegg.ne.jp","key$":"hostname"},"geo":{"type":"object","properties":{"city":{"type":"string","example":"Izumo"},"region":{"type":"string","example":"Shimane"},"region_code":{"type":"string","example":"32"},"country":{"type":"string","example":"Japan"},"country_code":{"type":"string","example":"JP"},"continent":{"type":"string","example":"Asia"},"continent_code":{"type":"string","example":"AS"},"latitude":{"type":"number","example":35.36667},"longitude":{"type":"number","example":132.76667},"timezone":{"type":"string","example":"Asia/Tokyo"},"postal_code":{"type":"string","example":"693-0001"},"dma_code":{"type":"string","example":"501"},"geoname_id":{"type":"string","example":"1861084"},"radius":{"type":"integer","example":50},"last_changed":{"type":"string","format":"date","example":"2026-03-22"}},"key$":"geo"},"as":{"type":"object","properties":{"asn":{"type":"string","example":"AS18144"},"name":{"type":"string","example":"Enecom,Inc."},"domain":{"type":"string","example":"enecom.co.jp"},"type":{"type":"string","example":"business"},"last_changed":{"type":"string","format":"date","example":"2021-05-01"}},"key$":"as"},"mobile":{"type":"object","key$":"mobile"},"anonymous":{"type":"object","properties":{"name":{"type":"string","example":"Ping Proxies"},"last_seen":{"type":"string","format":"date","example":"2026-03-29"},"percent_days_seen":{"type":"integer","example":63},"is_proxy":{"type":"boolean","example":false},"is_relay":{"type":"boolean","example":false},"is_tor":{"type":"boolean","example":false},"is_vpn":{"type":"boolean","example":false},"is_res_proxy":{"type":"boolean","example":true}},"key$":"anonymous"},"is_anonymous":{"type":"boolean","example":true,"key$":"is_anonymous"},"is_anycast":{"type":"boolean","example":false,"key$":"is_anycast"},"is_hosting":{"type":"boolean","example":false,"key$":"is_hosting"},"is_mobile":{"type":"boolean","example":false,"key$":"is_mobile"},"is_satellite":{"type":"boolean","example":false,"key$":"is_satellite"}},"x-ref":"#/components/schemas/MaxResponse","index$":0}}}},"400":{"description":"Bad request error (invalid IP format).","content":{"application/json":{"schema":{"type":"object","required":["error"],"properties":{"error":{"type":"string","example":"Please provide a valid IP address"}},"x-ref":"#/components/schemas/PlusErrorBadRequest"}}},"x-ref":"#/components/responses/PlusBadRequest"},"403":{"description":"Forbidden error (authentication issues).","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":403},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}}}},"x-ref":"#/components/schemas/PlusErrorForbidden"}}},"x-ref":"#/components/responses/PlusForbidden"},"429":{"description":"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Rate limit exceeded"},"message":{"type":"string","example":"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support"}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/TooManyRequests"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"ip","in":"path","description":"A single IPv4 or IPv6 IP address.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Ip","index$":0}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let max_ref01_data = Object.values(setup.data.existing.max)[0] as any

    // LOAD
    const max_ref01_ent = client.Max()
    const max_ref01_match_dt0: any = {}
    max_ref01_match_dt0.id = max_ref01_data.id
    const max_ref01_data_dt0 = (await max_ref01_ent.load(max_ref01_match_dt0)).data()
    assert(max_ref01_data_dt0.id === max_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/max/MaxTestData.json')

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
    ['max01','max02','max03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_MAX_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_MAX_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_MAX_ENTID']
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
  
