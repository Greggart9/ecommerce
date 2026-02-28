'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-5'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-sm'
      >
        
        <h1 className='font-serif text-3xl text-black mb-2'>Admin Access</h1>
        <p className='text-gray-500 mb-8'>Enter your password to continue.</p>
        

        <div className='flex flex-col gap-4'>
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder='Password'
            className='border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black'
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className='bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className=' text-gray-500'>Reach out to me to get access to admin's panel oluwadamilare.greggart9@gmail.com</p>
        </div>
      </motion.div>
    </div>
  )
}