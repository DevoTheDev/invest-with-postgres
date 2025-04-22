import { Response, NextFunction } from "express";
import { Request } from "../types/express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { getSecret } from "../utils/GetSecret";

const userRepository = AppDataSource.getRepository(User);

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const JWT_SECRET = await getSecret('jwt_secret');

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid Authorization header." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = await userRepository.findOne({ where: { _id: Number(decoded.userId) } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
}