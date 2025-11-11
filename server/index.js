import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Order from "./models/Order.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        "http://localhost:3000", // frontend lokalno
        "https:kmf-vitez-fan-shop-1.onrender.com" // frontend na Render
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// MongoDB Atlas konekcija
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB Atlas connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// POST /orders - kreiranje narudžbe
app.post("/orders", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Narudžba uspješno poslana!" });
    } catch (err) {
        console.error("❌ Greška prilikom slanja narudžbe:", err);
        res.status(500).json({ message: "Greška na serveru." });
    }
});

// GET /orders - dohvat svih narudžbi (opcionalno)
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("❌ Greška prilikom dohvaćanja narudžbi:", err);
        res.status(500).json({ message: "Greška na serveru." });
    }
});

// Test ruta
app.get("/", (req, res) => {
    res.send("🚀 Server radi i spojen je na MongoDB Atlas ✅");
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server radi na portu ${PORT}`));
