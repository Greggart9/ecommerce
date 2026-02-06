'use client'

import RollTextLink from './textrolleffect'

type ButtonProps = {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const Button2 = ({
  href,
  label,
  variant = 'primary',
  className = '',
}: ButtonProps) => {
  const base =
    ' rounded-lg text-base text-gray-500 font-medium inline-flex items-center justify-center'

  const variants = {
    primary: 'hover:text-black',
    secondary: '',
  }

  return (
    <RollTextLink
      href={href}
      label={label}
      className={`${base} ${variants[variant]} ${className}`}
    />
  )
}

export default Button2
