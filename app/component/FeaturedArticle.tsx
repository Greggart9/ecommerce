'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Eye } from 'lucide-react'

export default function FeaturedArticle() {
  const eyeX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const eyeY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    eyeX.set(event.clientX - rect.left)
    eyeY.set(event.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    eyeX.set(0)
    eyeY.set(0)
  }

  return (
    <div>

    <section className="">
      <Link href="/blog/skincare-routines">
        <motion.article
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="group cursor-pointer rounded-xl border bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm hover:shadow-lg transition"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* IMAGE */}
            <div className="overflow-hidden rounded-xl">
              <motion.img
                src="/assets/asset28.jpeg"
                alt="Skincare article"
                className="h-143 w-174 object-cover rounded-xl"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-between p-6">
              
              <div className="space-y-6">
                {/* Category pill */}
                <span className="inline-flex w-fit rounded-full border px-4 py-1 text-base ">
                  Skincare tips
                </span>

                {/* Heading */}
                <h2 className="text-3xl md:text-3xl max-w-lg font-serif leading-tight text-neutral-900 dark:text-neutral-100">
                  Expert advice and simple routines to keep your skin healthy
                  and glowing every day
                </h2>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 max-w-xl ">
                  Dive into the world of clean, sustainable beauty, where every
                  product is chosen for safety, ethics, and results, helping you
                  feel confident in what you put on your skin.
                </p>
              </div>

              {/* FOOTER */}
              <div className="mt-10 flex items-center justify-between">
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/asset29.png"
                    alt="Author"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      Lucas Grant
                    </p>
                    <p className="text-neutral-500">
                      Visual designer
                    </p>
                  </div>
                </div>

                {/* Read time */}
                <span className="text-sm text-black">
                  • 5 min read
                </span>
              </div>

            </div>
          </div>
        </motion.article>
      </Link>
    </section>


     <section className="py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Item 1 */}
        <Link href="/blog/glow-guide" className="group">
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
                src="/assets/asset30.jpeg"
                alt="Glow guide"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay + floating eye */}
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
                7 min read
              </span>

              <h3 className="mt-4 text-xl font-serif text-gray-900">
                Glow guide
              </h3>
            </div>
          </motion.div>
        </Link>

        {/* Item 2 */}
        <Link href="/blog/clean-beauty" className="group">
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
                src="/assets/asset31.png"
                alt="Clean beauty"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay + floating eye */}
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
                6 min read
              </span>

              <h3 className="mt-4 text-xl font-serif text-gray-900">
                Clean beauty
              </h3>
            </div>
          </motion.div>
        </Link>

        {/* Item 3 */}
        <Link href="/blog/diy-care" className="group">
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
                src="/assets/asset32.png"
                alt="DIY care"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover overlay + floating eye */}
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
                8 min read
              </span>

              <h3 className="mt-4 text-xl font-serif text-gray-900">
                DIY care
              </h3>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
    </div>
  )
}
