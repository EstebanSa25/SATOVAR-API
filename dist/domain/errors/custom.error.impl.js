"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorImpl = void 0;
const custom_error_1 = require("./custom.error");
const services_1 = require("../../presentation/services");
const entities_1 = require("../entities");
class CustomErrorImpl extends Error {
    logService = new services_1.LogService();
    originName = 'undefined';
    handleError = (error, res) => {
        if (error instanceof custom_error_1.CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        const log = new entities_1.LogEntity({
            message: `${error}`,
            level: entities_1.LogSeverityLevel.high,
            origin: this.originName,
        });
        this.logService.saveLog(log);
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    };
}
exports.CustomErrorImpl = CustomErrorImpl;
