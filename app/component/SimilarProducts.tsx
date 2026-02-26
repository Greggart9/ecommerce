'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Truck, Zap, RefreshCw } from 'lucide-react'

type Product = {
  id: number
  title: string
  brand: string
  price: number
  currency: string
  image_url: string
  slug: string
}

type Props = {
  products: Product[]
}

export default function SimilarProducts({ products }: Props) {
  return (
    <div className='mt-20'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <span className='text-xs uppercase tracking-widest text-black border rounded-full px-3 py-2 bg-gray-100'>
            Similar Items
          </span>
          <h2 className='font-serif text-4xl/14 text-black mt-3'>
            Similar Items <br />
            <span className='text-gray-500'>You Might Like</span>
          </h2>
        </div>
        <Link
          href='/store'
          className='text-sm text-gray-500 hover:text-black transition flex items-center gap-1 border rounded-full px-4 py-2'
        >
          View All →
        </Link>
      </div>

      {/* Products grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {products.map((product) => (
          <Link href={`/store/${product.slug}`} key={product.id} className='group'>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className='rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition'
            >
              <div className='relative aspect-square overflow-hidden'>
                <img
                  src={product.image_url}
                  alt={product.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                {/* Price pill */}
                <div className='absolute bottom-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow'>
                  {product.currency} ${parseFloat(product.price as any).toFixed(2)}
                </div>
              </div>
              <div className='p-4'>
                <p className='text-sm font-medium text-neutral-900'>{product.title}</p>
                <p className='text-xs text-neutral-500'>{product.brand}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Features bar */}
      <div className='mt-15 md:mt-30 grid grid-cols-1 md:grid-cols-3  border rounded-2xl'>
        {[
          { icon: <Truck className='h-8 w-8' />, label: 'Worldwide shipping' },
          { icon: <Zap className='h-8 w-8' />, label: 'Fast shipping' },
          { icon: <RefreshCw className='h-8 w-8' />, label: '30 days returns' },
        ].map((item) => (
          <div key={item.label} className='flex  flex-col items-center justify-center gap-2 py-8 md:py-15 text-black'>
            {item.icon}
            <span className='text-sm text-black '>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}