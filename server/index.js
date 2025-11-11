// server/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Order from "./models/Order.js";

dotenv.config(); // MORA biti odmah na vrhu

const app = express();

// Simple CORS handler (explicit)
const allowedOrigins = [
    "http://localhost:3000",
    "https://kmf-vitez-fan-shop-1.onrender.com"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

app.use(express.json());

// --- DEBUG: ispiši MONGO_URL da vidimo što Render vidi ---
console.log("DEBUG: process.env.MONGO_URL =", JSON.stringify(process.env.MONGO_URL));

// Connect to Mongo
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    console.error("FATAL: MONGO_URL nije postavljen u env varijablama!");
} else {
    mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("✅ MongoDB Atlas connected"))
        .catch(err => {
            console.error("❌ MongoDB connection error:", err);
        });
}

// POST /orders
app.post("/orders", async (req, res) => {
    console.log("📦 POST /orders payload:", req.body);
    try {
        const newOrder = new Order(req.body);
        const saved = await newOrder.save();
        console.log("✅ Saved order id:", saved._id);
        return res.status(201).json({ message: "Narudžba uspješno poslana!", id: saved._id });
    } catch (err) {
        console.error("❌ Error saving order:", err);
        return res.status(500).json({ message: "Greška na serveru", error: err.message });
    }
});

// GET /orders (test)
app.get("/orders", async (req, res) => {
    try {
        const rows = await Order.find().sort({ createdAt: -1 }).limit(50);
        return res.json(rows);
    } catch (err) {
        console.error("❌ Error fetching orders:", err);
        return res.status(500).json({ message: "Greška pri dohvaćanju", error: err.message });
    }
});

// root
app.get("/", (req, res) => res.send("🚀 Server OK"));

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
