import Decimal from 'decimal.js'
import React, { useEffect, useState } from 'react'
import WalletCurrencyList from '../components/WalletCurrencyList.tsx'
import WalletTotalBalance from '../components/WalletTotalBalance.tsx'
import {
  getCurrencies,
  getCurrencyTiers,
  getWalletBalance,
} from '../services/api.ts'
import {
  Cryptocurrency,
  CurrencyBalance,
  CurrencyTier,
  WalletDisplayInfo,
} from '../types'
import { convertToUSD } from '../utils'

const WalletDashboard: React.FC = () => {
  const [walletDisplayInfoList, setWalletDisplayInfoList] = useState<
    WalletDisplayInfo[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalUSD, setTotalUSD] = useState('0')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [currenciesRes, tiersRes, walletRes] = await Promise.all([
          getCurrencies(),
          getCurrencyTiers(),
          getWalletBalance(),
        ])

        if (!currenciesRes.ok) {
          throw new Error('Failed to fetch currencies')
        }

        if (!tiersRes.ok) {
          throw new Error('Failed to fetch currency tiers')
        }

        if (!walletRes.ok) {
          throw new Error('Failed to fetch wallet balance')
        }
        // Deconstruct the data in each response
        const originSupportedCurrencies: Cryptocurrency[] =
          currenciesRes.currencies
        const currencyTiers: CurrencyTier[] = tiersRes.tiers
        const walletBalanceList: CurrencyBalance[] = walletRes.wallet

        const balanceList = convertToUSD(
          walletBalanceList,
          currencyTiers,
          originSupportedCurrencies,
        )

        const totalBalance = balanceList
          .reduce((prev, curr) => prev.plus(curr.usdValue), new Decimal(0))
          .toFixed(2)

        setTotalUSD(totalBalance)
        setWalletDisplayInfoList(balanceList)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError((err as Error).message || 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    void fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        {error}
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 bg-[#061121] pt-4">
      <WalletTotalBalance totalUSD={totalUSD} />
      <WalletCurrencyList currencies={walletDisplayInfoList} />
    </div>
  )
}

export default WalletDashboard
