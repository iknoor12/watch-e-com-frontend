import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart()
  const navigate = useNavigate()

  const subtotal = cart.reduce((sum, it) => sum + (it.price || 0) * (it.qty || 1), 0)

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Cart</h2>
      {cart.length === 0 ? (
        <div className="mt-4">Your cart is empty.</div>
      ) : (
        <>
          <ul>
            {cart.map((it) => (
              <li key={it._id || it.product || it.id} className="flex justify-between items-center py-2">
                <div>
                  <div className="font-semibold">{it.name || it.productName || 'Product'}</div>
                  <div className="text-sm text-gray-600">{it.brand}</div>
                </div>
                <div className="flex items-center gap-3">
                  <input type="number" min="1" value={it.qty} onChange={(e)=> updateQty(it._id || it.product || it.id, Number(e.target.value))} className="w-20 border p-1" />
                  <div className="w-20">{formatPrice((it.price||0) * (it.qty||1))}</div>
                  <button onClick={()=> removeFromCart(it._id || it.product || it.id)} className="text-sm text-red-600">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <div className="font-bold">Subtotal: {formatPrice(subtotal)}</div>
            <div>
              <button onClick={() => navigate('/checkout')} className="px-4 py-2 bg-green-600 text-white rounded">Proceed to Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
