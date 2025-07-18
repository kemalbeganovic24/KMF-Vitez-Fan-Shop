import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// === Mongoose model direktno ovdje ===
const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    city: String,
    message: String,
    cart: [
        {
            productId: Number,
            name: String,
            quantity: Number,
            price: Number,
        },
    ],
    totalPrice: Number,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

// === RUTA bez foldera ===
app.post("/api/orders", async (req, res) => {
    try {
        const { name, email, phone, city, message, items, totalPrice } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Korpa je prazna." });
        }

        const order = new Order({
            name,
            email,
            phone,
            city,
            message,
            cart: items,
            totalPrice,
        });

        await order.save();
        res.status(201).json({ message: "Narudžba uspješno spremljena." });
    } catch (err) {
        console.error("Greška:", err);
        res.status(500).json({ error: "Greška na serveru." });
    }
});

// === Povezivanje na MongoDB ===
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Povezan na MongoDB");
        app.listen(PORT, () => console.log(`Server radi na http://localhost:${PORT}`));
    })
    .catch(err => console.error("Greška pri povezivanju s bazom:", err));
