'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditPostForm({ post }: { post: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingAuthor, setUploadingAuthor] = useState(false)

  const [form, setForm] = useState({
    title: post.title ?? '',
    slug: post.slug ?? '',
    tag: post.tag ?? '',
    minutes_read: post.minutes_read ?? '',
    date: post.date ? new Date(post.date).toISOString().split('T')[0] : '',
    body: post.body ?? '',
    cover_image_url: post.cover_image_url ?? '',
    author_name: post.author_name ?? '',
    author_role: post.author_role ?? '',
    author_image_url: post.author_image_url ?? '',
    featured: post.featured ?? false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()
    return data.url
  }

  const handleCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    const url = await uploadImage(file)
    setForm(prev => ({ ...prev, cover_image_url: url }))
    setUploadingCover(false)
  }

  const handleAuthorImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingAuthor(true)
    const url = await uploadImage(file)
    setForm(prev => ({ ...prev, author_image_url: url }))
    setUploadingAuthor(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSuccess(false)
    try {
      const res = await fetch('/api/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: post.id,
          ...form,
          minutes_read: parseInt(form.minutes_read as any),
        }),
      })
      if (res.ok) {
        setSuccess(true)
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className='flex flex-col gap-5'>
      {[
        { name: 'title', label: 'Title', placeholder: 'Post title' },
        { name: 'slug', label: 'Slug', placeholder: 'post-slug' },
        { name: 'tag', label: 'Tag', placeholder: 'e.g. Skincare tips' },
        { name: 'minutes_read', label: 'Minutes Read', placeholder: 'e.g. 5' },
        { name: 'date', label: 'Date', placeholder: 'YYYY-MM-DD', type: 'date' },
        { name: 'author_name', label: 'Author Name', placeholder: 'e.g. Jane Doe' },
        { name: 'author_role', label: 'Author Role', placeholder: 'e.g. Skincare Expert' },
      ].map(field => (
        <div key={field.name} className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>{field.label}</label>
          <input
            type={field.type ?? 'text'}
            name={field.name}
            value={(form as any)[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className='border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black'
          />
        </div>
      ))}

      {/* Body */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>Body</label>
        <textarea
          name='body'
          value={form.body}
          onChange={handleChange}
          rows={10}
          className='border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black resize-y'
        />
      </div>

      {/* Cover image */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>Cover Image</label>
        {form.cover_image_url && <img src={form.cover_image_url} className='h-40 w-full object-cover rounded-lg mb-2' />}
        <input type='file' accept='image/*' onChange={handleCoverImage} className='border rounded-lg px-4 py-2 text-sm' />
        {uploadingCover && <p className='text-xs text-gray-400'>Uploading...</p>}
      </div>

      {/* Author image */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>Author Image</label>
        {form.author_image_url && (
          <img src={form.author_image_url} className='h-16 w-16 object-cover rounded-full mb-2' />
        )}
        <input type='file' accept='image/*' onChange={handleAuthorImage} className='border rounded-lg px-4 py-2 text-sm' />
        {uploadingAuthor && <p className='text-xs text-gray-400'>Uploading...</p>}
      </div>

      {/* Featured toggle */}
      <div className='flex items-center justify-between border rounded-lg px-4 py-3'>
        <p className='text-sm font-medium text-gray-700'>Featured Post</p>
        <button
          type='button'
          onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${form.featured ? 'bg-black' : 'bg-gray-200'}`}
        >
          <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mx-0.5 ${form.featured ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className='bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50'
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>

      {success && <p className='text-green-600 text-sm font-medium'>✅ Post updated successfully!</p>}

      <a href='/admin/posts' className='text-sm text-gray-500 hover:text-black transition'>
        ← Back to manage posts
      </a>
    </div>
  )
}