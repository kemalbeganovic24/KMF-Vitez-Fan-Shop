import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import CartSidebar from "./components/CartSidebar";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) setCart(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const clearCart = () => setCart([]);

    return (
        <div className="site-root">
            <Header
                cartCount={cart ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0}
                onCartOpen={() => setShowCart(true)}
            />

            <main className="main-container">
                <section className="products-section">
                    <h2 className="section-title">Dresovi 2025/26</h2>
                    <ProductGrid cart={cart} setCart={setCart} />
                </section>
            </main>

            <CartSidebar
                cart={cart}
                setCart={setCart}
                isVisible={showCart}
                setShowCart={setShowCart}
            />

            <section className="order-wrapper">
                <OrderForm cart={cart} clearCart={clearCart} />
            </section>

            <Footer />
        </div>
    );
}
