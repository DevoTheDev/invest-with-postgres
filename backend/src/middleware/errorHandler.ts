// src/middleware/errorHandler.ts
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
    console.error("🔥 ERROR:", err);

    const response = {
        status: "error",
        message: err.message || "An unexpected error occurred",
        statusCode: err.statusCode || 500,
        details: err.details || null,
        stack: process.env.NODE_ENV === "development" ? err.stack?.split("\n") : undefined,
    };

    return res.status(err.statusCode || 500).json(response);
};
