# STOCK-TRADING-APP
# 📈 SB Stocks

SB Stocks is a user-friendly paper trading web application designed for stock market enthusiasts to practice and improve their trading skills without risking real money. The platform provides real-time US stock market data, historical trends, virtual portfolio management, and trading simulations to help users learn and build confidence in stock trading.

---

# 🚀 Project Overview

SB Stocks enables users to:

- Register and securely log in.
- View real-time US stock market data.
- Search from thousands of listed stocks.
- Buy and sell stocks using virtual money.
- Monitor portfolio performance.
- View transaction history.
- Analyze historical stock trends.
- Practice different investment strategies risk-free.

---

# 🏗️ Project Architecture

The application follows the MVC (Model-View-Controller) architecture and is divided into two major modules:

## Frontend
- React.js
- HTML5
- CSS3
- Bootstrap/Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js
- REST API

## Database
- MongoDB / MySQL

## External API
- Alpha Vantage API
- Finnhub API
- Twelve Data API

---

# 📂 Folder Structure

```
SB-Stocks
│
├── frontend
├── backend
├── database
├── documentation
└── deployment
```

---

# ⚙️ Technologies Used

| Technology | Purpose |
|------------|----------|
| React.js | Frontend |
| Node.js | Backend |
| Express.js | REST API |
| MongoDB | Database |
| JWT | Authentication |
| Axios | API Calls |
| Chart.js | Stock Charts |
| Bootstrap | UI Design |

---

# ✨ Features

## User Authentication

- Registration
- Login
- JWT Authentication
- Password Encryption

---

## Dashboard

- Portfolio Summary
- Current Balance
- Stock Watchlist
- Market Overview

---

## Paper Trading

- Virtual Balance
- Buy Stocks
- Sell Stocks
- Transaction History

---

## Stock Market

- Real-time Prices
- Historical Data
- Company Information
- Search Stocks

---

## Portfolio

- Holdings
- Profit/Loss
- Portfolio Performance
- Asset Allocation

---

# 👥 Roles and Responsibilities

## User

- Register/Login
- Search Stocks
- Buy Stocks
- Sell Stocks
- Track Portfolio
- View History

## Admin (Optional)

- Manage Users
- Monitor System
- View Reports

---

# 🔄 User Flow

```
Home
   │
   ▼
Register/Login
   │
   ▼
Dashboard
   │
   ├──────── Search Stock
   │               │
   │               ▼
   │          Stock Details
   │               │
   │         Buy / Sell
   │               │
   ▼               ▼
Portfolio ← Transaction History
```

---

# 🏛 MVC Pattern

## Model

- User
- Portfolio
- Transaction
- Stock

---

## View

- React Components
- Dashboard
- Login
- Portfolio
- Trading Page

---

## Controller

- Authentication
- Stock Management
- Portfolio Management
- Trading Logic

---

# 🗄 ER Diagram

Entities:

- User
- Portfolio
- Stock
- Transaction

Relationships:

User
↓
Portfolio
↓
Transaction
↓
Stock

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/SB-Stocks.git
```

### Install Frontend

```bash
cd frontend
npm install
npm start
```

### Install Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🔐 Environment Variables

```
PORT=

MONGO_URI=

JWT_SECRET=

STOCK_API_KEY=
```

---

# 📸 Screenshots

- Home Page
- Login
- Dashboard
- Portfolio
- Trading Page

---

# 🔮 Future Enhancements

- AI Stock Recommendation
- Watchlist Alerts
- Leaderboard
- Dark Mode
- Mobile Application
- Cryptocurrency Paper Trading

---

# 📚 Learning Outcomes

- REST API Development
- Authentication using JWT
- MVC Architecture
- Real-time API Integration
- Portfolio Management
- State Management in React

---

# 👨‍💻 Developed By

SB Stocks Development Team

---

# 📄 License

This project is developed for educational purposes.
