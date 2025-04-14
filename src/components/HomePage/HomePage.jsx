import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>🌸 Квітковий кошик</h1>
      <p className={styles.description}>
        Вітаємо на оптовій квітковій базі! Тут ви можете переглядати наявні
        квіти, формувати замовлення та слідкувати за їх статусом.
      </p>

      <section className={styles.infoSection}>
        <h2>📋 Правила прийому та видачі</h2>
        <ul>
          <li>Замовлення приймаються щодня до 18:00.</li>
          <li>Видача товарів — з 7:00 до 12:00 наступного дня.</li>
          <li>Самовивіз — за адресою вул. Квіткова, 15.</li>
        </ul>
      </section>

      <section className={styles.scheduleSection}>
        <h2>🕒 Розклад роботи</h2>
        <p>Пн - Сб: 07:00 – 18:00</p>
        <p>Нд: вихідний</p>
      </section>

      <div className={styles.navLinks}>
        <Link to="/products" className={styles.button}>
          Перейти до каталогу
        </Link>
        <Link to="/orders" className={styles.button}>
          Мої замовлення
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
