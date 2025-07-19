import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import OrderForm from "./components/OrderForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import logo from './slike/logonacijaca.png';
import CartSidebar from "./components/CartSidebar";
import TopBanner from "./components/TopBanner";
import '../src/assets/styles.css'

export default function App() {

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-text">KMF VITEZ - GREEN ARMY VITEZ</div>
                <br/>
                <div className="loading-image">
                    <img src={logo} alt="Logo" />
                    <br/>
                </div>
                <br/>

            </div>
        );
    }

    return (

        <div className="app-content fade-in">
            <TopBanner />
            <Header cart={cart} showCart={showCart} setShowCart={setShowCart} />
            {showCart && <CartSidebar cart={cart} setShowCart={setShowCart} isVisible={showCart} style={{
                transform: showCart ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.3s ease-in-out", }}/>}
            <main style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
                <ProductList cart={cart} setCart={setCart} />
                <section id="order" style={{ marginTop: 40 }}>
                    <OrderForm cart={cart} setCart={setCart}/>
                </section>
            </main>
            <Footer />
        </div>

    );

}
