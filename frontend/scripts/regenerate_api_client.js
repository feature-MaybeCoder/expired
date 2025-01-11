"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var openapi_ts_1 = require("@hey-api/openapi-ts");
var axios_1 = require("axios");
try {
    var response = await axios_1.default.get("http://0.0.0.0:8010/openapi.json");
    var openapi = response.data;
    await (0, openapi_ts_1.createClient)({
        client: "@hey-api/client-fetch",
        input: openapi,
        output: "./src/api"
    });
}
catch (error) {
    console.log(error);
}
