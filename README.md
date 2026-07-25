# 💳 Bank Transaction System (VaultPay)

A secure RESTful banking backend built with Node.js, Express.js, and MongoDB. It provides user authentication, account management, and secure money transfers with ledger tracking.

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Secure Password Hashing (bcrypt)
- Account Creation & Management
- Deposit Money
- Withdraw Money
- Transfer Money Between Accounts
- Ledger Management
- Transaction History
- Email Notifications
- MongoDB Transactions (Session Support)
- Idempotency Key Support
- Protected Routes
- MVC Architecture

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- dotenv

---

## 📁 Project Structure

```
src/
│── controllers/
│── middleware/
│── models/
│── routes/
│── services/
│── app.js
```

---

## ⚙️ Installation

```bash
git clone https://github.com/Chaitanya100000/Bank-Transaction-System.git

cd Bank-Transaction-System

npm install

npm start
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
```

---

## 📌 API Endpoints

### Authentication
- POST /auth/register
- POST /auth/login

### Account
- POST /account/create
- GET /account

### Transactions
- POST /transaction/deposit
- POST /transaction/withdraw
- POST /transaction/transfer

---

## 👨‍💻 Author

**Chaitanya Takale**

GitHub: https://github.com/Chaitanya100000