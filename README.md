🚧 ProBur Full-Stack

Полноценное full-stack веб-приложение для аренды строительных инструментов с реальной backend-аутентификацией, серверной корзиной, управлением заказами, редактированием профиля и базой данных PostgreSQL.

🔗 Демо
Frontend: https://probur-fullstack.vercel.app/
Backend API: https://probur-api.onrender.com/
🧪 Демо-аккаунт
Email: demo@probur.dev
Password: DemoPass123
📌 Что демонстрирует проект
Разработка адаптивного frontend на React (SPA)
Создание backend API на Node.js / Express
Работа с PostgreSQL через Prisma ORM
JWT-аутентификация с восстановлением сессии
Синхронизация данных между устройствами
Полные пользовательские сценарии:
регистрация
вход
редактирование профиля
управление корзиной
оформление заказов
Валидация и обработка ошибок
Деплой frontend, backend и базы данных в облаке
⚙️ Основные возможности
Регистрация и вход через backend API
Восстановление сессии (GET /api/auth/me)
Загрузка и редактирование профиля
Каталог из 40 инструментов
Серверная корзина для авторизованных пользователей
Синхронизация корзины между устройствами
Создание заказов через API
История заказов в личном кабинете
Статусы заказов
Предзаполненные демо-данные
Адаптивный интерфейс
Поддержка обновления SPA (Vercel)
🧰 Технологии
Frontend
React
Vite
CSS
Backend
Node.js
Express
Prisma ORM
PostgreSQL
JWT
bcryptjs
Деплой
Vercel
Render
Render PostgreSQL
🏗️ Архитектура
tool-rental/
  client/   # React + Vite frontend
  server/   # Express + Prisma backend
🔌 API Эндпоинты
Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
Profile
GET   /api/profile
PATCH /api/profile
Cart
GET    /api/cart
POST   /api/cart/items
DELETE /api/cart/items/:id
Orders
GET  /api/orders/me
POST /api/orders
🔄 Реализованные сценарии
🔐 Аутентификация
Пользователь регистрируется через frontend
Backend валидирует данные и сохраняет пользователя в PostgreSQL
Возвращается JWT-токен
Сессия восстанавливается через /api/auth/me
👤 Профиль
Загружается с backend
Можно редактировать (имя, телефон)
Изменения сохраняются и видны на других устройствах
🛒 Корзина
Хранится на backend
Синхронизируется между устройствами
Обновляется при навигации и фокусе
📦 Заказы
Создаются на основе корзины
Сохраняются в PostgreSQL
Корзина очищается после оформления
Отображаются в истории с текущим статусом
🧪 Демо-данные

Включают:

Демо-пользователя
Заполненный профиль
Товары в корзине
Историю заказов со статусами
💻 Локальный запуск
Frontend
cd tool-rental/client
npm install
npm run dev
Backend
cd tool-rental/server
npm install
npm start
🌱 Заполнение демо-данных
cd tool-rental/server
npm run seed
🔑 Переменные окружения
Backend
DATABASE_URL=
JWT_SECRET=
Frontend
VITE_API_URL=
💼 Почему этот проект важен

Это не просто статичный frontend — проект демонстрирует реальные навыки full-stack разработки:

Проектирование API
Аутентификация
Работа с базой данных
Сохранение состояния между устройствами
Деплой
Валидация
Поведение, близкое к production
🚀 Возможные улучшения
Админ-панель для управления заказами
Изменение статусов заказов с админской стороны
Корзина для гостей (через сессии)
Автоматические тесты
Улучшенная фильтрация и сортировка
Загрузка изображений и управление товарами
