import { InvoiceItem } from "./../types/types";
import { axiosInstance } from "../interceptor/axiosInterceptor";

export const getInvoice = async (): Promise<InvoiceItem> => {
  const { data } = await axiosInstance.get(
    "/invoices?statuses=PAYMENT_PENDING&types=CONTRACT_INVOICE"
  );
  return data?.items as InvoiceItem;
};
