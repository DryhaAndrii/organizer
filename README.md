# Organizer (frontend + backend + Postgres)

A simple calendar/TODO app: React frontend, Node/Express backend, and Postgres for users and tasks. Ships with a Docker setup and Nginx reverse proxy for the API.

## Quick start (Docker)

Prerequisite: Docker Desktop installed.

1) Build and start containers:
```
docker compose up -d --build
```

2) Open the frontend:
```
http://localhost:3000
```

Services and ports:
- frontend (Nginx) — 3000/tcp, serves the React build and proxies the API
- backend (Node/Express) — 4000/tcp
- db (Postgres 15) — 5432/tcp

Default DB access:
- host: localhost
- port: 5432
- user: app
- password: app
- database: organizer

Database schema is initialized automatically from `back/db/init.sql`.

## Local development without Docker (optional)

Run Postgres separately (e.g., via Docker) or install locally, then:
```
npm i
npm run backend-start  # starts Express on 4000
npm start              # CRA dev server on 3000
```
The frontend proxies `/api/*` to the backend via the `proxy` field in `package.json`.

## Architecture

- Frontend: CRA (React 17), served by Nginx. All API requests go to `/api/*` and are proxied to `backend:4000` inside the Docker network.
- Backend: Node/Express with routes: `/login`, `/register`, `/get-days`, `/get-day`, `/addToList`, `/removeFromList`.
- DB: Postgres. Tables: `users` (bcrypt password hash), `todos` (per user and date).

## Environment variables (backend)

Set in `docker-compose.yml`:
- `PGHOST=db`
- `PGPORT=5432`
- `PGUSER=app`
- `PGPASSWORD=app`
- `PGDATABASE=organizer`

You can override these for local development via env vars.

## Troubleshooting

- Port 3000 in use: close the process or accept another port when CRA prompts. In Docker, the frontend is always on 3000.
- First-time registration: create a user via the registration form — the password is hashed (`bcrypt`).
- Clean rebuild Docker:
```
docker compose down
docker compose up -d --build
```

## License

MIT
