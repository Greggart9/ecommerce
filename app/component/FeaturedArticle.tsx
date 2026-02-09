'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FeaturedArticle() {
  return (
    
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
                transition={{ duration: 1, ease: 'easeOut' }}
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
  )
}
