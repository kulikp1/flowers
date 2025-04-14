import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Catalog from "../CatalogPage/CatalogPage";
import Order from "../OrderPage/OrderPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Catalog />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
