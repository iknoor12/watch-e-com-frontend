import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto p-6 text-center">© {new Date().getFullYear()} Watches E-commerce</div>
    </footer>
  )
}
