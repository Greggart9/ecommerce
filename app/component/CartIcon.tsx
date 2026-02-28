'use client'

import { useCart } from '../context/CartContext'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartIcon() {
  const { totalItems } = useCart()

  return (
    <Link href='/cart' className='relative flex items-center gap-2 rounded-full border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition'>
      <ShoppingBag className='h-4 w-4' />
      Cart
      {totalItems > 0 && (
        <span className='absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
          {totalItems}
        </span>
      )}
    </Link>
  )
}