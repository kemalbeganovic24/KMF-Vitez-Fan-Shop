import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Order from "./models/Order.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// CORS setup
const allowedOrigins = [
    "http://localhost:3000", // lokalni frontend
    "https://kmf-vitez-fan-shop.onrender.com" // frontend na Render
];

app.use(cors({
    origin: function(origin, callback){
        if(!origin) return callback(null, true); // Postman, curl itd.
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'CORS policy: This origin is not allowed';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET","POST"],
    allowedHeaders: ["Content-Type"]
}));

// MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Atlas connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// POST /orders
app.post("/orders", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        console.log("✅ Order saved:", newOrder);
        res.status(201).json({ message: "Narudžba uspješno poslana!" });
    } catch (err) {
        console.error("❌ Error saving order:", err);
        res.status(500).json({ message: "Greška na serveru." });
    }
});

// GET /orders
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error("❌ Error fetching orders:", err);
        res.status(500).json({ message: "Greška na serveru." });
    }
});

// Test route
app.get("/", (req, res) => res.send("🚀 Server radi i spojen je na MongoDB Atlas ✅"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server radi na portu ${PORT}`));
