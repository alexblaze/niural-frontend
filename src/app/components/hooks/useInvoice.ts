import { toast } from "react-toastify";
import { getInvoice } from "../api/invoice-api";
import { useQuery, UseQueryResult } from "react-query";
import { InvoiceItem } from "../types/types";
import { useEffect } from "react";

export const useGetInvoice = (): UseQueryResult<InvoiceItem> => {
  const queryResult = useQuery<InvoiceItem>(["getInvoice"], getInvoice, {
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const { isSuccess } = queryResult;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Data retrieved successfully");
    }
  }, [isSuccess]);

  return queryResult;
};
