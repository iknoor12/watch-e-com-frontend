import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="logo font-bold text-xl">Watches</Link>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/products" className="hover:underline">Products</Link>
            </li>
            <li>
              <Link to="/wishlist" className="relative">
                Wishlist
                <span className="ml-1 text-xs text-white bg-pink-500 rounded-full px-2">{wishlist?.length || 0}</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" className="relative">
                Cart
                <span className="ml-1 text-xs text-white bg-blue-600 rounded-full px-2">{cart?.length || 0}</span>
              </Link>
            </li>
            {user ? (
              <li className="ml-4 flex items-center gap-3">
                <span>{user.name}</span>
                <button className="text-sm text-red-600" onClick={handleLogout}>Logout</button>
                {user.isAdmin && <Link to="/admin" className="text-sm text-gray-700">Admin</Link>}
              </li>
            ) : (
              <li>
                <Link to="/login" className="text-sm text-blue-600">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
