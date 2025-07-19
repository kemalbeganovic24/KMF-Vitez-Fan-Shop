import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./models/Order.js"; // Model ćemo poslije definirati

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://kmf-vitez-fan-shop.onrender.com",
        "https://green-army-vitez-fan-shop.onrender.com"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// Povezivanje na MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Spojeno na MongoDB Atlas"))
    .catch(err => console.error("❌ Greška pri spajanju:", err));

// Fiksni proizvodi (za GET /api/products)
const products = [
    { id: 1, name: "Majica", price: 20 },
    { id: 2, name: "Šal", price: 15 },
    { id: 3, name: "Dukserica", price: 40 },
];

// Ruta za test (da znaš da server radi)
app.get("/", (req, res) => {
    res.send("🚀 Fan Shop backend je aktivan!");
});

// Vraća listu proizvoda
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Ruta za primanje narudžbi
app.post("/api/orders", async (req, res) => {
    const { name, email, phone, city, message, items, totalPrice } = req.body;

    if (!name || !email || !phone || !city || !items || items.length === 0) {
        return res.status(400).json({ error: "Sva polja su obavezna i narudžba mora sadržavati proizvode." });
    }

    // 👇 Dodaj ovo da vidiš koji podaci dolaze
    console.log("📦 PRIMLJENA NARUDŽBA:", req.body);

    try {
        const order = new Order({ name, email, phone, city, message, items, totalPrice });
        await order.save();
        res.json({ success: true });
    } catch (error) {
        console.error("❌ Greška prilikom snimanja narudžbe:", error);
        res.status(500).json({ error: "Greška pri snimanju narudžbe." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
});
