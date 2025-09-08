export interface HourlyPrice {
  HourUTC: string;
  HourDK: string;
  PriceArea: string;
  SpotPriceDKK: number;
  SpotPriceEUR: number;
}

export type HourlyPrices = HourlyPrice[];
