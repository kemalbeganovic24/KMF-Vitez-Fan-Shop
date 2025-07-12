import React from "react";
import ProductList from "./components/ProductList";
import OrderForm from "./components/OrderForm";

export default function App() {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            <header style={{ backgroundColor: "#0a8b46", color: "white", padding: "20px" }}>
                <h1>KMF VITEZ - Fan Shop</h1>
                <p>Get your favorite fan gear!</p>
            </header>

            <ProductList />

            <section style={{ marginTop: "40px" }}>
                <h2>Place an Order</h2>
                <OrderForm />
            </section>
        </div>
    );
}
