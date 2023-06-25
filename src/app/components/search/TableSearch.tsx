import React, { ChangeEvent, useEffect } from "react";
import { InvoiceItem } from "../types/types";

interface TableSearchProps {
  data: InvoiceItem[];
  filteredData: InvoiceItem[];
  billingSearch: boolean;
  setFilteredData: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

const TableSearch: React.FC<TableSearchProps> = ({
  // filteredData,
  data,
  setFilteredData,
  billingSearch,
}) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredResults = data.filter((item) => {
      // Customize the search condition based on your requirements
      if (!billingSearch) {
        return (
          item.contract_title.toLowerCase().includes(searchQuery) ||
          item.payer_name.toLowerCase().includes(searchQuery) ||
          item.contract_type.toLowerCase().includes(searchQuery) ||
          (item.due_date &&
            typeof item.due_date === "string" &&
            item.due_date.toLowerCase().includes(searchQuery))
        );
      }
      return true; // Return true for all items when billingSearch is true
    });

    if (searchQuery === "") {
      setFilteredData(data); // Show all data when the search query is empty
    } else {
      setFilteredData(filteredResults);
    }
  };

  useEffect(() => {
    setFilteredData(data); // Set the initial filtered data to the full data array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center pb-7">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search by contract name, contractor name, contract type and date ..."
          className="pl-3 bg-neutral-light-50 pr-10 py-2 w-full rounded-md  focus:outline-none focus:border-primaryColor"
          onChange={handleSearch}
        />

        <svg
          width="20"
          className="h-5 w-5 absolute right-3 top-2.5 text-gray-400 pointer-events-none"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.49887 3.5C9.54421 3.49982 10.5679 3.79754 11.4502 4.35829C12.3324 4.91903 13.0365 5.71957 13.4801 6.66612C13.9237 7.61267 14.0883 8.66603 13.9547 9.7028C13.8212 10.7396 13.3949 11.7168 12.7259 12.52L16.8529 16.646C16.9415 16.7342 16.9938 16.8524 16.9996 16.9772C17.0054 17.1021 16.9642 17.2246 16.8841 17.3206C16.804 17.4166 16.6909 17.4791 16.5671 17.4958C16.4432 17.5126 16.3175 17.4823 16.2149 17.411L16.1449 17.354L12.0189 13.227C11.3401 13.7921 10.5352 14.1854 9.67223 14.3736C8.80929 14.5619 7.91371 14.5395 7.06123 14.3085C6.20876 14.0774 5.42447 13.6445 4.77469 13.0462C4.12492 12.448 3.62877 11.7021 3.32822 10.8716C3.02768 10.041 2.93156 9.15035 3.04802 8.27483C3.16447 7.39931 3.49006 6.56471 3.99726 5.84163C4.50445 5.11855 5.17833 4.52825 5.96189 4.12066C6.74545 3.71307 7.61564 3.50018 8.49887 3.5ZM8.49887 4.5C7.3054 4.5 6.16081 4.97411 5.31689 5.81802C4.47298 6.66193 3.99887 7.80653 3.99887 9C3.99887 10.1935 4.47298 11.3381 5.31689 12.182C6.16081 13.0259 7.3054 13.5 8.49887 13.5C9.69235 13.5 10.8369 13.0259 11.6809 12.182C12.5248 11.3381 12.9989 10.1935 12.9989 9C12.9989 7.80653 12.5248 6.66193 11.6809 5.81802C10.8369 4.97411 9.69235 4.5 8.49887 4.5Z"
            fill="#0BC15A"
          />
        </svg>
      </div>
      <button className="ml-2 bg-primary-light-500 text-white py-2 px-4 rounded-md hover:bg-secondaryColor transition-colors">
        Pay Invoices
      </button>
    </div>
  );
};

export default TableSearch;
