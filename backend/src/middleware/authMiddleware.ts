// middleware/authMiddleware.ts
import { Response, NextFunction } from "express";
import { Request } from "../types/express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entities/investor-entities/User";

const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid Authorization header." });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Authentication error:", err);
      res.status(401).json({ message: "Invalid or expired token." });
      return;
    }

    const decodedPayload = decoded as { userId: string };
    const userId = parseInt(decodedPayload.userId, 10);

    userRepository
      .findOne({ where: { _id: userId } })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "User not found." });
          return;
        }

        req.user = user;
        next();
      })
      .catch((dbErr) => {
        console.error("Database error:", dbErr);
        res.status(500).json({ message: "Internal server error." });
      });
  });
}