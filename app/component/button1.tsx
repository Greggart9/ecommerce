"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

type ButtonProps = {
  variant?: "primary" | "secondary"
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({
  variant = "primary",
  children,
  onClick,
}: ButtonProps) {
  const baseClasses =
    "group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium cursor-pointer transition-colors ease-in-out duration-500"

  const variantClasses =
    variant === "primary"
      ? "bg-black text-white border-black hover:bg-white hover:text-black"
      : "bg-white text-black border-black hover:bg-black hover:text-white"

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      <span>{children}</span>

      <motion.span
        className="inline-flex transition duration-450 ease-in group-hover:-rotate-45"
      >
        <ArrowRight className="h-4 w-4" />
      </motion.span>
    </button>
  )
}
