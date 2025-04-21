import { useState } from "react";
import styles from "./PaymentPage.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentPage() {
  const [submitted, setSubmitted] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
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
                <Label htmlFor="cardNumber">Номер картки</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <Label htmlFor="expiry">Термін дії</Label>
                  <Input id="expiry" placeholder="MM/YY" required />
                </div>
                <div className={styles.formGroup}>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="name">Ім'я власника картки</Label>
                <Input id="name" placeholder="Ім’я Прізвище" required />
              </div>

              <Button type="submit" className={styles.button}>
                Оплатити
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
