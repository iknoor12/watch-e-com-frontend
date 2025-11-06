import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductList from '../components/ProductList'
import api from '../utils/api'
import { toast } from 'react-toastify'

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
    </div>
  )
}

export default function ProductListing() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get('/products')
        setProducts(res.data.products || [])
      } catch (err) {
        toast.error(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Products</h2>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="border p-2 rounded w-full md:w-1/3" />
        </div>

        {loading ? (
          <Spinner />
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No products available right now.</div>
        ) : (
          <ProductList products={filtered} />
        )}
      </main>
      <Footer />
    </div>
  )
}
