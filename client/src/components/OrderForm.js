import React, { useState, useEffect } from "react";

export default function OrderForm() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", productId: "" });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => setProducts([]));
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            console.log("Šaljem narudžbu:", { ...form, productId: Number(form.productId) });
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, productId: Number(form.productId) }),
            });
            if (!res.ok) {
                const data = await res.json();
                console.error("Greška sa servera:", data);
                setError(data.error || "Greška pri slanju porudžbine");
            } else {
                setSuccess(true);
                setForm({ name: "", email: "", productId: "" });
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            console.error("Greška u mreži:", err);
            setError("Greška u mreži");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: "10px" }}>
            <label>Name:<br />
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label><br /><br />
            <label>Email:<br />
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label><br /><br />
            <label>Product:<br />
                <select name="productId" value={form.productId} onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
            </label><br /><br />
            <button type="submit">Submit</button>
            {success && <p style={{ color: "green" }}>Order sent!</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
