import React, { useState } from "react";
import { InvoiceItem } from "../types/types";
import { slice, isEmpty, sumBy } from "lodash";
import CustomizedTableHeader from "./components/CustomizedTableHeader";
import { Column } from "./types";
import CustomizedCheckBox from "../checkbox/CustomizedCheckBox";

interface CustomTableProps {
  invData: InvoiceItem[];
  columns: Column[];
  selectable: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  invData: data,
  columns,
  selectable,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<InvoiceItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!data) return <div>Loading</div>;

  const calculateStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);

    if (due < today) {
      return "Overdue";
    } else if (due.getDate() === today.getDate()) {
      return "Due Today";
    } else {
      return "Due on " + due.toLocaleDateString();
    }
  };

  const slicedData = slice(
    data as unknown as InvoiceItem[],
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Type assertion to InvoiceItem[]

  const totalAmount = sumBy(slicedData, "total_amount");

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(slicedData);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (item: InvoiceItem) => {
    const isSelected = selectedRows.includes(item);
    let updatedSelectedRows: InvoiceItem[];

    if (isSelected) {
      updatedSelectedRows = selectedRows.filter((row) => row !== item);
    } else {
      updatedSelectedRows = [...selectedRows, item];
    }

    setSelectedRows(updatedSelectedRows);
  };

  const getDescription = (item: InvoiceItem) => {
    if (item.invoice_items && item.invoice_items.length > 0) {
      const invoiceItem = item.invoice_items[0];

      // For contract invoices without invoice items
      return `${invoiceItem.description}  ${item.cycle_start_date} - ${item.cycle_end_date}`;
    } else if (item?.contract_type === "PAY_AS_YOU_GO") {
      return `Pay as you Go ${item?.contract_rate}`;
    }
  };

  const getContractName = (item: InvoiceItem) => {
    let contractName = "";

    switch (item.contract_type) {
      case "FIXED":
        contractName += "Fixed Contract";
        break;
      case "MILESTONE":
        contractName += "Milestone Contract";
        break;
      case "PAY_AS_YOU_GO":
        contractName += "Hourly Contract";
        break;
      default:
        break;
    }
    return contractName;
  };

  const getPageRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, slicedData.length);
    return `${start}-${end}`;
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToSelectedPage = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <table className="min-w-full">
        <CustomizedTableHeader
          columns={columns}
          selectable={selectable}
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
        />
        <tbody className="">
          {!isEmpty(slicedData) &&
            slicedData.map((item: InvoiceItem) => (
              <tr key={item.invoice_id}>
                <td className="p-2">
                  <CustomizedCheckBox
                    selectedRows={selectedRows}
                    handleSelectRow={handleSelectRow}
                    item={item}
                    selectable={false}
                  />
                </td>
                <td className="p-2">
                  <div>
                    <div className="flex">
                      {item.contract_title}
                      {item.contract_document_type === "NIURAL_ARMOR" ? (
                        <img src="/assets/verified.svg" alt="verified" />
                      ) : (
                        <img src="/assets/unverified.svg" alt="unverified" />
                      )}
                    </div>
                    <div>{getContractName(item)}</div>
                  </div>
                </td>
                <td className="p-2">{getDescription(item)}</td>
                <td className="p-2">{calculateStatus(item.niural_due_date)}</td>
                <td className="p-2"></td>
                <td className="p-2">{"$ " + item.total_amount.toFixed(2)}</td>
              </tr>
            ))}
          {!isEmpty(data) && (
            <tr className="bg-neutral-light-50 ">
              <td className="p-2 text-base font-semibold" colSpan={3}>
                {selectedRows?.length + " Contracts Selected"}
              </td>

              <td className="p-2 text-base font-semibold">Total:</td>
              <td className="p-2"></td>

              <td className="p-2 text-base font-semibold">
                {"$ " + totalAmount.toFixed(2)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
    </div>
  );
};

export default CustomTable;
