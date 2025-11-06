import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductDetails from '../components/ProductDetails'
import { useParams } from 'react-router-dom'
import api from '../utils/api'
import { toast } from 'react-toastify'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        toast.error(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  return (
    <div>
      <Navbar />
      {loading ? <div className="container mx-auto p-6">Loading...</div> : <ProductDetails product={product} />}
      <Footer />
    </div>
  )
}
