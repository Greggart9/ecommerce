import React from 'react'
import ProductCard from './ProductCard'
import { products } from '../data/products'

const Store = () => {
  return (
    <section className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  )
}

export default Store