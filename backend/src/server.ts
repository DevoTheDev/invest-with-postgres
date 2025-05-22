import express from "express";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user-routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { logMessage } from "./utils/logger";
import marketRoutes from './routes/market-routes/marketRoutes';
import alphaVantageRoutes from "./routes/market-routes/alphaVantageRoutes";
import polygonIoRoutes from "./routes/market-routes/polygonIoRoutes";
import secureKeysRoutes from "./routes/user-routes/secureKeysRoutes";
import profileRoutes from './routes/user-routes/profileRoutes';
import investorRoutes from "./routes/investor-routes/investorRoutes";
import exerciserRoutes from "./routes/exerciser-routes/exerciserRoutes";
import { requestLogger } from "./middleware/requestLogger";
import 'reflect-metadata';
import * as punycode from "punycode";


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(requestLogger);

// ✅ Test route to verify API connectivity
app.get("/api/ping", (_req, res) => {
    res.status(200).json({ message: "✅ API is live!" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/investors", investorRoutes);
app.use("/api/secure-keys", secureKeysRoutes);
app.use("/api/market",  marketRoutes);
app.use("/api/alpha-vantage", alphaVantageRoutes);
app.use("/api/polygon-io", polygonIoRoutes);
app.use("/api/exercisers", exerciserRoutes);

// ✅ Global Error Handler (after routes)
app.use(errorHandler);

// Start Server
AppDataSource.initialize()
    .then(() => {
        logMessage("success", `Server running on port ${PORT}`);
        app.listen(PORT, () => logMessage("inProgress", `🔥 Waiting for requests on port ${PORT}...`));
    })
    .catch((err) => {
        console.log(err);
    });
