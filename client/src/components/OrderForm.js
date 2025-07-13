import React, { useState, useEffect } from "react";

export default function OrderForm() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", productId: "",phone:"",message:"" });
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

        const apiUrl = "https://kmf-vitez-fan-shop.onrender.com";  // <-- OVDE

        try {
            const res = await fetch(`${apiUrl}/api/orders`, {      // <-- i OVDE koristiš apiUrl
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, productId: Number(form.productId) }),
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Greška pri slanju porudžbine");
            } else {
                setSuccess(true);
                setForm({ name: "", email: "", productId: "",phone:"",message: "" });
                setTimeout(() => setSuccess(false), 12000);
            }
        } catch {
            setError("Greška u mreži");
        }
    };

    return (
        <div className="form-container">
            {success && <div className="alert success">Uspješno ste naručili!</div>}
            {error && <div className="alert error">{error}</div>}
            <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: "10px" }}>
                <label>Ime i prezime:<br />
                    <input type="text" name="name" value={form.name}
                           onChange={handleChange} required />
                </label><br /><br />
                <label>Email:<br />
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label><br /><br />
                <label>Broj telefona:<br />
                    <input type="tel" name="phone" value={form.phone}   onChange={handleChange} placeholder="+387 61 123 456" required />
                </label><br /><br />
                <label>Poruka/Napomena<br />
                    <textarea name="message" value={form.message} onChange={handleChange}  placeholder="Unesite poruku ili napomenu" required />
                </label><br /><br />
                <label>Artikal:<br />
                    <select name="productId" value={form.productId} onChange={handleChange} className="custom-select" required>
                        <option value="">-- Izaberi --</option>
                        {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </label><br /><br />
                <button type="submit">Pošalji</button>

            </form>
        </div>

    );
}
