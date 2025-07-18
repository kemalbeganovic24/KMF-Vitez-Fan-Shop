import React, { useState, useEffect } from "react";

export default function OrderForm() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", city: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => setProducts([]));

        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
        const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total)
    }, []);



    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        // Log podataka koje šaljemo
        console.log("Slanje narudžbe:");
        console.log("Items:", cartItems);
        console.log("Ukupna cijena:", totalPrice);
        console.log("Ostali podaci:", form);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, items: cartItems, totalPrice }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Greška pri slanju porudžbine");
            } else {
                setSuccess(true);
                setForm({ name: "", email: "", phone: "", message: "", city: "" });
                setCartItems([]);
                setTotalPrice(0);
                localStorage.removeItem("cart");
                setTimeout(() => setSuccess(false), 12000);
            }
        } catch (err) {
            setError("Greška u mreži");
        }
    };

    return (
        <section className="form-section" id="order">
            <div className="form-container">
                {success && <div className="alert success">Uspješno ste naručili!</div>}
                {error && <div className="alert error">{error}</div>}
                <h1 className="naziv-form">Naručite</h1>
                <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: "10px" }}>
                    <div className="form-row">
                        <label>
                            Ime i prezime:
                            <input type="text" name="name" value={form.name} onChange={handleChange} required />
                        </label>

                        <label>
                            Email:
                            <input type="email" name="email" value={form.email} onChange={handleChange} required />
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
                            <input type="text" name="city" value={form.city} onChange={handleChange} required />
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
                </form>
            </div>
        </section>
    );
}
