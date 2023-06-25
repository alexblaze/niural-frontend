import { ActionType } from "./type";
import { InvoiceData } from "app/components/types/types";
export interface ActionFetchInvoice {
  type:
    | ActionType.FETCH_INVOICE_DATA
    | ActionType.FETCH_BILLING_DATA
    | ActionType.SET_LOADING;
  contract_type: string;
  payload: InvoiceData;
}
const initialState = {
  error: null,
  data: [],
  page: 0,
  isLoading: true,
};

interface FetchInvoices {
  type:
    | ActionType.FETCH_INVOICE_DATA
    | ActionType.FETCH_BILLING_DATA
    | ActionType.SET_LOADING;
  payload: string | boolean;
}

export type Action = FetchInvoices;

const invoiceDataReducer = (
  state: object = initialState,
  action: ActionFetchInvoice
) => {
  console.log(action);
  switch (action.type) {
    case ActionType.FETCH_INVOICE_DATA:
      return fetchInvoiceData(action);
    case ActionType.FETCH_BILLING_DATA:
      return fetchBillingData(action);
    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const fetchInvoiceData = (action: ActionFetchInvoice) => {
  let updatedStateData = {
    ...initialState,
    data: action?.payload?.items,
  };
  return updatedStateData;
};

const fetchBillingData = (action: ActionFetchInvoice) => {
  let updatedStateData = {
    ...initialState,
    data: action?.payload,
  };
  return updatedStateData;
};

export default invoiceDataReducer;
