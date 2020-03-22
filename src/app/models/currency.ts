export interface CurrencyCode {
  key: string;
  code: string;
}

export interface Price {
  price: number;
}

export interface PositionTotalPrice {
  key: string;
  amount: number;
}

export interface TotalCartPrice {
  rubles: number;
  euros: number;
  'US dollars': number;
  pounds: number;
  yens: number;
}

export const CURRENCY_CODES: CurrencyCode[] = [
  {
    key: 'rubles',
    code: 'RUB'
  },
  {
    key: 'euros',
    code: 'EUR'
  },
  {
    key: 'US dollars',
    code: 'USD'
  },
  {
    key: 'pounds',
    code: 'GBP'
  },
  {
    key: 'yens',
    code: 'JPY'
  }
];
