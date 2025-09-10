export interface Transaction {
  cardNumber: number;    // integer($int64) in API
  amount: number;        // number($double) in API
  currencyCode: string;  // string with minLength: 1
  transactionDate: string; // string($date-time) in API
  comment?: string;      // nullable: true in API
  uid?: string;          // string($uuid) for deletion
}

export interface CreateTransactionDto {
  cardNumber: number;    // integer($int64) in API - required
  amount: number;        // number($double) in API - required
  currencyCode: string;  // string with minLength: 1 - required
  transactionDate: string; // string($date-time) in API - required
  comment?: string;      // nullable: true in API - optional
}
