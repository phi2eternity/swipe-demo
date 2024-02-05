export interface CreditCardInformation {
  card_number: string;
  cvv: string;
  exp_date: string;
  brand: string;
  address: Address;
  cardholder_name: string;
}

export interface Address {
  city: string;
  country: string;
  address_line_1: string;
  address_line_2?: string;
  postal_code: string;
  state: string;
}

export enum CreditCardBrand {
  PINDebit = "PIN Debit",
  Visa = "Visa",
  EBT = "EBT",
  MasterCard = "MasterCard",
  Discover = "Discover",
  Amex = "American Express",
  DinersClub = "Diners Club",
  JCB = "JCB",
  VisaDebit = "Visa (debit)"
}

export interface CreditCardRecord {
  id:number;
  exp_month:string;
  exp_year:string;
  first6:string;
  last4:string;
  brand:string;
}
