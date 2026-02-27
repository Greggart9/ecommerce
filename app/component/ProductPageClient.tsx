'use client'

import { motion } from 'framer-motion'
import ProductGallery from './ProductGallery'

type Product = {
  title: string
  body_size?: string
  rating?: number
  review_count?: number
  price: number
  original_price?: number
  currency: string
  features?: string[]
  warranty?: string
  shipping_details?: string
  customer_support?: string
  image_url: string
  gallery_images?: string[]
  description_heading_1?: string
  description_body_1?: string
  description_image_1?: string
  description_heading_2?: string
  description_body_2?: string
}

export default function ProductPageClient({ product }: { product: Product }) {
  const price = parseFloat(product.price as any)
  const originalPrice = product.original_price ? parseFloat(product.original_price as any) : null

  return (
    <>
      {/* Top section */}
      <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 mt-4 items-start'>

        {/* Gallery — fade and scale in */}
        <motion.div
          initial={{ opacity: 0, y:-40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <ProductGallery
            mainImage={product.image_url}
            galleryImages={product.gallery_images ?? []}
          />
        </motion.div>

        {/* Details — slide in from right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className='flex flex-col gap-5 md:sticky md:top-24 self-start'
        >
          {/* Title + size */}
          <div>
            <h1 className='font-serif text-3xl text-black'>{product.title}</h1>
            {product.body_size && (
              <p className='text-sm text-gray-500 mt-1'>{product.body_size}</p>
            )}
          </div>

          {/* Rating */}
          {product.rating && product.rating > 0 && (
            <div className='flex items-center gap-2'>
              <span className='text-red-500 text-sm'>★</span>
              <span className='text-sm font-medium text-black'>{product.rating}</span>
              <span className='text-sm text-gray-400'>({product.review_count})</span>
            </div>
          )}

          {/* Price */}
          <div className='flex items-center gap-4'>
            <span className='text-2xl font-medium text-black'>
              {product.currency} ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className='text-lg text-gray-400 line-through'>
                {product.currency} ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <ul className='flex flex-col gap-2 border-t pt-4'>
              {product.features.map((f: string, i: number) => (
                <li key={i} className='flex items-center gap-2 text-sm text-gray-700'>
                  <span className='text-gray-600'>✓</span> {f}
                </li>
              ))}
            </ul>
          )}

          {/* Accordions */}
          <div className='flex flex-col divide-y border-t mt-2'>
            {[
              { label: 'Warranty', content: product.warranty },
              { label: 'Shipping details', content: product.shipping_details },
              { label: 'Customer support', content: product.customer_support },
            ].filter(a => a.content).map((accordion) => (
              <details key={accordion.label} className='py-4 group'>
                <summary className='text-sm font-medium text-gray-800 cursor-pointer list-none flex justify-between items-center'>
                  {accordion.label}
                  <span className='text-gray-400 transition-transform group-open:rotate-180'>▾</span>
                </summary>
                <p className='text-sm text-gray-500 mt-3 leading-relaxed'>{accordion.content}</p>
              </details>
            ))}
          </div>

          {/* CTA Button */}
          <button className='mt-2 rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition w-fit'>
            Available Here →
          </button>
        </motion.div>
      </div>

      {/* Description sections — fade up on scroll */}
      <div className='mt-16 flex flex-col gap-12 max-w-3xl'>
        {product.description_heading_1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='flex flex-col gap-4'
          >
            <h2 className='font-serif text-2xl text-black'>{product.description_heading_1}</h2>
            {product.description_body_1 && (
              <p className='text-gray-600 leading-relaxed'>{product.description_body_1}</p>
            )}
          </motion.div>
        )}

        {product.description_heading_2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className='flex flex-col gap-4'
          >
            <h2 className='font-serif text-2xl text-black'>{product.description_heading_2}</h2>
            {product.description_body_2 && (
              <p className='text-gray-600 leading-relaxed'>{product.description_body_2}</p>
            )}
          </motion.div>
        )}

        {/* Description image — fade up on scroll */}
        {product.description_image_1 && (
        <div className='w-full h-92 rounded-lg overflow-hidden mt-2'>
          <motion.img
            src={product.description_image_1}
            alt={product.description_heading_1}
            initial={{scale: 1.2, opacity: 0, y: 30 }}
            whileInView={{scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className='w-full h-92 object-cover '
          />
        </div>
        )}
      </div>
    </>
  )
}