# 🚀 Smart Expense Leak Tracker (LeakTracker)

> A full-stack MERN application that tracks user expenses and **identifies spending patterns and potential money leaks**.

## 🎯 What is an "Expense Leak"?

An expense leak is a recurring or unnoticed spending habit that drains your budget over time:
- ☕ Daily Rs.200 coffee habit = Rs.6,000/month unnoticed
- 🎵 Multiple unused subscriptions adding up silently
- 🍔 Frequent small food orders that compound significantly

Most expense trackers only record spending — they don't *analyze* it. **LeakTracker detects patterns, flags leaks, and provides actionable insights.**

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (Vite) |
| **Styling** | Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (Mongoose ODM) |
| **Authentication** | JWT (JSON Web Tokens) |

## 📦 Setup

### Server

```bash
cd server
npm install
# Add your MONGO_URI and JWT_SECRET to .env
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create new user |
| `POST` | `/api/auth/login` | Login, returns JWT token |
| `GET` | `/api/auth/me` | Get logged-in user info |
| `POST` | `/api/expenses` | Add new expense |
| `GET` | `/api/expenses` | Get all user expenses |
| `DELETE` | `/api/expenses/:id` | Delete one expense |
