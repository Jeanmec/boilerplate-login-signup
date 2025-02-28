# Boilerplate Login & Signup

This project is a boilerplate for authentication, including user registration, login, and email verification. It consists of a frontend built with Next.js (TypeScript) and a backend developed using NestJS (TypeScript). The authentication flow includes email verification using Redis for temporary code storage and PostgreSQL as the main database. Email templates are rendered with EJS.

## 🚀 Features

- 🔐 Secure authentication with JWT
- 📧 Email verification and password reset
- 🏗️ Built with Next.js (frontend) & NestJS (backend)
- 🛠️ Uses PostgreSQL for user data storage
- ⚡ Fast Redis-based email code handling
- 🎨 Styled email templates with EJS

---

## 📌 Frontend

The frontend provides the following routes:

- **🔑 Login**: Allows users to authenticate using their credentials.
- **📝 Signup**: Enables users to create an account. A verification code is sent to their email.
- **📊 Dashboard**: Displays user information. This route is protected by a middleware that requires email verification.

The frontend is built using **Next.js with TypeScript** and utilizes **Axios** for API calls.

### 🔧 Environment Variables

Before running the frontend, create a `.env` file in the root directory and add:

```env
API_URL=
```

### ▶️ Running the Frontend

```sh
yarn install
yarn dev
```

---

## 🛠 Backend

The backend is built with **NestJS (TypeScript)** and uses:

- **📌 Redis**: Stores verification codes for email validation and password reset.
- **🗄 PostgreSQL**: Main database for user management.
- **📧 EJS**: For email templates.

### 🔧 Environment Variables

Before running the backend, create a `.env` file in the root directory and configure the following:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=myUsername
POSTGRES_PASSWORD=MyPassword
POSTGRES_DB=myDbName
PORT=5000

JWT_SECRET=randomSecret
JWT_EXPIRES=3d

NODEMAILER_HOST=mail.example.com
NODEMAILER_PORT=465
NODEMAILER_SECURE=false
NODEMAILER_AUTH_USER=contact@example.com
NODEMAILER_AUTH_PASS=MyPassword
NODEMAIL_CONTACT_HEADER="Contact Example <contact@example.com>"
```

### ▶️ Running the Backend

Start the backend using Docker:

```sh
docker-compose up -d
```

To view backend logs:

```sh
docker-compose logs -f backend
```

To enter the backend container:

```sh
docker exec -it boilerplate_backend bash
```

To stop all containers:

```sh
docker-compose down
```
