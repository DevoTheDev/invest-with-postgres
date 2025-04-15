// src/utils/AppError.ts
export class AppError extends Error {
    statusCode: number;
    details?: any; // Store additional error details

    constructor(message: string, statusCode: number = 500, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;

        // Preserve stack trace (Only available in V8 engines)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
