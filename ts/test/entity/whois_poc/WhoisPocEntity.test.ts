

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"page","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"poc","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"records","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"total","req":false,"type":"`$INTEGER`","index$":4}],"id":{"field":"id","name":"id"},"name":"whois_poc","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"whoispoc","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"whoissource","orig":"whoissource","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /whois/poc/{whoispoc}","json":"{\"parameters\":[{\"description\":\"The WHOIS Point of Contact (POC) value of an internet organization.\",\"in\":\"path\",\"name\":\"whoispoc\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Source query parameter to filter records by provided Whois source.\",\"in\":\"query\",\"name\":\"whoissource\",\"schema\":{\"enum\":[\"arin\",\"ripe\",\"afrinic\",\"apnic\",\"lacnic\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"page\":0,\"poc\":\"CP312-ARIN\",\"records\":[{\"address\":\"US, GA, Atlanta, Pineapple Houser\\n2131 Plaster Bridge Rd Ne, 303244036\",\"country\":\"US\",\"created\":\"2000-03-25\",\"email\":\"spararo@mindspring.com\",\"fax\":\"\",\"id\":\"CP312-ARIN\",\"name\":\"Cynthia Pararo\",\"phone\":\"\",\"raw\":\"<raw data>\",\"source\":\"arin\",\"updated\":\"2000-03-25\"}],\"total\":1},\"properties\":{\"page\":{\"example\":0,\"type\":\"integer\"},\"poc\":{\"example\":\"CP312-ARIN\",\"type\":\"string\"},\"records\":{\"items\":{\"properties\":{\"address\":{\"example\":\"US, GA, Atlanta, Pineapple Houser\\n2131 Plaster Bridge Rd Ne, 303244036\",\"type\":\"string\"},\"country\":{\"example\":\"US\",\"type\":\"string\"},\"created\":{\"example\":\"2000-03-25\",\"format\":\"date\",\"type\":\"string\"},\"email\":{\"example\":\"spararo@mindspring.com\",\"type\":\"string\"},\"fax\":{\"example\":\"\",\"type\":\"string\"},\"id\":{\"example\":\"CP312-ARIN\",\"type\":\"string\"},\"name\":{\"example\":\"Cynthia Pararo\",\"type\":\"string\"},\"phone\":{\"example\":\"\",\"type\":\"string\"},\"raw\":{\"example\":\"<raw data>\",\"type\":\"string\"},\"source\":{\"example\":\"arin\",\"type\":\"string\"},\"updated\":{\"example\":\"2000-03-25\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"example\":1,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"WHOIS Point of Contact (POC) response.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/whois/poc/{whoispoc}","rename":{"param":{"whoispoc":"id"}},"segments":[{"lit":"whois"},{"lit":"poc"},{"var":"id"}],"select":{"exist":["id","page","whoissource"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"whois_poc","name__orig":"whois_poc","Name":"WhoisPoc","name_":"whois_poc","name-":"whois-poc","NAME":"WHOIS_POC","index$":27}, {"active":true,"entity":"whois_poc","key$":"BasicWhoisPocFlow","kind":"basic","name":"BasicWhoisPocFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"whois_poc_ref01","srcdatavar":"whois_poc_ref01_data","suffix":"_dt0"},"match":{"id":"whois_poc01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-whois_poc_ref01"}}],"index$":0}]}, 'WhoisPoc')
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
  
