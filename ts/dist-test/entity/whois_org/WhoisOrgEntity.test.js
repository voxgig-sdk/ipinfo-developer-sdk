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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "org": { "a": true, "h": "Org", "n": "org", "r": false, "t": "`$STRING`", "key$": "org", "index$": 1 }, "page": { "a": true, "h": "Page", "n": "page", "r": false, "t": "`$INTEGER`", "key$": "page", "index$": 2 }, "records": { "a": true, "h": "Records", "n": "records", "r": false, "t": "`$ARRAY`", "key$": "records", "index$": 3 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "t": "`$INTEGER`", "key$": "total", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "whois_org", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /whois/org/{whoisorgid}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "whoisorgid", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "whoissource", "or": "whoissource", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/whois/org/{whoisorgid}", "q": { "exist": ["id", "page", "whoissource"] }, "r": { "param": { "whoisorgid": "id" } }, "s": [{ "lit": "whois" }, { "lit": "org" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "whois_org", "name__orig": "whois_org", "Name": "WhoisOrg", "name_": "whois_org", "name-": "whois-org", "NAME": "WHOIS_ORG", "index$": 26 }, { "active": true, "entity": "whois_org", "key$": "BasicWhoisOrgFlow", "kind": "basic", "name": "BasicWhoisOrgFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "whois_org_ref01", "srcdatavar": "whois_org_ref01_data", "suffix": "_dt0" }, "m": { "id": "whois_org01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-whois_org_ref01" } }], "index$": 0 }] }, 'WhoisOrg', { "GET /whois/org/{whoisorgid}": { "protocol": "http", "responses": { "200": { "description": "WHOIS organization (ORG) ID response.", "content": { "application/json": { "schema": { "type": "object", "properties": { "org": { "type": "string", "example": "PINEAP", "key$": "org" }, "total": { "type": "integer", "example": 100, "key$": "total" }, "page": { "type": "integer", "example": 0, "key$": "page" }, "records": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "string", "example": "PINEAP" }, "name": { "type": "string", "example": "Pineapple Houser" }, "address": { "type": "string", "example": null }, "country": { "type": "string", "example": "US" }, "admin": { "type": "string", "example": "POC object or null" }, "abuse": { "type": "string", "example": "POC object or null" }, "tech": { "type": "string", "example": "POC object or null" }, "maintainer": { "type": "string", "example": "POC object or null" }, "created": { "type": "string", "format": "date", "example": "2000-03-25" }, "updated": { "type": "string", "format": "date", "example": "2011-09-24" }, "source": { "type": "string", "example": "arin" }, "raw": { "type": "string", "example": "<raw data>" } } }, "key$": "records" } }, "example": { "org": "PINEAP", "total": 100, "page": 0, "records": [{ "id": "PINEAP", "name": "Pineapple Houser", "address": null, "country": "US", "admin": "POC object or null", "abuse": "POC object or null", "tech": "POC object or null", "maintainer": "POC object or null", "created": "2000-03-25", "updated": "2011-09-24", "source": "arin", "raw": "<raw data>" }] }, "x-ref": "#/components/schemas/WhoisOrgResponse", "index$": 0 } } }, "x-ref": "#/components/responses/WhoisOrg" } }, "parameters": [{ "name": "whoisorgid", "in": "path", "description": "The WHOIS organization (ORG) ID of an internet organization.", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Whoisorgid", "index$": 0 }, { "name": "page", "in": "query", "description": "The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.", "schema": { "type": "integer", "minimum": 0 }, "x-ref": "#/components/parameters/Page", "index$": 1 }, { "name": "whoissource", "in": "query", "description": "Source query parameter to filter records by provided Whois source.", "schema": { "type": "string", "enum": ["arin", "ripe", "afrinic", "apnic", "lacnic"] }, "x-ref": "#/components/parameters/Whoissource", "index$": 2 }], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } } });
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