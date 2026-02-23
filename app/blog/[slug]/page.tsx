import React from 'react'
import sql from '../../db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/app/component/footer'

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const result = await sql`
    SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
  `
  return result[0] ?? null
}

async function getRelatedPosts(slug: string) {
  const posts = await sql`
    SELECT id, title, tag, minutes_read, slug, cover_image_url
    FROM posts
    WHERE slug != ${slug}
    ORDER BY created_at DESC
    LIMIT 3
  `
  return posts as any[]
}

const BlogArticlePage = async ({ params }: BlogArticlePageProps) => {
  const { slug } = await params
  const post = await getPost(slug)
  const related = await getRelatedPosts(slug)

  if (!post) return notFound()

  return (
    <div className='w-full'>
      <div className='max-w-3xl mx-auto px-5 md:px-10 py-10 mt-20'>
        {/* Back button */}
        <div className='flex items-center justify-between mb-8'>
          <Link href='/blog' className='text-sm text-gray-500 hover:text-black transition'>
            ← Go back
          </Link>
          <span className="px-4 py-2 bg-gray-200 rounded-full">{post.tag}</span>
        </div>

        {/* Title */}
        <h1 className='font-serif text-3xl md:text-4xl text-black leading-tight mb-4'>
          {post.title}
        </h1>

        {/* Meta */}
        <div className='flex w-full justify-between items-center gap-3 text-sm text-gray-500 mb-8'>
          <span>{post.minutes_read} min read</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {/* Cover image */}
        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className='w-full h-80 md:h-125 object-cover rounded-2xl mb-10'
          />
        )}

        {/* Body */}
        <div className='max-w-none px-4 text-gray-700 leading-relaxed'>
            {post.body.split('\n').map((line: string, i: number) => {
              const trimmed = line.trim()
              if (trimmed === '') return <br key={i} />
              if (trimmed.startsWith('- ')) return (
                <li key={i} className='ml-5 list-disc mb-1'>
                  {trimmed.replace('- ', '')}
                </li>
              )
              if (
                trimmed.endsWith(':') ||
                (trimmed.length < 80 && !trimmed.includes('.') && trimmed.length > 5)
              ) return (
                <h3 key={i} className='font-serif text-xl text-black mt-8 mb-2'>{trimmed}</h3>
              )
              return <p key={i} className='mb-4'>{trimmed}</p>
            })}
          </div>

        {/* Author */}
        {post.author_name && (
          <div className='flex items-center gap-3 mt-12 pt-8 border-t'>
            <img
              src={post.author_image_url}
              alt={post.author_name}
              className='h-12 w-12 rounded-full object-cover'
            />
            <div className='text-sm'>
              <p className='font-medium text-neutral-900'>{post.author_name}</p>
              <p className='text-neutral-500'>{post.author_role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className='mt-16 pt-10 border-t px-5 md:px-10'>
          <div className='flex items-center justify-between mb-6'>
            <p className='text-xs uppercase tracking-widest text-gray-400'>Next posts</p>
            <Link href='/blog' className='bg-black text-white border-black hover:bg-transparent hover:text-black'>
              View All →
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {related.map((p) => (
              <Link href={`/blog/${p.slug}`} key={p.id} className='group'>
                <div className='overflow-hidden rounded-2xl'>
                  <img
                    src={p.cover_image_url}
                    alt={p.title}
                    className='w-full h-96 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105'
                  />
                </div>
                <div className='mt-3'>
                  <p className='text-xs text-gray-400'>{p.minutes_read} min read</p>
                  <h3 className='font-serif text-base text-gray-900 mt-1'>{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      

      <div className='px-5 md:px-10 mt-30 md:mt-40 lg:mt-50'>
      <Footer />
      </div>
    </div>
  )
}

export default BlogArticlePage