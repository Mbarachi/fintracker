import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";
import { transactions } from "../database";

const PAGE_SIZE = 20;

const paginate = (array: any[], page = 1) => {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  return {
    items: array.slice(startIndex, endIndex),
    pagination: {
      totalItems,
      totalPages,
      page,
      pageSize: PAGE_SIZE,
    },
  };
};

const user = {
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: "user@test.com",
  password: "password",
};

const sessionId = faker.string.uuid();

const loginHandler = http.post("/api/auth/login", async ({ request }) => {
  const credentials = (await request.clone().json()) as {
    email: string;
    password: string;
  };

  if (
    credentials.email !== user.email ||
    credentials.password !== user.password
  ) {
    return new HttpResponse(null, { status: 401 });
  }

  const { password, ...rest } = user;
  return HttpResponse.json(rest, {
    headers: { "set-cookie": `sessionId=${sessionId}` },
  });
});

const meHandler = http.get("/api/auth/me", ({ cookies }) => {
  if (!cookies.sessionId) {
    return new HttpResponse(null, { status: 401 });
  }

  const { password, ...rest } = user;
  return HttpResponse.json(rest);
});

const transactionsHandler = http.get(
  "/api/transactions",
  ({ request, cookies }) => {
    if (!cookies.sessionId) {
      return new HttpResponse(null, { status: 401 });
    }

    const url = new URL(request.url);
    const merchant = url.searchParams.get("merchant") ?? "";
    const date = url.searchParams.get("date");
    const pageParam = url.searchParams.get("page") ?? "";
    const page = pageParam ? Number(pageParam) : 1;

    const filteredTransactions = transactions
      .filter((transaction) => {
        return transaction.merchant
          .toLowerCase()
          .includes(merchant.toLowerCase());
      })
      .filter((transaction) => {
        if (!date) {
          return true;
        }
        return (
          new Date(transaction.date).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
        );
      });

    return HttpResponse.json(paginate(filteredTransactions, page));
  }
);

const transactionHandler = http.get(
  "/api/transactions/:id",
  ({ params, cookies }) => {
    if (!cookies.sessionId) {
      return new HttpResponse(null, { status: 401 });
    }

    const transaction = transactions.find((txn) => txn.id === params.id);
    return transaction
      ? HttpResponse.json(transaction)
      : new HttpResponse(null, { status: 404 });
  }
);

const dashboardHandler = http.get("/api/dashboard/stats", ({ cookies }) => {
  if (!cookies.sessionId) {
    return new HttpResponse(null, { status: 401 });
  }

  const mostRecentTransactions = transactions.filter((_, i) => i < 5);
  const expensesAmount = transactions
    .filter((txn) => txn.amount < 0)
    .reduce((total, curr) => (total += curr.amount), 0);
  const incomeAmount = transactions
    .filter((txn) => txn.amount > 0)
    .reduce((total, curr) => (total += curr.amount), 0);

  const json = {
    mostRecentTransactions,
    expenses: {
      amount: expensesAmount,
      currency: "USD",
    },
    income: {
      amount: incomeAmount,
      currency: "USD",
    },
  };

  return HttpResponse.json(json);
});

export const apiHandlers = [
  loginHandler,
  meHandler,
  dashboardHandler,
  transactionsHandler,
  transactionHandler,
];
