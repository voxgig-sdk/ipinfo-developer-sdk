

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


describe('PrivacyExtendedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
  afterEach(liveDelay('IPINFO_DEVELOPER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IpinfoDeveloperSDK.test()
    const ent = testsdk.PrivacyExtended()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'privacy_extended.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"census":{"a":true,"h":"Census","n":"census","r":false,"sh":"Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software.","t":"`$BOOLEAN`","key$":"census","index$":0},"census_ports":{"a":true,"h":"Census Ports","n":"census_ports","r":false,"sh":"The ports we've gotten positive results for when running our VPN detection census","t":"`$ARRAY`","key$":"census_ports","index$":1},"confidence":{"a":true,"h":"Confidence","n":"confidence","r":false,"sh":"The level of confidence attributed to the best source associated with this range.","t":"`$INTEGER`","key$":"confidence","index$":2},"coverage":{"a":true,"h":"Coverage","n":"coverage","r":false,"sh":"For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on.","t":"`$NUMBER`","key$":"coverage","index$":3},"device_activity":{"a":true,"h":"Device Activity","n":"device_activity","r":false,"sh":"Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)","t":"`$BOOLEAN`","key$":"device_activity","index$":4},"first_seen":{"a":true,"fo":"date","h":"First Seen","n":"first_seen","r":false,"sh":"Date when the activity on an anonymous IP address was first observed.","t":"`$STRING`","key$":"first_seen","index$":5},"hosting":{"a":true,"h":"Hosting","n":"hosting","r":true,"sh":"Indicates a hosting/cloud service/data center IP address","t":"`$BOOLEAN`","key$":"hosting","index$":6},"inferred":{"a":true,"h":"Inferred","n":"inferred","r":false,"sh":"Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs","t":"`$BOOLEAN`","key$":"inferred","index$":7},"last_seen":{"a":true,"fo":"date","h":"Last Seen","n":"last_seen","r":false,"sh":"Date when the activity on an anonymous IP address was last/recently observed.","t":"`$STRING`","key$":"last_seen","index$":8},"proxy":{"a":true,"h":"Proxy","n":"proxy","r":true,"sh":"Indicates an open web proxy IP address","t":"`$BOOLEAN`","key$":"proxy","index$":9},"relay":{"a":true,"h":"Relay","n":"relay","r":true,"sh":"Indicates a location-preserving anonymous relay service","t":"`$BOOLEAN`","key$":"relay","index$":10},"service":{"a":true,"h":"Service","n":"service","r":true,"sh":"Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names","t":"`$STRING`","key$":"service","index$":11},"tor":{"a":true,"h":"Tor","n":"tor","r":true,"sh":"Indicates a Tor (The Onion Router) exit node IP address","t":"`$BOOLEAN`","key$":"tor","index$":12},"vpn":{"a":true,"h":"Vpn","n":"vpn","r":true,"sh":"Indicates Virtual Private Network (VPN) service exit node IP address","t":"`$BOOLEAN`","key$":"vpn","index$":13},"vpn_config":{"a":true,"h":"Vpn Config","n":"vpn_config","r":false,"sh":"Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs","t":"`$BOOLEAN`","key$":"vpn_config","index$":14},"whois":{"a":true,"h":"Whois","n":"whois","r":false,"sh":"Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers","t":"`$BOOLEAN`","key$":"whois","index$":15}},"name":"privacy_extended","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{ip}/privacy_extended","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"ip","or":"ip","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{ip}/privacy_extended","q":{"exist":["ip"]},"r":{},"s":[{"var":"ip"},{"lit":"privacy_extended"}],"t":{"req":"`reqdata`","res":"`body.census_ports`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"privacy_extended","name__orig":"privacy_extended","Name":"PrivacyExtended","name_":"privacy_extended","name-":"privacy-extended","NAME":"PRIVACY_EXTENDED","index$":18}, {"active":true,"entity":"privacy_extended","key$":"BasicPrivacyExtendedFlow","kind":"basic","name":"BasicPrivacyExtendedFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"ip":"ip01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"privacy_extended_ref01"}}],"index$":0}]}, 'PrivacyExtended', {"GET /{ip}/privacy_extended":{"protocol":"http","operationId":"getPrivacyExtendedByIp","responses":{"200":{"description":"Privacy Detection Extended response with detailed methodologies.","content":{"application/json":{"schema":{"type":"object","required":["vpn","proxy","tor","relay","hosting","service"],"properties":{"vpn":{"description":"Indicates Virtual Private Network (VPN) service exit node IP address","example":true,"key$":"vpn","type":"boolean"},"proxy":{"description":"Indicates an open web proxy IP address","example":false,"key$":"proxy","type":"boolean"},"tor":{"description":"Indicates a Tor (The Onion Router) exit node IP address","example":false,"key$":"tor","type":"boolean"},"relay":{"description":"Indicates a location-preserving anonymous relay service","example":false,"key$":"relay","type":"boolean"},"hosting":{"description":"Indicates a hosting/cloud service/data center IP address","example":true,"key$":"hosting","type":"boolean"},"service":{"description":"Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names","example":"NordVPN","key$":"service","type":"string"},"confidence":{"description":"The level of confidence attributed to the best source associated with this range. Level 3 - Direct observation of commercial use (vpn_config). Level 2 - Direct observation of VPN software running on the range (census) + registrar information associated with VPNs or specific providers OR highly convincing device activity. Level 1 - Direct observation of VPN software running on the range (census) without known association to specific providers or VPNs in general OR suspicious device data not associated with hosting ranges","example":3,"key$":"confidence","maximum":3,"minimum":1,"type":"integer"},"coverage":{"description":"For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on. For IPs/ranges we've fully directly observed VPN evidence on, this value is 1.0","example":1,"key$":"coverage","maximum":1,"minimum":0,"type":"number"},"census":{"description":"Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software. Ranges with the census flag are those where these scans obtained positive results","example":false,"key$":"census","type":"boolean"},"census_ports":{"description":"The ports we've gotten positive results for when running our VPN detection census","example":[],"items":{"type":"integer"},"key$":"census_ports","type":"array"},"device_activity":{"description":"Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)","example":false,"key$":"device_activity","type":"boolean"},"inferred":{"description":"Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs","example":false,"key$":"inferred","type":"boolean"},"vpn_config":{"description":"Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs","example":false,"key$":"vpn_config","type":"boolean"},"whois":{"description":"Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers","example":false,"key$":"whois","type":"boolean"},"first_seen":{"description":"Date when the activity on an anonymous IP address was first observed. Date in YYYY-MM-DD format, ISO-8601. Within the 3-month lookback period","example":"2025-09-19","format":"date","key$":"first_seen","type":"string"},"last_seen":{"description":"Date when the activity on an anonymous IP address was last/recently observed. Date in YYYY-MM-DD format, ISO-8601","example":"2025-11-06","format":"date","key$":"last_seen","type":"string"}},"x-ref":"#/components/schemas/PrivacyExtendedResponse","index$":0}}},"x-ref":"#/components/responses/PrivacyExtended"},"403":{"description":"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Unknown token"},"message":{"type":"string","example":"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help"}},"x-ref":"#/components/schemas/Error403"}}},"x-ref":"#/components/responses/Forbidden"},"404":{"description":"Wrong ip. Please provide a valid IP address.","content":{"application/json":{"schema":{"type":"object","required":["status","error"],"properties":{"status":{"type":"integer","example":404},"error":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Wrong ip"},"message":{"type":"string","example":"Please provide a valid IP address"}}}},"x-ref":"#/components/schemas/Error404"}}},"x-ref":"#/components/responses/NotFound"},"429":{"description":"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.","content":{"application/json":{"schema":{"type":"object","required":["title","message"],"properties":{"title":{"type":"string","example":"Rate limit exceeded"},"message":{"type":"string","example":"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support"}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/TooManyRequests"},"500":{"description":"Internal server error or server unavailable.","content":{"text/plain":{"schema":{"type":"string","example":"Internal server error","x-ref":"#/components/schemas/Error500"}}},"x-ref":"#/components/responses/InternalServerError"}},"parameters":[{"name":"ip","in":"path","description":"A single IPv4 or IPv6 IP address.","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Ip","index$":0}],"security":[{"BasicAuth":[]},{"BearerAuth":[]},{"ApiKeyAuth":[]}],"securitySource":"operation","securitySchemes":{"BasicAuth":{"type":"http","scheme":"basic"},"BearerAuth":{"type":"http","scheme":"bearer"},"ApiKeyAuth":{"type":"apiKey","in":"query","name":"token"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let privacy_extended_ref01_data = Object.values(setup.data.existing.privacy_extended)[0] as any

    // LIST
    const privacy_extended_ref01_ent = client.PrivacyExtended()
    const privacy_extended_ref01_match: any = {}
    privacy_extended_ref01_match['ip'] = setup.idmap['ip01']

    const privacy_extended_ref01_list = (await privacy_extended_ref01_ent.list(privacy_extended_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/privacy_extended/PrivacyExtendedTestData.json')

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
    ['privacy_extended01','privacy_extended02','privacy_extended03','ip01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IPINFO_DEVELOPER_TEST_PRIVACY_EXTENDED_ENTID': idmap,
    'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
    'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
    'IPINFO_DEVELOPER_APIKEY': '',
    'IPINFO_DEVELOPER_SECRET': '',
  })

  idmap = env['IPINFO_DEVELOPER_TEST_PRIVACY_EXTENDED_ENTID']

  const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IPINFO_DEVELOPER_TEST_PRIVACY_EXTENDED_ENTID']
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
  
