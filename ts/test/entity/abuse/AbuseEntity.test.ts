

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


describe('AbuseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.Abuse()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'abuse.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"t":"`$STRING`","key$":"address","index$":0},"country":{"a":true,"h":"Country","n":"country","r":false,"t":"`$STRING`","key$":"country","index$":1},"email":{"a":true,"h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":3},"network":{"a":true,"h":"Network","n":"network","r":false,"t":"`$STRING`","key$":"network","index$":4},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"t":"`$STRING`","key$":"phone","index$":5}},"name":"abuse","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{ip}/abuse","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"ip","or":"ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{ip}/abuse","q":{"exist":["ip"]},"r":{},"s":[{"var":"ip"},{"lit":"abuse"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"abuse","name__orig":"abuse","Name":"Abuse","name_":"abuse","name-":"abuse","NAME":"ABUSE","index$":0}, {"active":true,"entity":"abuse","key$":"BasicAbuseFlow","kind":"basic","name":"BasicAbuseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"abuse_ref01","srcdatavar":"abuse_ref01_data","suffix":"_dt0"},"m":{"id":"abuse01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-abuse_ref01"}}],"index$":0}]}, 'Abuse', {"GET /{ip}/abuse":{"protocol":"http","operationId":"getAbuse","responses":{"200":{"description":"Abuse response object.","content":{"application/json":{"schema":{"type":"object","properties":{"address":{"example":"US, CA, Mountain View, 1600 Amphitheatre Parkway, 94043","key$":"address","type":"string"},"country":{"example":"US","key$":"country","type":"string"},"email":{"example":"network-abuse@google.com","key$":"email","type":"string"},"name":{"example":"Abuse","key$":"name","type":"string"},"network":{"example":"8.8.8.0/24","key$":"network","type":"string"},"phone":{"example":"+1-650-253-0000","key$":"phone","type":"string"}},"x-ref":"#/components/schemas/AbuseResponse","index$":0}}},"x-ref":"#/components/responses/Abuse"},"403":{"description":"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}},"x-ref":"#/components/schemas/Error403"}}},"x-ref":"#/components/responses/Forbidden"},"404":{"description":"Wrong ip. Please provide a valid IP address.","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":404},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Wrong ip"},"message":{"type":"string","example":"Please provide a valid IP address"}}}},"x-ref":"#/components/schemas/Error404"}}},"x-ref":"#/components/responses/NotFound"},"429":{"description":"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Rate limit exceeded"},"message":{"type":"string","example":"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support"}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/TooManyRequests"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"ip","in":"path","description":"A single IPv4 or IPv6 IP address.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Ip","index$":0}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let abuse_ref01_data = Object.values(setup.data.existing.abuse)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const abuse_ref01_ent = client.Abuse()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/abuse/AbuseTestData.json')

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
    ['abuse01','abuse02','abuse03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_ABUSE_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_ABUSE_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_ABUSE_ENTID']
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
  
