import React from 'react'

export interface TotalBalanceProps {
  totalUSD: number
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ totalUSD }) => {
  return (
    <div className="text-center my-4">
      <div className="text-3xl font-bold text-white">
        <span className="text-2xl text-gray-500 mr-1">$</span>
        {totalUSD.toFixed(2)}
        <span className="text-2xl text-gray-400 ml-1">USD</span>
      </div>
    </div>
  )
}

export default TotalBalance
