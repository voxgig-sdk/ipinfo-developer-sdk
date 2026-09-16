

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


describe('PlusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.Plus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'plus.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"anonymous","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"as","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"geo","req":false,"type":"`$OBJECT`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"ip","req":true,"type":"`$STRING`","index$":4},{"active":true,"name":"is_anonymous","req":false,"type":"`$BOOLEAN`","index$":5},{"active":true,"name":"is_anycast","req":false,"type":"`$BOOLEAN`","index$":6},{"active":true,"name":"is_hosting","req":false,"type":"`$BOOLEAN`","index$":7},{"active":true,"name":"is_mobile","req":false,"type":"`$BOOLEAN`","index$":8},{"active":true,"name":"is_satellite","req":false,"type":"`$BOOLEAN`","index$":9},{"active":true,"name":"mobile","req":false,"type":"`$OBJECT`","index$":10}],"id":{"field":"id","name":"id"},"name":"plus","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"ip","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /plus/{ip}","json":"{\"operationId\":\"getPlusInformationByIp\",\"parameters\":[{\"description\":\"A single IPv4 or IPv6 IP address.\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"anonymous\":{\"properties\":{\"is_proxy\":{\"example\":false,\"type\":\"boolean\"},\"is_relay\":{\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"example\":false,\"type\":\"boolean\"},\"name\":{\"example\":\"Google One VPN\",\"type\":\"string\"}},\"type\":\"object\"},\"as\":{\"properties\":{\"asn\":{\"example\":\"AS577\",\"type\":\"string\"},\"domain\":{\"example\":\"bell.ca\",\"type\":\"string\"},\"last_changed\":{\"example\":\"2025-09-28\",\"format\":\"date\",\"type\":\"string\"},\"name\":{\"example\":\"Bell Canada\",\"type\":\"string\"},\"type\":{\"example\":\"isp\",\"type\":\"string\"}},\"type\":\"object\"},\"geo\":{\"properties\":{\"city\":{\"example\":\"Toronto\",\"type\":\"string\"},\"continent\":{\"example\":\"North America\",\"type\":\"string\"},\"continent_code\":{\"example\":\"NA\",\"type\":\"string\"},\"country\":{\"example\":\"Canada\",\"type\":\"string\"},\"country_code\":{\"example\":\"CA\",\"type\":\"string\"},\"dma_code\":{\"example\":\"57\",\"type\":\"string\"},\"geoname_id\":{\"example\":\"6167865\",\"type\":\"string\"},\"last_changed\":{\"example\":\"2025-09-21\",\"format\":\"date\",\"type\":\"string\"},\"latitude\":{\"example\":43.6561,\"type\":\"number\"},\"longitude\":{\"example\":-79.3406,\"type\":\"number\"},\"postal_code\":{\"example\":\"M4M\",\"type\":\"string\"},\"radius\":{\"example\":50,\"type\":\"integer\"},\"region\":{\"example\":\"Ontario\",\"type\":\"string\"},\"region_code\":{\"example\":\"ON\",\"type\":\"string\"},\"timezone\":{\"example\":\"America/Toronto\",\"type\":\"string\"}},\"type\":\"object\"},\"ip\":{\"example\":\"206.47.33.149\",\"type\":\"string\"},\"is_anonymous\":{\"example\":false,\"type\":\"boolean\"},\"is_anycast\":{\"example\":false,\"type\":\"boolean\"},\"is_hosting\":{\"example\":false,\"type\":\"boolean\"},\"is_mobile\":{\"example\":true,\"type\":\"boolean\"},\"is_satellite\":{\"example\":false,\"type\":\"boolean\"},\"mobile\":{\"properties\":{\"mcc\":{\"example\":\"302\",\"type\":\"string\"},\"mnc\":{\"example\":\"610\",\"type\":\"string\"},\"name\":{\"example\":\"Bell Mobility\",\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"ip\"],\"type\":\"object\"}}},\"description\":\"Plus response object.\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Please provide a valid IP address\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request error (invalid IP format).\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":403,\"type\":\"integer\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Forbidden error (authentication issues).\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support\",\"type\":\"string\"},\"title\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/plus/{ip}","rename":{"param":{"ip":"id"}},"segments":[{"lit":"plus"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /plus/me","json":"{\"operationId\":\"getCurrentPlusInformation\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"anonymous\":{\"properties\":{\"is_proxy\":{\"example\":false,\"type\":\"boolean\"},\"is_relay\":{\"example\":false,\"type\":\"boolean\"},\"is_tor\":{\"example\":false,\"type\":\"boolean\"},\"is_vpn\":{\"example\":false,\"type\":\"boolean\"},\"name\":{\"example\":\"Google One VPN\",\"type\":\"string\"}},\"type\":\"object\"},\"as\":{\"properties\":{\"asn\":{\"example\":\"AS577\",\"type\":\"string\"},\"domain\":{\"example\":\"bell.ca\",\"type\":\"string\"},\"last_changed\":{\"example\":\"2025-09-28\",\"format\":\"date\",\"type\":\"string\"},\"name\":{\"example\":\"Bell Canada\",\"type\":\"string\"},\"type\":{\"example\":\"isp\",\"type\":\"string\"}},\"type\":\"object\"},\"geo\":{\"properties\":{\"city\":{\"example\":\"Toronto\",\"type\":\"string\"},\"continent\":{\"example\":\"North America\",\"type\":\"string\"},\"continent_code\":{\"example\":\"NA\",\"type\":\"string\"},\"country\":{\"example\":\"Canada\",\"type\":\"string\"},\"country_code\":{\"example\":\"CA\",\"type\":\"string\"},\"dma_code\":{\"example\":\"57\",\"type\":\"string\"},\"geoname_id\":{\"example\":\"6167865\",\"type\":\"string\"},\"last_changed\":{\"example\":\"2025-09-21\",\"format\":\"date\",\"type\":\"string\"},\"latitude\":{\"example\":43.6561,\"type\":\"number\"},\"longitude\":{\"example\":-79.3406,\"type\":\"number\"},\"postal_code\":{\"example\":\"M4M\",\"type\":\"string\"},\"radius\":{\"example\":50,\"type\":\"integer\"},\"region\":{\"example\":\"Ontario\",\"type\":\"string\"},\"region_code\":{\"example\":\"ON\",\"type\":\"string\"},\"timezone\":{\"example\":\"America/Toronto\",\"type\":\"string\"}},\"type\":\"object\"},\"ip\":{\"example\":\"206.47.33.149\",\"type\":\"string\"},\"is_anonymous\":{\"example\":false,\"type\":\"boolean\"},\"is_anycast\":{\"example\":false,\"type\":\"boolean\"},\"is_hosting\":{\"example\":false,\"type\":\"boolean\"},\"is_mobile\":{\"example\":true,\"type\":\"boolean\"},\"is_satellite\":{\"example\":false,\"type\":\"boolean\"},\"mobile\":{\"properties\":{\"mcc\":{\"example\":\"302\",\"type\":\"string\"},\"mnc\":{\"example\":\"610\",\"type\":\"string\"},\"name\":{\"example\":\"Bell Mobility\",\"type\":\"string\"}},\"type\":\"object\"}},\"required\":[\"ip\"],\"type\":\"object\"}}},\"description\":\"Plus response object.\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":403,\"type\":\"integer\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Forbidden error (authentication issues).\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support\",\"type\":\"string\"},\"title\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/plus/me","segments":[{"lit":"plus"},{"lit":"me"}],"select":{"$action":"me"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"plus","name__orig":"plus","Name":"Plus","name_":"plus","name-":"plus","NAME":"PLUS","index$":16}, {"active":true,"entity":"plus","key$":"BasicPlusFlow","kind":"basic","name":"BasicPlusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"plus_ref01","srcdatavar":"plus_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-plus_ref01"}}],"index$":0}]}, 'Plus')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let plus_ref01_data = Object.values(setup.data.existing.plus)[0] as any

    // LOAD
    const plus_ref01_ent = client.Plus()
    const plus_ref01_match_dt0: any = {}
    plus_ref01_match_dt0.id = plus_ref01_data.id
    const plus_ref01_data_dt0 = (await plus_ref01_ent.load(plus_ref01_match_dt0)).data()
    assert(plus_ref01_data_dt0.id === plus_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/plus/PlusTestData.json')

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
    ['plus01','plus02','plus03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_PLUS_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_PLUS_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_PLUS_ENTID']
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
  
