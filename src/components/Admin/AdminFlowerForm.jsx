import React, { useState } from "react";
import axios from "axios";
import styles from "./AdminFlowerForm.module.css";
import Header from "../Navigation/Navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminFlowerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    quantity: "",
    image: "",
    disabled: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flowerData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      quantity: Number(formData.quantity),
    };

    try {
      await axios.post(
        "https://6804fc41ca467c15be67df54.mockapi.io/flowers",
        flowerData
      );
      toast.success("Квітку додано успішно!");
      setFormData({
        name: "",
        price: "",
        oldPrice: "",
        quantity: "",
        image: "",
        disabled: false,
      });
    } catch (error) {
      toast.error("Сталася помилка при додаванні квітки");
      console.error(error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <div className={styles.inputGroup}>
            <label>Назва квітки</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Ціна</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Стара ціна</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Кількість</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>URL зображення</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Додати квітку
          </button>
        </form>
      </div>
      <ToastContainer position="top-bottom" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AdminFlowerForm;
