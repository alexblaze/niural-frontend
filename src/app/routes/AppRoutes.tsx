import BillingPage from 'app/page/BillingPage';
import PaymentsPage from 'app/page/PaymentsPage';
import InvoicePage from 'app/page/InvoicePage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PaymentsPage children={<InvoicePage />} />}>
          <Route path='billing' element={<BillingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
