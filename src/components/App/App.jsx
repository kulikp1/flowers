import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Catalog from "../CatalogPage/CatalogPage";
import Order from "../OrderPage/OrderPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
