

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


describe('LiteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.Lite()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'lite.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"as_domain","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"as_name","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"asn","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"continent","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"continent_code","req":true,"type":"`$STRING`","index$":4},{"active":true,"name":"country","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"country_code","req":true,"type":"`$STRING`","index$":6},{"active":true,"name":"ip","req":true,"type":"`$STRING`","index$":7}],"name":"lite","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /lite/me","json":"{\"operationId\":\"getCurrentLiteInformation\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"as_domain\":{\"example\":\"google.com\",\"type\":\"string\"},\"as_name\":{\"example\":\"Google LLC\",\"type\":\"string\"},\"asn\":{\"example\":\"AS15169\",\"type\":\"string\"},\"continent\":{\"example\":\"North America\",\"type\":\"string\"},\"continent_code\":{\"example\":\"NA\",\"type\":\"string\"},\"country\":{\"example\":\"United States\",\"type\":\"string\"},\"country_code\":{\"example\":\"US\",\"type\":\"string\"},\"ip\":{\"example\":\"8.8.8.8\",\"type\":\"string\"}},\"required\":[\"ip\",\"asn\",\"as_name\",\"as_domain\",\"country_code\",\"country\",\"continent_code\",\"continent\"],\"type\":\"object\"}}},\"description\":\"Lite response object.\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":403,\"type\":\"integer\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Forbidden error (authentication issues).\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/lite/me","segments":[{"lit":"lite"},{"lit":"me"}],"select":{"$action":"me"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"lite","name__orig":"lite","Name":"Lite","name_":"lite","name-":"lite","NAME":"LITE","index$":12}, {"active":true,"entity":"lite","key$":"BasicLiteFlow","kind":"basic","name":"BasicLiteFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"lite_ref01","srcdatavar":"lite_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-lite_ref01"}}],"index$":0}]}, 'Lite')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let lite_ref01_data = Object.values(setup.data.existing.lite)[0] as any

    // LOAD
    const lite_ref01_ent = client.Lite()
    const lite_ref01_match_dt0: any = {}
    const lite_ref01_data_dt0 = (await lite_ref01_ent.load(lite_ref01_match_dt0)).data()
    assert(null != lite_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/lite/LiteTestData.json')

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
    ['lite01','lite02','lite03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_LITE_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_LITE_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_LITE_ENTID']
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
  
