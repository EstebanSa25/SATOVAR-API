"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntity = exports.LogSeverityLevel = void 0;
var LogSeverityLevel;
(function (LogSeverityLevel) {
    LogSeverityLevel["low"] = "low";
    LogSeverityLevel["medium"] = "medium";
    LogSeverityLevel["high"] = "high";
})(LogSeverityLevel || (exports.LogSeverityLevel = LogSeverityLevel = {}));
class LogEntity {
    level; // Enum
    message;
    createdAt;
    origin;
    constructor(options) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }
    //"{ "level": "high", "message":"Hola Mundo", "createdAt":"128937TZ12378123" }"
    static fromJson = (json) => {
        json = json === '' ? '{}' : json;
        const { message, level, createdAt, origin } = JSON.parse(json);
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });
        return log;
    };
    static fromObject = (object) => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        });
        return log;
    };
}
exports.LogEntity = LogEntity;
