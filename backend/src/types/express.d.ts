// types/express.d.ts
import { User } from "../entities/investor-entities/User"; // Adjust path to match your project structure

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Optional, set by authMiddleware
  }
}