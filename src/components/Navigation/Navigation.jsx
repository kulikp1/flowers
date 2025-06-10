// Header.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import styles from "./Navigation.module.css";
import logo from "../../assets/logo.png";
import CartModal from "../CartModal/CartModal";

const Header = ({ cart = [], onRemove, onUpdateQuantity, onOrder }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseModal = () => {
    setIsCartOpen(false);
  };

  return (
    <>
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
          <button
            onClick={handleCartClick}
            className={`${styles.navLink} ${styles.cartButton}`}
          >
            <ShoppingCart className={styles.cartIcon} />
            Кошик
            {cart?.length > 0 && (
              <span className={styles.cartBadge}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </nav>
      </header>

      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={handleCloseModal}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
          onOrder={() => {
            onOrder(); // обнуляє кошик або повідомляє про успішне замовлення
            handleCloseModal(); // закриває модалку
          }}
        />
      )}
    </>
  );
};

export default Header;
