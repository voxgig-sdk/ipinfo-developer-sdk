

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


describe('PlaceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.Place()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'place.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"category","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"ip","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"latitude","req":true,"type":"`$NUMBER`","index$":3},{"active":true,"name":"longitude","req":true,"type":"`$NUMBER`","index$":4},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"ssid","req":true,"type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"place","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"ip","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /places/{ip}","json":"{\"operationId\":\"getPlaceByIp\",\"parameters\":[{\"description\":\"A single IPv4 or IPv6 IP address.\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"category\":{\"example\":\"museum\",\"type\":\"string\"},\"ip\":{\"example\":\"65.144.40.106\",\"type\":\"string\"},\"latitude\":{\"example\":47.6275,\"type\":\"number\"},\"longitude\":{\"example\":-122.3367,\"type\":\"number\"},\"name\":{\"example\":\"Museum of History and Industry (MOHAI)\",\"type\":\"string\"},\"ssid\":{\"example\":\"MOHAI-Guest\",\"type\":\"string\"}},\"required\":[\"ip\",\"name\",\"category\",\"ssid\",\"latitude\",\"longitude\"],\"type\":\"object\"}}},\"description\":\"Places API response object.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"No module or field of type exists for the provided field. Please check our documentation https://ipinfo.io/developers.\",\"type\":\"string\"},\"title\":{\"example\":\"Wrong module or field type\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"If users try to access a field type that does not exist or do not have permissions to access it, they will encounter a wrong module or field type error.\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support\",\"type\":\"string\"},\"title\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/places/{ip}","rename":{"param":{"ip":"id"}},"segments":[{"lit":"places"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"place","name__orig":"place","Name":"Place","name_":"place","name-":"place","NAME":"PLACE","index$":15}, {"active":true,"entity":"place","key$":"BasicPlaceFlow","kind":"basic","name":"BasicPlaceFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"place_ref01","srcdatavar":"place_ref01_data","suffix":"_dt0"},"match":{"id":"place01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-place_ref01"}}],"index$":0}]}, 'Place')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let place_ref01_data = Object.values(setup.data.existing.place)[0] as any

    // LOAD
    const place_ref01_ent = client.Place()
    const place_ref01_match_dt0: any = {}
    place_ref01_match_dt0.id = place_ref01_data.id
    const place_ref01_data_dt0 = (await place_ref01_ent.load(place_ref01_match_dt0)).data()
    assert(place_ref01_data_dt0.id === place_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/place/PlaceTestData.json')

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
    ['place01','place02','place03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_PLACE_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_PLACE_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_PLACE_ENTID']
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
  
