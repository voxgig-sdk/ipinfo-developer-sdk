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
(0, node_test_1.describe)('WhoisIpEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.WhoisIp();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'whois_ip.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "net": { "a": true, "h": "Net", "n": "net", "r": false, "t": "`$STRING`", "key$": "net", "index$": 0 }, "page": { "a": true, "h": "Page", "n": "page", "r": false, "t": "`$INTEGER`", "key$": "page", "index$": 1 }, "records": { "a": true, "h": "Records", "n": "records", "r": false, "t": "`$ARRAY`", "key$": "records", "index$": 2 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "t": "`$INTEGER`", "key$": "total", "index$": 3 } }, "name": "whois_ip", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /whois/net/{whoisip}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "whoisip", "or": "whoisip", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "whoissource", "or": "whoissource", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/whois/net/{whoisip}", "q": { "exist": ["page", "whoisip", "whoissource"] }, "r": {}, "s": [{ "lit": "whois" }, { "lit": "net" }, { "var": "whoisip" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "whois_ip", "name__orig": "whois_ip", "Name": "WhoisIp", "name_": "whois_ip", "name-": "whois-ip", "NAME": "WHOIS_IP", "index$": 24 }, { "active": true, "entity": "whois_ip", "key$": "BasicWhoisIpFlow", "kind": "basic", "name": "BasicWhoisIpFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "whois_ip_ref01", "srcdatavar": "whois_ip_ref01_data", "suffix": "_dt0" }, "m": { "id": "whois_ip01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-whois_ip_ref01" } }], "index$": 0 }] }, 'WhoisIp', { "GET /whois/net/{whoisip}": { "protocol": "http", "responses": { "200": { "description": "WHOIS IP  and IP range response.", "content": { "application/json": { "schema": { "type": "object", "properties": { "net": { "type": "string", "example": "24.62.0.0/15", "key$": "net" }, "total": { "type": "integer", "example": 100, "key$": "total" }, "page": { "type": "integer", "example": 0, "key$": "page" }, "records": { "type": "array", "items": { "type": "object", "properties": { "range": { "type": "string", "example": "24.62.0.0/15" }, "id": { "type": "string", "example": "NEW-ENGLAND-5" }, "name": { "type": "string", "example": "Comcast Cable Communications Holdings, Inc" }, "country": { "type": "string", "example": "US" }, "org": { "type": "string", "example": "C02610695" }, "updated": { "type": "string", "format": "date", "example": "2010-10-18" }, "status": { "type": "string", "example": "REASSIGNMENT" }, "source": { "type": "string", "example": "arin" }, "raw": { "type": "string", "example": "<raw data>" } } }, "key$": "records" } }, "example": { "net": "24.62.0.0/15", "total": 100, "page": 0, "records": [{ "range": "24.62.0.0/15", "id": "NEW-ENGLAND-5", "name": "Comcast Cable Communications Holdings, Inc", "country": "US", "org": "C02610695", "updated": "2010-10-18", "status": "REASSIGNMENT", "source": "arin", "raw": "<raw data>" }] }, "x-ref": "#/components/schemas/WhoisIpResponse", "index$": 0 } } }, "x-ref": "#/components/responses/WhoisIp" } }, "parameters": [{ "name": "whoisip", "in": "path", "description": "The IP address or an IP address range of an internet organization.", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Whoisip", "index$": 0 }, { "name": "page", "in": "query", "description": "The page query parameter can be used to go through paginated records. page starts at 0 and the parameter is part of the response when included in request.", "schema": { "type": "integer", "minimum": 0 }, "x-ref": "#/components/parameters/Page", "index$": 1 }, { "name": "whoissource", "in": "query", "description": "Source query parameter to filter records by provided Whois source.", "schema": { "type": "string", "enum": ["arin", "ripe", "afrinic", "apnic", "lacnic"] }, "x-ref": "#/components/parameters/Whoissource", "index$": 2 }], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let whois_ip_ref01_data = Object.values(setup.data.existing.whois_ip)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const whois_ip_ref01_ent = client.WhoisIp();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/whois_ip/WhoisIpTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['whois_ip01', 'whois_ip02', 'whois_ip03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_WHOIS_IP_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_WHOIS_IP_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_WHOIS_IP_ENTID'];
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
//# sourceMappingURL=WhoisIpEntity.test.js.map