STAGE 3 - GOOGLE OAUTH2 + BASIC AUTH + AUTHORIZATION

Set these in .env:
  GOOGLE_CLIENT_ID=...
  GOOGLE_CLIENT_SECRET=...
  GOOGLE_ADMIN_EMAIL=your-google-email@gmail.com

Google redirect URI:
  http://localhost:8080/login/oauth2/code/google

Run:
  docker compose up --build

Open:
  http://localhost:3000

Expected:
  Basic login still works.
  Continue with Google opens Google login.
  GOOGLE_ADMIN_EMAIL gets ROLE_ADMIN; other Google users get ROLE_USER.
