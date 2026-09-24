

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


describe('WhoisPocEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.WhoisPoc()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'whois_poc.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"page":{"a":true,"h":"Page","n":"page","r":false,"t":"`$INTEGER`","key$":"page","index$":1},"poc":{"a":true,"h":"Poc","n":"poc","r":false,"t":"`$STRING`","key$":"poc","index$":2},"records":{"a":true,"h":"Records","n":"records","r":false,"t":"`$ARRAY`","key$":"records","index$":3},"total":{"a":true,"h":"Total","n":"total","r":false,"t":"`$INTEGER`","key$":"total","index$":4}},"id":{"field":"id","name":"id"},"name":"whois_poc","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /whois/poc/{whoispoc}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"whoispoc","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"whoissource","or":"whoissource","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/whois/poc/{whoispoc}","q":{"exist":["id","page","whoissource"]},"r":{"param":{"whoispoc":"id"}},"s":[{"lit":"whois"},{"lit":"poc"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"whois_poc","name__orig":"whois_poc","Name":"WhoisPoc","name_":"whois_poc","name-":"whois-poc","NAME":"WHOIS_POC","index$":27}, {"active":true,"entity":"whois_poc","key$":"BasicWhoisPocFlow","kind":"basic","name":"BasicWhoisPocFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"whois_poc_ref01","srcdatavar":"whois_poc_ref01_data","suffix":"_dt0"},"m":{"id":"whois_poc01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-whois_poc_ref01"}}],"index$":0}]}, 'WhoisPoc', {"GET /whois/poc/{whoispoc}":{"protocol":"http","responses":{"200":{"description":"WHOIS Point of Contact (POC) response.","content":{"application/json":{"schema":{"type":"object","properties":{"poc":{"type":"string","example":"CP312-ARIN","key$":"poc"},"total":{"type":"integer","example":1,"key$":"total"},"page":{"type":"integer","example":0,"key$":"page"},"records":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","example":"CP312-ARIN"},"name":{"type":"string","example":"Cynthia Pararo"},"email":{"type":"string","example":"spararo@mindspring.com"},"address":{"type":"string","example":"US, GA, Atlanta, Pineapple Houser\n2131 Plaster Bridge Rd Ne, 303244036"},"country":{"type":"string","example":"US"},"phone":{"type":"string","example":""},"fax":{"type":"string","example":""},"created":{"type":"string","format":"date","example":"2000-03-25"},"updated":{"type":"string","format":"date","example":"2000-03-25"},"source":{"type":"string","example":"arin"},"raw":{"type":"string","example":"<raw data>"}}},"key$":"records"}},"example":{"poc":"CP312-ARIN","total":1,"page":0,"records":[{"id":"CP312-ARIN","name":"Cynthia Pararo","email":"spararo@mindspring.com","address":"US, GA, Atlanta, Pineapple Houser\n2131 Plaster Bridge Rd Ne, 303244036","country":"US","phone":"","fax":"","created":"2000-03-25","updated":"2000-03-25","source":"arin","raw":"<raw data>"}]},"x-ref":"#/components/schemas/WhoisPocResponse","index$":0}}},"x-ref":"#/components/responses/WhoisPoc"}},"parameters":[{"name":"whoispoc","in":"path","description":"The WHOIS Point of Contact (POC) value of an internet organization.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Whoispoc","index$":0},{"name":"page","in":"query","description":"The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.","schema":{"type":"integer","minimum":0},"x-ref":"#/components/parameters/Page","index$":1},{"name":"whoissource","in":"query","description":"Source query parameter to filter records by provided Whois source.","schema":{"type":"string","enum":["arin","ripe","afrinic","apnic","lacnic"]},"x-ref":"#/components/parameters/Whoissource","index$":2}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let whois_poc_ref01_data = Object.values(setup.data.existing.whois_poc)[0] as any

    // LOAD
    const whois_poc_ref01_ent = client.WhoisPoc()
    const whois_poc_ref01_match_dt0: any = {}
    whois_poc_ref01_match_dt0.id = whois_poc_ref01_data.id
    const whois_poc_ref01_data_dt0 = (await whois_poc_ref01_ent.load(whois_poc_ref01_match_dt0)).data()
    assert(whois_poc_ref01_data_dt0.id === whois_poc_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/whois_poc/WhoisPocTestData.json')

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
    ['whois_poc01','whois_poc02','whois_poc03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_WHOIS_POC_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_WHOIS_POC_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_WHOIS_POC_ENTID']
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
  
