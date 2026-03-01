'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from './component/footer'

export default function NotFound() {
  return (
    <>
    <div className='h-screen flex flex-col -mb-4 items-center justify-center px-5 text-center'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center gap-6 max-w-md'
      >
        {/* Big 404 */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='font-serif text-[120px] leading-none text-black'
        >
          404
        </motion.h1>

        <div className='flex flex-col gap-2'>
          <h2 className='font-serif text-2xl text-black'>Page Not Found</h2>
          <p className='text-gray-500 text-sm leading-relaxed'>
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        <div className='flex gap-3 mt-2'>
          <Link
            href='/'
            className='rounded-full bg-black text-white px-6 py-3 text-sm border border-black font-medium hover:bg-transparent hover:border-black hover:text-black transition'
          >
            Go Home
          </Link>
          <Link
            href='/store'
            className='rounded-full border px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition'
          >
            Browse Store
          </Link>
        </div>
      </motion.div>
    </div>
     
     <div className='px-5 md:px-10 pt-4'>
     <Footer />
     </div>
    </>
  )
}