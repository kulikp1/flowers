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

  const handleOrder = async () => {
    try {
      // 1. Отримуємо всі товари з mockapi
      const productsRes = await fetch(
        "https://6804fc41ca467c15be67df54.mockapi.io/flowers"
      );
      const products = await productsRes.json();

      // 2. Перевіряємо, чи достатньо товарів
      const hasEnough = cart.every((cartItem) => {
        const product = products.find((p) => p.id === String(cartItem.id));
        return product && product.quantity >= cartItem.quantity;
      });

      if (!hasEnough) {
        alert("На складі недостатньо деяких квітів для оформлення замовлення.");
        return;
      }

      // 3. Оновлюємо кількість для кожного товару в mockapi
      for (const cartItem of cart) {
        const product = products.find((p) => p.id === String(cartItem.id));
        const newQty = product.quantity - cartItem.quantity;

        await fetch(
          `https://6804fc41ca467c15be67df54.mockapi.io/flowers/${cartItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: newQty,
              disabled: newQty <= 0,
            }),
          }
        );
      }

      // 4. Створюємо замовлення
      const order = {
        items: cart,
        total: totalPrice,
        date: new Date().toLocaleString(),
      };

      const response = await fetch(
        "https://6804fc41ca467c15be67df54.mockapi.io/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        throw new Error("Не вдалося оформити замовлення");
      }

      const newOrder = await response.json();
      console.log("Замовлення успішно створено:", newOrder);

      onOrder(); // очищення кошика
      onClose(); // закриваємо модалку
    } catch (error) {
      console.error("Помилка при оформленні замовлення:", error);
      alert("Сталася помилка під час оформлення замовлення.");
    }
  };

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
              <button onClick={handleOrder} className={styles.orderButton}>
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
