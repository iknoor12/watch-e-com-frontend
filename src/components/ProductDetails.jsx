import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { toast } from 'react-toastify'
import { formatPrice } from '../utils/formatPrice'

export default function ProductDetails({ product }) {
  const { addToCart } = useCart()
  const { addToWishlist } = useWishlist()
  const [qty, setQty] = useState(1)

  if (!product) return <div className="container mx-auto p-6">Product not found.</div>

  const handleAddToCart = async () => {
    await addToCart(product._id || product.id, Number(qty))
    toast.success('Added to cart')
  }

  const handleAddToWishlist = async () => {
    await addToWishlist(product._id || product.id)
    toast.info('Added to wishlist')
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={product?.imageURL || '/src/assets/placeholder.png'} alt={product?.name} className="w-full object-cover rounded" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="text-gray-600">{product?.brand}</p>
          <div className="mt-4 font-bold text-xl">{formatPrice(product?.price)}</div>
          <p className="mt-4">{product?.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} className="border p-2 w-24" />
            <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
            <button onClick={handleAddToWishlist} className="px-4 py-2 border rounded">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}
