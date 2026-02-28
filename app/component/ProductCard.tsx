'use client'

import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

type ProductCardProps = {
  id: number
  title: string
  brand: string
  price: number
  currency: string
  image: string
  href: string
  slug: string
}

export default function ProductCard({
  id,
  title,
  brand,
  price,
  currency,
  image,
  href,
  slug,
}: ProductCardProps) {
  const eyeX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const eyeY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    eyeX.set(event.clientX - rect.left)
    eyeY.set(event.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    eyeX.set(0)
    eyeY.set(0)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({ id, title, brand, price, currency, image_url: image, slug, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="group rounded-2xl bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
    >
      {/* Image */}
      <Link href={href}>
        <div
          className="relative aspect-4/3 bg-neutral-100 overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.img
            src={image}
            alt={title}
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className="h-full w-full object-cover"
          />

          {/* Hover overlay + floating eye */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow-sm"
              style={{ left: eyeX, top: eyeY }}
            >
              <Eye className="h-4 w-4 text-neutral-700" />
            </motion.div>
          </div>

          {/* Price pill */}
          <div className="absolute bottom-3 right-3 rounded-full bg-white px-4 py-1 text-xs font-semibold shadow">
            {currency} ${price.toFixed(2)}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-5 py-8 ">

        <div className='flex justify-between'>
        <div>
          <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
          <p className="text-xs text-neutral-500">{brand}</p>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center cursor-pointer justify-between">
          <div className="flex items-center gap-2 border rounded-full px-3 py-1">
            <button
              onClick={(e) => { e.preventDefault(); setQuantity(q => Math.max(1, q - 1)) }}
              className="text-gray-500 hover:text-black cursor-pointer transition font-medium text-sm"
            >−</button>
            <span className="text-sm w-4 text-center">{quantity}</span>
            <button
              onClick={(e) => { e.preventDefault(); setQuantity(q => q + 1) }}
              className="text-gray-500 hover:text-black cursor-pointer transition font-medium text-sm"
            >+</button>
          </div>
          {/* <span className="text-xs text-gray-400"> ${price.toFixed(2)}</span> */}
        </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">

          <Link
            href={href}
            className="flex-1 rounded-full bg-black text-white px-4 py-2 text-sm font-medium text-center hover:text-black hover:bg-transparent hover:border border-black transition"
          >
            View
          </Link>

            <button
            onClick={handleAddToCart}
            className={`flex-1 rounded-full border px-4 py-2 text-sm  cursor-pointer font-medium transition ${
              added
                ? 'bg-blue-300 text-white border-blue-300'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </motion.div>
  )
}