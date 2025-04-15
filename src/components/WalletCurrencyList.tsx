import React from 'react'
import WalletCurrencyItem, {
  WalletCurrencyItemProps,
} from './WalletCurrencyItem.tsx'

export interface WalletCurrencyListProps {
  currencies: WalletCurrencyItemProps[]
}

const WalletCurrencyList: React.FC<WalletCurrencyListProps> = ({
  currencies,
}) => {
  return (
    <div className="flex flex-col flex-1 bg-slate-100 rounded-t-xl pt-4 px-3 mt-32 gap-2">
      {currencies.map((c) => {
        return <WalletCurrencyItem key={c.currencyInfo.coin_id} {...c} />
      })}
    </div>
  )
}

export default WalletCurrencyList
