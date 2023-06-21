import { combineReducers } from "redux";
import invoiceDataReducer from "./invoiceTable/invoiceDataReducer";
export default combineReducers({
  invoiceData: invoiceDataReducer,
});
export type State = ReturnType<typeof combineReducers>;
