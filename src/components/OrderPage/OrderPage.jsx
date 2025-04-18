import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Мої замовлення</h2>
      {orders.length === 0 ? (
        <p>Замовлень ще немає.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              background: "#fff",
            }}
          >
            <h4>Замовлення від {order.date}</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} — {item.quantity} шт. —{" "}
                  {item.price * item.quantity} грн
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
