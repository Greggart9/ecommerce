'use client'

import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'
import { X,CheckCircle2Icon, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Metadata } from 'next'

// export const metadata = {
//   title: 'Cart',
//   description: 'Review your selected items and proceed to checkout.',
// }


export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const [confirmed, setConfirmed] = useState(false)

  const handleProceed = () => {
    clearCart()
    setConfirmed(true)
  }

  if (confirmed) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 px-5 '>
        <div className='text-6xl'><CheckCircle2Icon className="text-black" /></div>
        <h1 className='font-serif text-3xl text-black'>Order Confirmed!</h1>
        <p className='text-gray-500 text-center max-w-sm'>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link
          href='/store'
          className='mt-4 rounded-full bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition'
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto px-5 md:px-10 py-10 mt-20'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='font-serif text-3xl text-black mb-2'>Your Cart</h1>
        <p className='text-gray-500 mb-8'>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>

        {/* Empty state */}
        {items.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 gap-4 text-gray-400'>
            <ShoppingBag className='h-16 w-16' />
            <p className='text-lg'>Your cart is empty</p>
            <Link
              href='/store'
              className='rounded-full bg-black text-white px-8 py-3 text-sm font-medium hover:border border-black hover:text-black hover:bg-transparent transition'
            >
              Browse Products
            </Link>
          </div>
        )}

        {/* Cart items */}
        {items.length > 0 && (
          <>
            <div className='flex flex-col divide-y border rounded-2xl overflow-hidden'>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className='flex gap-4 p-5'
                >
                  {/* Image */}
                  <Link href={`/store/${item.slug}`}>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className='h-24 w-24 rounded-xl object-cover bg-neutral-100'
                    />
                  </Link>

                  {/* Details */}
                  <div className='flex-1 flex flex-col justify-between'>
                    <div>
                      <p className='font-medium text-black'>{item.title}</p>
                      <p className='text-sm text-gray-400'>{item.brand}</p>
                    </div>

                    <div className='flex items-center justify-between mt-3'>
                      {/* Quantity */}
                      <div className='flex items-center gap-3 border rounded-full px-3 py-1.5'>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className='text-gray-500 hover:text-black transition font-medium'
                        >−</button>
                        <span className='text-sm w-4 text-center'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className='text-gray-500 hover:text-black transition font-medium'
                        >+</button>
                      </div>

                      <p className='font-medium text-black'>
                        {item.currency} ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='text-gray-300 hover:text-red-400 transition self-start'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className='mt-8 border rounded-2xl p-6 flex flex-col gap-4'>
              <div className='flex justify-between text-sm text-gray-500'>
                <span>Subtotal ({totalItems} items)</span>
                <span className='text-black font-medium'>${totalPrice.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-sm text-gray-500'>
                <span>Shipping</span>
                <span className='text-green-600 font-medium'>Free</span>
              </div>
              <hr />
              <div className='flex justify-between font-medium text-black'>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={handleProceed}
                className='w-full rounded-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition mt-2'
              >
                Proceed to Buy
              </button>

              <Link
                href='/store'
                className='text-center text-sm text-gray-500 hover:text-black transition'
              >
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}