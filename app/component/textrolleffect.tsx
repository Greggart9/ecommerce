'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

type RollTextLinkProps = {
  href: string
  label: string
  target?: '_blank'
  className?: string
}

const RollTextLink = ({ href, label, target, className }: RollTextLinkProps) => {
  const isExternal = target === '_blank'

  const Content = (
    <>
      {/* Default text */}
      <motion.span
        variants={{
          rest: { y: 0 },
          hover: { y: '-130%' },
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="block"
      >
        {label}
      </motion.span>

      {/* Hover text */}
      <motion.span
        variants={{
          rest: { y: '130%' },
          hover: { y: '0%' },
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {label}
      </motion.span>
    </>
  )

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      className="relative overflow-hidden inline-block"
    >
      {isExternal ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block relative ${className ?? ''}`}
        >
          {Content}
        </a>
      ) : (
        <Link href={href} className={`block relative ${className ?? ''}`}>
          {Content}
        </Link>
      )}
    </motion.div>
  )
}

export default RollTextLink
