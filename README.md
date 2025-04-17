🌸 Квітковий кошик
Простий, але функціональний веб-застосунок для організації процесу замовлення та видачі квітів на оптовій квітковій базі. Розроблено з використанням React.

🎯 Мета проєкту
Надати зручний інтерфейс для:

Перегляду наявних сортів квітів

Формування замовлень

Контролю статусу заявок

Імітації видачі та адміністрування замовлень

🚀 Технології
React — інтерфейс користувача

React Router — маршрутизація сторінок

useState, useEffect — керування станом

Local Storage / JSON — збереження даних клієнта

CSS Modules — стилізація компонентів

📂 Структура додатку
📌 Основні сторінки:
Home — Інформація про базу, правила, розклад

Products — Каталог квітів (назва, кількість, ціна, історія цін)

Cart — Кошик клієнта з можливістю оформлення замовлення

Orders — Список оформлених замовлень з їхнім статусом

Admin — Панель адміністратора для керування замовленнями

🛍️ Основний функціонал
Каталог квітів (Products)
Перегляд квітів: назва, наявність, ціна, попередня ціна

Додавання товарів до кошика з вибором кількості

Кошик замовлень (Cart)
Список обраних товарів

Зміна кількості, видалення позицій

Оформлення замовлення (доставка / самовивіз)

Імітація оплати

Мої замовлення (Orders)
Список усіх замовлень користувача

Статуси:

Очікує підтвердження

Недостатньо товару

Виконано

Перегляд деталей кожного замовлення

Адмін-панель (Admin)
Список усіх замовлень клієнтів

Підтвердження чи часткове виконання замовлень

Повідомлення клієнтам про зміни у замовленнях

👤 Ролі користувачів
Клієнт:
Переглядає товари

Додає в кошик

Оформлює замовлення

Слідкує за статусами

Адміністратор:
Контролює обробку замовлень

Підтверджує/відхиляє заявки

Інформує клієнтів

🛠️ Запуск проєкту
Клонуйте репозиторій:

git clone https://github.com/yourusername/flower-basket.git
cd flower-basket
Встановіть залежності:
npm install

Запустіть застосунок:
npm start

<!--  -->

🌸 Flower Basket
A simple yet functional web application for managing the process of ordering and issuing flowers at a wholesale flower warehouse. Built using React.

🎯 Project Goal
To provide a convenient interface for:

Viewing available flower types

Creating and managing orders

Tracking order statuses

Simulating the delivery and administrative workflow

🚀 Technologies Used
React — Front-end framework

React Router — Routing between pages

useState, useEffect — State management

Local Storage / JSON — Local data storage (no backend)

CSS Modules — Component styling

📂 Application Structure
📌 Main Pages:
Home — General info about the flower base, rules, working hours

Products — Flower catalog (name, quantity, price, price history)

Cart — Shopping cart with checkout options

Orders — List of placed orders with status

Admin — Admin panel for managing all customer orders

🛍️ Core Features
Flower Catalog (Products)
View available flowers: name, stock quantity, current and previous prices

Add selected flowers to the cart with quantity selector

Shopping Cart (Cart)
View selected items

Change quantity or remove items

Place an order (choose pickup or delivery)

Simulated payment (no real transactions)

My Orders (Orders)
View all personal orders

Order statuses:

Awaiting Confirmation

Insufficient Stock

Completed

View detailed order content

Admin Panel (Admin)
View and sort all client orders by date/time

Simulate stock updates and partial fulfillment

Notify customers of any order issues

👤 User Roles
Customer:
Browse products

Add to cart

Submit orders

Track order status

Administrator:
See all incoming orders

Confirm/reject/partially fulfill orders

Inform clients of any order issues
