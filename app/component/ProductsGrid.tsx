'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'
import { products, type Product } from '../data/products'

export default function ProductsGrid() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {loading
        ? Array.from({ length: 2 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : products.map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))}
    </section>
  )
}
