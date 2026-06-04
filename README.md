# FitFusion

FitFusion is a full-stack fitness and wellness web application that helps users track nutrition, workouts, progress, and mindfulness in one place. The project combines a **React + Vite** frontend with an **Express + MongoDB** backend, using JWT authentication for protected features.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Frontend Routes](#frontend-routes)
- [Backend API](#backend-api)
- [Authentication](#authentication)
- [Data Models](#data-models)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Public (no login required)

| Feature | Description |
|--------|-------------|
| **Home** | Landing page with feature cards, progress trackers, and navigation |
| **BMI Calculator** | Estimate Body Mass Index from height and weight |
| **Calorie Calculator** | Estimate daily calorie needs |
| **Recipes** | Browse healthy recipe content |
| **Shop** | Browse fitness-related products |
| **Water Intake** | Track daily hydration |
| **Account** | Register and log in |

### Protected (login required)

| Feature | Description |
|--------|-------------|
| **Dashboard** | User profile banner, progress tracking, order history |
| **Diet Chart** | Meal and nutrition planning |
| **Workout Routine** | Structured workout plans |
| **Workout Videos** | Exercise video content |
| **Calorie Tracker** | Log and monitor calorie intake |
| **Burnt Calories** | Track calories burned from activity |
| **Yoga & Meditation** | Yoga sessions and mindfulness |
| **Yoga Music** | Relaxation and meditation audio |
| **Blog** | Fitness and wellness articles |
| **Gym Map** | Find nearby gyms (Leaflet map) |
| **Checkout** | Complete shop purchases |

Additional pages exist in the codebase (`/about`, `/contact`, services) and can be wired into routing as needed.

---

## Tech Stack

### Frontend (`Frontend/`)

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **React Router 7** — Client-side routing
- **Tailwind CSS 3** — Styling (`@tailwindcss/forms`)
- **Axios** — HTTP client for API calls
- **Sonner** — Toast notifications
- **React Leaflet** — Interactive maps (gym finder)
- **React Circular Progressbar** — Progress visuals
- **React Icons** — Icon set

### Backend (`Backend/`)

- **Node.js + Express 4** — REST API
- **MongoDB + Mongoose 8** — Database (MongoDB Atlas)
- **JWT** (`jsonwebtoken`) — Auth tokens
- **bcryptjs** — Password hashing
- **CORS** — Cross-origin requests from the frontend
- **dotenv** — Environment configuration

---

## Project Structure

```
FitFusion/
├── Frontend/                 # React SPA
│   ├── public/               # Static assets (logo, etc.)
│   ├── src/
│   │   ├── components/       # Reusable UI (navbar, BMI, shop, trackers, …)
│   │   ├── context/          # AuthContext, API base URL
│   │   ├── pages/            # Route-level views
│   │   ├── App.jsx           # Route definitions
│   │   └── main.jsx          # App entry + providers
│   ├── package.json
│   └── vite.config.js
│
├── Backend/                  # Express API
│   ├── controller/           # Request handlers
│   ├── middleware/           # JWT auth middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route modules
│   ├── server.js             # App entry point
│   └── package.json
│
└── README.md                 # This file
```

---

## Prerequisites

Before you begin, install:

- **Node.js** (v18 or newer recommended)
- **npm** (comes with Node.js)
- A **MongoDB Atlas** cluster (or local MongoDB) with credentials
- Git (optional, for cloning)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd FitFusion
```

### 2. Install dependencies

Install packages for both frontend and backend:

```bash
cd Frontend
npm install

cd ../Backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `Backend/` directory (see [Environment Variables](#environment-variables)). **Do not commit** `.env` files or secrets to version control.

### 4. Start the servers

Run the backend and frontend in separate terminals (see [Running the Application](#running-the-application)).

---

## Environment Variables

Create `Backend/.env` with the following:

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | API port (default: `3500`) |
| `MONGO_USER` | Yes | MongoDB Atlas username |
| `MONGO_PASSWORD` | Yes | MongoDB Atlas password |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |

Example:

```env
PORT=3500
MONGO_USER=your_atlas_user
MONGO_PASSWORD=your_atlas_password
JWT_SECRET=your_long_random_secret_string
```

The MongoDB connection string in `server.js` targets the **FitFusion** Atlas cluster. Update `server.js` if you use a different cluster or database name.

The frontend API base URL is set in `Frontend/src/context/api.jsx`:

```js
export const backend = "http://localhost:3500/api"
```

Change this when deploying to production.

---

## Running the Application

### Backend (API)

From the `Backend/` directory:

```bash
node server.js
```

You should see:

- `Database connected successfully`
- `Server running on port 3500` (or your configured `PORT`)

### Frontend (UI)

From the `Frontend/` directory:

```bash
npm run dev
```

Vite typically serves the app at **http://localhost:5173**. Open that URL in your browser.

### Other useful commands

| Location | Command | Purpose |
|----------|---------|---------|
| `Frontend/` | `npm run build` | Production build |
| `Frontend/` | `npm run preview` | Preview production build |
| `Frontend/` | `npm run lint` | Run ESLint |

---

## Frontend Routes

| Path | Page | Auth |
|------|------|------|
| `/` | Home | Public |
| `/login` | Login | Public |
| `/createaccount` | Register | Public |
| `/bmi` | BMI calculator | Public |
| `/recipe` | Recipes | Public |
| `/caloriescalc` | Calorie calculator | Public |
| `/shop` | Shop | Public |
| `/water-intake` | Water intake tracker | Public |
| `/dashboard` | User dashboard | Protected |
| `/checkout` | Checkout | Protected |
| `/workoutroutine` | Workout routine | Protected |
| `/workoutvideo` | Workout videos | Protected |
| `/caloriestracker`, `/caltracker` | Calorie tracker | Protected |
| `/dietchart` | Diet chart | Protected |
| `/yoga` | Yoga & meditation | Protected |
| `/yogamusic` | Yoga music | Protected |
| `/blog` | Blog | Protected |
| `/gymmap` | Gym map | Protected |
| `/burntcal` | Burnt calories | Protected |
| `*` | 404 page | Public |

Protected routes use `ProtectedRoute`, which redirects unauthenticated users to the home page if no `authToken` is stored in `localStorage`.

---

## Backend API

### Currently mounted (`server.js`)

All user routes are prefixed with **`/api/users`**.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/users/create` | No | Register a new user |
| `POST` | `/api/users/login` | No | Login; returns JWT + user info |
| `GET` | `/api/users/me` | Yes | Get authenticated user profile |
| `PUT` | `/api/users/update` | Yes | Update current user |
| `DELETE` | `/api/users/delete` | Yes | Delete current user |
| `GET` | `/api/users/all` | Yes | List all users |
| `GET` | `/api/users/:id` | Yes | Get user by ID |
| `PUT` | `/api/users/:id` | Yes | Update user by ID |
| `DELETE` | `/api/users/:id` | Yes | Delete user by ID |

**Auth header format:** `Authorization: Bearer <token>`

### Example: Register

```bash
curl -X POST http://localhost:3500/api/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane",
    "email": "jane@example.com",
    "phoneNumber": "1234567890",
    "password": "securePassword",
    "dob": "1990-01-15"
  }'
```

### Example: Login

```bash
curl -X POST http://localhost:3500/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "jane@example.com", "password": "securePassword"}'
```

### Routes defined but not yet mounted in `server.js`

The repository includes additional route modules that can be registered in `server.js`:

- **Products** — `routes/ProductRoutes.js`
- **Orders** — `routes/OrderRoutes.js`
- **Recipes** — `routes/RecipeRoutes.js`
- **Progress** — `routes/ProgressRoutes.js`
- **Meals** — `routes/MealRoutes.js` (placeholder)

Mount them with `app.use('/api/products', productRoutes)` (and similar) after fixing any import path inconsistencies (`controller` vs `controllers`).

---

## Authentication

1. User registers via **`POST /api/users/create`** or logs in via **`POST /api/users/login`**.
2. On successful login, the API returns a **JWT** (24-hour expiry) and user metadata.
3. The frontend stores `authToken` and `userId` in **`localStorage`** via `AuthContext`.
4. Protected API calls send `Authorization: Bearer <token>`.
5. `AuthMiddleware` verifies the token and attaches `req.user` (includes `userId`, `email`).
6. Logout clears `localStorage` and resets context state.

---

## Data Models

### User

- Profile: `username`, `email`, `phoneNumber`, `password` (hashed), `dob`, `height`, `weight`
- **Virtual fields:** `age`, `BMI`, `calories` (maintenance estimate via Mifflin-St Jeor–style BMR)

### Product

- `name`, `price`, `category`, `imageUrl`, `description`

### Order

- `products[]` (productId + quantity), `totalAmount`, `userId`, `createdAt`

### Recipe

- `imgSrc`, `altText`, `title`, `description`

### Progress

- `userId`, `weight`, `height`, `note`, `createdAt`

---

## Development Notes

- **Monorepo layout:** Frontend and Backend are separate npm projects; install and run each independently.
- **CORS:** Enabled globally on the API for local development with the Vite dev server.
- **Password hashing:** Handled in the User model `pre('save')` hook; do not hash passwords again in controllers before save.
- **Backend `package.json`:** The `dev` script currently references Vite; use `node server.js` to run the API until a dedicated script (e.g. `"start": "node server.js"`) is added.
- **Deployment:** Update `Frontend/src/context/api.jsx` to your production API URL and ensure Atlas network access allows your server IP.

---

## Contributing

1. Fork the repository and create a feature branch.
2. Follow existing code style (React functional components, Express route modules, Mongoose models).
3. Test login, registration, and any routes you change locally.
4. Open a pull request with a clear description of changes.

---

## License

This project is provided as-is for educational and personal use. Add a specific license file (e.g. MIT) if you plan to distribute or open-source the project formally.

---

## Quick Reference

```bash
# Terminal 1 — API
cd Backend && node server.js

# Terminal 2 — UI
cd Frontend && npm run dev
```

| Service | Default URL |
|---------|-------------|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3500/api |
