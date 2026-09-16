

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


describe('AsnEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.Asn()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'asn.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"allocated","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"asn","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"country","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"domain","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"downstreams","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":5},{"active":true,"name":"num_ips","req":false,"type":"`$INTEGER`","index$":6},{"active":true,"name":"peers","req":false,"type":"`$ARRAY`","index$":7},{"active":true,"name":"prefixes","req":false,"type":"`$ARRAY`","index$":8},{"active":true,"name":"prefixes6","req":false,"type":"`$ARRAY`","index$":9},{"active":true,"name":"registry","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"route","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"type","req":true,"type":"`$STRING`","index$":12},{"active":true,"name":"upstreams","req":false,"type":"`$ARRAY`","index$":13}],"name":"asn","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"asn","orig":"asn","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /AS{asn}","json":"{\"operationId\":\"getAsn\",\"parameters\":[{\"description\":\"an ASN number.\",\"in\":\"path\",\"name\":\"asn\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"allocated\":{\"example\":\"1997-02-14\",\"type\":\"string\"},\"asn\":{\"example\":\"AS10507\",\"type\":\"string\"},\"country\":{\"example\":\"US\",\"type\":\"string\"},\"domain\":{\"example\":\"sprint.net\",\"type\":\"string\"},\"downstreams\":{\"items\":{\"example\":\"109\",\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"example\":\"Sprint Personal Communications Systems\",\"type\":\"string\"},\"num_ips\":{\"example\":71224576,\"type\":\"integer\"},\"peers\":{\"items\":{\"example\":\"1299\",\"type\":\"string\"},\"type\":\"array\"},\"prefixes\":{\"items\":{\"properties\":{\"country\":{\"example\":\"US\",\"type\":\"string\"},\"domain\":{\"example\":\"quadranet.com\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"example\":\"AKAMAI\",\"type\":\"string\"},\"name\":{\"example\":\"Akamai Technologies, Inc.\",\"type\":\"string\"},\"netblock\":{\"example\":\"104.69.216.0/22\",\"type\":\"string\"},\"size\":{\"example\":\"256\",\"type\":\"string\"},\"status\":{\"example\":\"ALLOCATION\",\"type\":\"string\"}},\"required\":[\"netblock\",\"id\",\"name\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"prefixes6\":{\"items\":{\"properties\":{\"country\":{\"example\":\"US\",\"type\":\"string\"},\"domain\":{\"example\":\"comcast.com\",\"type\":\"string\"},\"id\":{\"example\":\"COMCAST6NET\",\"type\":\"string\"},\"name\":{\"example\":\"Comcast Cable Communications, LLC\",\"type\":\"string\"},\"netblock\":{\"example\":\"2601::/20\",\"type\":\"string\"},\"size\":{\"example\":\"20282409603651670423947251286016\",\"type\":\"string\"},\"status\":{\"example\":\"ASSIGNMENT\",\"type\":\"string\"}},\"required\":[\"netblock\",\"id\",\"name\",\"country\"],\"type\":\"object\"},\"type\":\"array\"},\"registry\":{\"example\":\"arin\",\"type\":\"string\"},\"route\":{\"example\":\"66.87.125.0/24\",\"type\":\"string\"},\"type\":{\"enum\":[\"isp\",\"business\",\"education\",\"hosting\",\"inactive\"],\"example\":\"isp\",\"type\":\"string\"},\"upstreams\":{\"items\":{\"example\":\"1299\",\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"asn\",\"name\",\"domain\",\"type\"],\"type\":\"object\"}}},\"description\":\"ASN response object.\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"ASN Not Found!\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"ASN not found.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support\",\"type\":\"string\"},\"title\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/AS{asn}","segments":[{"lit":"AS{asn}"}],"select":{"exist":["asn"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"asn","name__orig":"asn","Name":"Asn","name_":"asn","name-":"asn","NAME":"ASN","index$":1}, {"active":true,"entity":"asn","key$":"BasicAsnFlow","kind":"basic","name":"BasicAsnFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"asn":"asn01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"asn_ref01"}}],"index$":0}]}, 'Asn')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let asn_ref01_data = Object.values(setup.data.existing.asn)[0] as any

    // LIST
    const asn_ref01_ent = client.Asn()
    const asn_ref01_match: any = {}
    asn_ref01_match['asn'] = setup.idmap['asn01']

    const asn_ref01_list = (await asn_ref01_ent.list(asn_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/asn/AsnTestData.json')

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
    ['asn01','asn02','asn03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_ASN_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_ASN_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_ASN_ENTID']
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
  
