// types/express/index.d.ts
import { User } from "../../entities/investor-entities/User";
import * as Express from "express";

  export interface Request extends Express.Request {
    user?: User;
  }