import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CatalogPage.module.css";
import Header from "../Navigation/Navigation";
import CartModal from "../CartModal/CartModal";

const Catalog = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://6804fc41ca467c15be67df54.mockapi.io/flowers";

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setFlowers(data);
      } catch (error) {
        console.error("Помилка при завантаженні квітів:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();
  }, []);

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

  const handleOrder = async () => {
    if (cart.length === 0) return;

    try {
      for (let item of cart) {
        const flowerOnServer = flowers.find((f) => f.id === item.id);
        const updatedQuantity = flowerOnServer.quantity - item.quantity;

        await fetch(`${API_URL}/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: updatedQuantity }),
        });
      }

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

      setCart([]);
      localStorage.removeItem("cart");
      setIsCartOpen(false);
      navigate("/orders");
    } catch (error) {
      console.error("Помилка при оформленні замовлення:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Каталог квітів</h2>

        {loading ? (
          <p>Завантаження квітів...</p>
        ) : (
          <div className={styles.grid}>
            {flowers.map((flower) => (
              <div
                key={flower.id}
                className={`${styles.card} ${
                  flower.quantity <= 0 ? styles.disabledCard : ""
                }`} // додаємо клас disabledCard до картки, якщо товар відсутній
              >
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
                <button
                  onClick={() => handleAddToCart(flower)}
                  disabled={flower.quantity <= 0}
                >
                  {flower.quantity <= 0
                    ? "Немає в наявності"
                    : "Додати до кошика"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={handleCloseCart}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOrder={handleOrder}
        />
      )}
    </div>
  );
};

export default Catalog;
