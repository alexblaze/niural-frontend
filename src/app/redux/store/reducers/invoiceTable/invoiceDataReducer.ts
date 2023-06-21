import { Action } from "app/redux/actions/invoiceTable";
import { ActionType } from "./type";

const initialState = {
  error: null,
  data: [],
  page: 0,
};

const invoiceDataReducer = (state: object = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_INVOICE_DATA:
      return fetchInvoiceData(action);
    default:
      return state;
  }
};

const fetchInvoiceData = (action: any) => {
  console.log(action);
  let updatedStateData = {
    ...initialState,
    data: action?.payload?.items,
  };
  return updatedStateData;
};

export default invoiceDataReducer;
