# 🎬 SeatSecure

> A full-stack movie ticket booking platform inspired by BookMyShow with real-time seat synchronization using WebSockets.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![Socket.io](https://img.shields.io/badge/Socket.io-Real_Time-black?logo=socket.io)
![License](https://img.shields.io/badge/License-MIT-orange)

---

## 📖 Overview

SeatSecure is a modern movie ticket booking application where users can browse movies, select shows, choose seats, and book tickets in real time.

The project focuses on solving one of the biggest challenges in ticket booking systems—**preventing multiple users from booking the same seat simultaneously**.

To achieve this, the backend uses:

- PostgreSQL Transactions
- Row-Level Locking (`FOR UPDATE`)
- Socket.IO for live seat synchronization

---

# ✨ Features

### 👤 Authentication

- User Registration
- Login
- JWT Authentication
- Email Verification
- Protected Routes
- Password Hashing (bcrypt)

---

### 🎬 Movies

- Search Movies
- Movie Details
- OMDb API Integration
- Dynamic Movie Posters

---

### 🎟 Booking

- View Available Shows
- Seat Selection
- Real-time Seat Availability
- Booking Confirmation
- Booking History

---

### ⚡ Real-Time

- Socket.IO
- Live Seat Updates
- Instant UI Synchronization
- Multiple Users Supported

---

### 🛡 Backend

- Express.js
- PostgreSQL
- Drizzle ORM
- JWT Authentication
- Repository Pattern
- Validation
- Centralized Error Handling

---

# 🏗 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Fetch API

## Backend

- Node.js
- Express.js
- Socket.IO
- JWT
- bcrypt
- Nodemailer

## Database

- PostgreSQL
- Neon
- Drizzle ORM

## Deployment

- Render (Backend)
- Vercel (Frontend)

## External APIs

- OMDb API

---

# 📂 Project Structure

```
SeatSecure
│
├── client
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── api
│   ├── utils
│   └── App.jsx
│
├── server
│   ├── src
│   │
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── routes
│   ├── middleware
│   ├── socket
│   ├── validators
│   ├── db
│   ├── utils
│   └── app.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/seatSecure.git

cd seatSecure
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file.

```env
PORT=4000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=
SMTP_FROM_EMAIL=

OMDB_API_KEY=
OMDB_BASE_URL=https://www.omdbapi.com

FRONTEND_URL=http://localhost:5173
```

Start server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

Start frontend

```bash
npm run dev
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------------|----------------|
| POST | /auth/register | Register User |
| POST | /auth/login | Login |
| GET | /auth/verify-email | Verify Email |

---

## Movies

| Method | Endpoint |
|----------|----------------------------|
| GET | /movies/search?q=batman |
| GET | /movies/:imdbId |
| GET | /movies/:imdbId/shows |

---

## Booking

| Method | Endpoint |
|----------|-----------------------------|
| GET | /booking/:showId/seats |
| POST | /booking |

---

# 🔄 Real-Time Seat Booking Flow

```
User opens Show
        │
        ▼
Join Socket Room
        │
        ▼
Load Available Seats
        │
        ▼
Select Seats
        │
        ▼
Create Booking
        │
        ▼
Database Transaction
        │
        ▼
FOR UPDATE Lock
        │
        ▼
Seats Booked
        │
        ▼
Socket.IO Broadcast
        │
        ▼
All Connected Users Receive Update
```

---

# 🛡 Preventing Double Booking

SeatSecure prevents race conditions using PostgreSQL transactions.

```
BEGIN;

SELECT *
FROM seats
WHERE id IN (...)
FOR UPDATE;

Check Availability

Create Booking

Mark Seats Booked

COMMIT;
```

This ensures two users cannot book the same seat simultaneously.

---

# 📸 Screenshots

### Home

<img src="./screenshots/home.png"/>

---

### Movie Details

<img src="./screenshots/movie-details.png"/>

---

### Seat Selection

<img src="./screenshots/seats.png"/>

---

### Booking

<img src="./screenshots/booking.png"/>

---

# 🚀 Deployment

Frontend

- Vercel

Backend

- Render

Database

- Neon PostgreSQL

---

# 🔮 Future Improvements

- Payment Gateway Integration
- QR Code Tickets
- Admin Dashboard
- Theatre Management
- Movie Reviews
- Wishlist
- Seat Pricing
- TMDB Integration
- Booking Cancellation
- Email Ticket Confirmation
- Docker Support
- CI/CD Pipeline

---

# 🧠 What I Learned

Through this project I gained hands-on experience with:

- Building a REST API using Express.js
- JWT Authentication
- PostgreSQL & Drizzle ORM
- Database Transactions
- Row-Level Locking (`FOR UPDATE`)
- Socket.IO
- Full-stack deployment
- Environment management
- Production debugging
- Project structuring and architecture

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Shaurya Gupta**

GitHub: https://github.com/Shaurya9935

LinkedIn: *(Add your LinkedIn URL here)*

---

⭐ If you found this project useful, consider giving it a star!