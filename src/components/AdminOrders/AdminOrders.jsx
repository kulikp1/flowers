import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminOrders.module.css";
import AdminHeader from "../AdminNavigation/AdminNavigation";

const API_URL = "https://6804fc41ca467c15be67df54.mockapi.io/orders";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedItems, setEditedItems] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (error) {
      console.error("Помилка при завантаженні:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (order) => {
    setEditingOrderId(order.id);
    setEditedItems(order.items);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setEditedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: parseInt(newQuantity) || 0 }
          : item
      )
    );
  };

  const handleSave = async (orderId) => {
    try {
      const updatedOrder = {
        items: editedItems,
        total: editedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
      await axios.put(`${API_URL}/${orderId}`, updatedOrder);
      setEditingOrderId(null);
      fetchOrders();
    } catch (error) {
      console.error("Помилка при збереженні:", error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <AdminHeader />
      <div className={styles.container}>
        <h1 className={styles.title}>Замовлення клієнтів</h1>

        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.spinner}></div>
            <p>Завантаження замовлень...</p>
          </div>
        ) : orders.length === 0 ? (
          <p className={styles.empty}>Немає замовлень</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderMeta}>
                <div className={styles.orderDate}>📅 Дата: {order.date}</div>
                <div className={styles.customerInfo}>
                  👤 <strong>{order.name}</strong> | 📞 {order.phone}
                </div>
              </div>

              <ul className={styles.orderList}>
                {(editingOrderId === order.id ? editedItems : order.items).map(
                  (item) => (
                    <li
                      key={item.id}
                      className={`${styles.orderItem} ${
                        item.disabled ? styles.disabledItem : ""
                      }`}
                    >
                      <div className={styles.itemInfo}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                        <div>
                          <strong>{item.name}</strong>
                          {item.disabled && (
                            <div className={styles.disabledText}>
                              (деактивовано)
                            </div>
                          )}
                          <div className={styles.quantityWrapper}>
                            {editingOrderId === order.id ? (
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(item.id, e.target.value)
                                }
                                className={styles.quantityInput}
                              />
                            ) : (
                              <>Кількість: {item.quantity}</>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>{item.price} грн</div>
                    </li>
                  )
                )}
              </ul>

              <div className={styles.totalSum}>
                Загальна сума:{" "}
                {editingOrderId === order.id
                  ? editedItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    )
                  : order.total}{" "}
                грн
              </div>

              {editingOrderId === order.id ? (
                <button
                  onClick={() => handleSave(order.id)}
                  className={styles.saveButton}
                >
                  Зберегти
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(order)}
                  className={styles.editButton}
                >
                  Редагувати
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
