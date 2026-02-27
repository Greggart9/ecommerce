'use client'

import { easeInOut, motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import { useState } from 'react'

type Post = {
  id: number
  tag: string
  title: string
  minutes_read: number
  slug: string
  cover_image_url: string
  author_name: string
  author_role: string
  author_image_url: string
  body: string
}

type Props = {
  posts: Post[]
}

export default function FeaturedArticle({ posts }: Props) {
  const eyeX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const eyeY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const [visibleCount, setVisibleCount] = useState(6)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    eyeX.set(event.clientX - rect.left)
    eyeY.set(event.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    eyeX.set(0)
    eyeY.set(0)
  }

  const featured = posts[0]
  const rest = posts.slice(1)
  const visiblePosts = rest.slice(0, visibleCount)
  const hasMore = rest.length > visibleCount

  if (!featured) return <p className="text-gray-500">No posts yet.</p>

  return (
    <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: easeInOut }}
            whileHover={{ y: -6 }}
            className="overflow-hidden">
            
      <section>
        <Link href={`/blog/${featured.slug}`}>
          <article

            className="group cursor-pointer rounded-xl border bg-white shadow-sm hover:shadow-lg transition"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 md:gap-10">
              <div
                className="relative overflow-hidden rounded-xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.img
                  src={featured.cover_image_url}
                  alt={featured.title}
                  className="w-full xl:w-174 h-90 md:h-124 xl:h-143 object-cover rounded-xl"
                  initial={{scale: 1.2, opacity: 0.8, y: 30 }}
                 whileInView={{scale: 1, opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2  }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                  <motion.div
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow-sm"
                    style={{ left: eyeX, top: eyeY }}
                  >
                    <Eye className="h-5 w-5 text-gray-800" />
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-6">
                <div className="space-y-6">
                  <span className="inline-flex w-fit rounded-full border px-4 py-1 text-base">
                    {featured.tag}
                  </span>
                  <h2 className="text-xl sm:text-3xl md:text-3xl max-w-lg font-serif leading-tight text-neutral-900">
                    {featured.title}
                  </h2>
                  <p style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }} className="text-neutral-600 pr-6 xl:max-w-xl">
                    {featured.body}
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featured.author_image_url}
                      alt={featured.author_name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-neutral-900">{featured.author_name}</p>
                      <p className="text-neutral-500">{featured.author_role}</p>
                    </div>
                  </div>
                  <span className="text-sm text-black">• {featured.minutes_read} min read</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </section>

      <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: easeInOut }}
      
      className="py-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <Link href={`/blog/${post.slug}`} className="group" key={post.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg"
              >
                <div
                  className="relative h-90 overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  
                  <Image
                    src={post.cover_image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <motion.div
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow-sm"
                      style={{ left: eyeX, top: eyeY }}
                    >
                      <Eye className="h-5 w-5 text-gray-800" />
                    </motion.div>
                  </div>
                </div>

                <div className="p-5">
                  <span className="inline-block rounded-full border px-3 py-1 text-sm text-black">
                    {post.minutes_read} min read
                  </span>
                  <h3 className="mt-4 text-xl font-serif text-gray-900">{post.title}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Load more button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="rounded-full border px-8 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition"
            >
              Load More
            </button>
          </div>
        )}
      </motion.section>
    </motion.div>
  )
}