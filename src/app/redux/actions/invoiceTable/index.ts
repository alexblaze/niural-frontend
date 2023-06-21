import { ActionType } from "./../../store/reducers/invoiceTable/type";
// import { Dispatch } from "redux";
// import { toast } from "react-toastify";
// import { FETCH_INVOICE_DATA } from "app/redux/store/reducers/invoiceTable/type";
// import { axiosInstance } from "app/components/interceptor/axiosInterceptor";

// export const fetchPaginatedTable = (contract_type: string) => {
//   return async (dispatch: Dispatch) => {
//     try {
//       // Make the dynamic request using axios
//       const { data } = await axiosInstance.get(
//         `/invoices?statuses=PAYMENT_PENDING&types=${contract_type}`
//       );

//       // Dispatch the action with the response data
//       dispatch({
//         type: FETCH_INVOICE_DATA,
//         contract_type: contract_type,
//         data: data?.items, // Assuming data.items is the relevant part of the response
//       });

//       // Show success toast message
//       toast.success("Data retrieved successfully");
//     } catch (error) {
//       // Handle any errors
//       // You can dispatch an action or show an error message here
//       console.error("Error fetching invoice table:", error);
//     }
//   };
// };

interface FetchInvoices {
  type: ActionType.FETCH_INVOICE_DATA;
  payload: string;
}

export type Action = FetchInvoices;
