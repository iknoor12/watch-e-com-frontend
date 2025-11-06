import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { user } = useAuth()
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // sync from server when user changes
  useEffect(() => {
    const load = async () => {
      if (user) {
        const res = await api.get(`/cart/${user._id}`)
        setCart(res.data)
      }
    }
    load()
  }, [user])

  const addToCart = async (productId, qty = 1) => {
    if (user) {
      const res = await api.post(`/cart/${user._id}`, { productId, qty })
      setCart(res.data)
    } else {
      // local cart for guest
      const existing = cart.find((c) => c.product === productId || c._id === productId)
      if (existing) existing.qty += qty
      else cart.push({ product: productId, qty })
      setCart([...cart])
    }
  }

  const removeFromCart = async (itemId) => {
    if (user) {
      await api.put(`/cart/${user._id}/${itemId}`, { qty: 0 })
      const res = await api.get(`/cart/${user._id}`)
      setCart(res.data)
    } else {
      setCart((prev) => prev.filter((p) => p._id !== itemId && p.product !== itemId))
    }
  }

  const updateQty = async (itemId, qty) => {
    if (user) {
      await api.put(`/cart/${user._id}/${itemId}`, { qty })
      const res = await api.get(`/cart/${user._id}`)
      setCart(res.data)
    } else {
      const item = cart.find((c) => c._id === itemId || c.product === itemId)
      if (item) item.qty = qty
      setCart([...cart])
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
