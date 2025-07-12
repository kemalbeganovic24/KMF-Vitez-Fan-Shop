import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:5000/api/admin/orders", {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setOrders(res.data));
    }, []);

    return (
        <div>
            <h2>Admin panel</h2>
            {orders.map(o => (
                <div key={o.id}>
                    {o.name} - {o.email} - Proizvod: {o.product_id}
                </div>
            ))}
        </div>
    );
}

export default AdminPanel;
