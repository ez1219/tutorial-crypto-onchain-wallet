import { NavLink } from 'react-router'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
    <p className="text-gray-500 mt-4">
      Oops! The page you're looking for doesn't exist.
    </p>
    <NavLink to="/" className="text-blue-500 underline">
      Go Back to Wallet
    </NavLink>
  </div>
)

export default NotFound
