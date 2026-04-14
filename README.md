## Setup Instructions

Follow the steps below to run the project locally.

## 1. Clone the Repository
git clone https://github.com/Shaurya9935/seatSecure.git
cd seatsecure-booking-system
---
## 2. Backend Setup

Navigate to the backend folder:

cd backend

Install dependencies:

npm install
---
## 3. Environment Variables

Create a .env file in the backend directory and add which are given in .env.example

---
## 4. Database Setup
Create a SQL database ->
```
     CREATE TABLE seats (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255),
        isbooked INT DEFAULT 0
      );
    INSERT INTO seats (isbooked)
    SELECT 0 FROM generate_series(1, 20);
```
Update your .env file with correct database credentials
Create required tables (users, seats)

You can either:

---
## 5. Run Backend Server
npm run dev

or

node server.js

Backend will run on:

http://localhost:4000
## 6. Frontend Setup

Open a new terminal and navigate to frontend:

cd frontend

Install dependencies:

npm install

Run the frontend:

npm run dev

Frontend will run on:

http://localhost:3000

---
## 7. Usage

Register a new user
Verify email using Mailtrap inbox
Login with credentials
Book available seats
Try booking the same seat with another user to test concurrency handling


# SeatSecure – Scalable Ticket Booking System

SeatSecure is a backend-driven movie ticket booking system inspired by real-world platforms like BookMyShow. The primary focus of this project is to implement a robust authentication system and ensure data consistency during concurrent seat booking using SQL.


---

## 1. Overview

SeatSecure allows users to register, verify their email, log in, and book seats for a show. The system ensures that no two users can book the same seat simultaneously, even under concurrent access scenarios.

The application is divided into two core domains:

* Authentication and user management
* Seat booking and concurrency handling

---

## 2. Key Features

### 2.1 Authentication System

* User registration with validation
* Email verification using Mailtrap (sandbox environment)
* Secure login with credential validation
* Forgot password and password reset flow
* Password hashing before database storage
* Role-based user structure (e.g., customer)

### 2.2 Seat Booking System

* Seat selection interface backed by database state
* Prevention of double booking using FOR UPDATE;
* Booking confirmation tied to authenticated users
* Persistent booking records
* Seat availability updates

---

## 3. System Workflow

### 3.1 User Registration & Verification

1. User submits registration details (name, email, password)
2. System validates input and stores user with hashed password
3. A verification email is sent via Mailtrap
4. User verifies email → account is marked as verified

### 3.2 Login Flow

1. User enters credentials
2. System validates email and password
3. If valid → user is authenticated
4. If invalid → appropriate error is returned

### 3.3 Password Reset Flow

1. User requests password reset using email
2. System generates reset token and sends email
3. User sets a new password via reset link
4. Password is hashed and updated in database

### 3.4 Seat Booking Flow

1. Authenticated user selects a seat
2. System checks seat availability in database
3. If available:

   * Seat is marked as booked
   * Booking is associated with user
4. If already booked:

   * Request is rejected
   * User is prompted to select another seat

### 3.5 Concurrency Handling

* Seat booking logic ensures atomic operations at the database level
* Prevents race conditions where multiple users attempt to book the same seat
* Relies on SQL checks/constraints rather than frontend state

---

## 4. Tech Stack

**Backend:**

* Node.js
* Express.js

**Database:**

* SQL (PostgreSQL / MySQL) - For seats database
* MongoDB - For storing user credentials

**Authentication:**

* JWT (JSON Web Tokens)
* bcrypt for password hashing
* crypto

**Email Service:**

* Mailtrap (for testing email flows)

---

## 5. Project Structure

```
project-root/
│
├── src/
│   ├── common/
│   │   ├── db/            # Database connection
│   │   ├── dto/           # Data transfer objects
│   │   ├── middleware/    # Auth & validation middleware
│   │   ├── utils/         # Helper utilities
│   │
│   ├── modules/
│   │   ├── auth/          # Authentication module
│   │   │   ├── controller
│   │   │   ├── service
│   │   │   ├── routes
|   |   |   ├── model
|   |   |   ├── middleware
│   │   │
│   │   ├── booking/       # Seat booking module
│   │       ├── controller
│   │       ├── service
│   │       ├── routes
│   ├── app.js
├── server.js              # Entry point
├── .env                   # Environment variables
```


---

## 6. Database Design

### Users Table

* id
* name
* email (unique)
* password (hashed)
* role
* is_verified
* created_at
* updated_at

### Seats Table

* id
* seat_number
* is_booked
* booked_by (user_id reference)



---

## 7. Security Considerations

* Passwords are hashed using bcrypt before storage
* Email verification ensures only valid users can access the system
* Invalid login attempts are handled securely
* Sensitive data is stored using environment variables

---

## 8. Limitations

* No real-time updates (requires manual refresh)
* No WebSocket integration yet
* Basic UI (focus is on backend logic)

---

## 9. Conclusion

SeatSecure demonstrates practical backend engineering concepts, especially handling concurrency in booking systems and implementing secure authentication flows. The project is structured to reflect real-world application design and can be extended into a full-scale production system.

---

## 11. Demo

YouTube Demo: https://www.youtube.com/watch?v=r0TPiGirfE4

---
