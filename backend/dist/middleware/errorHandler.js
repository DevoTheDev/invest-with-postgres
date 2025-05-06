"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    var _a;
    console.error("🔥 ERROR:", err);
    const response = {
        status: "error",
        message: err.message || "An unexpected error occurred",
        statusCode: err.statusCode || 500,
        details: err.details || null,
        stack: process.env.NODE_ENV === "development" ? (_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n") : undefined,
    };
    return res.status(err.statusCode || 500).json(response);
};
exports.errorHandler = errorHandler;
