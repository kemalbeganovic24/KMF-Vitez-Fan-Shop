import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Spojeno na MongoDB Atlas"))
    .catch((err) => console.error("❌ Greška pri spajanju:", err));

const SECRET_KEY = "supersecret123"; // ili iz env


// definicija modela
const Order = mongoose.model("Order", new mongoose.Schema({
    name: String,
    email: String,
    productId: Number,
    createdAt: { type: Date, default: Date.now }
}));

// products (hardkodirano za sada)
const products = [
    { id: 1, name: "Majica", price: 20 },
    { id: 2, name: "Kapa", price: 15 },
    { id: 3, name: "Duks", price: 40 },
];

// get products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// create order
app.post("/api/orders", async (req, res) => {
    const { name, email, productId } = req.body;
    await Order.create({ name, email, productId });
    res.json({ success: true });
});

// login
app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === "process.env.ADMIN_PASSWORD") {
        const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "2h" });
        res.json({ token });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

// get orders
app.get("/api/admin/orders", async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token" });
    const token = auth.split(" ")[1];
    try {
        jwt.verify(token, SECRET_KEY);
        const orders = await Order.find();
        res.json(orders);
    } catch {
        res.status(403).json({ error: "Invalid token" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
