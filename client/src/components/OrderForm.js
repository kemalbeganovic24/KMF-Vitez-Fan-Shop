import React, { useState } from "react";
import axios from "axios";

export default function OrderForm({ cart, setCart }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        city: "",
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Korpa je prazna.");
            return;
        }

        try {
            const total = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            const cleanedItems = cart.map((item) => ({
                _id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                size: item.size,
            }));

            await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
                items: cleanedItems,
                totalPrice: total,
                ...form,
            });

            alert("Narudžba uspješno poslana!");
            setCart([]);
            setForm({ name: "", email: "", phone: "", message: "", city: "" });
            localStorage.removeItem("cart");
            setSuccess(true);
            setError(null);
            setTimeout(() => setSuccess(false), 8000);
        } catch (err) {
            console.error("Greška prilikom slanja narudžbe:", err);
            setError("Došlo je do greške prilikom slanja narudžbe.");
        }
    };

    return (
        <section className="form-section" id="order">
            <div className="form-container">
                {success && <div className="alert success">Uspješno ste naručili!</div>}
                {error && <div className="alert error">{error}</div>}
                <h1 className="naziv-form">Naručite</h1>
                <form
                    onSubmit={handleSubmit}
                    style={{ textAlign: "left", marginTop: "10px" }}
                >
                    <div className="form-row">
                        <label>
                            Ime i prezime:
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label>
                            Broj telefona:
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+387 61 123 456"
                                required
                            />
                        </label>

                        <label>
                            Grad:
                            <input
                                type="text"
                                name="city"
                                placeholder={"Grad i adresa stanovanja"}
                                value={form.city}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="form-row">
                        <label style={{ width: "100%" }}>
                            Poruka/Napomena:
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Unesite poruku ili napomenu"
                                required
                            />
                        </label>
                    </div>

                    <button type="submit">Pošalji</button>
                    <p className="molba">Molimo vas da pričekate 30 do 60 sekundi nakon što pritisnete dugme "Pošalji". Narudžba se obrađuje i biće automatski poslana u sistem. Ne zatvarajte prozor niti ponovno klikajte dok ne dobijete potvrdu.</p>
                </form>
            </div>
        </section>
    );
}
