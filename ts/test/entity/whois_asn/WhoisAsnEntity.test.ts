

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


describe('WhoisAsnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.WhoisAsn()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'whois_asn.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"abuse":{"a":true,"h":"Abuse","n":"abuse","r":false,"t":"`$STRING`","key$":"abuse","index$":0},"admin":{"a":true,"h":"Admin","n":"admin","r":false,"t":"`$STRING`","key$":"admin","index$":1},"country":{"a":true,"h":"Country","n":"country","r":false,"t":"`$STRING`","key$":"country","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"maintainer":{"a":true,"h":"Maintainer","n":"maintainer","r":false,"t":"`$STRING`","key$":"maintainer","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":5},"org":{"a":true,"h":"Org","n":"org","r":false,"t":"`$STRING`","key$":"org","index$":6},"range":{"a":true,"h":"Range","n":"range","r":false,"t":"`$STRING`","key$":"range","index$":7},"raw":{"a":true,"h":"Raw","n":"raw","r":false,"t":"`$STRING`","key$":"raw","index$":8},"source":{"a":true,"h":"Source","n":"source","r":false,"t":"`$STRING`","key$":"source","index$":9},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":10},"tech":{"a":true,"h":"Tech","n":"tech","r":false,"t":"`$STRING`","key$":"tech","index$":11},"updated":{"a":true,"fo":"date","h":"Updated","n":"updated","r":false,"t":"`$STRING`","key$":"updated","index$":12}},"id":{"field":"id","name":"id"},"name":"whois_asn","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /whois/net/AS{asn}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"asn","or":"asn","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"whoissource","or":"whoissource","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/whois/net/AS{asn}","q":{"exist":["asn","page","whoissource"]},"r":{},"s":[{"lit":"whois"},{"lit":"net"},{"lit":"AS{asn}"}],"t":{"req":"`reqdata`","res":"`body.records`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"whois_asn","name__orig":"whois_asn","Name":"WhoisAsn","name_":"whois_asn","name-":"whois-asn","NAME":"WHOIS_ASN","index$":22}, {"active":true,"entity":"whois_asn","key$":"BasicWhoisAsnFlow","kind":"basic","name":"BasicWhoisAsnFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"asn":"asn01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"whois_asn_ref01"}}],"index$":0}]}, 'WhoisAsn', {"GET /whois/net/AS{asn}":{"protocol":"http","responses":{"200":{"description":"WHOIS ASN response.","content":{"application/json":{"schema":{"type":"object","properties":{"net":{"example":"AS9541","key$":"net","type":"string"},"total":{"example":47,"key$":"total","type":"integer"},"page":{"example":0,"key$":"page","type":"integer"},"records":{"items":{"properties":{"abuse":{"example":"POC object or null","type":"string","key$":"abuse"},"admin":{"example":"POC object or null","type":"string","key$":"admin"},"country":{"example":"PK","type":"string","key$":"country"},"id":{"example":"CYBERNET","type":"string","key$":"id"},"maintainer":{"example":"POC object or null","type":"string","key$":"maintainer"},"name":{"example":"Broadband Services","type":"string","key$":"name"},"org":{"example":null,"type":"string","key$":"org"},"range":{"example":"58.65.203.0/24","type":"string","key$":"range"},"raw":{"example":"<raw data>","type":"string","key$":"raw"},"source":{"example":"apnic","type":"string","key$":"source"},"status":{"example":"ALLOCATED NON-PORTABLE","type":"string","key$":"status"},"tech":{"example":"POC object or null","type":"string","key$":"tech"},"updated":{"example":"2021-01-27","format":"date","type":"string","key$":"updated"}},"type":"object","index$":0},"key$":"records","type":"array"}},"example":{"net":"AS9541","total":47,"page":0,"records":[{"range":"58.65.203.0/24","id":"CYBERNET","name":"Broadband Services","country":"PK","org":null,"status":"ALLOCATED NON-PORTABLE","admin":"POC object or null","abuse":"POC object or null","tech":"POC object or null","maintainer":"POC object or null","updated":"2021-01-27","source":"apnic","raw":"<raw data>"}]},"x-ref":"#/components/schemas/WhoisAsnResponse"}}},"x-ref":"#/components/responses/WhoisAsn"}},"parameters":[{"name":"asn","in":"path","description":"an ASN number.","required":true,"schema":{"type":"integer"},"x-ref":"#/components/parameters/Asn","index$":0},{"name":"page","in":"query","description":"The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.","schema":{"type":"integer","minimum":0},"x-ref":"#/components/parameters/Page","index$":1},{"name":"whoissource","in":"query","description":"Source query parameter to filter records by provided Whois source.","schema":{"type":"string","enum":["arin","ripe","afrinic","apnic","lacnic"]},"x-ref":"#/components/parameters/Whoissource","index$":2}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let whois_asn_ref01_data = Object.values(setup.data.existing.whois_asn)[0] as any

    // LIST
    const whois_asn_ref01_ent = client.WhoisAsn()
    const whois_asn_ref01_match: any = {}
    whois_asn_ref01_match['asn'] = setup.idmap['asn01']

    const whois_asn_ref01_list = (await whois_asn_ref01_ent.list(whois_asn_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/whois_asn/WhoisAsnTestData.json')

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
    ['whois_asn01','whois_asn02','whois_asn03','asn01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_WHOIS_ASN_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_WHOIS_ASN_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_WHOIS_ASN_ENTID']
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
  
