import Decimal from 'decimal.js'
import {
  Cryptocurrency,
  CurrencyBalance,
  CurrencyTier,
  RateTier,
  WalletDisplayInfo,
} from '../types'

export function sum(a: number, b: number): number {
  return a + b
}

/**
 * Exchange rate validity verification - Add 5-minute expiration check
 * @param rate
 */
export const isRateValid = (rate: CurrencyTier) => {
  const currentTime = Math.floor(Date.now() / 1000)
  return currentTime - rate.time_stamp <= 300
}

/**
 * convert to USD
 * @param balances
 * @param exchangeRates
 * @param supportedCurrencies
 */
export function convertToUSD(
  balances: CurrencyBalance[],
  exchangeRates: CurrencyTier[],
  supportedCurrencies: Cryptocurrency[],
): WalletDisplayInfo[] {
  const walletDisplayInfoList: WalletDisplayInfo[] = []
  // 1. Filter supported currencies
  const currencyMap = new Map<string, Cryptocurrency>()
  const filteredBalances: CurrencyBalance[] = []
  for (const b of balances) {
    const currency = supportedCurrencies.find((c) => c.coin_id === b.currency)

    if (currency) {
      filteredBalances.push(b)
      currencyMap.set(b.currency, currency)
    }
  }

  // 2. Traverse the balance of each currency
  for (const balance of filteredBalances) {
    const currencyRate = exchangeRates.find(
      (rate) =>
        // TODO isRateValid
        rate.from_currency === balance.currency && rate.to_currency === 'USD',
    )

    if (!currencyRate) {
      console.warn(`No rate found for ${balance.currency}`)
      continue
    }

    // 4. Sort tiers in descending order
    const sortedTiers = [...currencyRate.rates].sort((a, b) =>
      new Decimal(b.amount).comparedTo(new Decimal(a.amount)),
    )

    // 5. Find applicable rate tier
    let applicableRate: RateTier | null = null
    for (const tier of sortedTiers) {
      if (new Decimal(balance.amount).lte(new Decimal(tier.amount))) {
        applicableRate = tier
        break
      }
    }

    // 6. Use smallest tier as default fallback
    applicableRate ??= sortedTiers[sortedTiers.length - 1]

    // 7. Calculate USD equivalent value
    const amountDec = new Decimal(balance.amount)
    const rateDec = new Decimal(applicableRate.rate || 0)
    const amountThreshold = new Decimal(applicableRate.amount)

    const usdValue = amountDec.times(rateDec).dividedBy(amountThreshold)
    // .toNumber()
    const currencyInfo = currencyMap.get(balance.currency)
    if (!currencyInfo) {
      console.warn(`No currency info for ${balance.currency}`)
      continue
    }

    walletDisplayInfoList.push({
      currencyInfo,
      amount: balance.amount,
      usdValue,
    })
  }

  return walletDisplayInfoList
}
