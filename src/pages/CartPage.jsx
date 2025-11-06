import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cart from '../components/Cart'

export default function CartPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <Cart />
      </main>
      <Footer />
    </div>
  )
}
