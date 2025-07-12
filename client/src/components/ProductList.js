import React, { useEffect, useState } from "react";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px" }}>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
}
