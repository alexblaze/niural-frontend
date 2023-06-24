import { ActionType } from "../invoiceTable/type";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import { axiosInstance } from "app/components/interceptor/axiosInterceptor";
import { Action } from "../invoiceTable/invoiceDataReducer";

export const fetchTableData = (contract_type: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // Make the dynamic request using axios
      const { data } = await axiosInstance.get(
        `/invoices?statuses=PAYMENT_PENDING&types=${contract_type}`
      );

      // Dispatch the action with the response data
      dispatch({
        type: ActionType.FETCH_INVOICE_DATA,
        contract_type: contract_type,
        payload: data,
      });

      // Show success toast message
      toast.success("Data retrieved successfully");
    } catch (error: any) {
      // Handle any errors
      // You can dispatch an action or show an error message here
      toast.error(error?.message);
    }
  };
};

export const fetchBillingTableData = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const contractTypes = ["NIURAL_MASTER_INVOICE", "PAYROLL_INVOICE"];
      const requests = contractTypes.map(async (contract_type) => {
        const { data } = await axiosInstance.get(
          `/invoices?statuses=PAYMENT_PENDING&types=${contract_type}`
        );
        return data?.items;
      });

      const responses = await Promise.all(requests);
      const mergedData = responses.reduce(
        (result, data) => [...result, ...data],
        []
      );

      dispatch({
        type: ActionType.FETCH_BILLING_DATA,
        contract_type: contractTypes.join(","),
        payload: mergedData,
      });

      // Show success toast message
      toast.success("Billing Data retrieved successfully");
    } catch (error: any) {
      // Handle any errors
      // You can dispatch an action or show an error message here
      toast.error(error?.message);
    }
  };
};
