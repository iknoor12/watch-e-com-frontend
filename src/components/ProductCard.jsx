import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { toast } from 'react-toastify'
import { formatPrice } from '../utils/formatPrice'

function truncate(text = '', n = 80) {
  return text.length > n ? text.slice(0, n) + '…' : text
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    try {
      await addToCart(product._id || product.id, 1)
      toast.success('Added to cart')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  const handleAddToWishlist = async (e) => {
    e.preventDefault()
    try {
      await addToWishlist(product._id || product.id)
      toast.info('Added to wishlist')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  return (
    <article className="border rounded p-4 flex flex-col bg-white transform transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product._id}`} className="grow">
        <div className="w-full h-56 bg-gray-100 rounded overflow-hidden">
          <img src={product?.imageURL || '/src/assets/placeholder.png'} alt={product?.name} className="w-full h-full object-cover" />
        </div>
        <h3 className="mt-3 font-semibold text-lg">{product?.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{truncate(product?.description, 100)}</p>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <div className="font-bold text-lg">{formatPrice(product?.price)}</div>
        <div className="flex gap-2">
          <button onClick={handleAddToWishlist} className="px-3 py-1 border rounded text-sm">Add to Wishlist</button>
          <button onClick={handleAddToCart} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Add to Cart</button>
        </div>
      </div>
    </article>
  )
}
