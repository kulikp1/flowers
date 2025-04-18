import React from "react";
import styles from "./CartModal.module.css";

const CartModal = ({ cart, onClose, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      onUpdateQuantity(id, quantity);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Кошик</h2>
        {cart.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <ul className={styles.cartList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <span className={styles.itemName}>{item.name}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  className={styles.quantityInput}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                />
                <span>{item.price * item.quantity} грн</span>
                <button onClick={() => onRemove(item.id)}>Видалити</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className={styles.closeButton}>
          Закрити
        </button>
      </div>
    </div>
  );
};

export default CartModal;
