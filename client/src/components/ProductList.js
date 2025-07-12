import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList({ onOrder }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data));
    }, []);

    return (
        <div>
            <h2>Fan Shop</h2>
            <div style={{ display: "flex", gap: "20px" }}>
                {products.map(p => (
                    <div key={p.id} style={{ border: "1px solid #ccc", padding: 10 }}>
                        <h3>{p.name}</h3>
                        <p>${p.price}</p>
                        <button onClick={() => onOrder(p.id)}>Naruči</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;