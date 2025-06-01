import React, { useMemo, useState } from "react";
import styles from "./CartModal.module.css";
import toast from "react-hot-toast";

const API_BASE = "https://6804fc41ca467c15be67df54.mockapi.io";

const CartModal = ({ cart, onClose, onRemove, onUpdateQuantity, onOrder }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const fetchProducts = async () => {
    const res = await fetch(`${API_BASE}/flowers`);
    return res.json();
  };

  const checkAvailability = (products) => {
    return cart.every((cartItem) => {
      const product = products.find((p) => p.id === String(cartItem.id));
      return product && product.quantity >= cartItem.quantity;
    });
  };

  const updateProductQuantities = async (products) => {
    for (const cartItem of cart) {
      const product = products.find((p) => p.id === String(cartItem.id));
      const newQty = product.quantity - cartItem.quantity;

      const res = await fetch(`${API_BASE}/flowers/${cartItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: newQty,
          disabled: newQty <= 0,
        }),
      });

      if (!res.ok) {
        throw new Error(`Не вдалося оновити товар ${product.name}`);
      }
    }
  };

  const handleOrder = async () => {
    if (!name.trim() || !phone.trim()) {
      toast.error("Будь ласка, введіть ім’я та номер телефону.");
      return;
    }

    const phoneRegex = /^[\d\s()+-]{7,20}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Невірний формат номера телефону.");
      return;
    }

    try {
      setIsProcessing(true);
      const products = await fetchProducts();

      if (!checkAvailability(products)) {
        toast.error(
          "На складі недостатньо деяких квітів для оформлення замовлення."
        );
        setIsProcessing(false);
        return;
      }

      await updateProductQuantities(products);

      const order = {
        items: cart,
        total: totalPrice,
        name,
        phone,
        date: new Date().toLocaleString(),
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Не вдалося оформити замовлення");

      toast.success("Замовлення успішно оформлено!");
      onOrder();
      onClose();
    } catch (err) {
      console.error("Помилка при оформленні замовлення:", err);
      toast.error("Сталася помилка під час оформлення замовлення.");
    } finally {
      setIsProcessing(false);
    }
  };

  const CartItem = ({ item }) => {
    const handleDecrease = () => {
      if (item.quantity > 1) {
        onUpdateQuantity(item.id, item.quantity - 1);
      } else {
        onRemove(item.id); // видаляємо, якщо кількість стане 0
      }
    };

    const handleIncrease = () => {
      onUpdateQuantity(item.id, item.quantity + 1);
    };

    return (
      <li className={styles.cartItem}>
        <span className={styles.itemName}>{item.name}</span>
        <div className={styles.quantityControls}>
          <button onClick={handleDecrease} className={styles.qtyButton}>
            −
          </button>
          <span className={styles.qtyDisplay}>{item.quantity}</span>
          <button onClick={handleIncrease} className={styles.qtyButton}>
            +
          </button>
        </div>
        <span>{item.price * item.quantity} грн</span>
      </li>
    );
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>Кошик</h2>
        {isProcessing ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.spinner}></div>
            <p>Оформлюємо замовлення...</p>
          </div>
        ) : cart.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <>
            <ul className={styles.cartList}>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>

            <div className={styles.totalRow}>
              <span>Загальна сума:</span>
              <strong>{totalPrice} грн</strong>
            </div>

            <div className={styles.inputGroup}>
              <label>Ваше ім’я</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Ім’я"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Номер телефону</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
                placeholder="+380..."
              />
            </div>

            <div className={styles.navBtns}>
              <button
                onClick={handleOrder}
                className={styles.orderButton}
                disabled={isProcessing}
              >
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
