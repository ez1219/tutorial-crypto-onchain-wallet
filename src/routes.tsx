import { createBrowserRouter } from 'react-router'
import App from './App.tsx'
import NotFound from './pages/not-found.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        lazy: async () => {
          const WalletDashboard = await import('./pages/wallet-dashboard.tsx')
          return {
            Component: WalletDashboard.default,
          }
        },
      },
      {
        path: 'de-fi',
        lazy: async () => {
          const DeFi = await import('./pages/de-fi.tsx')
          return {
            Component: DeFi.default,
          }
        },
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
])

export default router
