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
(0, node_test_1.describe)('GeneralEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.General();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'general.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "8_8_8_8": { "a": true, "h": "8 8 8 8", "n": "8_8_8_8", "r": false, "t": "`$OBJECT`", "key$": "8_8_8_8", "index$": 0 }, "8_8_8_8city": { "a": true, "h": "8 8 8 8city", "n": "8_8_8_8city", "r": false, "t": "`$STRING`", "key$": "8_8_8_8city", "index$": 1 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": false, "t": "`$STRING`", "key$": "summary", "index$": 2 }, "value": { "a": true, "h": "Value", "n": "value", "r": false, "t": "`$OBJECT`", "key$": "value", "index$": 3 } }, "name": "general", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /tools/map", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "cli", "or": "cli", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/tools/map", "q": { "exist": ["cli"] }, "r": {}, "s": [{ "lit": "tools" }, { "lit": "map" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /tools/summarize-ips", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 1, "k": "query", "n": "cli", "or": "cli", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/tools/summarize-ips", "q": { "exist": ["cli"] }, "r": {}, "s": [{ "lit": "tools" }, { "lit": "summarize-ips" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /batch", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/batch", "q": {}, "r": {}, "s": [{ "lit": "batch" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "general", "name__orig": "general", "Name": "General", "name_": "general", "name-": "general", "NAME": "GENERAL", "index$": 6 }, { "active": true, "entity": "general", "key$": "BasicGeneralFlow", "kind": "basic", "name": "BasicGeneralFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "general_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'General', { "POST /tools/map": { "protocol": "http", "operationId": "map", "requestBody": { "description": "A file containing IP addresses with each IP on a separate line.", "required": true, "content": { "text/plain": { "schema": { "type": "string", "example": "46.95.248.61\n215.113.215.175\n27.7.158.28\n209.99.186.255\n192.40.165.85\n2a02:c7f:f8c4:ca00:356d:ac4c:954c:e46\n2001:16a2:9432:8126:2dbf:9aa0:8057:1246\n2600:8807:a788:7c00:c828:264:8dcf:b37f\n181.200.55.93\n77.222.8.184\n" } } }, "x-ref": "#/components/requestBodies/Map" }, "responses": { "200": { "description": "Map response object.", "content": { "application/json": { "schema": { "type": "object", "example": { "summary": "Example of mapping IP addresses", "value": { "status": "Report Generated", "reportUrl": "https://ipinfo.io/tools/map/40c04638-a340-44b8-90de-f95afdff99d8" } }, "index$": 0 } } }, "x-ref": "#/components/responses/Map" }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "example": "Rate limit exceeded. You can use the IP Map tool up to 5 times per day. Please wait 24 hours or use our IPinfo Lite API service" } } } } } } }, "parameters": [{ "name": "cli", "in": "query", "description": "CLI flag parameter", "required": false, "schema": { "type": "integer", "example": 1 }, "index$": 0 }], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } }, "POST /tools/summarize-ips": { "protocol": "http", "operationId": "summarize", "requestBody": { "description": "A file containing IP addresses with each IP on a separate line.", "required": true, "content": { "text/plain": { "schema": { "type": "string", "example": "42.77.204.9\n2a02:1811:1424:a200:a307:b776:645b:46b5\n84.74.205.0\n2601:19b:4980:2270:8869:1575:ffd0:5ba0\n2a01:e0a:a2d:fd70::8056:6278\n75.136.126.2\n2400:4052:244:a900:8b5:16e9:badb:a2bd\n104.103.81.185\n2603:7000:8d40:47d7:64fc:6:56cf:1b54\n216.211.59.51\n" } } }, "x-ref": "#/components/requestBodies/Summarize" }, "responses": { "200": { "description": "Summarize response object.", "content": { "application/json": { "schema": { "type": "object", "example": { "summary": "Example of summarizing IP addresses", "value": { "status": "Report Generated", "reportUrl": "https://ipinfo.io/tools/summarize-ips/3ea606f3-b3ad-4a37-a875-b897a0c2e718" } }, "index$": 0 } } }, "x-ref": "#/components/responses/Summarize" }, "422": { "description": "The input payload does not meet the specification.", "content": { "application/json": { "schema": { "type": "object", "required": ["title", "message"], "properties": { "title": { "type": "string", "example": "No IPs Found" }, "message": { "type": "string", "example": "There were no valid IPs in the text." } }, "x-ref": "#/components/schemas/Error422" } } }, "x-ref": "#/components/responses/UnprocessableEntity" }, "429": { "description": "Rate limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "example": "Rate limit exceeded. You can use the Summarize IPs tool up to 5 times per day. Please wait 24 hours or use our IPinfo Lite API service" } } } } } } }, "parameters": [{ "name": "cli", "in": "query", "description": "CLI flag parameter", "required": false, "schema": { "type": "integer", "example": 1 }, "index$": 0 }], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } }, "POST /batch": { "protocol": "http", "operationId": "batch", "requestBody": { "description": "A JSON array containing IP addresses.", "required": true, "content": { "application/json": { "schema": { "type": "array", "example": ["8.8.8.8/city", "8.8.8.8"], "index$": 1 } } }, "x-ref": "#/components/requestBodies/Batch" }, "responses": { "200": { "description": "Batch response object.", "content": { "application/json": { "schema": { "type": "object", "additionalProperties": { "type": "object" }, "example": { "8.8.8.8/city": "Mountain View", "8.8.8.8": { "ip": "8.8.8.8", "hostname": "dns.google", "city": "Mountain View", "region": "California", "country": "US", "loc": "37.4056,-122.0775", "org": "AS15169 Google LLC", "postal": 94043, "timezone": "America/Los_Angeles" } }, "index$": 0 } } }, "x-ref": "#/components/responses/Batch" } }, "parameters": [], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const general_ref01_ent = client.General();
        let general_ref01_data = setup.data.new.general['general_ref01'];
        general_ref01_data = (await general_ref01_ent.create(general_ref01_data)).data();
        (0, node_assert_1.default)(null != general_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/general/GeneralTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['general01', 'general02', 'general03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_GENERAL_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_GENERAL_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_GENERAL_ENTID'];
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
//# sourceMappingURL=GeneralEntity.test.js.map