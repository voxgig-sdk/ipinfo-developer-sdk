

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


describe('GetCurrentInformationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.GetCurrentInformation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_current_information.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"asn","req":true,"type":"`$OBJECT`","index$":0},{"active":true,"name":"bogon","req":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"name":"carrier","req":true,"type":"`$OBJECT`","index$":2},{"active":true,"name":"city","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"company","req":true,"type":"`$OBJECT`","index$":4},{"active":true,"name":"country","req":false,"type":"`$STRING`","index$":5},{"active":true,"name":"domains","req":true,"type":"`$OBJECT`","index$":6},{"active":true,"name":"hostname","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"ip","req":true,"type":"`$STRING`","index$":8},{"active":true,"name":"loc","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"org","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"postal","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"privacy","req":true,"type":"`$OBJECT`","index$":12},{"active":true,"name":"region","req":false,"type":"`$STRING`","index$":13},{"active":true,"name":"timezone","req":false,"type":"`$STRING`","index$":14}],"name":"get_current_information","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /","json":"{\"operationId\":\"getCurrentInformation\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"asn\":{\"properties\":{\"allocated\":{\"example\":\"1997-02-14\",\"type\":\"string\"},\"asn\":{\"example\":\"AS10507\",\"type\":\"string\"},\"country\":{\"example\":\"US\",\"type\":\"string\"},\"domain\":{\"example\":\"sprint.net\",\"type\":\"string\"},\"downstreams\":{\"items\":{\"example\":\"109\",\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"example\":\"Sprint Personal Communications Systems\",\"type\":\"string\"},\"num_ips\":{\"example\":71224576,\"type\":\"integer\"},\"peers\":{\"items\":{\"example\":\"1299\",\"type\":\"string\"},\"type\":\"array\"},\"prefixes\":{\"items\":{\"properties\":{\"country\":{\"example\":\"US\",\"type\":\"string\"},\"domain\":{\"example\":\"quadranet.com\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"example\":\"AKAMAI\",\"type\":\"string\"},\"name\":{\"example\":\"Akamai Technologies, Inc.\",\"type\":\"string\"},\"netblock\":{\"example\":\"104.69.216.0/22\",\"type\":\"string\"},\"size\":{\"example\":\"256\",\"type\":\"string\"},\"status\":{\"example\":\"ALLOCATION\",\"type\":\"string\"}},\"required\":[\"netblock\",\"id\",\"name\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"prefixes6\":{\"items\":{\"properties\":{\"country\":{\"example\":\"US\",\"type\":\"string\"},\"domain\":{\"example\":\"comcast.com\",\"type\":\"string\"},\"id\":{\"example\":\"COMCAST6NET\",\"type\":\"string\"},\"name\":{\"example\":\"Comcast Cable Communications, LLC\",\"type\":\"string\"},\"netblock\":{\"example\":\"2601::/20\",\"type\":\"string\"},\"size\":{\"example\":\"20282409603651670423947251286016\",\"type\":\"string\"},\"status\":{\"example\":\"ASSIGNMENT\",\"type\":\"string\"}},\"required\":[\"netblock\",\"id\",\"name\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"registry\":{\"example\":\"arin\",\"type\":\"string\"},\"route\":{\"example\":\"66.87.125.0/24\",\"type\":\"string\"},\"type\":{\"enum\":[\"isp\",\"business\",\"education\",\"hosting\",\"inactive\"],\"example\":\"isp\",\"type\":\"string\"},\"upstreams\":{\"items\":{\"example\":\"1299\",\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"asn\",\"name\",\"domain\",\"type\"],\"type\":\"object\"},\"bogon\":{\"example\":false,\"type\":\"boolean\"},\"carrier\":{\"properties\":{\"mcc\":{\"example\":\"310\",\"type\":\"string\"},\"mnc\":{\"example\":\"120\",\"type\":\"string\"},\"name\":{\"example\":\"Sprint Corporation\",\"type\":\"string\"}},\"required\":[\"name\",\"mcc\",\"mnc\"],\"type\":\"object\"},\"city\":{\"example\":\"Springfield\",\"type\":\"string\"},\"company\":{\"properties\":{\"domain\":{\"example\":\"sprint.com\",\"type\":\"string\"},\"name\":{\"example\":\"Sprint Springfield POP\",\"type\":\"string\"},\"type\":{\"enum\":[\"isp\",\"business\",\"education\",\"hosting\"],\"example\":\"isp\",\"type\":\"string\"}},\"required\":[\"name\",\"domain\",\"type\"],\"type\":\"object\"},\"country\":{\"example\":\"US\",\"type\":\"string\"},\"domains\":{\"properties\":{\"domains\":{\"items\":{\"example\":\"udemy.com\",\"type\":\"string\"},\"type\":\"array\"},\"ip\":{\"example\":\"1.1.1.1\",\"type\":\"string\"},\"page\":{\"example\":1,\"type\":\"integer\"},\"total\":{\"example\":17939,\"type\":\"integer\"}},\"required\":[\"total\"],\"type\":\"object\"},\"hostname\":{\"example\":\"ip-66-87-125-72.spfdma.spcsdns.net\",\"type\":\"string\"},\"ip\":{\"example\":\"66.87.125.72\",\"type\":\"string\"},\"loc\":{\"example\":\"42.0999,-72.5783\",\"type\":\"string\"},\"org\":{\"example\":\"AS51501 Khabarovsk home networks Ltd\",\"type\":\"string\"},\"postal\":{\"example\":\"01105\",\"type\":\"string\"},\"privacy\":{\"properties\":{\"hosting\":{\"example\":false,\"type\":\"boolean\"},\"proxy\":{\"example\":false,\"type\":\"boolean\"},\"relay\":{\"example\":false,\"type\":\"boolean\"},\"service\":{\"example\":\"\",\"type\":\"string\"},\"tor\":{\"example\":false,\"type\":\"boolean\"},\"vpn\":{\"example\":true,\"type\":\"boolean\"}},\"required\":[\"vpn\",\"proxy\",\"tor\",\"hosting\",\"relay\",\"service\"],\"type\":\"object\"},\"region\":{\"example\":\"Massachusetts\",\"type\":\"string\"},\"timezone\":{\"example\":\"America/New_York\",\"type\":\"string\"}},\"required\":[\"ip\"],\"type\":\"object\"}}},\"description\":\"Full response object.\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support\",\"type\":\"string\"},\"title\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/","segments":[],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_current_information","name__orig":"get_current_information","Name":"GetCurrentInformation","name_":"get_current_information","name-":"get-current-information","NAME":"GET_CURRENT_INFORMATION","index$":7}, {"active":true,"entity":"get_current_information","key$":"BasicGetCurrentInformationFlow","kind":"basic","name":"BasicGetCurrentInformationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_current_information_ref01","srcdatavar":"get_current_information_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_current_information_ref01"}}],"index$":0}]}, 'GetCurrentInformation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_current_information_ref01_data = Object.values(setup.data.existing.get_current_information)[0] as any

    // LOAD
    const get_current_information_ref01_ent = client.GetCurrentInformation()
    const get_current_information_ref01_match_dt0: any = {}
    const get_current_information_ref01_data_dt0 = (await get_current_information_ref01_ent.load(get_current_information_ref01_match_dt0)).data()
    assert(null != get_current_information_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_current_information/GetCurrentInformationTestData.json')

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
    ['get_current_information01','get_current_information02','get_current_information03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_GET_CURRENT_INFORMATION_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_GET_CURRENT_INFORMATION_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_GET_CURRENT_INFORMATION_ENTID']
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
  
