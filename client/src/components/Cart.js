import React, { useState } from "react";
import axios from "axios";

function Cart({ selectedProduct }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);

    const submitOrder = () => {
        axios.post("http://localhost:5000/api/orders", {
            name, email, productId: selectedProduct
        }).then(() => {
            setDone(true);
        });
    };

    if (done) return <p>Hvala na narudžbi!</p>;

    return (
        <div>
            <h2>Checkout</h2>
            <input placeholder="Ime" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={submitOrder}>Pošalji</button>
        </div>
    );
}

export default Cart;