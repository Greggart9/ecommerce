'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Testing() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div className="min-h-[200vh] bg-red-400">
      <div className="h-screen" />
      <div
        ref={ref}
        className="h-screen flex flex-col justify-center items-center gap-20"
      >
        <motion.span className="text-4xl font-bold" style={{ y: y1 }}>
          Normal speed
        </motion.span>
        <motion.span className="text-4xl font-bold" style={{ y: y2 }}>
          Fast speed
        </motion.span>
        <motion.span className="text-4xl font-bold" style={{ y: y3 }}>
          Slow speed
        </motion.span>
      </div>
      <div className="h-screen" />
    </div>
  )
}