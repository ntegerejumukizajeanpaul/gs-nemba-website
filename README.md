# Groupe Scolaire Nemba - Website

This repository contains a complete production-ready website for Groupe Scolaire Nemba.

Structure:
- `frontend/` - React + Vite frontend
- `backend/` - Express.js REST API with MySQL

Quick start (local):

1. Frontend

- cd frontend
- npm install
- create `.env` file with `VITE_API_URL=http://localhost:5000/api`
- npm run dev

2. Backend

- cd backend
- npm install
- copy `.env.example` to `.env` and fill DB credentials
- Ensure MySQL is running and create database matching `DB_NAME`
- npm run dev

API endpoints: served under `/api`. See `backend` source for full list.

Deployment notes:
- Frontend optimized for Vercel: build with `npm run build` and deploy `dist`.
- Backend ready for Render or Railway: ensure environment variables and `uploads/` are configured.

Security:
- JWT authentication for admin routes
- Helmet, CORS and rate limiting enabled

For detailed deployment steps, see `DEPLOY.md` in the repo.
