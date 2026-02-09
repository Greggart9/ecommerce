'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Eye } from 'lucide-react'

type ProductCardProps = {
  title: string
  brand: string
  price: number
  currency: string
  image: string
}

export default function ProductCard({
  title,
  brand,
  price,
  currency,
  image,
}: ProductCardProps) {
  const eyeX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const eyeY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    eyeX.set(event.clientX - rect.left)
    eyeY.set(event.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    eyeX.set(0)
    eyeY.set(0)
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="group rounded-2xl bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
    >
      {/* Image */}
      <div
        className="relative aspect-4/3 bg-neutral-100 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.img
          src={image}
          alt={title}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
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

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-sm font-medium text-neutral-900">
            {title}
          </h3>
          <p className="text-xs text-neutral-500">
            {brand}
          </p>
        </div>

        <button
          type="button"
          className="rounded-full cursor-pointer w-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition group-hover:bg-neutral-900 group-hover:text-white ease-in-out duration-500"
        >
          View Product
        </button>
      </div>
    </motion.div>
  )
}
