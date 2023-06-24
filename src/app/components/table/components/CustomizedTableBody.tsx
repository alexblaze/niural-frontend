import React from "react";
import { isEmpty } from "lodash";
import { InvoiceItem } from "app/components/types/types";
import CustomizedCheckBox from "app/components/checkbox/CustomizedCheckBox";

interface CustomTableBodyProps {
  slicedData: InvoiceItem[];
  selectedRows: InvoiceItem[];
  handleSelectRow: (item: InvoiceItem) => void;
  getDescription: (item: InvoiceItem) => string | undefined;
  calculateStatus: (dueDate: string) => string;
  getContractName: (item: InvoiceItem) => string;
  totalAmount: number;
}

const CustomizedTableBody: React.FC<CustomTableBodyProps> = ({
  slicedData,
  selectedRows,
  handleSelectRow,
  getDescription,
  calculateStatus,
  getContractName,
  totalAmount,
}) => {
  return (
    <tbody>
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
            <td className="p-2">
              <div className="flex gap-3 items-center">
                <div
                  className={`inline-block rounded-full w-2 h-2 ${
                    calculateStatus(item.due_date) === "Overdue"
                      ? "bg-error-light-500"
                      : calculateStatus(item.due_date) === "Due Today"
                      ? "bg-yellow-light-500"
                      : "bg-primary-light-500"
                  }`}
                />
                <div>{calculateStatus(item.niural_due_date)}</div>
              </div>
            </td>
            <td className="p-2"></td>
            <td className="p-2">{"$ " + item.total_amount.toFixed(2)}</td>
          </tr>
        ))}
      {!isEmpty(slicedData) && (
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
  );
};

export default CustomizedTableBody;
