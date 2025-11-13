import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@components/layout/AppLayout";
import LoginPage from "./pages/Login/LoginPage";
import { Dashboard } from "./pages/dasbhboard/Dashboard";
import { TransactionsPage } from "./pages/transaction/Transactions";
import TransactionDetail from "./pages/transaction/TransactionDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Public page */}
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/:id" element={<TransactionDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
