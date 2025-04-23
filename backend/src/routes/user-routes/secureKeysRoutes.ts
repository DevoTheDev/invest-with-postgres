// backend/src/routes/apiKey.ts
import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { AppDataSource } from "../../data-source";
import { Secret } from "../../entities/Secret";

const router = express.Router();
const secretRepository = AppDataSource.getRepository(Secret);

const getSecretKey = async (key_name: string, res: express.Response) => {
    try {
        const keyRecord = await secretRepository.findOne({ where: { key_name } });
        if (!keyRecord) {
            return res.status(404).json({ error: "API key not found" });
        }
        return res.json({ apiKey: keyRecord.key_value });
    } catch (error) {
        console.error(`Error fetching ${key_name}:`, error);
        return res.status(500).json({ error: "Server error" });
    }
};

router.get("/alpha-vantage", authMiddleware, (req, res): Promise<any> =>
    getSecretKey("alpha_vantage_key", res)
);

router.get("/polygon-io", authMiddleware, (req, res): Promise<any> =>
    getSecretKey("polygon_io_key", res)
);

router.get("/jwt-secret", authMiddleware, (req, res): Promise<any> =>
    getSecretKey("jwt_secret", res)
);

export default router;
