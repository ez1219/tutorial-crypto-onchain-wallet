import { NavLink, Outlet } from 'react-router'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <footer className="flex flex-row justify-between items-center min-h-[48px]">
        <div className="flex flex-row flex-1 justify-center items-center">
          <NavLink to="/" end>
            Wallet
          </NavLink>
        </div>
        <div className="flex flex-row flex-1 justify-center items-center">
          <NavLink to="/de-fi" end>
            DeFi
          </NavLink>
        </div>
      </footer>
    </div>
  )
}

export default App
