import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Navigation from "../Navigation/Navigation";
import ChatWidget from "../ChatWidget/ChatWidget";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <Navigation />

      <main className={styles.mainContent}>
        <div className={styles.textContent}>
          <section className={styles.infoSection}>
            <h2>Правила прийому та видачі</h2>
            <ul>
              <li>Замовлення приймаються щодня до 18:00.</li>
              <li>Видача товарів — з 7:00 до 12:00 наступного дня.</li>
              <li>Самовивіз — вул. Квіткова, 15.</li>
            </ul>
          </section>

          <section className={styles.scheduleSection}>
            <h2>Розклад роботи</h2>
            <p className={styles.scheduleText}>Пн - Сб: 07:00 – 18:00</p>
            <p className={styles.scheduleText}>Нд: вихідний</p>
          </section>
          <Link to="/products" className={styles.ctaButton}>
            Перейти до каталогу
          </Link>
        </div>

        <div className={styles.heroImage}>
          <img src={logo} alt="Квіткова корзина" className={styles.heroLogo} />
        </div>
        <ChatWidget />
      </main>
    </div>
  );
};

export default HomePage;
