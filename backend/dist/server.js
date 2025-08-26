"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const userRoutes_1 = __importDefault(require("./routes/user-routes/userRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./utils/logger");
const marketRoutes_1 = __importDefault(require("./routes/market-routes/marketRoutes"));
const alphaVantageRoutes_1 = __importDefault(require("./routes/market-routes/alphaVantageRoutes"));
const polygonIoRoutes_1 = __importDefault(require("./routes/market-routes/polygonIoRoutes"));
const secureKeysRoutes_1 = __importDefault(require("./routes/user-routes/secureKeysRoutes"));
const profileRoutes_1 = __importDefault(require("./routes/user-routes/profileRoutes"));
const investorRoutes_1 = __importDefault(require("./routes/investor-routes/investorRoutes"));
const exerciserRoutes_1 = __importDefault(require("./routes/exerciser-routes/exerciserRoutes"));
const requestLogger_1 = require("./middleware/requestLogger");
require("reflect-metadata");
// import programsRoutes from "../src/routes/exerciser-routes/programsRoutes";
const investmentsRoutes_1 = __importDefault(require("./routes/investor-routes/investmentsRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4004;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express_1.default.json());
app.use(requestLogger_1.requestLogger);
// ✅ Test route to verify API connectivity
app.get("/api/ping", (_req, res) => {
    res.status(200).json({ message: "✅ API is live!" });
});
// Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/profiles", profileRoutes_1.default);
app.use("/api/secure-keys", secureKeysRoutes_1.default);
app.use("/api/investors", investorRoutes_1.default);
app.use("/api/investors/investments", investmentsRoutes_1.default);
app.use("/api/market", marketRoutes_1.default);
app.use("/api/alpha-vantage", alphaVantageRoutes_1.default);
app.use("/api/polygon-io", polygonIoRoutes_1.default);
app.use("/api/exercisers", exerciserRoutes_1.default);
// app.use("/api/exercisers/programs", programsRoutes);
// ✅ Global Error Handler (after routes)
app.use(errorHandler_1.errorHandler);
// Start Server
data_source_1.AppDataSource.initialize()
    .then(() => {
    (0, logger_1.logMessage)("success", `Server running on port ${PORT}`);
    app.listen(PORT, () => (0, logger_1.logMessage)("inProgress", `🔥 Waiting for requests on port ${PORT}...`));
})
    .catch((err) => {
    console.log(err);
});
