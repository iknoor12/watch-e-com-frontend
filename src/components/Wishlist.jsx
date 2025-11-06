import React from 'react'

export default function Wishlist({ items = [] }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Wishlist</h2>
      <ul>
        {items.map((it) => (
          <li key={it._id || it.id}>{it.name}</li>
        ))}
      </ul>
    </div>
  )
}
