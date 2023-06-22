import BillingPage from "app/page/BillingPage";
import PaymentsPage from "app/page/PaymentsPage";
import InvoicePage from "app/page/InvoicePage";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaymentsPage />}>
          <Route path="/" element={<InvoicePage />} />
          <Route path="/billing" element={<BillingPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
