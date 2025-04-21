import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Navigation/Navigation";
import styles from "./OrderPage.module.css";

const API_URL = "https://6804fc41ca467c15be67df54.mockapi.io";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/orders`);
        const data = await response.json();
        setOrders(data.reverse()); // останні замовлення першими
      } catch (error) {
        console.error("Помилка при завантаженні замовлень:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePay = (order) => {
    navigate("/payment", { state: { order } }); // передаємо дані замовлення через state
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Мої замовлення</h2>

        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.spinner}></div>
            <p>Завантаження замовлень...</p>
          </div>
        ) : orders.length === 0 ? (
          <p className={styles.empty}>Замовлень ще немає.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <h4 className={styles.orderDate}>Замовлення від {order.date}</h4>

              <p>
                <strong>Ім’я:</strong> {order.name || "—"}
              </p>
              <p>
                <strong>Телефон:</strong> {order.phone || "—"}
              </p>

              <ul className={styles.orderList}>
                {order.items.map((item) => (
                  <li key={item.id} className={styles.orderItem}>
                    <span>{item.name}</span>
                    <span>{item.quantity} шт.</span>
                    <span>{item.price * item.quantity} грн</span>
                  </li>
                ))}
              </ul>

              <div className={styles.totalSum}>
                Загальна сума:{" "}
                <strong>
                  {order.total || calculateTotal(order.items)} грн
                </strong>
              </div>

              <button
                className={styles.payButton}
                onClick={() => handlePay(order)}
              >
                Сплатити
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
