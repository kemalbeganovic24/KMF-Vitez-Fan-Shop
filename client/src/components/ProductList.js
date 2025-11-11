import React, { useState } from "react";
import dresFront from "../slike/dres-front.jpeg";
import dresBack from "../slike/dres-back.jpeg";

export default function ProductList({ cart, setCart }) {
    const [selectedSizes, setSelectedSizes] = useState({});
    const [selectedVariants, setSelectedVariants] = useState({});
    const [customTextSelections, setCustomTextSelections] = useState({});
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const products = [
        {
            id: 1,
            name: "Dres 2025/26",
            basePrice: 50,
            front: dresFront,
            back: dresBack,
        },
    ];

    const handleAddToCart = (product) => {
        const size = selectedSizes[product.id];
        const variant = selectedVariants[product.id];
        const customText = customTextSelections[product.id] || false;

        if (!size || !variant) {
            alert("Molimo odaberite veličinu i varijantu.");
            return;
        }

        const variantPrice = variant === "away" ? product.basePrice + 5 : product.basePrice;
        const textPrice = customText ? 10 : 0;
        const finalPrice = variantPrice + textPrice;

        const existing = cart.find(
            (i) => i.id === product.id && i.size === size && i.variant === variant && i.customText === customText
        );

        if (existing) {
            setCart(
                cart.map((i) =>
                    i.id === product.id && i.size === size && i.variant === variant && i.customText === customText
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            );
        } else {
            setCart([
                ...cart,
                { id: product.id, name: product.name, size, variant, customText, price: finalPrice, quantity: 1 },
            ]);
        }
    };

    return (
        <div className="products-grid">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="product-card"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                >
                    <div className="image-wrapper">
                        <img
                            src={hoveredProduct === product.id ? product.back : product.front}
                            alt={product.name}
                            className="product-image"
                        />
                    </div>
                    <h3>{product.name}</h3>
                    <p>Cijena: {product.basePrice} KM</p>

                    <div className="product-options">
                        <select
                            value={selectedVariants[product.id] || ""}
                            onChange={(e) =>
                                setSelectedVariants({ ...selectedVariants, [product.id]: e.target.value })
                            }
                        >
                            <option value="">Odaberi varijantu</option>
                            <option value="home">Domaći</option>
                            <option value="away">Gostujući (+5 KM)</option>
                        </select>

                        <select
                            value={selectedSizes[product.id] || ""}
                            onChange={(e) => setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })}
                        >
                            <option value="">Odaberi veličinu</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>

                        <label>
                            <input
                                type="checkbox"
                                checked={customTextSelections[product.id] || false}
                                onChange={(e) =>
                                    setCustomTextSelections({ ...customTextSelections, [product.id]: e.target.checked })
                                }
                            />
                            Sa natpisom (+10 KM)
                        </label>
                    </div>

                    <button onClick={() => handleAddToCart(product)}>Dodaj u korpu</button>
                </div>
            ))}
        </div>
    );
}
