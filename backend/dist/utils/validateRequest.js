"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const logger_1 = require("./logger"); // Import the updated logger
const validateBody = (body, schema) => {
    const errors = [];
    for (const key in schema) {
        const value = body[key];
        const { required, type, description } = schema[key];
        if (required && value === undefined) {
            errors.push(`Missing required field '${key}'. Expected type: ${type}. Description: ${description}.`);
            continue;
        }
        if (value !== undefined && typeof value !== type) {
            errors.push(`Invalid type for '${key}'. Expected ${type}, but got ${typeof value}. Description: ${description}.`);
        }
    }
    return errors;
};
const validateHeaders = (headers, schema) => {
    const errors = [];
    for (const key in schema) {
        const value = headers[key.toLowerCase()];
        const { required, type, description } = schema[key];
        if (required && value === undefined) {
            errors.push(`Missing required header '${key}'. Expected type: ${type}. Description: ${description}.`);
            continue;
        }
        if (value !== undefined && typeof value !== type) {
            errors.push(`Invalid type for header '${key}'. Expected ${type}, but got ${typeof value}. Description: ${description}.`);
        }
    }
    return errors;
};
// Middleware to validate both body and headers
const validateRequest = (bodySchema, headerSchema) => {
    return (req, res, next) => {
        // Log the incoming request with neat formatting
        (0, logger_1.logMessage)("info", `Incoming request to ${req.method} ${req.originalUrl}`, {
            body: req.body,
            headers: req.headers
        });
        // Validate body
        const bodyErrors = validateBody(req.body, bodySchema);
        if (bodyErrors.length > 0) {
            // Log the error with detailed message
            const errorStack = new Error(bodyErrors.join(', ')).stack || 'No stack trace available';
            (0, logger_1.logMessage)("error", `Validation failed for body on route ${req.originalUrl}. Errors: ${bodyErrors.join(', ')}`, errorStack);
            return res.status(400).json({
                status: "error",
                message: "Invalid request body.",
                errors: bodyErrors,
            });
        }
        // Validate headers
        const headerErrors = validateHeaders(req.headers, headerSchema);
        if (headerErrors.length > 0) {
            // Log the error with detailed message
            const errorStack = new Error(headerErrors.join(', ')).stack || 'No stack trace available';
            (0, logger_1.logMessage)("error", `Validation failed for headers on route ${req.originalUrl}. Errors: ${headerErrors.join(', ')}`, errorStack);
            return res.status(400).json({
                status: "error",
                message: "Invalid request headers.",
                errors: headerErrors,
            });
        }
        // Log success if everything is fine
        (0, logger_1.logMessage)("success", `Validation passed for request on route ${req.originalUrl}.`);
        // Proceed to next middleware/route handler if validation passed
        next();
    };
};
exports.validateRequest = validateRequest;
