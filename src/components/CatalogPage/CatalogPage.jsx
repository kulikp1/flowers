import React, { useState } from "react";
import flowers from "../../data/flowers";
import styles from "./CatalogPage.module.css";
import Header from "../Navigation/Navigation";
import CartModal from "../CartModal/CartModal";

const Catalog = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const handleCloseCart = () => {
    setIsCartOpen(false);
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
        />
      )}
    </div>
  );
};

export default Catalog;
