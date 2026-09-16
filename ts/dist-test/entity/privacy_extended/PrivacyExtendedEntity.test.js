"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PrivacyExtendedEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.PrivacyExtended();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'privacy_extended.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "census", "req": false, "short": "Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software.", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "census_ports", "req": false, "short": "The ports we've gotten positive results for when running our VPN detection census", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "confidence", "req": false, "short": "The level of confidence attributed to the best source associated with this range.", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "coverage", "req": false, "short": "For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on.", "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "device_activity", "req": false, "short": "Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "format": "date", "name": "first_seen", "req": false, "short": "Date when the activity on an anonymous IP address was first observed.", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "hosting", "req": true, "short": "Indicates a hosting/cloud service/data center IP address", "type": "`$BOOLEAN`", "index$": 6 }, { "active": true, "name": "inferred", "req": false, "short": "Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs", "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "format": "date", "name": "last_seen", "req": false, "short": "Date when the activity on an anonymous IP address was last/recently observed.", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "proxy", "req": true, "short": "Indicates an open web proxy IP address", "type": "`$BOOLEAN`", "index$": 9 }, { "active": true, "name": "relay", "req": true, "short": "Indicates a location-preserving anonymous relay service", "type": "`$BOOLEAN`", "index$": 10 }, { "active": true, "name": "service", "req": true, "short": "Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names", "type": "`$STRING`", "index$": 11 }, { "active": true, "name": "tor", "req": true, "short": "Indicates a Tor (The Onion Router) exit node IP address", "type": "`$BOOLEAN`", "index$": 12 }, { "active": true, "name": "vpn", "req": true, "short": "Indicates Virtual Private Network (VPN) service exit node IP address", "type": "`$BOOLEAN`", "index$": 13 }, { "active": true, "name": "vpn_config", "req": false, "short": "Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs", "type": "`$BOOLEAN`", "index$": 14 }, { "active": true, "name": "whois", "req": false, "short": "Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers", "type": "`$BOOLEAN`", "index$": 15 }], "name": "privacy_extended", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "ip", "orig": "ip", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{ip}/privacy_extended", "json": "{\"operationId\":\"getPrivacyExtendedByIp\",\"parameters\":[{\"description\":\"A single IPv4 or IPv6 IP address.\",\"in\":\"path\",\"name\":\"ip\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"census\":{\"description\":\"Ranges where we've observed VPN software/ports on; we run scans on ports and protocols commonly associated with VPN software. Ranges with the census flag are those where these scans obtained positive results\",\"example\":false,\"type\":\"boolean\"},\"census_ports\":{\"description\":\"The ports we've gotten positive results for when running our VPN detection census\",\"example\":[],\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"confidence\":{\"description\":\"The level of confidence attributed to the best source associated with this range. Level 3 - Direct observation of commercial use (vpn_config). Level 2 - Direct observation of VPN software running on the range (census) + registrar information associated with VPNs or specific providers OR highly convincing device activity. Level 1 - Direct observation of VPN software running on the range (census) without known association to specific providers or VPNs in general OR suspicious device data not associated with hosting ranges\",\"example\":3,\"maximum\":3,\"minimum\":1,\"type\":\"integer\"},\"coverage\":{\"description\":\"For inferred ranges, represents the proportion of the range (in IP count) that we saw direct evidence of VPN activity on. For IPs/ranges we've fully directly observed VPN evidence on, this value is 1.0\",\"example\":1,\"maximum\":1,\"minimum\":0,\"type\":\"number\"},\"device_activity\":{\"description\":\"Ranges on which we've observed device activity compatible with VPN usage (outside of known infrastructure area; simultaneous use around a large area; pingable and/or associated with hosting providers)\",\"example\":false,\"type\":\"boolean\"},\"first_seen\":{\"description\":\"Date when the activity on an anonymous IP address was first observed. Date in YYYY-MM-DD format, ISO-8601. Within the 3-month lookback period\",\"example\":\"2025-09-19\",\"format\":\"date\",\"type\":\"string\"},\"hosting\":{\"description\":\"Indicates a hosting/cloud service/data center IP address\",\"example\":true,\"type\":\"boolean\"},\"inferred\":{\"description\":\"Whether the range associated with the record is the result of direct observation or inference based on neighboring IPs\",\"example\":false,\"type\":\"boolean\"},\"last_seen\":{\"description\":\"Date when the activity on an anonymous IP address was last/recently observed. Date in YYYY-MM-DD format, ISO-8601\",\"example\":\"2025-11-06\",\"format\":\"date\",\"type\":\"string\"},\"proxy\":{\"description\":\"Indicates an open web proxy IP address\",\"example\":false,\"type\":\"boolean\"},\"relay\":{\"description\":\"Indicates a location-preserving anonymous relay service\",\"example\":false,\"type\":\"boolean\"},\"service\":{\"description\":\"Name of the privacy service provider - includes VPN, Proxy, and Relay service provider names\",\"example\":\"NordVPN\",\"type\":\"string\"},\"tor\":{\"description\":\"Indicates a Tor (The Onion Router) exit node IP address\",\"example\":false,\"type\":\"boolean\"},\"vpn\":{\"description\":\"Indicates Virtual Private Network (VPN) service exit node IP address\",\"example\":true,\"type\":\"boolean\"},\"vpn_config\":{\"description\":\"Ranges where we confirmed VPN activity by directly running VPN software from almost 200 different providers and collecting exit IPs\",\"example\":false,\"type\":\"boolean\"},\"whois\":{\"description\":\"Ranges where we've observed VPN software/ports on AND have a WHOIS association with either VPNs in general or specific VPN providers\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"vpn\",\"proxy\",\"tor\",\"relay\",\"hosting\",\"service\"],\"type\":\"object\"}}},\"description\":\"Privacy Detection Extended response with detailed methodologies.\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help\",\"type\":\"string\"},\"title\":{\"example\":\"Unknown token\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"message\":{\"example\":\"Please provide a valid IP address\",\"type\":\"string\"},\"title\":{\"example\":\"Wrong ip\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"},\"status\":{\"example\":404,\"type\":\"integer\"}},\"required\":[\"status\",\"error\"],\"type\":\"object\"}}},\"description\":\"Wrong ip. Please provide a valid IP address.\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support\",\"type\":\"string\"},\"title\":{\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"required\":[\"title\",\"message\"],\"type\":\"object\"}}},\"description\":\"Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.\"},\"500\":{\"content\":{\"text/plain\":{\"schema\":{\"example\":\"Internal server error\",\"type\":\"string\"}}},\"description\":\"Internal server error or server unavailable.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{ip}/privacy_extended", "segments": [{ "var": "ip" }, { "lit": "privacy_extended" }], "select": { "exist": ["ip"] }, "transform": { "req": "`reqdata`", "res": "`body.census_ports`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "privacy_extended", "name__orig": "privacy_extended", "Name": "PrivacyExtended", "name_": "privacy_extended", "name-": "privacy-extended", "NAME": "PRIVACY_EXTENDED", "index$": 18 }, { "active": true, "entity": "privacy_extended", "key$": "BasicPrivacyExtendedFlow", "kind": "basic", "name": "BasicPrivacyExtendedFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "ip": "ip01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "privacy_extended_ref01" } }], "index$": 0 }] }, 'PrivacyExtended');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let privacy_extended_ref01_data = Object.values(setup.data.existing.privacy_extended)[0];
        // LIST
        const privacy_extended_ref01_ent = client.PrivacyExtended();
        const privacy_extended_ref01_match = {};
        privacy_extended_ref01_match['ip'] = setup.idmap['ip01'];
        const privacy_extended_ref01_list = (await privacy_extended_ref01_ent.list(privacy_extended_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/privacy_extended/PrivacyExtendedTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['privacy_extended01', 'privacy_extended02', 'privacy_extended03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_PRIVACY_EXTENDED_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_PRIVACY_EXTENDED_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_PRIVACY_EXTENDED_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IpinfoDeveloperSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=PrivacyExtendedEntity.test.js.map