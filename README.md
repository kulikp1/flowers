---
🌸 Flower Basket / Квітковий Кошик

**Flower Basket** — це легкий, зручний у використанні React-застосунок для керування замовленнями квітів на оптовій базі. Призначений для клієнтів, що замовляють квіти оптом, і для адміністраторів, які обробляють ці замовлення.
---

## 🔍 Огляд

Цей застосунок ідеально підходить для малого бізнесу або демонстрації логіки e-commerce без бекенду. Всі дані зберігаються локально в LocalStorage, що робить його незалежним від серверної частини.

---

## 🎯 Основні функції

### Для Клієнтів:

🔎 Перегляд каталогу квітів з назвою, фото, ціною та доступною кількістю  
🛒 Додавання квітів у кошик, редагування кількості  
📦 Оформлення замовлень з вибором типу доставки (доставка / самовивіз)  
⏳ Відстеження статусу своїх замовлень

### Для Адміністраторів:

🗂 Перегляд усіх замовлень клієнтів з деталями  
📝 Оновлення статусу (Очікує, Недостатньо товару, Виконано)  
🔔 Можливість сповіщати клієнта про зміни (імітація)  
📉 Управління залишками (імітовано через логіку LocalStorage)

---

## 👥 Ролі користувачів

| Роль          | Можливості                                                                  |
| ------------- | --------------------------------------------------------------------------- |
| Клієнт        | Перегляд товарів, додавання в кошик, оформлення замовлень, перегляд статусу |
| Адміністратор | Управління замовленнями, оновлення статусів, часткова видача замовлень      |

---

## 🧰 Технології

⚛ React (v18+)  
💾 Local Storage для збереження даних  
📄 JSON-мок-дані замість бази даних  
🎨 CSS Modules — ізольоване стилювання  
⚙️ useState, useEffect — керування станом

---

## 📂 Структура проекту

```
flower-basket/
├── public/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   └── OrderStatus.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AdminPanel.jsx
│   │   └── OrderHistory.jsx
│   ├── data/
│   │   └── flowers.json
│   ├── utils/
│   │   └── localStorageHelpers.js
│   ├── App.jsx
│   └── index.js
```

---

## 🚀 Як запустити

1. **Клонувати репозиторій:**

   ```bash
   git clone https://github.com/yourusername/flower-basket.git
   cd flower-basket
   ```

2. **Встановити залежності:**

   ```bash
   npm install
   ```

3. **Запустити застосунок:**

   ```bash
   npm start
   ```

   Відкрийте у браузері: [http://localhost:3000](http://localhost:3000)

---

## 📌 Обмеження

- ❌ Немає бекенду або авторизації (адміністратор визначається вручну через інтерфейс)
- 🔁 Застосунок демонстраційного типу, не призначений для реального продакшну

---

# 🌸 Flower Basket

**Flower Basket** is a lightweight, user-friendly React application for managing flower orders at a wholesale base. Designed for customers who order flowers in bulk and administrators who handle those orders.

---

## 🔍 Overview

This app is ideal for small businesses or for demonstrating e-commerce logic without a backend. All data is stored locally in LocalStorage, making it backend-independent.

---

## 🎯 Key Features

### For Customers:

🔎 Browse flower catalog with name, photo, price, and available quantity  
🛒 Add flowers to cart, adjust quantity  
📦 Place orders with delivery method selection (delivery / pickup)  
⏳ Track the status of placed orders

### For Admins:

🗂 View all customer orders with details  
📝 Update order status (Pending, Insufficient Stock, Fulfilled)  
🔔 Notify customer about status changes (simulated)  
📉 Manage stock levels (simulated via LocalStorage logic)

---

## 👥 User Roles

| Role          | Capabilities                                            |
| ------------- | ------------------------------------------------------- |
| Customer      | Browse products, add to cart, place orders, view status |
| Administrator | Manage orders, update statuses, partial fulfillment     |

---

## 🧰 Tech Stack

⚛ React (v18+)  
💾 Local Storage for data persistence  
📄 JSON mock data instead of a database  
🎨 CSS Modules — scoped styling  
⚙️ useState, useEffect — state management

---

## 📂 Project Structure

```
flower-basket/
├── public/
├── src/
│   ├── components/
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   └── OrderStatus.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AdminPanel.jsx
│   │   └── OrderHistory.jsx
│   ├── data/
│   │   └── flowers.json
│   ├── utils/
│   │   └── localStorageHelpers.js
│   ├── App.jsx
│   └── index.js
```

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/flower-basket.git
   cd flower-basket
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the application:**

   ```bash
   npm start
   ```

   Open in browser: [http://localhost:3000](http://localhost:3000)

---

## 📌 Limitations

- ❌ No backend or authentication (admin is selected manually via interface)
- 🔁 Demo-type app, not meant for production use

---
