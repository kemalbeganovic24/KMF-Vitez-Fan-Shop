import React, { useState } from "react";
import axios from "axios";

export default function OrderForm({ cart, clearCart }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        message: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cart.length) return alert("Korpa je prazna!");

        const items = cart.map((i) => ({
            name: i.name,
            size: i.size,
            quantity: i.quantity,
            price: i.price,
        }));

        const API_URL =
            process.env.REACT_APP_API_URL || "http://localhost:5000";

        try {
            const res = await axios.post(`${API_URL}/orders`, {
                ...form,
                items,
                totalPrice: items.reduce((s, i) => s + i.price * i.quantity, 0),
            });

            alert(res.data.message || "Narudžba poslana!");
            clearCart();
            setForm({ name: "", email: "", phone: "", city: "", message: "" });
        } catch (err) {
            console.error("❌ Greška prilikom slanja narudžbe:", err);
            alert(
                "Greška prilikom slanja narudžbe! Provjeri da li je backend online i da je MONGO_URL ispravno postavljen."
            );
        }
    };

    return (
        <form className="order-form" onSubmit={handleSubmit}>
            <h2>Naručite</h2>
            <input
                name="name"
                placeholder="Ime i prezime"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Molimo unesite svoj Gmail e-mail"
                value={form.email}
                onChange={handleChange}
                required
            />
            <input
                name="phone"
                placeholder="Telefon"
                value={form.phone}
                onChange={handleChange}
                required
            />
            <input
                name="city"
                placeholder="Adresa"
                value={form.city}
                onChange={handleChange}
                required
            />
            <textarea
                name="message"
                placeholder="Poruka (npr. ime, prezime ili broj na dresu)"
                value={form.message}
                onChange={handleChange}
            ></textarea>
            <button type="submit">Pošalji narudžbu</button>
        </form>
    );
}
