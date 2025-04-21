import { useState } from "react";
import styles from "./PaymentPage.module.css";
import Header from "../Navigation/Navigation";

export default function PaymentPage() {
  const [submitted, setSubmitted] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>Оплата замовлення</h2>

        <div className={styles.card}>
          {submitted ? (
            <div className={styles.successMessage}>
              ✅ Оплата пройшла успішно!
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
