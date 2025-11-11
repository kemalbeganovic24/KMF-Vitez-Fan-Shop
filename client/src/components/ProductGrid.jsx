import React, { useState } from "react";
import bijelaMajica from "../slike/Bpolo.jpg";
import crnaMajica from "../slike/Cpolo.jpg";
import navijackaCrna from "../slike/Cmajica.png";
import trenerkaZelena from "../slike/Ztrenerka.jpg";
import trenerkaCrna from "../slike/Ctrenerka.jpg";
import dresZeleniDomaci from "../slike/Zdres.jpg";
import dresZeleniGosti from "../slike/Bdres.jpg";


export default function ProductGrid({ cart, setCart }) {
    const [hovered, setHovered] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [customText, setCustomText] = useState({});



    const products = [
        { id: 1, name: "Polo majica bijela", price: 50, front: bijelaMajica, back: bijelaMajica }, // nema druge strane
        { id: 2, name: "Polo majica crna", price: 50, front: crnaMajica, back: crnaMajica },
        { id: 3, name: "Navijačka majica crna", price: 25, front: navijackaCrna, back: navijackaCrna },
        { id: 4, name: "Trenerka zelena", price: 120, front: trenerkaZelena, back: trenerkaZelena },
        { id: 5, name: "Trenerka crna", price: 120, front: trenerkaCrna, back: trenerkaCrna },
        { id: 6, name: "Dres zeleni", price: 70, front: dresZeleniDomaci, back: dresZeleniDomaci },
        { id: 7, name: "Dres bijeli", price: 70, front: dresZeleniGosti, back: dresZeleniGosti },
    ];
    const handleAddToCart = (product) => {
        const size = selectedSizes[product.id];
        const text = customText[product.id] || ""; // tekst/natpis
        const selectedSize = selectedSizes[product.id];
        if (!selectedSize) {
            alert("Molimo odaberite veličinu.");
            return;
        }

        const existing = cart.find(item => item.id === product.id && item.size === selectedSize && item.customText === text);

        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id && item.size === selectedSize && item.customText === text
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, size: selectedSize, quantity: 1, customText: text }]);
        }
    };

    return (
        <div className="product-grid">
            {products.map((p) => (
                <div
                    className="product-card"
                    key={p.id}
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                >
                    <img
                        src={hovered === p.id ? p.back : p.front}
                        alt={p.name}
                        className="product-image"
                    />
                    <h3>{p.name}</h3>
                    <p>{p.price} KM</p>
                    <select
                        value={selectedSizes[p.id] || ""}
                        onChange={(e) =>
                            setSelectedSizes({ ...selectedSizes, [p.id]: e.target.value })
                        }
                    >
                        <option value="">Odaberi veličinu</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                        <option value="3XL">3XL</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                    </select>
                    <button onClick={() => handleAddToCart(p)}>Dodaj u korpu</button>
                </div>
            ))}
        </div>
    );
}
