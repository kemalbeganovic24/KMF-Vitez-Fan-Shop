import React from "react";

export default function Cart({ cart }) {
    return (
        <div>
            <h2>Korpa</h2>
            {cart.length === 0 ? (
                <p>Korpa je prazna</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Proizvod</th>
                        <th>Veličina</th>
                        <th>Količina</th>
                        <th>Cijena</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.size}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity} KM</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}