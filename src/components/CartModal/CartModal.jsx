import React, { useMemo } from "react";
import styles from "./CartModal.module.css";

const CartModal = ({ cart, onClose, onRemove, onUpdateQuantity, onOrder }) => {
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity >= 1) {
      onUpdateQuantity(id, quantity);
    }
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Кошик</h2>
        {cart.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <>
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
                  <button onClick={() => onRemove(item.id)}>×</button>
                </li>
              ))}
            </ul>
            <div className={styles.totalRow}>
              <span>Загальна сума:</span>
              <strong>{totalPrice} грн</strong>
            </div>
            <div className={styles.navBtns}>
              <button onClick={onOrder} className={styles.orderButton}>
                Оформити замовлення
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
