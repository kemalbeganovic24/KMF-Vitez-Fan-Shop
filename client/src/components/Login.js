import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = () => {
        axios.post("http://localhost:5000/api/login", { password })
            .then(res => {
                localStorage.setItem("token", res.data.token);
                navigate("/admin");
            })
            .catch(() => alert("Pogrešna šifra"));
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <input type="password" placeholder="Šifra" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Prijavi se</button>
        </div>
    );
}

export default Login;
