import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import FarmerSignup from './pages/FarmerSignup';
import FarmerDashboard from './pages/FarmerDashboard';
import ProductDetails from './pages/ProductDetails';

import './App.css';
import RegisterProduct from "./pages/RegisterProduct";
import Cart from "./pages/Cartpage";
import Chat from "./pages/Chat";
import Inventory from "./pages/Inventory";
import ProductHome from "./pages/ProductHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmer-signup" element={<FarmerSignup />} />
        <Route path="/dashboard" element={<FarmerDashboard />} />
        <Route path="/register-product" element={<RegisterProduct />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/" element={<ProductHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
