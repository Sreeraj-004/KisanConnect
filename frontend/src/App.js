import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import FarmerSignup from './pages/FarmerSignup';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farmer-signup" element={<FarmerSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
