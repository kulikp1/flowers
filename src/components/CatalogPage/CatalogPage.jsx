import React from "react";
import flowers from "../../data/flowers";
import styles from "./CatalogPage.module.css";

const Catalog = () => {
  const handleAddToCart = (flower) => {
    console.log("Додано до кошика:", flower); // тимчасово для перевірки
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
    </div>
  );
};

export default Catalog;
