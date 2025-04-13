import {
  CryptocurrencyResponse,
  ExchangeRateResponse,
  WalletBalanceResponse,
} from '../types'

export const getCurrencies = async () => {
  const res = await fetch('/api/wallet/currenies')
  return res.json() as Promise<CryptocurrencyResponse>
}

export const getExchangeRates = async () => {
  const res = await fetch('/api/wallet/tiers')
  return res.json() as Promise<ExchangeRateResponse>
}

export const getWalletBalance = async () => {
  const res = await fetch('/api/wallet/balance')
  return res.json() as Promise<WalletBalanceResponse>
}
