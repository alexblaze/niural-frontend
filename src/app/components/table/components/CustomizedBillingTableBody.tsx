import { InvoiceItem } from "app/components/types/types";
import { isEmpty } from "lodash";
import React from "react";

interface CustomizedBillingTableBodyProps {
  slicedData: InvoiceItem[];
  calculateStatus: (dueDate: string) => string;
}

const CustomizedBillingTableBody: React.FC<CustomizedBillingTableBodyProps> = ({
  slicedData,
  calculateStatus,
}) => {
  console.log(slicedData);

  const renderFirstTdContent = (item: InvoiceItem) => {
    if (item.invoice_type === "NIURAL_MASTER_INVOICE") {
      const formattedDate = new Date(item.issued_date).toLocaleDateString(
        "en-US",
        {
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      );
      const contractCount = item.invoice_items.length;
      const contractPlural = contractCount > 1 ? "s" : "";

      return (
        <>
          <div className="text-neutral-light-900">
            Niural Fees - {formattedDate}
          </div>
          <div className="text-sm text-neutral-light-300">
            {contractCount} contract{contractPlural}
          </div>
        </>
      );
    } else {
      const employeeCount = item.invoice_items.length;
      const employeePlural = employeeCount > 1 ? "s" : "";

      return (
        <>
          <div className="text-neutral-light-900">
            Niural Fees - {item.issued_date}
          </div>
          <div className="text-sm text-neutral-light-300">
            {employeeCount} employee{employeePlural}
          </div>
        </>
      );
    }
  };

  return (
    <tbody>
      {!isEmpty(slicedData) &&
        slicedData.map((item: InvoiceItem) => (
          <tr key={item.invoice_id}>
            <td className="p-2">{renderFirstTdContent(item)}</td>
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
                <div>{calculateStatus(item.due_date)}</div>
              </div>
            </td>
            <td className="p-2">{"$ " + item.total_amount.toFixed(2)}</td>

            {/* Render other table cells here */}
          </tr>
        ))}
    </tbody>
  );
};

export default CustomizedBillingTableBody;
