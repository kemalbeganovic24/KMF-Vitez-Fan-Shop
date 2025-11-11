import React, { useState } from "react";
import dresFront from "../slike/dres-front.jpeg";
import dresBack from "../slike/dres-back.jpeg";

export default function ProductCustomizer({ cart, setCart }) {
    const [isHovered, setIsHovered] = useState(false);
    const [variant, setVariant] = useState("Domaći");
    const [size, setSize] = useState("");
    const [withName, setWithName] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const basePrice = variant === "Domaći" ? 70 : 75;
    const total = basePrice * quantity + (withName ? 10 : 0);

    const handleAddToCart = () => {
        if (!size) return alert("Odaberite veličinu!");
        const newItem = {
            proizvod: `Dres ${variant}`,
            varijanta: variant,
            velicina: size,
            natpis: withName ? "Sa natpisom" : "Bez natpisa",
            kolicina: quantity,
            cijena: total,
        };
        setCart([...cart, newItem]);
        alert("✅ Dodano u korpu!");
    };

    return (
        <div className="product-card">
            <div
                className="image-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={isHovered ? dresBack : dresFront} alt="Dres" className="product-image" />
            </div>

            <div className="options">
                <h2>Dres Green Army Vitez 2025/26</h2>

                <label>Varijanta:</label>
                <select value={variant} onChange={(e) => setVariant(e.target.value)}>
                    <option>Domaći</option>
                    <option>Gostujući</option>
                </select>

                <label>Veličina:</label>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Odaberi veličinu</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                </select>

                <label>
                    <input type="checkbox" checked={withName} onChange={() => setWithName(!withName)} />
                    Sa natpisom (+10 KM)
                </label>

                <label>Količina:</label>
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />

                <p className="price">Ukupno: <strong>{total} KM</strong></p>

                <button onClick={handleAddToCart} className="add-btn">Dodaj u korpu</button>
            </div>
        </div>
    );
}
