import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Checkout from '../components/Checkout'

export default function CheckoutPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <Checkout />
      </main>
      <Footer />
    </div>
  )
}
