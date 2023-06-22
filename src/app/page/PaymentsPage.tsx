import CustomTableLayout from "app/components/layout/CustomTableLayout";
import React, { ReactNode, useState } from "react";

interface PaymentsPageProps {
  children: ReactNode;
}

const PaymentsPage: React.FC<PaymentsPageProps> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className=" p-8 text-neutral-light-900 bg-neutral-light-50 h-full">
      <div className="pb-4">
        <h1 className="text-3xl font-bold">Payment</h1>
      </div>
      <div className="pb-8">
        <div className="relative">
          <div className="flex justify-between">
            <div className="flex gap-x-3">
              <div>
                <img key="image" src="assets/Vector.svg" alt="filter" />
              </div>
              <div>Filter By:</div>
            </div>
            <div className="relative">
              <button
                className="flex bg-neutral-light-0 border-solid border rounded-xl neutral-light-1000 items-center px-5 py-3 "
                onClick={toggleDropdown}
              >
                <img
                  src={"assets/dropdown.svg"}
                  alt="dropdown"
                  className={`h-4 w-4 mr-1 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
                <span className="mr-6">
                  {selectedOption || "Contract type"}
                </span>

                <svg
                  width="22"
                  height="22"
                  className={`h-5 w-5 ${
                    isDropdownOpen ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.28577 8.64288L11.0001 13.3572L15.7143 8.64288"
                    stroke="#14171C"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute z-10 w-full bg-white py-1 mt-1 border border-gray-300 rounded-md shadow-lg">
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick("Fixed Contract")}
                  >
                    Fixed Contract
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick("Milestone Contract")}
                  >
                    Milestone Contract
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleOptionClick("Hourly Contract")}
                  >
                    Hourly Contract
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <CustomTableLayout>{children}</CustomTableLayout>
    </div>
  );
};

export default PaymentsPage;
