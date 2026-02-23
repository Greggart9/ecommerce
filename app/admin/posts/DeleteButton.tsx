'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return
    setDeleting(true)
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setDeleting(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className='text-sm text-red-500 hover:text-red-700 transition disabled:opacity-50'
    >
      {deleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}