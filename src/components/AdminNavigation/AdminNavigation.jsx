import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminNavigation.module.css";
import logo from "../../assets/logo.png";

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img src={logo} alt="Логотип" className={styles.logo} />
        <span className={styles.brandName}>Квітковий кошик</span>
      </div>
      <nav className={styles.nav}>
        {/* <Link to="/" className={styles.navLink}>
          На головну
        </Link> */}
        <Link to="/admin" className={styles.navLink}>
          Редагувати каталог
        </Link>
        <Link to="/adminOrders" className={styles.navLink}>
          Список замовлень
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
