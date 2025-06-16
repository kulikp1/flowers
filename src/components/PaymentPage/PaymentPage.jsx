import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PaymentPage.module.css";
import Header from "../Navigation/Navigation";

export default function PaymentPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!order?.id) {
      alert("Помилка: відсутній ID замовлення");
      return;
    }

    try {
      const response = await fetch(
        `https://6804fc41ca467c15be67df54.mockapi.io/orders/${order.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...order, status: "paid" }),
        }
      );

      if (!response.ok) {
        throw new Error("Помилка під час оплати");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Не вдалося провести оплату. Спробуйте ще раз.");
    }
  };

  useEffect(() => {
    if (submitted) {
      const timeout = setTimeout(() => {
        navigate("/products");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [submitted, navigate]);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Оплата замовлення</h2>

        <div className={styles.card}>
          {submitted ? (
            <div className={styles.successMessage}>
              Oплата пройшла успішно! Переадресація...
            </div>
          ) : (
            <form onSubmit={handlePayment} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="cardNumber">Номер картки</label>
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="expiry">Термін дії</label>
                  <input id="expiry" type="text" placeholder="MM/YY" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="cvv">CVV</label>
                  <input id="cvv" type="text" placeholder="123" required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="name">Ім'я власника картки</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ім’я Прізвище"
                  required
                />
              </div>

              <button type="submit" className={styles.button}>
                Оплатити
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
