

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


describe('WhoisNetIdEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.WhoisNetId()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'whois_net_id.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"net","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"page","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"records","req":false,"type":"`$ARRAY`","index$":2},{"active":true,"name":"total","req":false,"type":"`$INTEGER`","index$":3}],"name":"whois_net_id","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"whoisnetid","orig":"whoisnetid","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"whoissource","orig":"whoissource","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /whois/net/{whoisnetid}","json":"{\"parameters\":[{\"description\":\"The Network (NET) ID of an internet organization.\",\"in\":\"path\",\"name\":\"whoisnetid\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Source query parameter to filter records by provided Whois source.\",\"in\":\"query\",\"name\":\"whoissource\",\"schema\":{\"enum\":[\"arin\",\"ripe\",\"afrinic\",\"apnic\",\"lacnic\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"net\":\"NEW-ENGLAND-5\",\"page\":0,\"records\":[{\"abuse\":\"POC object or null\",\"admin\":\"POC object or null\",\"country\":\"US\",\"id\":\"\",\"maintainer\":\"POC object or null\",\"name\":\"Comcast Cable Communications Holdings, Inc\",\"org\":\"POC object or null\",\"range\":\"24.62.0.0/15\",\"raw\":\"<raw data>\",\"source\":\"arin\",\"status\":\"REASSIGNMENT\",\"tech\":\"POC object or null\",\"updated\":\"2010-10-18\"}],\"total\":100},\"properties\":{\"net\":{\"type\":\"string\"},\"page\":{\"type\":\"integer\"},\"records\":{\"items\":{\"example\":{\"abuse\":\"POC object or null\",\"admin\":\"POC object or null\",\"country\":\"US\",\"id\":\"\",\"maintainer\":\"POC object or null\",\"name\":\"Comcast Cable Communications Holdings, Inc\",\"org\":\"POC object or null\",\"range\":\"24.62.0.0/15\",\"raw\":\"<raw data>\",\"source\":\"arin\",\"status\":\"REASSIGNMENT\",\"tech\":\"POC object or null\",\"updated\":\"2010-10-18\"},\"properties\":{\"abuse\":{\"type\":\"string\"},\"admin\":{\"type\":\"string\"},\"country\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"maintainer\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"org\":{\"type\":\"string\"},\"range\":{\"type\":\"string\"},\"raw\":{\"type\":\"string\"},\"source\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"tech\":{\"type\":\"string\"},\"updated\":{\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"WHOIS Network (NET) ID response.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/whois/net/{whoisnetid}","segments":[{"lit":"whois"},{"lit":"net"},{"var":"whoisnetid"}],"select":{"exist":["page","whoisnetid","whoissource"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["net"]]},"key$":"whois_net_id","name__orig":"whois_net_id","Name":"WhoisNetId","name_":"whois_net_id","name-":"whois-net-id","NAME":"WHOIS_NET_ID","index$":25}, {"active":true,"entity":"whois_net_id","key$":"BasicWhoisNetIdFlow","kind":"basic","name":"BasicWhoisNetIdFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"whois_net_id_ref01","srcdatavar":"whois_net_id_ref01_data","suffix":"_dt0"},"match":{"id":"whois_net_id01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-whois_net_id_ref01"}}],"index$":0}]}, 'WhoisNetId')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let whois_net_id_ref01_data = Object.values(setup.data.existing.whois_net_id)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const whois_net_id_ref01_ent = client.WhoisNetId()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/whois_net_id/WhoisNetIdTestData.json')

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
    ['whois_net_id01','whois_net_id02','whois_net_id03','net01','net02','net03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_WHOIS_NET_ID_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_WHOIS_NET_ID_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_WHOIS_NET_ID_ENTID']
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
  
