'use client'

import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function CartDropdown() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const [open, setOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const handleProceed = () => {
    clearCart()
    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setOpen(false)
    }, 3000)
  }

  return (
    <div className='relative'>
      {/* Cart button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className='relative flex items-center gap-2 cursor-pointer rounded-full border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition'
      >
        <ShoppingBag className='h-4 w-4' />
        Cart
        {totalItems > 0 && (
          <span className='absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <div
              className='fixed inset-0 z-40'
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='absolute right-0 top-20 z-50 w-96 bg-white rounded-2xl shadow-xl border overflow-hidden'
            >
              {/* Header */}
              <div className='flex items-center justify-between px-5 py-4 border-b'>
                <h2 className='font-serif text-lg text-black'>Your Cart ({totalItems})</h2>
                <button onClick={() => setOpen(false)}>
                  <X className='h-4 w-4 text-gray-500 hover:text-black transition' />
                </button>
              </div>

              {/* Confirmation message */}
              {confirmed && (
                <div className='px-5 py-4 bg-green-50 text-green-700 text-sm font-medium'>
                  ✅ Order confirmed! Thank you for your purchase.
                </div>
              )}

              {/* Empty state */}
              {items.length === 0 && !confirmed && (
                <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                  <ShoppingBag className='h-10 w-10 mb-3' />
                  <p className='text-sm'>Your cart is empty</p>
                </div>
              )}

              {/* Items */}
              {items.length > 0 && (
                <>
                  <div className='max-h-80 overflow-y-auto divide-y'>
                    {items.map(item => (
                      <div key={item.id} className='flex gap-3 px-5 py-4'>
                        {/* Image */}
                        <Link href={`/store/${item.slug}`} onClick={() => setOpen(false)}>
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className='h-16 w-16 rounded-xl object-cover bg-neutral-100'
                          />
                        </Link>

                        {/* Details */}
                        <div className='flex-1 flex flex-col justify-between'>
                          <div>
                            <p className='text-sm font-medium text-black'>{item.title}</p>
                            <p className='text-xs text-gray-400'>{item.brand}</p>
                          </div>
                          <div className='flex items-center justify-between'>
                            {/* Quantity */}
                            <div className='flex items-center gap-2 border rounded-full px-2 py-1'>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className='text-gray-500 hover:text-black transition text-sm w-4'
                              >−</button>
                              <span className='text-sm w-4 text-center'>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className='text-gray-500 hover:text-black transition text-sm w-4'
                              >+</button>
                            </div>
                            <p className='text-sm font-medium text-black'>
                              {item.currency} ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className='text-gray-300 hover:text-red-400 transition self-start mt-1'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className='px-5 py-4 border-t flex flex-col gap-3'>
                    <div className='flex justify-between text-sm font-medium'>
                      <span className='text-gray-500'>Total</span>
                      <span className='text-black'>${totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={handleProceed}
                      className='w-full rounded-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition'
                    >
                      Proceed to Buy
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}