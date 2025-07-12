import React, { useState, useEffect } from "react";

export default function OrderForm() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", productId: "" });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            setSuccess(true);
            setForm({ name: "", email: "", productId: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left", marginTop: "10px" }}>
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
        </form>
    );
}
