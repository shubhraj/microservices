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
- **Docker** (optional, upcoming)

---

## 📁 Project Structure

```
user-service/
├── controllers/
│   └── auth.controller.js
│   └── user.controller.js
├── middleware/
│   └── auth.middleware.js
│   └── error.middleware.js
│   └── rateLimiter.middleware.js
├── models/
│   └── user.model.js
├── routes/
│   └── auth.routes.js
│   └── user.routes.js
├── utils/
│   └── logger.js
├── validators/
│   └── user.validator.js
├── server.js
├── .env
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
- **Input validated** using `express-validator`

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
- No sensitive data returned (e.g. passwords)
- Centralized logging and error capture via `winston`

---

## 📦 Logging

- Uses `winston` logger
- Logs go to:
  - Console (for dev)
  - `logs/error.log` (errors only)
  - `logs/combined.log` (all levels)

---

## 🐳 Docker (Planned)

To be added:
- Dockerfile
- docker-compose.yml (with MongoDB container)

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
| Docker Support               | 🔜    |
| Tests                        | 🔜    |

---

> ✍️ Keep updating this as you enhance the service.