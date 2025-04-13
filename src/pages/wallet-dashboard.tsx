import React from 'react'
import WalletTotalBalance from '../components/WalletTotalBalance.tsx'

const WalletDashboard: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 bg-[#061121] p-4">
      <WalletTotalBalance totalUSD={36.68} />
    </div>
  )
}

export default WalletDashboard
