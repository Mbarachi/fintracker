import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setupWorker } from "msw/browser";
import "./index.css";
import { apiHandlers } from "./lib/api.ts";
import App from "./App.tsx";

const worker = setupWorker(...apiHandlers);

const setupMocking = async () => worker.start();

setupMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
