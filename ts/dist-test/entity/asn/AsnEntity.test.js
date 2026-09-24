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
(0, node_test_1.describe)('AsnEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.Asn();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'asn.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "allocated": { "a": true, "h": "Allocated", "n": "allocated", "r": false, "t": "`$STRING`", "key$": "allocated", "index$": 0 }, "asn": { "a": true, "h": "Asn", "n": "asn", "r": true, "t": "`$STRING`", "key$": "asn", "index$": 1 }, "country": { "a": true, "h": "Country", "n": "country", "r": false, "t": "`$STRING`", "key$": "country", "index$": 2 }, "domain": { "a": true, "h": "Domain", "n": "domain", "r": true, "t": "`$STRING`", "key$": "domain", "index$": 3 }, "downstreams": { "a": true, "h": "Downstreams", "n": "downstreams", "r": false, "t": "`$ARRAY`", "key$": "downstreams", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 5 }, "num_ips": { "a": true, "h": "Num Ips", "n": "num_ips", "r": false, "t": "`$INTEGER`", "key$": "num_ips", "index$": 6 }, "peers": { "a": true, "h": "Peers", "n": "peers", "r": false, "t": "`$ARRAY`", "key$": "peers", "index$": 7 }, "prefixes": { "a": true, "h": "Prefixes", "n": "prefixes", "r": false, "t": "`$ARRAY`", "key$": "prefixes", "index$": 8 }, "prefixes6": { "a": true, "h": "Prefixes6", "n": "prefixes6", "r": false, "t": "`$ARRAY`", "key$": "prefixes6", "index$": 9 }, "registry": { "a": true, "h": "Registry", "n": "registry", "r": false, "t": "`$STRING`", "key$": "registry", "index$": 10 }, "route": { "a": true, "h": "Route", "n": "route", "r": false, "t": "`$STRING`", "key$": "route", "index$": 11 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "t": "`$STRING`", "key$": "type", "index$": 12 }, "upstreams": { "a": true, "h": "Upstreams", "n": "upstreams", "r": false, "t": "`$ARRAY`", "key$": "upstreams", "index$": 13 } }, "name": "asn", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /AS{asn}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "asn", "or": "asn", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/AS{asn}", "q": { "exist": ["asn"] }, "r": {}, "s": [{ "lit": "AS{asn}" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "asn", "name__orig": "asn", "Name": "Asn", "name_": "asn", "name-": "asn", "NAME": "ASN", "index$": 1 }, { "active": true, "entity": "asn", "key$": "BasicAsnFlow", "kind": "basic", "name": "BasicAsnFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "asn": "asn01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "asn_ref01" } }], "index$": 0 }] }, 'Asn', { "GET /AS{asn}": { "protocol": "http", "operationId": "getAsn", "responses": { "200": { "description": "ASN response object.", "content": { "application/json": { "schema": { "type": "object", "required": ["asn", "name", "domain", "type"], "properties": { "asn": { "example": "AS10507", "key$": "asn", "type": "string" }, "name": { "example": "Sprint Personal Communications Systems", "key$": "name", "type": "string" }, "country": { "example": "US", "key$": "country", "type": "string" }, "allocated": { "example": "1997-02-14", "key$": "allocated", "type": "string" }, "registry": { "example": "arin", "key$": "registry", "type": "string" }, "domain": { "example": "sprint.net", "key$": "domain", "type": "string" }, "num_ips": { "example": 71224576, "key$": "num_ips", "type": "integer" }, "route": { "example": "66.87.125.0/24", "key$": "route", "type": "string" }, "type": { "enum": ["isp", "business", "education", "hosting", "inactive"], "example": "isp", "key$": "type", "type": "string" }, "prefixes": { "items": { "properties": { "country": { "example": "US", "type": "string" }, "domain": { "example": "quadranet.com", "nullable": true, "type": "string" }, "id": { "example": "AKAMAI", "type": "string" }, "name": { "example": "Akamai Technologies, Inc.", "type": "string" }, "netblock": { "example": "104.69.216.0/22", "type": "string" }, "size": { "example": "256", "type": "string" }, "status": { "example": "ALLOCATION", "type": "string" } }, "required": ["netblock", "id", "name", "country"], "type": "object", "x-ref": "#/components/schemas/Prefix" }, "key$": "prefixes", "type": "array" }, "prefixes6": { "items": { "properties": { "country": { "example": "US", "type": "string" }, "domain": { "example": "comcast.com", "type": "string" }, "id": { "example": "COMCAST6NET", "type": "string" }, "name": { "example": "Comcast Cable Communications, LLC", "type": "string" }, "netblock": { "example": "2601::/20", "type": "string" }, "size": { "example": "20282409603651670423947251286016", "type": "string" }, "status": { "example": "ASSIGNMENT", "type": "string" } }, "required": ["netblock", "id", "name", "country"], "type": "object", "x-ref": "#/components/schemas/Prefix6" }, "key$": "prefixes6", "type": "array" }, "peers": { "items": { "example": "1299", "type": "string" }, "key$": "peers", "type": "array" }, "upstreams": { "items": { "example": "1299", "type": "string" }, "key$": "upstreams", "type": "array" }, "downstreams": { "items": { "example": "109", "type": "string" }, "key$": "downstreams", "type": "array" } }, "x-ref": "#/components/schemas/AsnResponse", "index$": 0 } } }, "x-ref": "#/components/responses/Asn" }, "403": { "description": "Unknown token or invalid permission. We return the same error for blocking malicious IP addresses as well.", "content": { "application/json": { "schema": { "type": "object", "required": ["title", "message"], "properties": { "title": { "type": "string", "example": "Unknown token" }, "message": { "type": "string", "example": "Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help" } }, "x-ref": "#/components/schemas/Error403" } } }, "x-ref": "#/components/responses/Forbidden" }, "404": { "description": "ASN not found.", "content": { "application/json": { "schema": { "type": "object", "required": ["error"], "properties": { "error": { "type": "string", "example": "ASN Not Found!" } }, "x-ref": "#/components/schemas/Error404ASN" } } }, "x-ref": "#/components/responses/NotFoundASN" }, "429": { "description": "Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.", "content": { "application/json": { "schema": { "type": "object", "required": ["title", "message"], "properties": { "title": { "type": "string", "example": "Rate limit exceeded" }, "message": { "type": "string", "example": "Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support" } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/TooManyRequests" }, "500": { "description": "Internal server error or server unavailable.", "content": { "text/plain": { "schema": { "type": "string", "example": "Internal server error", "x-ref": "#/components/schemas/Error500" } } }, "x-ref": "#/components/responses/InternalServerError" } }, "parameters": [{ "name": "asn", "in": "path", "description": "an ASN number.", "required": true, "schema": { "type": "integer" }, "x-ref": "#/components/parameters/Asn", "index$": 0 }], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let asn_ref01_data = Object.values(setup.data.existing.asn)[0];
        // LIST
        const asn_ref01_ent = client.Asn();
        const asn_ref01_match = {};
        asn_ref01_match['asn'] = setup.idmap['asn01'];
        const asn_ref01_list = (await asn_ref01_ent.list(asn_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/asn/AsnTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['asn01', 'asn02', 'asn03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_ASN_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_ASN_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_ASN_ENTID'];
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
//# sourceMappingURL=AsnEntity.test.js.map