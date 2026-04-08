# ProBur Full-Stack
Full-stack web application for construction tool rental.
## Live Demo
- Frontend: https://probur-fullstack.vercel.app/
- Backend: https://probur-api.onrender.com/
## Tech Stack
### Frontend
- React
- Vite
- CSS
### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT authentication
## Features
- User registration
- User login
- Cross-device authentication
- Product catalog with 40 tools
- Cart and checkout flow
- Order creation through backend API
- Order history in user account
- Responsive interface
- SPA routing with refresh support on Vercel
## Project Structure
`	ext
tool-rental/
client/   # React frontend
server/   # Express + Prisma backend
`
## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/orders/me
- POST /api/orders
## Local Setup
### Frontend
`ash
cd tool-rental/client
npm install
npm run dev
`
### Backend
`ash
cd tool-rental/server
npm install
npm start
`
## Environment Variables
Backend:
- DATABASE_URL
- JWT_SECRET
Frontend:
- VITE_API_URL
## About This Project
This project was built as a portfolio full-stack application to demonstrate frontend development, backend API design, authentication, database integration, deployment, and cross-device testing.
