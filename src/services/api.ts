import {
  CryptocurrencyResponse,
  ExchangeRateResponse,
  WalletBalanceResponse,
} from '../types'

interface FetchOptions {
  signal?: AbortSignal
  method?: string
  headers?: Record<string, string>
  body?: unknown
}

async function fetchWithSignal<T>(
  url: string,
  options?: FetchOptions,
): Promise<T> {
  const { signal, method = 'GET', headers, body } = options ?? {}
  const fetchOptions: RequestInit = {
    method,
    signal,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  }
  if (body && !headers?.['Content-Type']) {
    fetchOptions.headers = { ...headers, 'Content-Type': 'application/json' }
  }
  const res = await fetch(url, fetchOptions)
  return res.json() as Promise<T>
}

export const getCurrencies = (options?: FetchOptions) =>
  fetchWithSignal<CryptocurrencyResponse>('/api/wallet/currencies', options)

export const getCurrencyTiers = (options?: FetchOptions) =>
  fetchWithSignal<ExchangeRateResponse>('/api/wallet/tiers', options)

export const getWalletBalance = (options?: FetchOptions) =>
  fetchWithSignal<WalletBalanceResponse>('/api/wallet/balance', options)
