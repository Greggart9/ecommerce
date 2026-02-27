import sql from '../../db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SimilarProducts from '../../component/SimilarProducts'
import Footer from '../../component/footer'
import ProductPageClient from '../../component/ProductPageClient'

type Props = {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  const result = await sql`
    SELECT * FROM products WHERE slug = ${slug} LIMIT 1
  `
  return result[0] ?? null
}

async function getSimilarProducts(slug: string) {
  const products = await sql`
    SELECT id, title, brand, price, currency, image_url, slug
    FROM products
    WHERE slug != ${slug}
    ORDER BY created_at DESC
    LIMIT 3
  `
  return products as any[]
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  const similar = await getSimilarProducts(slug)

  if (!product) return notFound()

  return (
    <div className='mx-auto px-5 md:px-10 py-10 mt-20'>
      {/* Back */}
      <Link href='/store' className='text-sm text-gray-500 hover:text-black transition mb-8 inline-block'>
        ← Back to store
      </Link>

      {/* Animated product content */}
      <ProductPageClient product={product} />

      {/* Similar products */}
      <div className='mt-20 md:mt-40 lg:mt-60'>
        <SimilarProducts products={similar} />
      </div>

      <div className='mt-10 md:mt-20 lg:mt-30'>
        <Footer />
      </div>
    </div>
  )
}