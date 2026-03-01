import { NextResponse } from 'next/server'
import sql from '@/app/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ products: [], posts: [] })
  }

  try {
    const [products, posts] = await Promise.all([
      sql`
        SELECT id, title, brand, price, currency, image_url, slug
        FROM products
        WHERE title ILIKE ${'%' + query + '%'}
        OR brand ILIKE ${'%' + query + '%'}
        LIMIT 4
      `,
      sql`
        SELECT id, title, tag, minutes_read, cover_image_url, slug
        FROM posts
        WHERE title ILIKE ${'%' + query + '%'}
        OR tag ILIKE ${'%' + query + '%'}
        OR body ILIKE ${'%' + query + '%'}
        LIMIT 4
      `,
    ])

    return NextResponse.json({ products, posts })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ products: [], posts: [] }, { status: 500 })
  }
}