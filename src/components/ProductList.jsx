import React from 'react'
import ProductCard from './ProductCard'

export default function ProductList({ products = [] }) {
  if (!products || products.length === 0) return <div className="text-center py-12 text-gray-600">No products available right now.</div>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p._id || p.id} product={p} />
      ))}
    </div>
  )
}
