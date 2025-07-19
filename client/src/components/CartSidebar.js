import React from 'react';
import {isVisible} from "@testing-library/user-event/dist/utils";

export default function CartSidebar({ cart,setCart, setShowCart }) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <div className={`cart-sidebar ${isVisible ? "visible" : ""}`}>
            <button onClick={() => setShowCart(false)} className="close-btn">✖</button>
            <h3>Vaša korpa</h3>
            {cart.length === 0 ? (
                <p>Korpa je prazna.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} ({item.size}) - {item.quantity} kom - {item.price * item.quantity} KM
                        </li>
                    ))}
                </ul>
            )}
            <hr />
            <p><strong>Ukupno:</strong> {totalItems} artikala / {totalPrice} KM</p>
            <button className="button-cartsidebar"
                onClick={() => {
                    const orderSection = document.getElementById("order");
                    if (orderSection) {
                        orderSection.scrollIntoView({ behavior: "smooth" });
                    }}}>
                Potvrdite narudžbu!
            </button>
            <button
                onClick={clearCart}
                className="button-cartsidebar-obrisi">
                Obriši korpu
            </button>
        </div>
    );
}
