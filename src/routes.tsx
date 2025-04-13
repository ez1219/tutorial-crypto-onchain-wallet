import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import WalletDashboard from './pages/wallet-dashboard.tsx'
import DeFi from './pages/de-fi.tsx'
import NotFound from './pages/not-found.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: WalletDashboard,
      },
      {
        path: 'de-fi',
        Component: DeFi,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
])

export default router
