import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

// Otvori bazu
const dbPromise = open({
    filename: "./fan-shop.db",
    driver: sqlite3.Database,
});

// Kreiraj tabelu ako ne postoji
dbPromise.then(async (db) => {
    await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      city TEXT,
      phone TEXT,
      message TEXT,
      items TEXT
    )
  `);
});

// Ruta za spremanje narudžbe
app.post("/orders", async (req, res) => {
    try {
        const { name, email,  city, phone, message, items } = req.body;
        const db = await dbPromise;
        await db.run(
            `INSERT INTO orders (name, email,  city, phone, message, items) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, email,  city, phone, message, JSON.stringify(items)]
        );
        res.json({ success: true });
    } catch (err) {
        console.error("Greška:", err);
        res.status(500).json({ success: false, error: "Greška prilikom spremanja" });
    }
});

// Ruta za dohvat svih narudžbi
app.get("/orders", async (req, res) => {
    const db = await dbPromise;
    const orders = await db.all(`SELECT * FROM orders`);
    res.json(orders);
});

app.listen(5000, () => console.log("Server radi na portu 5000"));
