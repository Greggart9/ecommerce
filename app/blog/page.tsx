import React from 'react'
import Footer from '../component/footer'
import FeaturedArticle from '../component/FeaturedArticle'
import sql from '../db'

async function getPosts(tag?: string) {
  if (tag) {
    return await sql`
      SELECT * FROM posts
      WHERE LOWER(tag) = LOWER(${tag})
      ORDER BY featured DESC, created_at DESC
    ` as any[]
  }
  return await sql`
    SELECT * FROM posts
    ORDER BY featured DESC, created_at DESC
  ` as any[]
}

async function getTags() {
  const result = await sql`
    SELECT DISTINCT tag FROM posts ORDER BY tag
  ` as any[]
  return result.map((r: any) => r.tag)
}

type Props = {
  searchParams: Promise<{ tag?: string }>
}

const Blogpage = async ({ searchParams }: Props) => {
  const { tag } = await searchParams
  const posts = await getPosts(tag)
  const tags = await getTags()

  return (
    <div className='flex flex-col items-center justify-center px-5 md:px-10 w-full pt-25'>
      <section className='w-full mt-15 md:mt-20'>
        <div className='h-40 mb-15 xl:mb-0'>
          <div className='flex flex-col xl:flex-row xl:justify-between items-start xl:items-center'>
            <h2 className='font-serif text-4xl/12 xl:text-5xl/16 font-medium text-black'>
              Browse Our <br /><span className='text-gray-600'>Latest Beauty Reads</span>
            </h2>
            <p className='xl:text-right text-left text-lg pt-5 xl:pt-0'>
              Browse our curated collection for detailed <br /> insights and inspiring ideas.
            </p>
          </div>
        </div>

        {/* Tag filters
        <div className='-mx-5 mb-8 bg-red-600 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:gap-3 md:px-0'>
          <a
            href='/blog'
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs transition hover:bg-black hover:text-white md:px-4 md:text-sm ${!tag ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            All
          </a>
          {tags.map((t: string) => (
            <a
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs transition hover:bg-black hover:text-white md:px-4 md:text-sm ${tag === t ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              {t}
            </a>
          ))}
        </div> */}

        <FeaturedArticle posts={posts} />
        <div className='py-10 md:py-20 mb-5'><hr /></div>
        <Footer />
      </section>
    </div>
  )
}

export default Blogpage