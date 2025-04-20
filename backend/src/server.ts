import express from "express";
import "reflect-metadata";
import cors from "cors";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { logMessage } from "./utils/logger";
import marketRoutes from './routes/marketRoutes';
import alphaVantageRoutes from "./routes/alphaVantageRoutes";
import polygonIoRoutes from "./routes/polygonIoRoutes";
import secureKeysRoutes from "./routes/secureKeysRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/secure-keys", secureKeysRoutes);
app.use("/api/market",  marketRoutes);
app.use("/api/alpha-vantage", alphaVantageRoutes);
app.use("/api/polygon-io", polygonIoRoutes);


// ✅ Global Error Handler (after routes)
app.use(errorHandler);

// Start Server
AppDataSource.initialize()
    .then(() => {
        logMessage("success", `Server running on port ${PORT}`);
        app.listen(PORT, () => logMessage("inProgress", `🔥 Waiting for requests on port ${PORT}...`));
    })
    .catch((err) => {
        logMessage("error", "DB Connection Error: " + err.message);
    });
