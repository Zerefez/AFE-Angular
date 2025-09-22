export interface CreditCard {
  cardNumber: number; // integer($int64) in API
  cscCode: number;    // integer($int32) in API
  cardHolderName: string;
  expirationMonth: number; // integer($int32) in API
  expirationYear: number;  // integer($int32) in API
  issuer: string;
}

// For backward compatibility with existing code
export interface CreditCardLegacy {
  card_number: number;
  csc_code: number;
  cardholder_name: string;
  expiration_date_month: number;
  expiration_date_year: number;
  uid?: string;
  issuer: string;
}
