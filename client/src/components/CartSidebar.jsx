export default function CartSidebar({ cart, setCart, isVisible, setShowCart }) {

    const handleRemove = (index) => {
        const updated = [...cart];
        updated.splice(index, 1);
        setCart(updated);
    };

    return (
        <div className={`cart-sidebar ${isVisible ? "show" : ""}`}>
            <div className="cart-header">
                <h2>Korpa</h2>
                <button
                    className="close-cart"
                    onClick={() => setShowCart(false)}
                    style={{ background: "transparent", border: "none", fontSize: "20px", cursor: "pointer" }}
                >
                    ❌
                </button>
            </div>
            {cart.length === 0 ? (
                <p>Korpa je prazna</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.size} - {item.quantity} kom - {item.price*item.quantity} KM
                            {item.customText && <div>Natpis: {item.customText}</div>}
                            <button onClick={() => handleRemove(index)}>Obriši</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
