// src/routes/polygonIoRoutes.ts
import { Router } from "express";
import { getTickers, getTickerOverview } from "../services/Polygon.io";

const router = Router();

router.get('/allTickers', getTickers);
router.get('/tickerOverview', getTickerOverview);

export default router;
