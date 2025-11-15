import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@components/layout/AppLayout";
import LoginPage from "./pages/Login/LoginPage";
import { Dashboard } from "./pages/dasbhboard/Dashboard";
import { TransactionsPage } from "./pages/transaction/Transactions";
import TransactionDetail from "./pages/transaction/TransactionDetail";
import { ProtectedRoute } from "@components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Public page */}
        <Route path="/login" element={<LoginPage />} />
      {/* Protected pages */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          } />
          <Route path="/transactions/:id" element={
            <ProtectedRoute>
              <TransactionDetail />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
