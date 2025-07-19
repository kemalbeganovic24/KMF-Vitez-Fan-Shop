import React from "react";

export default function Header({ cart, showCart, setShowCart }) {
    // Ukupan broj artikala u korpi
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header style={{
            backgroundColor: "#085A48",
            color: "white",
            padding: "20px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
        }}>
            <h2 style={{ margin: 0, fontWeight: "bold", fontSize: "28px" }}>Green Army Vitez Fan Shop</h2>
            <p style={{ margin: "10px 0 0", fontSize: "30px", padding:"20px" }} className="pisani-text-header">
                #BudiDioPričeBudiVITEZ
            </p>
            <button
                onClick={() => setShowCart(!showCart)}
                style={{
                    backgroundColor: "#085A48",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: "none",
                    fontSize:"18px",
                    fontWeight: "bold"
                }}
            >
                🛒 Korpa ({totalItems})
            </button>

        </header>




    );
}
