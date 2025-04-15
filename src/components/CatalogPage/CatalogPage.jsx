import React, { useState } from "react";
import flowers from "../../data/flowers";
import styles from "./CatalogPage.module.css";

const Catalog = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (flower) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === flower.id);
      if (existing) {
        return prev.map((item) =>
          item.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...flower, quantity: 1 }];
      }
    });
  };

  return (
    <div className={styles.container}>
      <h2>Каталог квітів</h2>
      <div className={styles.grid}>
        {flowers.map((flower) => (
          <div key={flower.id} className={styles.card}>
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

      <div className={styles.cart}>
        <h2>Кошик</h2>
        {cart.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} — {item.quantity} шт.
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Catalog;
