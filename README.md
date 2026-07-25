# 💳 VaultPay - Bank Transaction System

A secure and scalable **Bank Transaction System REST API** built with **Node.js**, **Express.js**, and **MongoDB**. VaultPay provides secure user authentication, account management, deposits, withdrawals, transfers, transaction history, ledger tracking, and email notifications.

---

## 🚀 Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 🏦 Bank Account Creation
- 💰 Deposit Money
- 💸 Withdraw Money
- 🔄 Transfer Money Between Accounts
- 📒 Ledger Management
- 📜 Transaction History
- 📧 Email Notifications
- 🔒 Protected Routes
- ⚡ MongoDB Transactions (Sessions)
- 🔁 Idempotency Key Support
- 🏗️ MVC Architecture
- ❌ Blacklisted JWT Tokens (Logout Support)

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication & Security
- JWT (JSON Web Token)
- bcryptjs

### Email Service
- Nodemailer

### Utilities
- dotenv
- cookie-parser
- express-validator

---

## 📂 Project Structure

```
Bank-Transaction-System
│
├── src
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── account.controller.js
│   │   └── transaction.controller.js
│   │
│   ├── middleware
│   │   └── auth.middleware.js
│   │
│   ├── models
│   │   ├── user.model.js
│   │   ├── account.model.js
│   │   ├── transaction.model.js
│   │   ├── ledger.model.js
│   │   └── blackList.model.js
│   │
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── account.routes.js
│   │   └── transaction.routes.js
│   │
│   ├── services
│   │   └── email.service.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/Chaitanya100000/Bank-Transaction-System.git
```

### Navigate to Project

```bash
cd Bank-Transaction-System
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASSWORD=your_email_app_password
```

### Start the Server

```bash
npm start
```

or

```bash
npm run dev
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login User |
| POST | `/auth/logout` | Logout User |

---

### Account

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/account/create` | Create Bank Account |
| GET | `/account` | Get Account Details |

---

### Transactions

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/transaction/deposit` | Deposit Money |
| POST | `/transaction/withdraw` | Withdraw Money |
| POST | `/transaction/transfer` | Transfer Money |
| GET | `/transaction/history` | View Transaction History |

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- MongoDB Session Transactions
- Idempotency Support
- Token Blacklisting
- Input Validation

---

## 🧪 Testing

Use **Postman** or any API testing tool to test the endpoints.

Example:

```
POST /auth/register
POST /auth/login
POST /transaction/deposit
POST /transaction/transfer
```

---

## 📌 Future Improvements

- Swagger API Documentation
- Docker Support
- Unit & Integration Testing
- Admin Dashboard
- Rate Limiting
- Audit Logs
- Refresh Token Authentication
- Role-Based Access Control (RBAC)

---

## 👨‍💻 Author

**Chaitanya Takle**

- GitHub: https://github.com/Chaitanya100000

---

## ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.