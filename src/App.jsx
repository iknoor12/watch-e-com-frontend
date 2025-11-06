import React from 'react'
import Routes from './routes/Routes'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Routes />
          <ToastContainer position="top-right" autoClose={2500} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
