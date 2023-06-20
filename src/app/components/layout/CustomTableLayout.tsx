import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
interface CustomTableProps {
  children: ReactNode;
}
const CustomTableLayout: React.FC<CustomTableProps> = ({ children }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Your Invoices</div>
        <div>
          <NavLink to="/">Invoice</NavLink>
          <NavLink to="/billing">Billing</NavLink>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CustomTableLayout;
