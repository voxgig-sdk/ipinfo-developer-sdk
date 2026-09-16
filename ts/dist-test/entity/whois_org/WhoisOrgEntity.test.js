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
(0, node_test_1.describe)('WhoisOrgEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.WhoisOrg();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'whois_org.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "org", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "page", "req": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "records", "req": false, "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "total", "req": false, "type": "`$INTEGER`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "whois_org", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "whoisorgid", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "page", "orig": "page", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "whoissource", "orig": "whoissource", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /whois/org/{whoisorgid}", "json": "{\"parameters\":[{\"description\":\"The WHOIS organization (ORG) ID of an internet organization.\",\"in\":\"path\",\"name\":\"whoisorgid\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.\",\"in\":\"query\",\"name\":\"page\",\"schema\":{\"minimum\":0,\"type\":\"integer\"}},{\"description\":\"Source query parameter to filter records by provided Whois source.\",\"in\":\"query\",\"name\":\"whoissource\",\"schema\":{\"enum\":[\"arin\",\"ripe\",\"afrinic\",\"apnic\",\"lacnic\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"org\":\"PINEAP\",\"page\":0,\"records\":[{\"abuse\":\"POC object or null\",\"address\":null,\"admin\":\"POC object or null\",\"country\":\"US\",\"created\":\"2000-03-25\",\"id\":\"PINEAP\",\"maintainer\":\"POC object or null\",\"name\":\"Pineapple Houser\",\"raw\":\"<raw data>\",\"source\":\"arin\",\"tech\":\"POC object or null\",\"updated\":\"2011-09-24\"}],\"total\":100},\"properties\":{\"org\":{\"example\":\"PINEAP\",\"type\":\"string\"},\"page\":{\"example\":0,\"type\":\"integer\"},\"records\":{\"items\":{\"properties\":{\"abuse\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"address\":{\"example\":null,\"type\":\"string\"},\"admin\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"country\":{\"example\":\"US\",\"type\":\"string\"},\"created\":{\"example\":\"2000-03-25\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"example\":\"PINEAP\",\"type\":\"string\"},\"maintainer\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"name\":{\"example\":\"Pineapple Houser\",\"type\":\"string\"},\"raw\":{\"example\":\"<raw data>\",\"type\":\"string\"},\"source\":{\"example\":\"arin\",\"type\":\"string\"},\"tech\":{\"example\":\"POC object or null\",\"type\":\"string\"},\"updated\":{\"example\":\"2011-09-24\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"example\":100,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"WHOIS organization (ORG) ID response.\"}},\"security\":[{\"BasicAuth\":[]},{\"BearerAuth\":[]},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"query\",\"name\":\"token\",\"type\":\"apiKey\"},\"BasicAuth\":{\"scheme\":\"basic\",\"type\":\"http\"},\"BearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/whois/org/{whoisorgid}", "rename": { "param": { "whoisorgid": "id" } }, "segments": [{ "lit": "whois" }, { "lit": "org" }, { "var": "id" }], "select": { "exist": ["id", "page", "whoissource"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "whois_org", "name__orig": "whois_org", "Name": "WhoisOrg", "name_": "whois_org", "name-": "whois-org", "NAME": "WHOIS_ORG", "index$": 26 }, { "active": true, "entity": "whois_org", "key$": "BasicWhoisOrgFlow", "kind": "basic", "name": "BasicWhoisOrgFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "whois_org_ref01", "srcdatavar": "whois_org_ref01_data", "suffix": "_dt0" }, "match": { "id": "whois_org01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-whois_org_ref01" } }], "index$": 0 }] }, 'WhoisOrg');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let whois_org_ref01_data = Object.values(setup.data.existing.whois_org)[0];
        // LOAD
        const whois_org_ref01_ent = client.WhoisOrg();
        const whois_org_ref01_match_dt0 = {};
        whois_org_ref01_match_dt0.id = whois_org_ref01_data.id;
        const whois_org_ref01_data_dt0 = (await whois_org_ref01_ent.load(whois_org_ref01_match_dt0)).data();
        (0, node_assert_1.default)(whois_org_ref01_data_dt0.id === whois_org_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/whois_org/WhoisOrgTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['whois_org01', 'whois_org02', 'whois_org03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_WHOIS_ORG_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_WHOIS_ORG_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_WHOIS_ORG_ENTID'];
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
//# sourceMappingURL=WhoisOrgEntity.test.js.map