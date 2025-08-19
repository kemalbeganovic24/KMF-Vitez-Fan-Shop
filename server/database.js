// server/database.js
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// Putanja do baze
const dbPath = path.join(process.cwd(), "fan-shop.db");

// Ako baza ne postoji, kreira se automatski
const db = new Database(dbPath);

// Kreiraj tablicu orders ako ne postoji
db.prepare(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    message TEXT NOT NULL,
    products TEXT NOT NULL,
    totalPrice REAL NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

console.log("✅ SQLite baza je spremna:", dbPath);

export default db;
