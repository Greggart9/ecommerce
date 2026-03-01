'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Metadata } from 'next'


type Props = {
  label?: string
}

type Product = {
  id: number
  title: string
  brand: string
  price: number
  currency: string
  image_url: string
  slug: string
}

type Post = {
  id: number
  title: string
  tag: string
  minutes_read: number
  cover_image_url: string
  slug: string
}


export default function SearchBar({ label }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const hasResults = products.length > 0 || posts.length > 0

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Debounced search
  useEffect(() => {
    if (!query || query.length < 2) {
      setProducts([])
      setPosts([])
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setProducts(data.products)
        setPosts(data.posts)
      } catch {
        setProducts([])
        setPosts([])
      }
      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleClose = () => {
    setOpen(false)
    setQuery('')
    setProducts([])
    setPosts([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose()
  }

  return (
    <div ref={containerRef} className='relative'>
      {/* Search trigger */}
      <AnimatePresence mode='wait'>
        {!open ? (
          <motion.button
            key='icon'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(true)}
            className='flex items-center justify-center rounded-full border cursor-pointer border-black p-2 hover:bg-black hover:text-white transition'
          >
            <Search className='h-4 w-4' />
            {label && <span className='text-sm font-medium'>{label}</span>}
          </motion.button>
        ) : (
          <motion.div
            key='input'
            initial={{ opacity: 0, width: 40 }}
            animate={{ opacity: 1, width: 220 }}
            exit={{ opacity: 0, width: 40 }}
            transition={{ duration: 0.2 }}
            className='flex items-center gap-2 border rounded-full px-4 py-2 bg-white'
          >
            <Search className='h-4 w-4 text-gray-400 shrink-0' />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Search...'
              className='flex-1 text-sm outline-none bg-transparent'
            />
            {loading
              ? <Loader2 className='h-4 w-4 text-gray-400 animate-spin shrink-0' />
              : query && <button onClick={handleClose}><X className='h-4 w-4 text-gray-400 hover:text-black transition' /></button>
            }
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results dropdown */}
      <AnimatePresence>
        {open && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute right-0 top-12 z-50 w-80 bg-white rounded-2xl shadow-xl border overflow-hidden'
          >
            {/* No results */}
            {!loading && !hasResults && (
              <div className='px-5 py-8 text-center text-sm text-gray-400'>
                No results for "{query}"
              </div>
            )}

            {/* Products */}
            {products.length > 0 && (
              <div>
                <p className='px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                  Products
                </p>
                {products.map(product => (
                  <Link
                    key={product.id}
                    href={`/store/${product.slug}`}
                    onClick={handleClose}
                    className='flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition'
                  >
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className='h-10 w-10 rounded-lg object-cover bg-neutral-100'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-black truncate'>{product.title}</p>
                      <p className='text-xs text-gray-400'>{product.brand}</p>
                    </div>
                    <span className='text-xs font-medium text-black shrink-0'>
                      ${parseFloat(product.price as any).toFixed(2)}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Divider */}
            {products.length > 0 && posts.length > 0 && <hr />}

            {/* Posts */}
            {posts.length > 0 && (
              <div>
                <p className='px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                  Blog Posts
                </p>
                {posts.map(post => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={handleClose}
                    className='flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition'
                  >
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className='h-10 w-10 rounded-lg object-cover bg-neutral-100'
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-black truncate'>{post.title}</p>
                      <p className='text-xs text-gray-400'>{post.tag} · {post.minutes_read} min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* View all */}
            {hasResults && (
              <div className='border-t px-4 py-3'>
                <button
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                    handleClose()
                  }}
                  className='text-xs text-gray-500 hover:text-black transition w-full text-center'
                >
                  View all results for "{query}"
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}