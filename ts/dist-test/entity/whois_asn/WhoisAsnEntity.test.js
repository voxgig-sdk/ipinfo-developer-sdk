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
(0, node_test_1.describe)('WhoisAsnEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.WhoisAsn();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'whois_asn.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "abuse", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "admin", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "country", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "maintainer", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "name", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "org", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "range", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "raw", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "source", "req": false, "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "tech", "req": false, "type": "`$STRING`", "index$": 11 }, { "active": true, "format": "date", "name": "updated", "req": false, "type": "`$STRING`", "index$": 12 }], "id": { "field": "id", "name": "id" }, "name": "whois_asn", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "asn", "orig": "asn", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "whoissource", "orig": "whoissource", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /whois/net/AS{asn}", "json": "{\"parameters\":[{\"description\":\"an ASN number.\",\"in\":\"path\",\"name\":\"asn\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Source query parameter to filter records by provided Whois source.\",\"in\":\"query\",\"name\":\"whoissource\",\"schema\":{\"enum\":[\"arin\",\"ripe\",\"afrinic\",\"apnic\",\"lacnic\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"net\":\"AS9541\",\"page\":0,\"records\":[{\"abuse\":\"POC object or null\",\"admin\":\"POC object or null\",\"country\":\"PK\",\"id\":\"CYBERNET\",\"maintainer\":\"POC object or null\",\"name\":\"Broadband Services\",\"org\":null,\"range\":\"58.65.203.0/24\",\"raw\":\"<raw data>\",\"source\":\"apnic\",\"status\":\"ALLOCATED NON-PORTABLE\",\"tech\":\"POC object or null\",\"updated\":\"2021-01-27\"}],\"total\":47},\"properties\":{\"net\":{\"example\":\"AS9541\",\"type\":\"string\"},\"page\":{\"example\":0,\"type\":\"integer\"},\"records\":{\"items\":{\"properties\":{\"abuse\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"admin\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"country\":{\"example\":\"PK\",\"type\":\"string\"},\"id\":{\"example\":\"CYBERNET\",\"type\":\"string\"},\"maintainer\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"name\":{\"example\":\"Broadband Services\",\"type\":\"string\"},\"org\":{\"example\":null,\"type\":\"string\"},\"range\":{\"example\":\"58.65.203.0/24\",\"type\":\"string\"},\"raw\":{\"example\":\"<raw data>\",\"type\":\"string\"},\"source\":{\"example\":\"apnic\",\"type\":\"string\"},\"status\":{\"example\":\"ALLOCATED NON-PORTABLE\",\"type\":\"string\"},\"tech\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"updated\":{\"example\":\"2021-01-27\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"example\":47,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"WHOIS ASN response.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/whois/net/AS{asn}", "segments": [{ "lit": "whois" }, { "lit": "net" }, { "lit": "AS{asn}" }], "select": { "exist": ["asn", "page", "whoissource"] }, "transform": { "req": "`reqdata`", "res": "`body.records`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "whois_asn", "name__orig": "whois_asn", "Name": "WhoisAsn", "name_": "whois_asn", "name-": "whois-asn", "NAME": "WHOIS_ASN", "index$": 22 }, { "active": true, "entity": "whois_asn", "key$": "BasicWhoisAsnFlow", "kind": "basic", "name": "BasicWhoisAsnFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "asn": "asn01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "whois_asn_ref01" } }], "index$": 0 }] }, 'WhoisAsn');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let whois_asn_ref01_data = Object.values(setup.data.existing.whois_asn)[0];
        // LIST
        const whois_asn_ref01_ent = client.WhoisAsn();
        const whois_asn_ref01_match = {};
        whois_asn_ref01_match['asn'] = setup.idmap['asn01'];
        const whois_asn_ref01_list = (await whois_asn_ref01_ent.list(whois_asn_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/whois_asn/WhoisAsnTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['whois_asn01', 'whois_asn02', 'whois_asn03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_WHOIS_ASN_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_WHOIS_ASN_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_WHOIS_ASN_ENTID'];
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
//# sourceMappingURL=WhoisAsnEntity.test.js.map