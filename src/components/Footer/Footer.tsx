import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-10">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm ">
        
        <div>
          <h3 className="font-semibold text-black mb-4">About</h3>
          <p className="leading-relaxed ">
            Simple e-commerce website for learning and practice.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-black mb-4">Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-gray-500">Home</Link></li>
            <li><Link href="/products" className=" hover:text-gray-500">Products</Link></li>
            <li><Link href="/wishlist" className=" hover:text-gray-500">Wishlist</Link></li>
            <li><Link href="/cart" className=" hover:text-gray-500">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-black mb-4">Contact</h3>
          <p >Email: support@mywebsite.com</p>
          <p>Phone: +20 111 222 3333</p>
        </div>

      </div>
      <div className="border-t text-center py-4 text-xs text-gray-700">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </div>
    </footer>
  )
}
