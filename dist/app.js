"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envs_1 = require("./config/envs");
const routes_1 = require("./presentation/routes");
const server_1 = require("./presentation/server");
(async () => {
    main();
})();
function main() {
    const server = new server_1.Server({
        port: envs_1.envs.PORT,
        routes: routes_1.AppRoutes.routes,
    });
    server.start();
}
