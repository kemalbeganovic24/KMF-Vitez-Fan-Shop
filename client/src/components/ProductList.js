import React from "react";
import majica from "../slike/majica.png";
import shal from "../slike/shal.png";
import duks from "../slike/duks.png";
import slika from "../slike/pozadina2.jpg";

export default function ProductList() {
    const products = [
        {
            id: 1,
            name: "Majica Green Army Vitez",
            price: 25,
            image: majica
        },
        {
            id: 2,
            name: "Šal Green Army Vitez",
            price: 15,
            image: shal
        },
        {
            id: 3,
            name: "Duks Green Army Vitez",
            price: 40,
            image: duks
        }
    ];

    return (
        <div className="product-container">
            <img
                src={slika}
                alt="pozadina"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.2,
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />
            <div className="grid">

                {products.map(product => (
                    <div key={product.id} className="grid-kartice" style={{border: "1px solid #ccc", borderRadius: "10px",
                        padding: "10px", width: "200px", textAlign: "center", boxShadow: "0 0 8px rgba(0,0,0,0.1)"
                        }}>
                        <img src={product.image} alt={product.name} style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "contain",
                                borderRadius: "8px",
                                marginBottom: "10px"
                            }}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.price}KM</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
