import React, { useState, useMemo } from "react";

/*
ProductCard:
- hover image front/back
- select variant (Domaći/Gostujući)
- size select
- checkbox for name printing
- quantity
- show current price and add to cart
*/

export default function ProductCard({ product, cart, setCart }) {
    const [hovered, setHovered] = useState(false);
    const [variant, setVariant] = useState("Domaći");
    const [size, setSize] = useState("");
    const [withName, setWithName] = useState(false);
    const [qty, setQty] = useState(1);

    const price = useMemo(() => {
        const variantAdd = variant === "Gostujući" ? 5 : 0;
        const nameAdd = withName ? 10 : 0;
        return product.basePrice + variantAdd + nameAdd;
    }, [product.basePrice, variant, withName]);

    const total = price * Math.max(1, qty);

    function addToCart() {
        if (!size) { alert("Molimo odaberite veličinu."); return; }
        // if same item (id+variant+size+withName) exists increment quantity
        const existingIndex = cart.findIndex(i =>
            i.proizvodId === product.id &&
            i.varijanta === variant &&
            i.velicina === size &&
            i.natpis === (withName ? "Sa natpisom" : "Bez natpisa")
        );

        if (existingIndex > -1) {
            const newCart = [...cart];
            newCart[existingIndex].kolicina += qty;
            setCart(newCart);
        } else {
            const newItem = {
                proizvodId: product.id,
                proizvod: product.name,
                varijanta: variant,
                velicina: size,
                natpis: withName ? "Sa natpisom" : "Bez natpisa",
                kolicina: qty,
                cijena: price
            };
            setCart([...cart, newItem]);
        }

        alert("Dodat u korpu ✅");
    }

    return (
        <div
            className="product-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="product-image-wrap">
                <img src={hovered ? product.back : product.front} alt={product.name} className="product-image"/>
            </div>

            <h3 className="product-name">{product.name}</h3>

            <div className="product-controls">
                <div className="control-row">
                    <label>Varijanta</label>
                    <select value={variant} onChange={e=>setVariant(e.target.value)}>
                        <option>Domaći</option>
                        <option>Gostujući</option>
                    </select>
                </div>

                <div className="control-row">
                    <label>Veličina</label>
                    <select value={size} onChange={e=>setSize(e.target.value)}>
                        <option value="">Odaberi</option>
                        <option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
                    </select>
                </div>

                <div className="control-row checkbox-row">
                    <label>
                        <input type="checkbox" checked={withName} onChange={e=>setWithName(e.target.checked)} />
                        Sa natpisom (+10 KM)
                    </label>
                </div>

                <div className="control-row">
                    <label>Količina</label>
                    <input type="number" min="1" value={qty} onChange={e=>setQty(Math.max(1, parseInt(e.target.value || 1)))} />
                </div>

                <div className="price-row">
                    <div>Jedinično: <strong>{price} KM</strong></div>
                    <div>Ukupno: <strong>{total} KM</strong></div>
                </div>

                <button className="btn-add" onClick={addToCart}>Dodaj u korpu</button>
            </div>
        </div>
    );
}
