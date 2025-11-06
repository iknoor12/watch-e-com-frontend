import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Wishlist from '../components/Wishlist'

export default function WishlistPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <Wishlist items={[]} />
      </main>
      <Footer />
    </div>
  )
}
