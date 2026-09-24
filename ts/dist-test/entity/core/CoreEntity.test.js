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
(0, node_test_1.describe)('CoreEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.Core();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'core.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "as": { "a": true, "h": "As", "n": "as", "r": false, "t": "`$OBJECT`", "key$": "as", "index$": 0 }, "geo": { "a": true, "h": "Geo", "n": "geo", "r": false, "t": "`$OBJECT`", "key$": "geo", "index$": 1 }, "hostname": { "a": true, "h": "Hostname", "n": "hostname", "r": false, "t": "`$STRING`", "key$": "hostname", "index$": 2 }, "ip": { "a": true, "h": "Ip", "n": "ip", "r": true, "t": "`$STRING`", "key$": "ip", "index$": 3 }, "is_anonymous": { "a": true, "h": "Is Anonymous", "n": "is_anonymous", "r": false, "t": "`$BOOLEAN`", "key$": "is_anonymous", "index$": 4 }, "is_anycast": { "a": true, "h": "Is Anycast", "n": "is_anycast", "r": false, "t": "`$BOOLEAN`", "key$": "is_anycast", "index$": 5 }, "is_hosting": { "a": true, "h": "Is Hosting", "n": "is_hosting", "r": false, "t": "`$BOOLEAN`", "key$": "is_hosting", "index$": 6 }, "is_mobile": { "a": true, "h": "Is Mobile", "n": "is_mobile", "r": false, "t": "`$BOOLEAN`", "key$": "is_mobile", "index$": 7 }, "is_satellite": { "a": true, "h": "Is Satellite", "n": "is_satellite", "r": false, "t": "`$BOOLEAN`", "key$": "is_satellite", "index$": 8 } }, "name": "core", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /lookup/{ip}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "ip", "or": "ip", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/lookup/{ip}", "q": { "exist": ["ip"] }, "r": {}, "s": [{ "lit": "lookup" }, { "var": "ip" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /lookup/me", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/lookup/me", "q": {}, "r": {}, "s": [{ "lit": "lookup" }, { "lit": "me" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "core", "name__orig": "core", "Name": "Core", "name_": "core", "name-": "core", "NAME": "CORE", "index$": 4 }, { "active": true, "entity": "core", "key$": "BasicCoreFlow", "kind": "basic", "name": "BasicCoreFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "core_ref01", "srcdatavar": "core_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-core_ref01" } }], "index$": 0 }] }, 'Core', { "GET /lookup/{ip}": { "protocol": "http", "operationId": "getCoreInformationByIp", "responses": { "200": { "description": "Core response object.", "content": { "application/json": { "schema": { "type": "object", "required": ["ip"], "properties": { "ip": { "example": "8.8.8.8", "key$": "ip", "type": "string" }, "hostname": { "example": "dns.google", "key$": "hostname", "type": "string" }, "geo": { "key$": "geo", "properties": { "city": { "example": "Mountain View", "type": "string" }, "continent": { "example": "North America", "type": "string" }, "continent_code": { "example": "NA", "type": "string" }, "country": { "example": "United States", "type": "string" }, "country_code": { "example": "US", "type": "string" }, "latitude": { "example": 37.4056, "type": "number" }, "longitude": { "example": -122.0775, "type": "number" }, "postal_code": { "example": "94043", "type": "string" }, "region": { "example": "California", "type": "string" }, "region_code": { "example": "CA", "type": "string" }, "timezone": { "example": "America/Los_Angeles", "type": "string" } }, "type": "object" }, "as": { "key$": "as", "properties": { "asn": { "example": "AS15169", "type": "string" }, "domain": { "example": "google.com", "type": "string" }, "name": { "example": "Google LLC", "type": "string" }, "type": { "example": "hosting", "type": "string" } }, "type": "object" }, "is_anonymous": { "example": false, "key$": "is_anonymous", "type": "boolean" }, "is_anycast": { "example": true, "key$": "is_anycast", "type": "boolean" }, "is_hosting": { "example": true, "key$": "is_hosting", "type": "boolean" }, "is_mobile": { "example": false, "key$": "is_mobile", "type": "boolean" }, "is_satellite": { "example": false, "key$": "is_satellite", "type": "boolean" } }, "x-ref": "#/components/schemas/CoreResponse", "index$": 0 } } }, "x-ref": "#/components/responses/CoreResponse" }, "400": { "description": "Bad request error (invalid IP format).", "content": { "application/json": { "schema": { "type": "object", "required": ["error"], "properties": { "error": { "type": "string", "example": "Please provide a valid IP address" } }, "x-ref": "#/components/schemas/CoreErrorBadRequest" } } }, "x-ref": "#/components/responses/CoreBadRequest" }, "403": { "description": "Forbidden error (authentication issues).", "content": { "application/json": { "schema": { "type": "object", "required": ["status", "error"], "properties": { "status": { "type": "integer", "example": 403 }, "error": { "type": "object", "required": ["title", "message"], "properties": { "title": { "type": "string", "example": "Unknown token" }, "message": { "type": "string", "example": "Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help" } } } }, "x-ref": "#/components/schemas/CoreErrorForbidden" } } }, "x-ref": "#/components/responses/CoreForbidden" }, "429": { "description": "Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.", "content": { "application/json": { "schema": { "type": "object", "required": ["title", "message"], "properties": { "title": { "type": "string", "example": "Rate limit exceeded" }, "message": { "type": "string", "example": "Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support" } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/TooManyRequests" }, "500": { "description": "Internal server error or server unavailable.", "content": { "text/plain": { "schema": { "type": "string", "example": "Internal server error", "x-ref": "#/components/schemas/Error500" } } }, "x-ref": "#/components/responses/InternalServerError" } }, "parameters": [{ "name": "ip", "in": "path", "description": "A single IPv4 or IPv6 IP address.", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Ip", "index$": 0 }], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } }, "GET /lookup/me": { "protocol": "http", "operationId": "getCurrentCoreInformation", "responses": { "200": { "description": "Core response object.", "content": { "application/json": { "schema": { "type": "object", "required": ["ip"], "properties": { "ip": { "example": "8.8.8.8", "key$": "ip", "type": "string" }, "hostname": { "example": "dns.google", "key$": "hostname", "type": "string" }, "geo": { "key$": "geo", "properties": { "city": { "example": "Mountain View", "type": "string" }, "continent": { "example": "North America", "type": "string" }, "continent_code": { "example": "NA", "type": "string" }, "country": { "example": "United States", "type": "string" }, "country_code": { "example": "US", "type": "string" }, "latitude": { "example": 37.4056, "type": "number" }, "longitude": { "example": -122.0775, "type": "number" }, "postal_code": { "example": "94043", "type": "string" }, "region": { "example": "California", "type": "string" }, "region_code": { "example": "CA", "type": "string" }, "timezone": { "example": "America/Los_Angeles", "type": "string" } }, "type": "object" }, "as": { "key$": "as", "properties": { "asn": { "example": "AS15169", "type": "string" }, "domain": { "example": "google.com", "type": "string" }, "name": { "example": "Google LLC", "type": "string" }, "type": { "example": "hosting", "type": "string" } }, "type": "object" }, "is_anonymous": { "example": false, "key$": "is_anonymous", "type": "boolean" }, "is_anycast": { "example": true, "key$": "is_anycast", "type": "boolean" }, "is_hosting": { "example": true, "key$": "is_hosting", "type": "boolean" }, "is_mobile": { "example": false, "key$": "is_mobile", "type": "boolean" }, "is_satellite": { "example": false, "key$": "is_satellite", "type": "boolean" } }, "x-ref": "#/components/schemas/CoreResponse", "index$": 0 } } }, "x-ref": "#/components/responses/CoreResponse" }, "403": { "description": "Forbidden error (authentication issues).", "content": { "application/json": { "schema": { "type": "object", "required": ["status", "error"], "properties": { "status": { "type": "integer", "example": 403 }, "error": { "type": "object", "required": ["title", "message"], "properties": { "title": { "type": "string", "example": "Unknown token" }, "message": { "type": "string", "example": "Please ensure you've entered your token correctly. Refer to https://ipinfo.io/developers for details, or contact us at support@ipinfo.io for help" } } } }, "x-ref": "#/components/schemas/CoreErrorForbidden" } } }, "x-ref": "#/components/responses/CoreForbidden" }, "429": { "description": "Allocated API rate limit has been reached for the token. The user will be prompted with options to increase their API limit.", "content": { "application/json": { "schema": { "type": "object", "required": ["title", "message"], "properties": { "title": { "type": "string", "example": "Rate limit exceeded" }, "message": { "type": "string", "example": "Upgrade to increase your usage limits at https://ipinfo.io/pricing, or contact us via https://ipinfo.io/support" } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/TooManyRequests" }, "500": { "description": "Internal server error or server unavailable.", "content": { "text/plain": { "schema": { "type": "string", "example": "Internal server error", "x-ref": "#/components/schemas/Error500" } } }, "x-ref": "#/components/responses/InternalServerError" } }, "parameters": [], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let core_ref01_data = Object.values(setup.data.existing.core)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const core_ref01_ent = client.Core();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/core/CoreTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['core01', 'core02', 'core03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_CORE_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_CORE_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_CORE_ENTID'];
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
//# sourceMappingURL=CoreEntity.test.js.map