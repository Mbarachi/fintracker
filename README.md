# Personal Finance App

A small personal finance demo application built with React + TypeScript. It implements a Login screen, Dashboard, Transactions list with filters/pagination, and a Transaction detail page. The app uses TanStack Query for data fetching and Tailwind CSS for styling.

## Tech stack

- React 18+ (TypeScript)
- React Router
- TanStack Query (@tanstack/react-query)
- Tailwind CSS
- Axios for API calls
- Vite for build/dev

## Quick start

1. Clone

```bash
git clone https://github.com/Mbarachi/fintracker.git
cd fintracker
```

2. Install dependencies

```bash
npm install
# or: yarn install
```

3. Run dev server

```bash
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

4. Build for production

```bash
npm run build
```

## Credentials (demo)

Use the following credentials to sign in locally:

- Email: `user@test.com`
- Password: `password`

## Environment / configuration

No environment variables are required for local development with the included setup. The API client uses a relative base path ("/"). If you point the app at a remote backend, configure your proxy or backend host accordingly.

## Project structure (high level)

- `src/pages` — route pages (Login, Dashboard, Transactions, TransactionDetail)
- `src/components` — reusable UI components (tables, cards, layout)
- `src/hooks` — TanStack Query hooks (useLogin, useDashboardStats, useTransactions, useTransactionById)
- `src/services` — API calls (authService, dashboardService, transactionService)
- `public` — includes MSW mock worker for local development

## Routing & auth

- The app uses protected routes: unauthenticated users are redirected to `/login`.
- The login flow in this take-home uses a small simulated delay in `useLogin` and caches the user with React Query for demo purposes. In a real integration, remove the simulated delay and rely on the backend response.

## Known limitations & trade-offs

- Client-side login validation is simulated in `useLogin` (small artificial delay). This is intentional for the demo. For production, the hook should call the backend and handle server errors.

## How to verify

1. `npm install && npm run dev`
2. Visit the app, log in with the demo credentials
3. Dashboard should show account summary and recent transactions
4. Transactions page: filter by merchant/date, use pagination, click a transaction to view details

## Troubleshooting

- If you hit dependency errors:

```bash
rm -rf node_modules package-lock.json yarn.lock
npm install
```

- If routes appear blank, ensure you're visiting the correct port printed by Vite and that MSW (mock service worker) is correctly loaded in dev.
