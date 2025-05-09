import Decimal from 'decimal.js'
import React, { useEffect, useReducer, useCallback } from 'react'
import WalletCurrencyList from '../components/WalletCurrencyList.tsx'
import WalletTotalBalance from '../components/WalletTotalBalance.tsx'
import {
  getCurrencies,
  getCurrencyTiers,
  getWalletBalance,
} from '../services/api.ts'
import { WalletDisplayInfo } from '../types'
import { convertToUSD } from '../utils'

// Action type constants
const FETCH_START = 'FETCH_START'
const FETCH_SUCCESS = 'FETCH_SUCCESS'
const FETCH_ERROR = 'FETCH_ERROR'

// 定义 reducer 和初始状态
interface State {
  walletDisplayInfoList: WalletDisplayInfo[]
  loading: boolean
  error: string | null
  totalUSD: string
}

type Action =
  | { type: typeof FETCH_START }
  | {
      type: typeof FETCH_SUCCESS
      payload: { walletDisplayInfoList: WalletDisplayInfo[]; totalUSD: string }
    }
  | { type: typeof FETCH_ERROR; payload: string }

const initialState: State = {
  walletDisplayInfoList: [],
  loading: true,
  error: null,
  totalUSD: '0',
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: null }
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        walletDisplayInfoList: action.payload.walletDisplayInfoList,
        totalUSD: action.payload.totalUSD,
      }
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

// Error check helper
function checkApiOk(res: { ok: boolean }, msg: string) {
  if (!res.ok) throw new Error(msg)
}

const WalletDashboard: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    dispatch({ type: FETCH_START })
    try {
      const [currenciesRes, tiersRes, walletRes] = await Promise.all([
        getCurrencies({ signal }),
        getCurrencyTiers({ signal }),
        getWalletBalance({ signal }),
      ])
      if (signal?.aborted) return
      // Use English error messages for clarity
      checkApiOk(currenciesRes, 'Failed to fetch currencies')
      checkApiOk(tiersRes, 'Failed to fetch currency tiers')
      checkApiOk(walletRes, 'Failed to fetch wallet balance')
      const originSupportedCurrencies = currenciesRes.currencies
      const currencyTiers = tiersRes.tiers
      const walletBalanceList = walletRes.wallet
      const balanceList = convertToUSD(
        walletBalanceList,
        currencyTiers,
        originSupportedCurrencies,
      )
      const totalBalance = balanceList
        .reduce((prev, curr) => prev.plus(curr.usdValue), new Decimal(0))
        .toFixed(2)
      if (!signal?.aborted) {
        dispatch({
          type: FETCH_SUCCESS,
          payload: {
            walletDisplayInfoList: balanceList,
            totalUSD: totalBalance,
          },
        })
      }
    } catch (err) {
      if (!signal?.aborted) {
        dispatch({
          type: FETCH_ERROR,
          payload: (err as Error).message || 'Fetch failed',
        })
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void fetchData(controller.signal)
    return () => {
      controller.abort()
    }
  }, [fetchData])

  if (state.loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        Loading...
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        {state.error}
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 bg-[#061121] pt-4">
      <WalletTotalBalance totalUSD={state.totalUSD} />
      <WalletCurrencyList currencies={state.walletDisplayInfoList} />
    </div>
  )
}

export default WalletDashboard
