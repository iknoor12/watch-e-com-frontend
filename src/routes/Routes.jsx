import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProductListing from '../pages/ProductListing'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import WishlistPage from '../pages/WishlistPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import AdminDashboardPage from '../pages/AdminDashboardPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
    </Switch>
  )
}
