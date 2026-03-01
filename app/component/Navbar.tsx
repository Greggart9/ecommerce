'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from './button1'
import Button2 from './button2'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import CartIcon from './CartIcon'
import SearchBar from './Search'



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header
      initial={{ y: -100, filter: 'blur(8px)', opacity: 0 }}
      animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 z-40 w-full"
    >
      <div className="max-w-360 mx-auto border-x border-b border-gray-200 bg-white px-6 md:px-10">
        <nav className="flex w-full h-21.5 items-center justify-between">
  
                {/* LOGO — left */}
                <span className="flex-1">
                  <Link href="/">
                    <img
                      src="/assets/asset0.png"
                      alt="Essential Logo"
                      width={46}
                      height={46}
                      className="rounded-xl cursor-pointer"
                    />
                  </Link>
                </span>

                {/* NAVIGATION LINKS — center */}
                <span className="hidden  lg:flex flex-1 justify-center">
                  <ul className="flex space-x-5">
                    <li><Button2 href="/store" label="Store" /></li>
                    <li><Button2 href="/blog" label="Blog" /></li>
                    <li><Button2 href="/our-methods" label="Our methods" /></li>
                    <li><Button2 href="/support" label="Support" /></li>
                  </ul>
                </span>

                {/* USER ACTIONS — right */}
                <span className="hidden lg:flex flex-1 justify-end items-center gap-3">
                  <SearchBar />
                  <CartIcon />
                  <Button onClick={() => (window.location.href = '/store')} variant="secondary">
                    Shop
                  </Button>
                </span>

                {/* HAMBURGER — mobile only */}
                <button
                  onClick={toggleMenu}
                  className="lg:hidden flex cursor-pointer items-center justify-center"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-neutral-900" />
                  ) : (
                    <Menu className="h-6 w-6 text-neutral-900" />
                  )}
                </button>
              </nav>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-200 py-6 space-y-6"
          >
            <ul className="space-y-4 flex flex-col items-center justify-center">
              <li>
                <a href="/store" className="block text-base text-neutral-900 font-medium">
                  Store
                </a>
              </li>
              <li>
                <a href="/blog" className="block text-base text-neutral-900 font-medium">
                  Blog
                </a>
              </li>
              <li>
                <a href="/our-methods" className="block text-base text-neutral-900 font-medium">
                  Our methods
                </a>
              </li>
              <li>
                <a href="/support" className="block text-base text-neutral-900 font-medium">
                  Support
                </a>
              </li>
            </ul>

            <div className='flex flex-col items-center gap-3 justify-center w-full'>
              <SearchBar label="Search" />
              <CartIcon />
              
            <Button onClick={() => (window.location.href = '/store')} variant="secondary">
              Shop
            </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Navbar