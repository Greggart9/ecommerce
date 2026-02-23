'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../component/footer'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [coverPreview, setCoverPreview] = useState('')
  const [authorPreview, setAuthorPreview] = useState('')
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingAuthor, setUploadingAuthor] = useState(false)


  const [form, setForm] = useState({
    tag: '',
    title: '',
    minutes_read: '',
    date: '',
    slug: '',
    cover_image_url: '',
    author_name: '',
    author_role: '',
    author_image_url: '',
    body: '',
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'cover_image_url' | 'author_image_url'
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    field === 'cover_image_url' ? setUploadingCover(true) : setUploadingAuthor(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setForm((prev) => ({ ...prev, [field]: data.url }))
        field === 'cover_image_url' ? setCoverPreview(data.url) : setAuthorPreview(data.url)
      }
    } catch (err) {
      console.error(err)
    }

    field === 'cover_image_url' ? setUploadingCover(false) : setUploadingAuthor(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSuccess(false)
    try {
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                minutes_read: parseInt(form.minutes_read),
                featured: form.featured,
            }),
            })
      if (res.ok) {
        setSuccess(true)
        setForm({
          tag: '',
          title: '',
          minutes_read: '',
          date: '',
          slug: '',
          cover_image_url: '',
          author_name: '',
          author_role: '',
          author_image_url: '',
          body: '',
          featured: false,
        })
        setCoverPreview('')
        setAuthorPreview('')
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const fields = [
    { name: 'title', label: 'Title', placeholder: 'Post title' },
    { name: 'slug', label: 'Slug', placeholder: 'post-title-here (used in URL)' },
    { name: 'tag', label: 'Tag', placeholder: 'e.g. Skincare tips' },
    { name: 'minutes_read', label: 'Minutes Read', placeholder: 'e.g. 5' },
    { name: 'date', label: 'Date', placeholder: 'YYYY-MM-DD' },
    { name: 'author_name', label: 'Author Name', placeholder: 'e.g. Lucas Grant' },
    { name: 'author_role', label: 'Author Role', placeholder: 'e.g. Visual designer' },
  ]

  return (
    <div className='w-full'>
      <div className='max-w-2xl mx-auto px-5 mt-20 py-10'>
        <h1 className='font-serif text-4xl text-black mb-2'>Create New Post</h1>
        <p className='text-gray-500 mb-8'>Fill in the details below to publish a new blog post.</p>

        <div className='flex flex-col gap-8'>
        {fields.map((field) => (
          <div key={field.name} className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-gray-700'>{field.label}</label>
            <input
              name={field.name}
              value={(form as any)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className='border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black'
            />
          </div>
        ))}


        {/* Featured toggle */}
        <div className='flex items-center justify-between border rounded-lg px-4 py-3'>
        <div>
            <p className='text-sm font-medium text-gray-700'>Featured Post</p>
            <p className='text-xs text-gray-400'>This post will appear in the header section</p>
        </div>
        <button
            type='button'
            onClick={() => setForm((prev) => ({ ...prev, featured: !prev.featured }))}
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${form.featured ? 'bg-black' : 'bg-gray-200'}`}
        >
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mx-0.5 ${form.featured ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
        </div>


        {/* Cover Image Upload */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>Cover Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => handleImageUpload(e, 'cover_image_url')}
            className='border rounded-lg px-4 py-2 text-sm outline-none cursor-pointer'
          />
          {uploadingCover && <p className='text-xs text-gray-400'>Uploading...</p>}
          {coverPreview && (
            <img src={coverPreview} alt='Cover preview' className='mt-2 h-40 w-full object-cover rounded-lg' />
          )}
        </div>

        {/* Author Image Upload */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>Author Image</label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => handleImageUpload(e, 'author_image_url')}
            className='border rounded-lg px-4 py-2 text-sm outline-none cursor-pointer'
          />
          {uploadingAuthor && <p className='text-xs text-gray-400'>Uploading...</p>}
          {authorPreview && (
            <img src={authorPreview} alt='Author preview' className='mt-2 h-16 w-16 object-cover rounded-full' />
          )}
        </div>

        {/* Body */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>Body</label>
          <p className='text-xs text-gray-400'>
            Blank line = paragraph break. Start with "- " for bullet points. Short lines without a full stop become headings.
          </p>
          <textarea
            name='body'
            value={form.body}
            onChange={handleChange}
            placeholder='Write your post content here...'
            rows={12}
            className='border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black resize-y'
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className='bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50'
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>

        {success && (
          <p className='text-green-600 text-sm font-medium'>
            ✅ Post published successfully!
          </p>
        )}

        {/* Preview */}
        {form.title && (
          <div className='mt-10 border-t pt-10'>
            <h2 className='text-sm font-medium text-gray-500 uppercase tracking-widest mb-6'>Post Preview</h2>

            <div className='max-w-2xl'>
              {/* Back + tag */}
              <div className='flex items-center justify-between mb-8'>
                <span className='text-sm text-gray-400'>← Go back</span>
                <span className='text-sm text-gray-500'>{form.tag}</span>
              </div>

              {/* Title */}
              <h1 className='font-serif text-3xl md:text-4xl text-black leading-tight mb-4'>
                {form.title}
              </h1>

              {/* Meta */}
              <div className='flex items-center gap-3 text-sm text-gray-500 mb-8'>
                {form.minutes_read && <span>{form.minutes_read} min read</span>}
                {form.date && (
                  <>
                    <span>·</span>
                    <span>{new Date(form.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </>
                )}
              </div>

              {/* Cover image */}
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt='Cover'
                  className='w-full h-80 object-cover rounded-2xl mb-10'
                />
              )}

              {/* Body */}
              {form.body && (
                <div className='text-gray-700 leading-relaxed'>
                  {form.body.split('\n').map((line: string, i: number) => {
                    const trimmed = line.trim()
                    if (trimmed === '') return <br key={i} />
                    if (trimmed.startsWith('- ')) return (
                      <li key={i} className='ml-5 list-disc mb-1'>{trimmed.replace('- ', '')}</li>
                    )
                    if (trimmed.endsWith(':') || (trimmed.length < 80 && !trimmed.includes('.') && trimmed.length > 5)) return (
                      <h3 key={i} className='font-serif text-xl text-black mt-8 mb-3'>{trimmed}</h3>
                    )
                    return <p key={i} className='mb-4'>{trimmed}</p>
                  })}
                </div>
              )}

              {/* Author */}
              {form.author_name && (
                <div className='flex items-center gap-3 mt-12 pt-8 border-t'>
                  {authorPreview && (
                    <img src={authorPreview} alt={form.author_name} className='h-12 w-12 rounded-full object-cover' />
                  )}
                  <div className='text-sm'>
                    <p className='font-medium text-neutral-900'>{form.author_name}</p>
                    <p className='text-neutral-500'>{form.author_role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    <div className='w-full max-w-none px-5 md:px-10 mt-20 md:mt-30 lg:mt-50'>
      <Footer />
    </div>
  </div>
  )
}