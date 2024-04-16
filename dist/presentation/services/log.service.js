"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const fs_1 = __importDefault(require("fs"));
const log_entity_1 = require("../../domain/entities/log.entity");
class LogService {
    logPath = 'logs/';
    allLogsPath = 'logs/logs-all.log';
    mediumLogsPath = 'logs/logs-medium.log';
    highLogsPath = 'logs/logs-high.log';
    constructor() {
        this.createLogsFiles();
    }
    createLogsFiles = () => {
        if (!fs_1.default.existsSync(this.logPath)) {
            fs_1.default.mkdirSync(this.logPath);
        }
        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach((path) => {
            if (fs_1.default.existsSync(path))
                return;
            fs_1.default.writeFileSync(path, '');
        });
    };
    async saveLog(newLog) {
        const logAsJson = `${JSON.stringify(newLog)}\n`;
        fs_1.default.appendFileSync(this.allLogsPath, logAsJson);
        if (newLog.level === log_entity_1.LogSeverityLevel.low)
            return;
        if (newLog.level === log_entity_1.LogSeverityLevel.medium) {
            fs_1.default.appendFileSync(this.mediumLogsPath, logAsJson);
        }
        else {
            fs_1.default.appendFileSync(this.highLogsPath, logAsJson);
        }
    }
    getLogsFromFile = (path) => {
        const content = fs_1.default.readFileSync(path, 'utf-8');
        if (content === '')
            return [];
        const logs = content.split('\n').map(log_entity_1.LogEntity.fromJson);
        // const logs = content.split('\n').map(
        //   log => LogEntity.fromJson(log)
        // );
        return logs;
    };
    async getLogs(severityLevel) {
        switch (severityLevel) {
            case log_entity_1.LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case log_entity_1.LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case log_entity_1.LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel} not implemented`);
        }
    }
}
exports.LogService = LogService;
