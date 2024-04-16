"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString(),
    WEBSERVICE_URL: (0, env_var_1.get)('WEBSERVICE_URL').required().asUrlString(),
    MAILER_SERVICE: (0, env_var_1.get)('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: (0, env_var_1.get)('MAILER_SECRET_KEY').required().asString(),
    SEND_EMAIL: (0, env_var_1.get)('SEND_EMAIL').required().asBool(),
    DATABASE_URL: (0, env_var_1.get)('DATABASE_URL').required().asUrlString(),
    SECRET_API_KEY: (0, env_var_1.get)('SECRET_API_KEY').required().asString(),
    REACT_URL: (0, env_var_1.get)('REACT_URL').required().asUrlString(),
};
