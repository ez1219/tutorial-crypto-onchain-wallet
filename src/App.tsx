import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router'
import './App.css'

function App() {
  return (
    <div className="min-h-screen md:max-w-3xl md:mx-auto  flex flex-col">
      <main className="flex flex-col flex-1  overflow-y-auto">
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="flex flex-row justify-between items-center min-h-[48px] p-4 shadow-lg">
        <div className="flex-1">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? 'text-blue-500' : 'text-gray-500'
            }}
            end
          >
            <div className="flex flex-col justify-center items-center">
              <span className="i-ion-wallet-outline text-2xl"></span>
              Wallet
            </div>
          </NavLink>
        </div>
        <div className="flex flex-col flex-1">
          <NavLink
            to="/de-fi"
            className={({ isActive }) => {
              return isActive ? 'text-blue-500' : 'text-gray-500'
            }}
            end
          >
            <div className="flex flex-col justify-center items-center">
              <span className="i-ion-cube-outline text-2xl"></span>
              DeFi
            </div>
          </NavLink>
        </div>
      </footer>
    </div>
  )
}

export default App
