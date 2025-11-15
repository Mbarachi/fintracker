import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setupWorker } from "msw/browser";
import "./index.css";
import { apiHandlers } from "@lib/api.ts";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const worker = setupWorker(...apiHandlers);

const setupMocking = async () => worker.start();

const queryClient = new QueryClient();

setupMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </StrictMode>
  );
});
