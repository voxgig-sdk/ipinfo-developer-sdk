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
(0, node_test_1.describe)('MenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IPINFO_DEVELOPER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IPINFO_DEVELOPER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IpinfoDeveloperSDK.test();
        const ent = testsdk.Men();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IPINFO_DEVELOPER_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'men.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "features": { "a": true, "h": "Features", "n": "features", "r": true, "t": "`$OBJECT`", "key$": "features", "index$": 0 }, "requests": { "a": true, "h": "Requests", "n": "requests", "r": true, "t": "`$OBJECT`", "key$": "requests", "index$": 1 }, "token": { "a": true, "h": "Token", "n": "token", "r": true, "t": "`$STRING`", "key$": "token", "index$": 2 } }, "name": "men", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /me", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/me", "q": {}, "r": {}, "s": [{ "lit": "me" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "men", "name__orig": "men", "Name": "Men", "name_": "men", "name-": "men", "NAME": "MEN", "index$": 14 }, { "active": true, "entity": "men", "key$": "BasicMenFlow", "kind": "basic", "name": "BasicMenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "men_ref01", "srcdatavar": "men_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-men_ref01" } }], "index$": 0 }] }, 'Men', { "GET /me": { "protocol": "http", "operationId": "getMe", "responses": { "200": { "description": "IPinfo access token rate and access information.", "content": { "application/json": { "schema": { "type": "object", "required": ["token", "requests", "features"], "properties": { "token": { "example": "TOKEN", "key$": "token", "type": "string" }, "requests": { "key$": "requests", "properties": { "day": { "example": 0, "type": "integer" }, "limit": { "example": 50000, "type": "integer" }, "month": { "example": 69, "type": "integer" }, "remaining": { "example": 2147483578, "type": "integer" } }, "type": "object" }, "features": { "key$": "features", "properties": { "core": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" } }, "type": "object" }, "hostio": { "properties": { "abuse": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" } }, "type": "object" }, "asn": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" } }, "type": "object" }, "carrier": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" } }, "type": "object" }, "company": { "properties": { "daily": { "example": 50000, "type": "integer" }, "firmographics": { "example": false, "type": "boolean" }, "monthly": { "example": 50000, "type": "integer" }, "org_additional": { "example": false, "type": "boolean" } }, "type": "object" }, "daily": { "example": 50000, "type": "integer" }, "hosted_domains": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" }, "result_limit": { "example": 5, "type": "integer" } }, "type": "object" }, "monthly": { "example": 50000, "type": "integer" }, "privacy": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" }, "vpn_provider": { "example": false, "type": "boolean" } }, "type": "object" }, "ranges": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" } }, "type": "object" }, "result_limit": { "example": 5, "type": "integer" }, "whois": { "properties": { "daily": { "example": 50000, "type": "integer" }, "monthly": { "example": 50000, "type": "integer" } }, "type": "object" } }, "type": "object" } }, "type": "object" } }, "x-ref": "#/components/schemas/MeResponse", "index$": 0 } } }, "x-ref": "#/components/responses/Me" }, "400": { "description": "If the passed IPinfo access token is not present or is invalid.", "content": { "application/json": { "schema": { "type": "object", "required": ["error"], "properties": { "error": { "type": "string", "example": "Invalid API token" }, "token": { "type": "string", "example": "TOKEN" } }, "x-ref": "#/components/schemas/Error400Me" } } }, "x-ref": "#/components/responses/BadRequestMe" }, "500": { "description": "Internal server error or server unavailable.", "content": { "text/plain": { "schema": { "type": "string", "example": "Internal server error", "x-ref": "#/components/schemas/Error500" } } }, "x-ref": "#/components/responses/InternalServerError" } }, "parameters": [], "security": [{ "BasicAuth": [] }, { "BearerAuth": [] }, { "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "BasicAuth": { "type": "http", "scheme": "basic" }, "BearerAuth": { "type": "http", "scheme": "bearer" }, "ApiKeyAuth": { "type": "apiKey", "in": "query", "name": "token" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let men_ref01_data = Object.values(setup.data.existing.men)[0];
        // LOAD
        const men_ref01_ent = client.Men();
        const men_ref01_match_dt0 = {};
        const men_ref01_data_dt0 = (await men_ref01_ent.load(men_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != men_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/men/MenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IpinfoDeveloperSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['men01', 'men02', 'men03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IPINFO_DEVELOPER_TEST_MEN_ENTID': idmap,
        'IPINFO_DEVELOPER_TEST_LIVE': 'FALSE',
        'IPINFO_DEVELOPER_TEST_EXPLAIN': 'FALSE',
        'IPINFO_DEVELOPER_APIKEY': '',
        'IPINFO_DEVELOPER_SECRET': '',
    });
    idmap = env['IPINFO_DEVELOPER_TEST_MEN_ENTID'];
    const live = 'TRUE' === env.IPINFO_DEVELOPER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IPINFO_DEVELOPER_TEST_MEN_ENTID'];
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
//# sourceMappingURL=MenEntity.test.js.map