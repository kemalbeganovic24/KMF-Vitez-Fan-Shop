import React from "react";

export default function Header({ cartCount = 0, onCartOpen }) {
    return (
        <header className="header">
            <div className="header-left">
                <h1 className="logo">KMF Vitez Fan Shop</h1>
            </div>

            <div className="header-right">
                <div className="tagline">#BudiDioPričeBudiVITEZ!</div>
                <button className="cart-btn" onClick={onCartOpen}>
                    🛒 Korpa ({cartCount})
                </button>
            </div>
        </header>
    );
}
