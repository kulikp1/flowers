import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img src={logo} alt="Логотип" className={styles.logo} />
        <span className={styles.brandName}>Квітковий кошик</span>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          На головну
        </Link>
        <Link to="/products" className={styles.navLink}>
          Каталог
        </Link>
        <Link to="/orders" className={styles.navLink}>
          Мої замовлення
        </Link>
      </nav>
    </header>
  );
};

export default Header;
