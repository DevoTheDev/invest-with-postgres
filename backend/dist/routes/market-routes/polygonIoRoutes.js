"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/polygonIoRoutes.ts
const express_1 = require("express");
const Polygon_io_1 = require("../../services/Polygon.io");
const router = (0, express_1.Router)();
router.get('/allTickers', Polygon_io_1.getTickers);
router.get('/tickerOverview', Polygon_io_1.getTickerOverview);
exports.default = router;
