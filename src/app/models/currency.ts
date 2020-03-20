export interface CurrencyCode {
  key: string;
  code: string;
}

export const CURRENCY_CODES: CurrencyCode[] = [
  {
    key: "rubles",
    code: "RUB"
  },
  {
    key: "euros",
    code: "EUR"
  },
  {
    key: "US dollars",
    code: "USD"
  },
  {
    key: "pounds",
    code: "GBP"
  },
  {
    key: "yens",
    code: "JPY"
  }
];
