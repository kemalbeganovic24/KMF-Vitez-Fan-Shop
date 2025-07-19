import React from "react";
import logokmf from "../slike/kmflogo.png";
import logogav from "../slike/logogav.png";
import slika from "../slike/pozadina3.jpg";

export default function TopBar() {

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "10px 20px",
            borderBottom: "1px solid #ccc",
            fontFamily: "Arial, sans-serif",
            backgroundImage: `url(${slika})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",


        }}><img src={logokmf} alt="logo1" style={{ height: "60px" }} />
            <div>
                <h1 style={{ margin: 0, fontWeight: "bold", fontSize: "28px",alignItems:"center", color:"#085a48" }}>KMF Vitez</h1>
                <p style={{ margin: "10px 0 0", fontSize: "14px" ,justifyContent:"center"}}>Green Army Vitez</p>
            </div>
            <img src={logogav} alt="logo1" style={{ height: "80px" }} />

        </div>
    );
}
