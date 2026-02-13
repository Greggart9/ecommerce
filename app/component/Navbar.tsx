'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Button from './button1'
import Button2 from './button2'

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, filter: 'blur(8px)', opacity: 0 }}
      animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 z-40 w-full"
    >
      <div className="max-w-360 mx-auto border-x border-b border-gray-200 bg-white px-10">
        <nav className="flex w-full h-21.5 items-center justify-between">
          {/* LOGO */}
          <span>
            <img
              src="/assets/asset0.png"
              alt="Essential Logo"
              width={46}
              height={46}
              className="rounded-xl cursor-pointer"
            />
          </span>

          {/* NAVIGATION LINKS */}
          <span>
            <ul className="flex space-x-5">
              <li>
                <Button2 href="/store" label="Store" />
              </li>
              <li>
                <Button2 href="/blog" label="Blog" />
              </li>
              <li>
                <Button2 href="/our-methods" label="Our methods" />
              </li>
              <li>
                <Button2 href="/support" label="Support" />
              </li>
            </ul>
          </span>

          {/* USER ACTION */}
          <span>
            <Button onClick={() => (window.location.href = '/support')} variant="secondary">
              Shop
            </Button>
          </span>
        </nav>
      </div>
    </motion.header>
  )
}

export default Navbar