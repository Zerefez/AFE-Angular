export interface Transaction {
  cardNumber: number;
  amount: number;
  currencyCode: string;
  transactionDate: string;
  comment?: string;
  uid?: string;
}

export interface CreateTransactionDto {
  cardNumber: number;
  amount: number;
  currencyCode: string;
  transactionDate: string;
  comment?: string;
}
