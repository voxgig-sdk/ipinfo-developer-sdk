

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


describe('GeneralEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.General()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'general.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"8_8_8_8","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"8_8_8_8city","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"summary","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"value","req":false,"type":"`$OBJECT`","index$":3}],"name":"general","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"cli","orig":"cli","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"POST /tools/map","json":"{\"operationId\":\"map\",\"parameters\":[{\"description\":\"CLI flag parameter\",\"in\":\"query\",\"name\":\"cli\",\"required\":false,\"schema\":{\"example\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"46.95.248.61\\n215.113.215.175\\n27.7.158.28\\n209.99.186.255\\n192.40.165.85\\n2a02:c7f:f8c4:ca00:356d:ac4c:954c:e46\\n2001:16a2:9432:8126:2dbf:9aa0:8057:1246\\n2600:8807:a788:7c00:c828:264:8dcf:b37f\\n181.200.55.93\\n77.222.8.184\\n\",\"type\":\"string\"}}},\"description\":\"A file containing IP addresses with each IP on a separate line.\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"summary\":\"Example of mapping IP addresses\",\"value\":{\"reportUrl\":\"https://ipinfo.io/tools/map/40c04638-a340-44b8-90de-f95afdff99d8\",\"status\":\"Report Generated\"}},\"type\":\"object\"}}},\"description\":\"Map response object.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Rate limit exceeded. You can use the IP Map tool up to 5 times per day. Please wait 24 hours or use our IPinfo Lite API service\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/tools/map","segments":[{"lit":"tools"},{"lit":"map"}],"select":{"exist":["cli"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":1,"kind":"query","name":"cli","orig":"cli","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"POST /tools/summarize-ips","json":"{\"operationId\":\"summarize\",\"parameters\":[{\"description\":\"CLI flag parameter\",\"in\":\"query\",\"name\":\"cli\",\"required\":false,\"schema\":{\"example\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"42.77.204.9\\n2a02:1811:1424:a200:a307:b776:645b:46b5\\n84.74.205.0\\n2601:19b:4980:2270:8869:1575:ffd0:5ba0\\n2a01:e0a:a2d:fd70::8056:6278\\n75.136.126.2\\n2400:4052:244:a900:8b5:16e9:badb:a2bd\\n104.103.81.185\\n2603:7000:8d40:47d7:64fc:6:56cf:1b54\\n216.211.59.51\\n\",\"type\":\"string\"}}},\"description\":\"A file containing IP addresses with each IP on a separate line.\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"summary\":\"Example of summarizing IP addresses\",\"value\":{\"reportUrl\":\"https://ipinfo.io/tools/summarize-ips/3ea606f3-b3ad-4a37-a875-b897a0c2e718\",\"status\":\"Report Generated\"}},\"type\":\"object\"}}},\"description\":\"Summarize response object.\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"There were no valid IPs in the text.\",\"type\":\"string\"},\"title\":{\"example\":\"No IPs Found\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"The input payload does not meet the specification.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Rate limit exceeded. You can use the Summarize IPs tool up to 5 times per day. Please wait 24 hours or use our IPinfo Lite API service\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/tools/summarize-ips","segments":[{"lit":"tools"},{"lit":"summarize-ips"}],"select":{"exist":["cli"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"POST /batch","json":"{\"operationId\":\"batch\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"example\":[\"8.8.8.8/city\",\"8.8.8.8\"],\"type\":\"array\"}}},\"description\":\"A JSON array containing IP addresses.\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":{\"type\":\"object\"},\"example\":{\"8.8.8.8\":{\"city\":\"Mountain View\",\"country\":\"US\",\"hostname\":\"dns.google\",\"ip\":\"8.8.8.8\",\"loc\":\"37.4056,-122.0775\",\"org\":\"AS15169 Google LLC\",\"postal\":94043,\"region\":\"California\",\"timezone\":\"America/Los_Angeles\"},\"8.8.8.8/city\":\"Mountain View\"},\"type\":\"object\"}}},\"description\":\"Batch response object.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/batch","segments":[{"lit":"batch"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"general","name__orig":"general","Name":"General","name_":"general","name-":"general","NAME":"GENERAL","index$":6}, {"active":true,"entity":"general","key$":"BasicGeneralFlow","kind":"basic","name":"BasicGeneralFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"general_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'General')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const general_ref01_ent = client.General()
    let general_ref01_data = setup.data.new.general['general_ref01']

    general_ref01_data = (await general_ref01_ent.create(general_ref01_data)).data()
    assert(null != general_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/general/GeneralTestData.json')

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
    ['general01','general02','general03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_GENERAL_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_GENERAL_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_GENERAL_ENTID']
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
  
