export interface CurrencyExchangeRate {
  USD: number,
  EUR: number,
  GBP: number,
  CNY: number,
  JPY: number,
  TRY: number,
}

export type CurrencyName = keyof CurrencyExchangeRate

export type CurrencyChanges = CurrencyExchangeRate

export interface APICurrencyData {
  data: {
    USD?: number,
    EUR?: number,
    GBP?: number,
    CNY?: number,
    JPY?: number,
    TRY?: number,
  }
}
