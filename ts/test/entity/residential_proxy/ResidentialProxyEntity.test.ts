

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


describe('ResidentialProxyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.ResidentialProxy()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'residential_proxy.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ip":{"a":true,"h":"Ip","n":"ip","r":true,"sh":"The IPv4 or IPv6 address associated with a residential proxy","t":"`$STRING`","key$":"ip","index$":0},"last_seen":{"a":true,"fo":"date","h":"Last Seen","n":"last_seen","r":true,"sh":"The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)","t":"`$STRING`","key$":"last_seen","index$":1},"percent_days_seen":{"a":true,"h":"Percent Days Seen","n":"percent_days_seen","r":true,"sh":"The percentage of days the IP was active in the last 7-day period","t":"`$INTEGER`","key$":"percent_days_seen","index$":2},"service":{"a":true,"h":"Service","n":"service","r":true,"sh":"The name of the residential proxy service.","t":"`$STRING`","key$":"service","index$":3}},"name":"residential_proxy","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{ip}/resproxy","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"ip","or":"ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{ip}/resproxy","q":{"exist":["ip"]},"r":{},"s":[{"var":"ip"},{"lit":"resproxy"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"residential_proxy","name__orig":"residential_proxy","Name":"ResidentialProxy","name_":"residential_proxy","name-":"residential-proxy","NAME":"RESIDENTIAL_PROXY","index$":20}, {"active":true,"entity":"residential_proxy","key$":"BasicResidentialProxyFlow","kind":"basic","name":"BasicResidentialProxyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"residential_proxy_ref01","srcdatavar":"residential_proxy_ref01_data","suffix":"_dt0"},"m":{"id":"residential_proxy01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-residential_proxy_ref01"}}],"index$":0}]}, 'ResidentialProxy', {"GET /{ip}/resproxy":{"protocol":"http","operationId":"getResidentialProxyByIp","responses":{"200":{"description":"Residential Proxy detection response.","content":{"application/json":{"schema":{"type":"object","required":["ip","last_seen","percent_days_seen","service"],"properties":{"ip":{"description":"The IPv4 or IPv6 address associated with a residential proxy","example":"175.107.211.204","key$":"ip","type":"string"},"last_seen":{"description":"The last recorded date when the residential proxy IP was active (YYYY-MM-DD, UTC)","example":"2025-06-24","format":"date","key$":"last_seen","type":"string"},"percent_days_seen":{"description":"The percentage of days the IP was active in the last 7-day period","example":14,"key$":"percent_days_seen","maximum":100,"minimum":0,"type":"integer"},"service":{"description":"The name of the residential proxy service. Suffixed with _mobile for carrier/mobile or _datacenter for datacenter proxies","example":"ipfoxy","key$":"service","type":"string"}},"x-ref":"#/components/schemas/ResidentialProxyResponse","index$":0}}},"x-ref":"#/components/responses/ResidentialProxy"},"403":{"description":"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}},"x-ref":"#/components/schemas/Error403"}}},"x-ref":"#/components/responses/Forbidden"},"404":{"description":"Wrong ip. Please provide a valid IP address.","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":404},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Wrong ip"},"message":{"type":"string","example":"Please provide a valid IP address"}}}},"x-ref":"#/components/schemas/Error404"}}},"x-ref":"#/components/responses/NotFound"},"429":{"description":"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Rate limit exceeded"},"message":{"type":"string","example":"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support"}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/TooManyRequests"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"ip","in":"path","description":"A single IPv4 or IPv6 IP address.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Ip","index$":0}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let residential_proxy_ref01_data = Object.values(setup.data.existing.residential_proxy)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const residential_proxy_ref01_ent = client.ResidentialProxy()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/residential_proxy/ResidentialProxyTestData.json')

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
    ['residential_proxy01','residential_proxy02','residential_proxy03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_RESIDENTIAL_PROXY_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_RESIDENTIAL_PROXY_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_RESIDENTIAL_PROXY_ENTID']
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
  
