import { NextResponse } from 'next/server'
import sql from '@/app/db'

export async function GET() {
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `
    return NextResponse.json(products)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title, brand, price, original_price, currency, image_url, slug,
      description_heading_1, description_body_1, description_image_1,
      description_heading_2, description_body_2,
      body_size, rating, review_count, features,
      gallery_images, warranty, shipping_details,
      customer_support, category, featured, in_stock
    } = body

    const product = await sql`
      INSERT INTO products (
        title, brand, price, original_price, currency, image_url, slug,
        description_heading_1, description_body_1, description_image_1,
        description_heading_2, description_body_2,
        body_size, rating, review_count, features,
        gallery_images, warranty, shipping_details,
        customer_support, category, featured, in_stock
      ) VALUES (
        ${title}, ${brand}, ${price}, ${original_price ?? null}, ${currency ?? 'USD'},
        ${image_url}, ${slug},
        ${description_heading_1 ?? null}, ${description_body_1 ?? null}, ${description_image_1 ?? null},
        ${description_heading_2 ?? null}, ${description_body_2 ?? null},
        ${body_size ?? null}, ${rating ?? 0}, ${review_count ?? 0},
        ${features ?? []}, ${gallery_images ?? []},
        ${warranty ?? null}, ${shipping_details ?? null},
        ${customer_support ?? null}, ${category ?? null},
        ${featured ?? false}, ${in_stock ?? true}
      )
      RETURNING *
    `
    return NextResponse.json(product[0], { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await sql`DELETE FROM products WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}