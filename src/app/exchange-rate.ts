export class ExchangeRate {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;

  constructor(baseCurrency: string, targetCurrency: string, rate: number) {
    this.baseCurrency = baseCurrency;
    this.targetCurrency = targetCurrency;
    this.rate = rate;
  }

  getFormattedRate(): string {
    return `${this.rate.toFixed(4)} ${this.targetCurrency}`;
  }
}
