export {};
export interface InvoiceData {
  items: InvoiceItem[];
  last_evaluated_key: null | string; // Depending on the actual type
}
export interface InvoiceItem {
  contract_document_type: string;
  metadata: {
    contractor_full_name: string;
    contract_type: string;
    contract_document_type: string;
    contractor_id: string;
    contract_id: string;
    contractor_email: string;
    contractor_type: string;
    contract_title: string;
    contractor_entity_name: string | null;
  };
  currency: string;
  invoice_items: {
    quantity: number;
    total_discount: number;
    references: any[];
    total_amount: number;
    cost_per_unit: number;
    description: string;
    discount_per_unit: number;
  }[];
  payer_id: string;
  status: string;
  payment_frequency: string;
  contract_title: string;
  employer_id: string;
  payee_id: string;
  payee_type: string;
  invoice_type: string;
  payer_type: string;
  terms_and_conditions: string;
  payer_name: string;
  special_note: string;
  cycle_start_date: string;
  SK: string;
  payer_address: {
    zipcode: string;
    country: {
      name: string;
      iso2: string;
    };
    state: {
      name: string;
      iso2: string;
    };
    address_line1: string;
    city: string;
  };
  payee_name: string;
  contract_rate: number;
  cycle_end_date: string;
  working_days: number;
  payee_address: {
    zipcode: string;
    country: {
      name: string;
      iso2: string;
    };
    state: {
      name: string;
      iso2: string;
    };
    address_line2: string;
    address_line1: string;
    city: string;
  };
  issued_date: string;
  contract_id: string;
  due_date: string;
  contractor_id: string;
  payee_email: string;
  contract_invoice: string;
  contract_type: string;
  payer_email: string;
  invoice_id: string;
  payment_adjustment: string;
  remarks: string;
  PK: string;
  niural_due_date: string;
  total_amount: number;
}
