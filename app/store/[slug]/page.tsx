import sql from '../../db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ProductGallery from '../../component/ProductGallery'
import SimilarProducts from '../../component/SimilarProducts'
import Footer from '../../component/footer'

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

  const price = parseFloat(product.price)
  const originalPrice = product.original_price ? parseFloat(product.original_price) : null

  return (
    <div className=' mx-auto px-5 md:px-10 py-10 mt-20'>
      {/* Back */}
      <Link href='/store' className='text-sm text-gray-500 hover:text-black transition mb-8 inline-block'>
        ← Back to store
      </Link>

      {/* Top section */}
      <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 mt-4 items-start'>

        {/* Gallery */}
        <ProductGallery
          mainImage={product.image_url}
          galleryImages={product.gallery_images ?? []}
        />

        {/* Details */}
        <div className='flex flex-col gap-5 md:sticky md:top-24 self-start'>

          {/* Title + size */}
          <div>
            <h1 className='font-serif text-3xl text-black'>{product.title}</h1>
            {product.body_size && (
              <p className='text-sm text-gray-500 mt-1'>{product.body_size}</p>
            )}
          </div>

          {/* Rating */}
          {product.rating > 0 && (
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
        </div>
      </div>

      {/* Description sections */}
      <div className='mt-16 flex flex-col gap-12  max-w-3xl'>
        {product.description_heading_1 && (
          <div className='flex flex-col gap-4 '>
            <h2 className='font-serif text-2xl text-black '>{product.description_heading_1}</h2>
            {product.description_body_1 && (
              <p className='text-gray-600 leading-relaxed '>{product.description_body_1}</p>
            )}

          </div>
        )}

        {product.description_heading_2 && (
          <div className='flex flex-col gap-4'>
            <h2 className='font-serif text-2xl text-black'>{product.description_heading_2}</h2>
            {product.description_body_2 && (
              <p className='text-gray-600 leading-relaxed'>{product.description_body_2}</p>
            )}
          </div>
        )}
                    {product.description_image_1 && (
              <img
                src={product.description_image_1}
                alt={product.description_heading_1}
                className='w-full h-92 object-cover rounded-2xl mt-2'
              />
            )}
      </div>

      {/* Similar products */}
      <div className=' mt-20 md:mt-40 lg:mt-60'>
      <SimilarProducts products={similar} />
      </div>

      <div className='mt-10 md:mt-20 lg:mt-30'>
        <Footer />
      </div>
    </div>
  )
}