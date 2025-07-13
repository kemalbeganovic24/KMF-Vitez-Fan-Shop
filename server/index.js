import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Dozvoli zahteve sa localhost i produkcijskog frontenda
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://kmf-vitez-fan-shop.onrender.com",
        "https://green-army-vitez-fan-shop.onrender.com" // ← ovo dodaj!
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Konektuj se na MongoDB Atlas
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ Spojeno na MongoDB Atlas"))
    .catch(err => console.error("❌ Greška pri spajanju:", err));

// Secret key za JWT (poželjno iz env)
const SECRET_KEY = process.env.SECRET_KEY || "supersecret123";

// Model za narudžbe
const Order = mongoose.model("Order", new mongoose.Schema({
    name: String,
    email: String,
    productId: Number,
    createdAt: { type: Date, default: Date.now }
}));

// Hardkodirani proizvodi
const products = [
    { id: 1, name: "Majica", price: 20 },
    { id: 2, name: "Kapa", price: 15 },
    { id: 3, name: "Duks", price: 40 },
];

// Root ruta - samo potvrda da server radi
app.get("/", (req, res) => {
    res.send("🚀 Fan Shop backend je aktivan!");
});

// Ruta za vraćanje proizvoda
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Ruta za kreiranje narudžbe
app.post("/api/orders", async (req, res) => {
    const { name, email, productId } = req.body;

    console.log("⬅️ Pristigla narudžba:", req.body);

    const productIdNum = Number(productId);
    if (!name || !email || !productId || isNaN(productIdNum)) {
        console.log("⚠️ Neispravan unos!");
        return res.status(400).json({ error: "Neispravan unos. Sva polja su obavezna i productId mora biti broj." });
    }

    const product = products.find(p => p.id === productIdNum);
    if (!product) {
        console.log("❌ Nepostojeći proizvod:", productIdNum);
        return res.status(400).json({ error: "Nepostojeći proizvod." });
    }

    try {
        console.log("📝 Snimam narudžbu u bazu...");
        await Order.create({ name, email, productId: productIdNum });
        console.log("✅ Uspješno snimljeno!");
        res.json({ success: true });
    } catch (error) {
        console.error("❌ Greška pri snimanju:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login ruta (primer autentifikacije)
app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "2h" });
        res.json({ token });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
});

// Ruta za dohvatanje svih narudžbi (za admina)
app.get("/api/admin/orders", async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "No token" });

    const token = auth.split(" ")[1];
    try {
        jwt.verify(token, SECRET_KEY);

        const orders = await Order.find();

        const ordersWithProductNames = orders.map(order => {
            const product = products.find(p => p.id === order.productId);
            return {
                ...order._doc,
                productName: product ? product.name : "Nepoznat proizvod"
            };
        });

        res.json(ordersWithProductNames);
    } catch {
        res.status(403).json({ error: "Invalid token" });
    }
});

// Pokreni server na portu iz env ili 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
