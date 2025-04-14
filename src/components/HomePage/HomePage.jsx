import React from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <img src={logo} alt="Логотип" className={styles.logo} />
          <span className={styles.brandName}>Квітковий кошик</span>
        </div>
        <nav className={styles.nav}>
          <Link to="/products" className={styles.navLink}>
            Каталог
          </Link>
          <Link to="/orders" className={styles.navLink}>
            Мої замовлення
          </Link>
        </nav>
      </header>
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
            <p>Пн - Сб: 07:00 – 18:00</p>
            <p>Нд: вихідний</p>
          </section>
        </div>

        <div className={styles.heroImage}>
          <img src={logo} alt="Квіткова корзина" className={styles.heroLogo} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
