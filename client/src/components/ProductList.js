import React, { useEffect, useState } from "react";
import majica from "../slike/majica.png";
import shal from "../slike/shal.png";
import duks from "../slike/duks.png";



export default function ProductList({ cart, setCart }) {
    const [selectedSizes, setSelectedSizes] = useState({});

    const products = [
        { id: 1, name: "Majica Green Army Vitez", price: 25, image: majica },
        { id: 2, name: "Šal Green Army Vitez", price: 15, image: shal },
        { id: 3, name: "Duks Green Army Vitez", price: 40, image: duks },
    ];



    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleSizeChange = (productId, size) => {
        setSelectedSizes((prev) => ({
            ...prev,
            [productId]: size,
        }));
    };

    const handleAddToCart = (product) => {
        const selectedSize = selectedSizes[product.id];
        if (!selectedSize) {
            alert("Molimo odaberite veličinu.");
            return;
        }

        const existing = cart.find(
            (item) => item.id === product.id && item.size === selectedSize
        );

        if (existing) {
            setCart(
                cart.map((item) =>
                    item.id === product.id && item.size === selectedSize
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, {
                id: product.id,
                name: product.name,
                price: product.price,
                size: selectedSize,
                quantity: 1
            }]);
        }
    };

    return (
        <div className="product-container" id="products1">

            <div className="korpa"
                style={{
                    position: "fixed",
                    top: "175px",
                    right: "10px",
                    background: "#ffffff",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    zIndex: 10,
                }}
            >
                <p>
                    🛒 Artikala u korpi:{" "}
                    <strong>{cart.reduce((acc, item) => acc + item.quantity, 0)}</strong>
                </p>
                <p>
                    Ukupna cijena:{" "}
                    <strong>
                        {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} KM
                    </strong>
                </p>
            </div>


            <div className="grid">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="grid-kartice"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "10px",
                            width: "200px",
                            textAlign: "center",
                            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "contain",
                                borderRadius: "8px",
                                marginBottom: "10px",
                            }}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.price}KM</p>
                        <select
                            value={selectedSizes[product.id] || ""}
                            onChange={(e) => handleSizeChange(product.id, e.target.value)}
                            className="select-size"
                        >
                            <option value="">Odaberi veličinu</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <button
                            className="add-to-cart"
                            onClick={() => handleAddToCart(product)}
                        >
                            Dodaj u korpu
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}
