import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/api'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist')) || []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    const load = async () => {
      if (user) {
        const res = await api.get(`/wishlist/${user._id}`)
        setWishlist(res.data)
      }
    }
    load()
  }, [user])

  const addToWishlist = async (productId) => {
    if (user) {
      const res = await api.post(`/wishlist/${user._id}`, { productId })
      setWishlist(res.data)
    } else {
      if (!wishlist.find((w) => w.product === productId || w._id === productId)) {
        setWishlist((prev) => [...prev, { product: productId }])
      }
    }
  }

  const removeFromWishlist = async (productId) => {
    if (user) {
      const res = await api.delete(`/wishlist/${user._id}/${productId}`)
      setWishlist(res.data)
    } else {
      setWishlist((prev) => prev.filter((w) => w.product !== productId && w._id !== productId))
    }
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
