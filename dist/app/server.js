"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var serverConfig_1 = require("./serverConfig");
// const server = app.listen(serverConfig.port, () => {
//   console.log("server is running at " + serverConfig.port);
// });
var server = app_1.default.listen(serverConfig_1.default.port, function () {
    console.log("server is running at " + serverConfig_1.default.port);
});
module.exports = server;
// if(!module.parent) {
//   app.listen();
// }
//# sourceMappingURL=server.js.map