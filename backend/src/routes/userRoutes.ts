// usersRoutes.ts (updated)
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/investor-entities/User";
import { AppDataSource } from "../data-source";
import { Portfolio } from "../entities/investor-entities/Portfolio";
import { Watchlist } from "../entities/investor-entities/Watchlist";

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);
const portfolioRepository = AppDataSource.getRepository(Portfolio);
const watchlistRepository = AppDataSource.getRepository(Watchlist);

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ------------------------- REGISTER -------------------------
router.post("/register", async (req, res): Promise<any> => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Email and password are required and must be strings." });
        }

        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create({
            email,
            password: hashedPassword,
            firstName: firstName || "",
            lastName: lastName || "",
            accountBalance: 0.00,
            isActive: true,
        });

        await userRepository.save(newUser);

        const defaultPortfolio = portfolioRepository.create({
            name: `${firstName || "My"} Portfolio`,
            user: newUser,
        });

        const defaultWatchlist = watchlistRepository.create({
            name: `${firstName || "My"} Watchlist`,
            user: newUser,
            stocks: [], // can initialize later
        });

        await portfolioRepository.save(defaultPortfolio);
        await watchlistRepository.save(defaultWatchlist);

        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "User registered successfully.",
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                accountBalance: newUser.accountBalance,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                portfolios: [defaultPortfolio],
                watchlists: [defaultWatchlist],
            },
        });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Internal server error during registration." });
    }
});

// ------------------------- LOGIN -------------------------
router.post("/login", async (req, res): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password || typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Email and password are required and must be strings." });
        }

        const user = await userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful.", token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error during login." });
    }
});

// ------------------------- GET USER -------------------------
router.get("/", async (req, res): Promise<any> => {
    try {
        // Decode JWT from header to get user id
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const userId = decoded.userId;

        // Find the user and include all associated data (portfolios, transactions, etc.)
        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ["portfolios", "transactions", "watchlists"], // Ensure to include relationships
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Respond with user data
        res.status(200).json(user);
    } catch (err) {
        console.error("Error getting user:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});

// ------------------------- PUT USER -------------------------
router.put("/", async (req, res): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const userId = decoded.userId;

        // Find the user to be updated
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Destructure the request body (fields you want to update)
        const { email, firstName, lastName, accountBalance, isActive } = req.body;

        // Only update the fields that are provided in the request
        if (email) user.email = email;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (accountBalance !== undefined) user.accountBalance = accountBalance; // Make sure to handle 0 values
        if (isActive !== undefined) user.isActive = isActive;

        // You can also add logic here to update related entities like portfolios, transactions, or watchlists if needed.

        // Save the updated user
        await userRepository.save(user);

        // Respond with the updated user
        res.status(200).json({ message: "User updated successfully.", user });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: "Internal server error." });
    }
});




export default router;
