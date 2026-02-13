'use client'

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { useRef } from 'react'
import Button from './button1'

const images = [
  '/assets/asset10.png',
  '/assets/asset11.png',
  '/assets/asset12.png',
  '/assets/asset13.png',
  '/assets/asset14.png',
  '/assets/asset15.png',
  '/assets/asset16.png',
  '/assets/asset17.png',
  '/assets/asset18.jpeg',
  '/assets/asset19.png',
  '/assets/asset20.png',
  '/assets/asset21.png',
  '/assets/asset26.png',
  '/assets/asset27.jpeg',
  '/assets/asset28.jpeg',
  '/assets/asset31.png',
]

export default function ScrollCircleGallery() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const rotate = useMotionValue(0)
  const smoothRotate = useSpring(rotate, { stiffness: 10, damping: 10 })
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastY.current
    rotate.set(rotate.get() + delta * 0.15)
    lastY.current = latest
  })

  return (
    <section
      ref={ref}
      className="relative h-fit -mt-50 flex items-center justify-center overflow-hidden"
    >
      {/* Rotating circle */}
      <motion.div
        style={{ rotate: smoothRotate }}
        className="relative w-375 h-375 flex items-center justify-center rounded-full"
      >
        {images.map((src, i) => {
          const angle = (360 / images.length) * i
          const radius = 460

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full p-1 shadow-md"
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(-${angle}deg)
                `,
              }}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-100 shadow-md">
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Center content */}
      <div className="absolute text-center max-w-md">
        <button className="px-4 py-2 bg-gray-200 rounded-full mb-7">Stats</button>

        <h2 className="text-5xl font-serif leading-tight">
          1200+ Products Got
          <br />
          <span className="text-neutral-500">Sold Last Month</span>
        </h2>

        <p className="mt-6 mb-8 text-neutral-600">
          “At Essential, we believe beauty should <br /> feel effortless and empowering.”
        </p>
        <Button onClick={() => (window.location.href = '/store')} variant="primary">
          Store
        </Button>
      </div>
    </section>
  )
}
