import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/investor-entities/User";
import { AppDataSource } from "../data-source";

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// ------------------------- REGISTER -------------------------
router.post("/register", async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Email and password are required and must be strings." });
      return;
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(newUser);

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Internal server error during registration." });
  }
});

// ------------------------- LOGIN -------------------------
router.post("/login", async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Email and password are required and must be strings." });
      return;
    }

    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error during login." });
  }
});

// ------------------------- GET /users/me -------------------------
router.get("/me", async (req, res): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided." });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await userRepository.findOne({ where: { _id: decoded.userId } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json({ _id: user._id, email: user.email });
  } catch (err) {
    console.error("Error getting user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ------------------------- PUT /users/me -------------------------
router.put("/me", async (req, res): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided." });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    const user = await userRepository.findOne({ where: { _id: decoded.userId } });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const { email, password } = req.body;

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await userRepository.save(user);

    res.status(200).json({ message: "User updated successfully.", user: { _id: user._id, email: user.email } });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
