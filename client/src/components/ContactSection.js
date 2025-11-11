import React from "react";

export default function ContactSection() {
    return (
        <section className="contact-section">
            <h2 className="contact-heading">Kontaktirajte nas!</h2>
            <div className="contact-cards">
                <div className="contact-card">
                    <p className="label">Telefon</p>
                    <p className="value">+387 62 890 153</p>
                </div>
                <div className="contact-card">
                    <p className="label">Email</p>
                    <p className="value">kmfvitezfanshop@gmail.com</p>
                </div>
                <div className="contact-card">
                    <p className="label">Lokacija</p>
                    <p className="value">Vitez, Bosna i Hercegovina</p>
                </div>
            </div>
        </section>
    );
}
