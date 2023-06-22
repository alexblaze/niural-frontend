import React from "react";
import { isEmpty } from "lodash";
import { InvoiceItem } from "app/components/types/types";

interface CustomizedTableFooterProps {
  selectedRows: InvoiceItem[];
  totalAmount: number;
  slicedData: InvoiceItem[];
  getPageRange: () => string;
  currentPage: number;
  totalPages: number;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  toggleDropdown: () => void;
  isDropdownOpen: boolean;
  goToSelectedPage: (selectedPage: number) => void;
}

const CustomizedTableFooter: React.FC<CustomizedTableFooterProps> = ({
  selectedRows,
  totalAmount,
  slicedData,
  getPageRange,
  currentPage,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  toggleDropdown,
  isDropdownOpen,
  goToSelectedPage,
}) => {
  return (
    <div className="p-2 flex justify-between ">
      <div className="flex items-center">
        Showing {getPageRange()} of {slicedData.length} items
      </div>
      <div className="pagination flex gap-3">
        <button
          className="bg-neutral-light-50 py-3 px-5 rounded-xl"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1429 14.7857L7.85718 10.4999L12.1429 6.21423"
              fill="#14171C"
            />
            <path
              d="M12.1429 14.7857L7.85718 10.4999L12.1429 6.21423"
              stroke="#14171C"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative bg-neutral-light-50 py-3 px-5 rounded-xl">
          <button className="flex" onClick={toggleDropdown}>
            <span className="mr-6">{currentPage}</span>
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
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full bg-white py-1 mt-1 border border-gray-300 rounded-md shadow-lg">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index + 1}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => goToSelectedPage(index + 1)}
                >
                  {index + 1}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="bg-neutral-light-50 py-3 px-5 rounded-xl"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.85718 14.7857L12.1429 10.4999L7.85718 6.21423"
              fill="#14171C"
            />
            <path
              d="M7.85718 14.7857L12.1429 10.4999L7.85718 6.21423"
              stroke="#14171C"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomizedTableFooter;
