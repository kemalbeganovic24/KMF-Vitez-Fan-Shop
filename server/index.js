import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://kmf-vitez-fan-shop.onrender.com"]
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Spojeno na MongoDB Atlas"))
    .catch(err => console.error("❌ Greška pri spajanju:", err));

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    productId: Number,
    createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

const products = [
    { id: 1, name: "Majica", price: 20 },
    { id: 2, name: "Kapa", price: 15 },
    { id: 3, name: "Duks", price: 40 },
];

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.post("/api/orders", async (req, res) => {
    try {
        const { name, email, productId } = req.body;
        if (!name || !email || !productId) {
            return res.status(400).json({ error: "Nedostaju podaci" });
        }
        const order = new Order({ name, email, productId: Number(productId) });
        await order.save();
        res.json({ success: true, order });
    } catch (err) {
        console.error("Greška pri snimanju porudžbine:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(5000, () => {
    console.log("Backend server radi na portu 5000");
});
