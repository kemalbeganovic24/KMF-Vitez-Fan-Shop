import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList onOrder={setSelectedProduct} />} />
          <Route path="/checkout" element={<Cart selectedProduct={selectedProduct} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
