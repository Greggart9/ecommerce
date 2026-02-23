import { NextResponse } from 'next/server'
import sql from '@/app/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tag, title, minutes_read, date, cover_image, body: postBody, second_image, author, slug, cover_image_url, author_name, author_role, author_image_url, featured } = body

    const post = await sql`
      INSERT INTO posts (tag, title, minutes_read, date, cover_image, body, second_image, author, slug, cover_image_url, author_name, author_role, author_image_url, featured)
      VALUES (${tag}, ${title}, ${minutes_read}, ${date}, ${JSON.stringify(cover_image)}, ${postBody}, ${JSON.stringify(second_image)}, ${JSON.stringify(author)}, ${slug}, ${cover_image_url}, ${author_name}, ${author_role}, ${author_image_url}, ${featured ?? false})
      RETURNING *
    `

    return NextResponse.json(post[0], { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await sql`DELETE FROM posts WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}