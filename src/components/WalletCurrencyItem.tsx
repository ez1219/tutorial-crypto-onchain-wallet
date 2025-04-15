import Decimal from 'decimal.js'
import React from 'react'
import { WalletDisplayInfo } from '../types'

export type WalletCurrencyItemProps = WalletDisplayInfo

const WalletCurrencyItem: React.FC<WalletCurrencyItemProps> = ({
  currencyInfo,
  amount,
  usdValue,
}) => {
  return (
    <div className="shadow-md flex flex-row items-center bg-white rounded-xl px-3 py-2 gap-4">
      <img
        src={currencyInfo.colorful_image_url}
        alt={currencyInfo.name}
        className="w-[48px] h-[48px] "
      />
      <div className="flex-1 text-">{currencyInfo.name}</div>
      <div className="flex flex-col text-right">
        <span className="text-sm">
          {new Decimal(amount).toFixed(currencyInfo.display_decimal)}{' '}
          {currencyInfo.symbol}
        </span>
        <span className="text-xs text-gray-400">$ {usdValue.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default WalletCurrencyItem
