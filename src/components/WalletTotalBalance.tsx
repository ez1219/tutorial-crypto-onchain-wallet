import React from 'react'

export interface TotalBalanceProps {
  totalUSD: string
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ totalUSD }) => {
  return (
    <div className="text-center my-4">
      <div className="flex justify-center items-center text-white text-xl space-x-2">
        <span className="i-token-crypto-com text-4xl"></span>
        <span>crypto.com</span>
        {/*<div className="min-h-full flex relative justify-center mx-4 py-2 before:absolute before:content-[''] before:h-full before:block before:start-[50%] before:border-s-[1px] before:border-color-[#e2e8f0]"></div>*/}
        <div className="w-px h-6 bg-gray-300 mx-3"></div>
        <span className="text-lg text-gray-400">DEFI WALLET</span>
      </div>
      <div className="text-3xl font-bold text-white">
        <span className="text-2xl text-gray-500 mr-1">$</span>
        {totalUSD}
        <span className="text-2xl text-gray-400 ml-1">USD</span>
      </div>
    </div>
  )
}

export default TotalBalance
