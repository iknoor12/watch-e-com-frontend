import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { cart, setCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '', country: '' })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [loading, setLoading] = useState(false)

  const handlePlaceOrder = async () => {
    if (!user) return toast.error('Please login to place order')
    if (!cart || cart.length === 0) return toast.error('Cart is empty')
    try {
      setLoading(true)
      const orderItems = cart.map((it) => ({ product: it.product || it._id, name: it.name, qty: it.qty, price: it.price }))
      const res = await api.post('/orders', { userId: user._id, orderItems, shippingAddress: shipping, paymentMethod })
      toast.success('Order placed')
      setCart([])
      navigate(`/orders/${res.data._id}`)
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-semibold">Checkout</h2>
      <div className="mt-4">
        <h3 className="font-semibold">Shipping</h3>
        <input placeholder="Address" value={shipping.address} onChange={(e)=>setShipping({...shipping,address:e.target.value})} className="border p-2 w-full my-2" />
        <input placeholder="City" value={shipping.city} onChange={(e)=>setShipping({...shipping,city:e.target.value})} className="border p-2 w-full my-2" />
        <input placeholder="Postal Code" value={shipping.postalCode} onChange={(e)=>setShipping({...shipping,postalCode:e.target.value})} className="border p-2 w-full my-2" />
        <input placeholder="Country" value={shipping.country} onChange={(e)=>setShipping({...shipping,country:e.target.value})} className="border p-2 w-full my-2" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Payment</h3>
        <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)} className="border p-2 w-full my-2">
          <option value="card">Card (demo)</option>
          <option value="paypal">PayPal</option>
        </select>
      </div>
      <div className="mt-6 flex justify-end">
        <button disabled={loading} onClick={handlePlaceOrder} className="px-4 py-2 bg-green-600 text-white rounded">{loading? 'Placing...':'Place order'}</button>
      </div>
    </div>
  )
}
