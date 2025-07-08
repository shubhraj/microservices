# 🧩 User Service

A microservice responsible for managing users, registration, authentication, and profile data.

---

## 🛠 Tech Stack

- **Node.js** (Express)
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation
- **express-rate-limit** for rate limiting
- **winston** for logging
- **Swagger UI** for API documentation
- **Docker** for containerization

---

## 📁 Project Structure

```
user-service/
├── controllers/
├── middleware/
├── models/
├── routes/
├── tests/
├── utils/
├── validators/
├── swagger.yaml           ✅
├── server.js
├── package.json
├── .env
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
```

---

## 📚 API Endpoints

### 🔐 Auth Endpoints (`/api/auth`)

#### `POST /register`
- Registers a new user
- Input validated (username, email, password)
- Password is hashed
- Rate limited (10 requests / 15 minutes)

#### `POST /login`
- Authenticates user
- JWT returned on success
- Rate limited

---

### 👤 User Endpoints (`/api/users`)

#### `GET /me`
- Requires JWT token
- Returns user profile (excluding password)

#### `PUT /me`
- Requires JWT token
- Updates profile fields:
  - `username`
  - `profilePic`
  - `preferences.genres`
  - `preferences.language`
- Only whitelisted fields are allowed
- Input validated using `express-validator`

---

## 🧪 Testing

- Uses **Jest** + **Supertest**
- Integration tests for `/register`, `/login`, `/me`
- No server start required during testing
- Local MongoDB or in-memory MongoDB support

---

## 🐳 Docker Setup

### 🚀 Quick Start

```bash
docker-compose up --build
```

### 🔗 docker-compose.yml

Runs:
- `user-service` on `http://localhost:5000`
- `MongoDB` on port `27017`

### 🧾 .env

Environment variables required:

```
PORT=5000
MONGO_URI=mongodb://mongo:27017/user-service
JWT_SECRET=your_jwt_secret
```

---

## 📘 Swagger Documentation

- Swagger UI available at: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- Describes all API endpoints (auth + user)
- Uses OpenAPI 3.0 via `swagger.yaml`
- JWT bearer token documented for protected routes

---

## 🧰 Middlewares

| Middleware               | Description                          |
|--------------------------|--------------------------------------|
| `auth.middleware.js`     | JWT token verification               |
| `error.middleware.js`    | Centralized error handling           |
| `rateLimiter.middleware` | Rate limiting for auth routes        |

---

## 🛡 Security Measures

- Passwords hashed using `bcrypt`
- JWT-based session management
- Rate limiting for sensitive endpoints
- Input validation with helpful messages
- Centralized logging and error capture via `winston`

---

## 📦 Logging

- Uses `winston` logger
- Logs go to:
  - Console (for dev)
  - `logs/error.log` (errors only)
  - `logs/combined.log` (all levels)

---

## ✅ Status

| Feature                      | Done? |
|------------------------------|-------|
| Register + Login             | ✅    |
| JWT Middleware               | ✅    |
| Protected Profile Route      | ✅    |
| Profile Update               | ✅    |
| Input Validation             | ✅    |
| Rate Limiting                | ✅    |
| Error Handling Middleware    | ✅    |
| Winston Logging              | ✅    |
| Docker Support               | ✅    |
| API Documentation (Swagger)  | ✅    |
| Tests                        | ✅    |

---

> ✍️ Keep updating this file as you improve the service. Well-documented services are easier to scale and debug.
