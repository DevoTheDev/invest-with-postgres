"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("../utils/logger");
const requestLogger = (req, res, next) => {
    // Log incoming request
    const startTime = Date.now();
    (0, logger_1.logMessage)('inProgress', `${req.method} ${req.originalUrl}`, {
        timestamp: new Date().toISOString(),
        ip: req.ip,
    });
    // Capture response details
    const originalSend = res.send;
    res.send = function (body) {
        const duration = Date.now() - startTime;
        const statusType = res.statusCode >= 400 ? 'error' : 'success';
        (0, logger_1.logMessage)(statusType, `${req.method} ${req.originalUrl} - ${res.statusCode}`, {
            statusCode: res.statusCode,
            duration: `${duration}ms`,
            // Optionally include body: body (be cautious with large payloads)
        });
        return originalSend.call(this, body);
    };
    next();
};
exports.requestLogger = requestLogger;
