import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import styles from "./AdminOrders.module.css";

const API_URL = "https://6804fc41ca467c15be67df54.mockapi.io/orders";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (error) {
      console.error("Помилка при завантаженні:", error);
    }
  };

  const onEditClick = (order) => {
    setEditingOrder(order);
    reset(order);
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`${API_URL}/${editingOrder.id}`, {
        ...data,
        quantity: Number(data.quantity),
      });
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Помилка при збереженні:", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Панель керування замовленнями</h1>

        {orders.length === 0 ? (
          <p className={styles.emptyText}>Немає замовлень для відображення</p>
        ) : (
          <div className={styles.orderList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardTitle}>
                    Замовлення #{order.id}
                  </span>
                  <button
                    className={styles.editButton}
                    onClick={() => onEditClick(order)}
                  >
                    ✏️ Редагувати
                  </button>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    <strong>Ім’я клієнта:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Товар:</strong> {order.product}
                  </p>
                  <p>
                    <strong>Кількість:</strong> {order.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingOrder && (
          <div className={styles.formWrapper}>
            <h2 className={styles.formTitle}>
              Редагування замовлення #{editingOrder.id}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <label className={styles.label}>Ім’я клієнта</label>
              <input
                className={styles.input}
                {...register("customerName")}
                placeholder="Ім’я"
              />

              <label className={styles.label}>Товар</label>
              <input
                className={styles.input}
                {...register("product")}
                placeholder="Назва товару"
              />

              <label className={styles.label}>Кількість</label>
              <input
                className={styles.input}
                type="number"
                {...register("quantity")}
                placeholder="Кількість"
              />

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.saveButton}>
                  💾 Зберегти
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setEditingOrder(null)}
                >
                  ❌ Скасувати
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
