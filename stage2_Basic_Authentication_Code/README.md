STAGE 2 - BASIC AUTHENTICATION + AUTHORIZATION

Users:
  USER  = user / user123
  ADMIN = admin / admin123

Run:
  copy .env.example .env
  docker compose up --build

Open:
  http://localhost:3000

Expected:
  USER can read customers/bills.
  ADMIN can create/update/delete customers and bills.
