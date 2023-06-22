import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
interface CustomTableProps {
  children: ReactNode;
}
const CustomTableLayout: React.FC<CustomTableProps> = ({ children }) => {
  const activeStyle = {
    background: "#BAFBD6",
    borderRadius: "8px",
    color: "#077737",
  };
  return (
    <div>
      <div className="py-10 px-6 border border-neutal-light-0 rounded-xl bg-neutral-light-0">
        <div className="flex justify-between pb-9">
          <div className="text-2xl font-bold">Your Invoices</div>
          <div className="p-1 border rounded-xl border-neutral-light-100">
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="px-5 py-1  rounded-lg "
              to="/"
            >
              Invoice (4)
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              className="px-5 py-1  rounded-lg"
              to="/billing"
            >
              Billing (2)
            </NavLink>
          </div>
        </div>
        {children}
      </div>
      <div className="flex justify-center mt-6">
        <button className="px-48 py-3 rounded-xl bg-primary-light-500 text-neutral-light-0">
          Pay Invoices
        </button>
      </div>
    </div>
  );
};

export default CustomTableLayout;
