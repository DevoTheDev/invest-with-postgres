import { Request, Response, NextFunction } from 'express';
import { logMessage } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log incoming request
  const startTime = Date.now();
  logMessage('inProgress', `${req.method} ${req.originalUrl}`, {
    timestamp: new Date().toISOString(),
    ip: req.ip,
  });

  // Capture response details
  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - startTime;
    const statusType = res.statusCode >= 400 ? 'error' : 'success';
    logMessage(statusType, `${req.method} ${req.originalUrl} - ${res.statusCode}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      // Optionally include body: body (be cautious with large payloads)
    });
    return originalSend.call(this, body);
  };

  next();
};