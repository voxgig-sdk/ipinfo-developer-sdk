

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"address","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"country","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"email","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"network","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"phone","req":false,"type":"`$STRING`","index$":5}],"name":"abuse","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"ip","orig":"ip","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{ip}/abuse","json":"{\"operationId\":\"getAbuse\",\"parameters\":[{\"description\":\"A single IPv4 or IPv6 IP address.\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"example\":\"US, CA, Mountain View, 1600 Amphitheatre Parkway, 94043\",\"type\":\"string\"},\"country\":{\"example\":\"US\",\"type\":\"string\"},\"email\":{\"example\":\"network-abuse@google.com\",\"type\":\"string\"},\"name\":{\"example\":\"Abuse\",\"type\":\"string\"},\"network\":{\"example\":\"8.8.8.0/24\",\"type\":\"string\"},\"phone\":{\"example\":\"+1-650-253-0000\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Abuse response object.\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"message\":{\"example\":\"Please provide a valid IP address\",\"type\":\"string\"},\"title\":{\"example\":\"Wrong ip\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":404,\"type\":\"integer\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Wrong ip. Please provide a valid IP address.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support\",\"type\":\"string\"},\"title\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{ip}/abuse","segments":[{"var":"ip"},{"lit":"abuse"}],"select":{"exist":["ip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"abuse","name__orig":"abuse","Name":"Abuse","name_":"abuse","name-":"abuse","NAME":"ABUSE","index$":0}, {"active":true,"entity":"abuse","key$":"BasicAbuseFlow","kind":"basic","name":"BasicAbuseFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"abuse_ref01","srcdatavar":"abuse_ref01_data","suffix":"_dt0"},"match":{"id":"abuse01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-abuse_ref01"}}],"index$":0}]}, 'Abuse')
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
  
