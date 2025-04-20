import React, { useState } from "react";
import axios from "axios";
import styles from "./AdminFlowerForm.module.css";

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
      alert("Квітку додано успішно!");
      setFormData({
        name: "",
        price: "",
        oldPrice: "",
        quantity: "",
        image: "",
        disabled: false,
      });
    } catch (error) {
      alert("Сталася помилка при додаванні квітки");
      console.error(error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Додати нову квітку</h2>
        <form onSubmit={handleSubmit} className={styles.formCard}>
          <input
            type="text"
            name="name"
            placeholder="Назва квітки"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="number"
            name="price"
            placeholder="Ціна"
            value={formData.price}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="number"
            name="oldPrice"
            placeholder="Стара ціна"
            value={formData.oldPrice}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Кількість"
            value={formData.quantity}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="url"
            name="image"
            placeholder="URL зображення"
            value={formData.image}
            onChange={handleChange}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Додати квітку
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminFlowerForm;
