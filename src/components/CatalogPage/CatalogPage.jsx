import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import flowers from "../../data/flowers";
import styles from "./CatalogPage.module.css";
import Header from "../Navigation/Navigation";
import CartModal from "../CartModal/CartModal";

const Catalog = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  // Зберігати cart у localStorage при зміні
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (flower) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === flower.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...flower, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleOrder = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    // Очистити кошик
    setCart([]);
    localStorage.removeItem("cart");
    setIsCartOpen(false);

    // Перейти на сторінку замовлень
    navigate("/orders");
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Каталог квітів</h2>
        <div className={styles.grid}>
          {flowers.map((flower) => (
            <div key={flower.id} className={styles.card}>
              <img
                src={flower.image}
                alt={flower.name}
                className={styles.image}
              />
              <h3>{flower.name}</h3>
              <p>В наявності: {flower.quantity} шт.</p>
              <p>
                Ціна: <strong>{flower.price} грн</strong>
              </p>
              {flower.oldPrice && flower.oldPrice !== flower.price && (
                <p className={styles.oldPrice}>{flower.oldPrice} грн</p>
              )}
              <button onClick={() => handleAddToCart(flower)}>
                Додати до кошика
              </button>
            </div>
          ))}
        </div>
      </div>

      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={handleCloseCart}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOrder={handleOrder} // 👉 передаємо обробник замовлення
        />
      )}
    </div>
  );
};

export default Catalog;
