"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptData = exports.decryptData = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const envs_1 = require("./envs");
const decryptData = (encryptedData) => {
    try {
        const bytes = crypto_js_1.default.AES.decrypt(encryptedData, envs_1.envs.SECRET_API_KEY);
        const decryptedData = bytes.toString(crypto_js_1.default.enc.Utf8);
        const data = JSON.parse(decryptedData);
        const status = 'success';
        return { status, data };
    }
    catch (error) {
        return {
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};
exports.decryptData = decryptData;
const EncryptData = (data) => {
    return crypto_js_1.default.AES.encrypt(JSON.stringify(data), envs_1.envs.SECRET_API_KEY).toString();
};
exports.EncryptData = EncryptData;
