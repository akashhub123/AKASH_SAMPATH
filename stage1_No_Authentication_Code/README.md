STAGE 1 - NO AUTHENTICATION

Goal: React can call Spring Boot without logging in.

Run:
  copy .env.example .env
  docker compose up --build

Open:
  http://localhost:3000

Expected:
  Customer page opens immediately.
  Save Customer works without username/password.
