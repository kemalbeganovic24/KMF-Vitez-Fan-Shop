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
    const [cartItems, setCartItems] = useState([]);

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

    useEffect(() => {
        // Očisti korpu svaki put kad se stranica učita
        setCartItems([]);
    }, []);

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

            <section className="contact-section">
                <h2 className="contact-heading">Kontaktirajte nas!</h2>
                <div className="contact-cards">
                    <div className="contact-card">
                        <div className="icon phone-icon"></div>
                        <p className="label">Telefon</p>
                        <p className="value">+387 62 890 153</p>
                    </div>
                    <div className="contact-card">
                        <div className="icon email-icon"></div>
                        <p className="label">Email</p>
                        <p className="value">kmfvitezfanshop@gmail.com</p>
                    </div>
                    <div className="contact-card">
                        <div className="icon location-icon"></div>
                        <p className="label">Lokacija</p>
                        <p className="value">Vitez, Bosna i Hercegovina</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>

    );

}
