import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBanner from '../components/HeroBanner'
import ProductList from '../components/ProductList'

const sampleProducts = []

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Featured</h2>
        <ProductList products={sampleProducts} />
      </main>
      <Footer />
    </div>
  )
}
