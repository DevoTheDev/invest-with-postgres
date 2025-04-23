import { Response, NextFunction } from "express";
import { Request } from "../types/express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { getSecret } from "../utils/GetSecret";
import { logMessage } from "../utils/logger";

const userRepository = AppDataSource.getRepository(User);

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const JWT_SECRET = await getSecret('jwt_secret');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logMessage('error', 'Missing or invalid Authorization header');
    res.status(401).json({ message: 'Missing or invalid Authorization header.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = await userRepository.findOne({ where: { _id: decoded.userId } });

    if (!user) {
      logMessage('error', `User not found for userId: ${decoded.userId}`);
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    req.user = user;
    next();
  } catch (err: any) {
    logMessage('error', `Authentication error: ${err.message}`, { stack: err.stack });
    res.status(401).json({ message: 'Invalid or expired token.' });
    return;
  }
}