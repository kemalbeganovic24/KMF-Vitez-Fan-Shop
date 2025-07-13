import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import OrderForm from "./components/OrderForm";
import '../src/assets/styles.css'
import logo from '../src/slike/logonacijaca.png'
import Footer from "./components/Footer";


export default function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500); // 2.5 sekunde loading
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-text">KMF VITEZ - GREEN ARMY VITEZ</div>
                <br/>
                <div className="loading-image">
                    <img src={logo} alt="Logo" />
                </div>
            </div>
        );
    }
    return (

        <div className="app-content fade-in">
            <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
                <header>
                    <h1>KMF VITEZ</h1>
                    <h2>Green Army Vitez Fan Shop</h2>
                    <p className="pisani-text-header">#Budi dio priče, budi VITEZ!</p>
                </header>

                <ProductList />

                <section style={{ marginTop: "40px" }}>
                    <h2>Naruči!</h2>
                    <OrderForm />
                </section>
                <br/>
                <Footer />
            </div>
        </div>

    );

}
