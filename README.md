# BusMate

BusMate is organized as a fullstack monorepo with an existing React frontend and a new Node.js + Express backend.

## Project Structure

```txt
BusMate/
  frontend/            React + Vite + Tailwind CSS
    src/
      config/          Frontend environment and API config
      services/        API client and feature services
  backend/             Node.js + Express API
    src/
      config/          Environment and app configuration
      controllers/     HTTP request handlers
      middlewares/     Express middlewares
      routes/          API route definitions
      services/        Business logic
      utils/           Shared helpers
```

The backend structure is ready to grow into modules such as authentication, booking, payment, tracking, and admin dashboard APIs.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Default Vite URL:

```txt
http://127.0.0.1:5173
```

Production build:

```bash
cd frontend
npm run build
```

## Backend

```bash
cd backend
npm install
npm run dev
```

Default API URL:

```txt
http://localhost:3001/api
```

Health endpoint:

```txt
GET http://localhost:3001/api/health
```

Map and tracking endpoints:

```txt
GET http://localhost:3001/api/buses/nearby
GET http://localhost:3001/api/routes/:id/tracking
```

Production start:

```bash
cd backend
npm start
```

## Environment Variables

Frontend:

```txt
VITE_API_BASE_URL=http://localhost:3001/api
```

Backend:

```txt
NODE_ENV=development
PORT=3001
CLIENT_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
```

Copy the example files when preparing local environments:

```bash
cp frontend/.env.example frontend/.env.development
cp backend/.env.example backend/.env
```

## Root Scripts

The apps can run independently from their own folders. The root package also provides convenience scripts:

```bash
npm run dev:frontend
npm run dev:backend
npm run build:frontend
npm run start:backend
npm run lint:frontend
```
