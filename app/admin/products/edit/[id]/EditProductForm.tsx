'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [uploadingMain, setUploadingMain] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [uploadingDesc, setUploadingDesc] = useState(false)
  const [featureInput, setFeatureInput] = useState('')

  const [form, setForm] = useState({
    title: product.title ?? '',
    brand: product.brand ?? '',
    price: product.price ?? '',
    original_price: product.original_price ?? '',
    currency: product.currency ?? 'USD',
    slug: product.slug ?? '',
    body_size: product.body_size ?? '',
    category: product.category ?? '',
    rating: product.rating ?? '',
    review_count: product.review_count ?? '',
    image_url: product.image_url ?? '',
    gallery_images: product.gallery_images ?? [],
    features: product.features ?? [],
    description_heading_1: product.description_heading_1 ?? '',
    description_body_1: product.description_body_1 ?? '',
    description_image_1: product.description_image_1 ?? '',
    description_heading_2: product.description_heading_2 ?? '',
    description_body_2: product.description_body_2 ?? '',
    warranty: product.warranty ?? '',
    shipping_details: product.shipping_details ?? '',
    customer_support: product.customer_support ?? '',
    featured: product.featured ?? false,
    in_stock: product.in_stock ?? true,
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

  const handleMainImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingMain(true)
    const url = await uploadImage(file)
    setForm(prev => ({ ...prev, image_url: url }))
    setUploadingMain(false)
  }

  const handleGalleryImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploadingGallery(true)
    const urls = await Promise.all(files.map(uploadImage))
    setForm(prev => ({ ...prev, gallery_images: [...prev.gallery_images, ...urls] }))
    setUploadingGallery(false)
  }

  const removeGalleryImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_: any, i: number) => i !== index)
    }))
  }

  const handleDescImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingDesc(true)
    const url = await uploadImage(file)
    setForm(prev => ({ ...prev, description_image_1: url }))
    setUploadingDesc(false)
  }

  const addFeature = () => {
    if (!featureInput.trim()) return
    setForm(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }))
    setFeatureInput('')
  }

  const removeFeature = (index: number) => {
    setForm(prev => ({ ...prev, features: prev.features.filter((_: any, i: number) => i !== index) }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSuccess(false)
    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          ...form,
          price: parseFloat(form.price),
          original_price: form.original_price ? parseFloat(form.original_price) : null,
          rating: form.rating ? parseFloat(form.rating as any) : 0,
          review_count: form.review_count ? parseInt(form.review_count as any) : 0,
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
        { name: 'title', label: 'Product Title', placeholder: 'e.g. Lustre Dew Elixir' },
        { name: 'slug', label: 'Slug', placeholder: 'e.g. lustre-dew-elixir' },
        { name: 'brand', label: 'Brand', placeholder: 'e.g. Veloura Skincare' },
        { name: 'category', label: 'Category', placeholder: 'e.g. Moisturiser' },
        { name: 'body_size', label: 'Size', placeholder: 'e.g. Body 250ml' },
        { name: 'price', label: 'Price', placeholder: 'e.g. 109' },
        { name: 'original_price', label: 'Original Price (optional)', placeholder: 'e.g. 129' },
        { name: 'currency', label: 'Currency', placeholder: 'USD' },
        { name: 'rating', label: 'Rating (0-5)', placeholder: 'e.g. 4.7' },
        { name: 'review_count', label: 'Review Count', placeholder: 'e.g. 420' },
      ].map(field => (
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

      {/* Main image */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>Main Product Image</label>
        {form.image_url && <img src={form.image_url} className='h-40 w-full object-cover rounded-lg mb-2' />}
        <input type='file' accept='image/*' onChange={handleMainImage} className='border rounded-lg px-4 py-2 text-sm' />
        {uploadingMain && <p className='text-xs text-gray-400'>Uploading...</p>}
      </div>

      {/* Gallery images */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>Gallery Images</label>
        {form.gallery_images.length > 0 && (
          <div className='flex gap-2 flex-wrap mb-2'>
            {form.gallery_images.map((url: string, i: number) => (
              <div key={i} className='relative'>
                <img src={url} className='h-16 w-16 object-cover rounded-lg' />
                <button
                  onClick={() => removeGalleryImage(i)}
                  className='absolute -top-1 -right-1 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center'
                >×</button>
              </div>
            ))}
          </div>
        )}
        <input type='file' accept='image/*' multiple onChange={handleGalleryImages} className='border rounded-lg px-4 py-2 text-sm' />
        {uploadingGallery && <p className='text-xs text-gray-400'>Uploading...</p>}
      </div>

      {/* Features */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>Features</label>
        <div className='flex gap-2'>
          <input
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addFeature()}
            placeholder='e.g. Soft textures, powerful results'
            className='flex-1 border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black'
          />
          <button onClick={addFeature} className='bg-black text-white px-4 py-2 rounded-lg text-sm'>Add</button>
        </div>
        {form.features.map((f: string, i: number) => (
          <div key={i} className='flex items-center justify-between border rounded-lg px-3 py-2 text-sm'>
            <span>✓ {f}</span>
            <button onClick={() => removeFeature(i)} className='text-red-400 text-xs'>Remove</button>
          </div>
        ))}
      </div>

      {/* Description sections */}
      {[
        { heading: 'description_heading_1', body: 'description_body_1', label: 'Description Section 1' },
        { heading: 'description_heading_2', body: 'description_body_2', label: 'Description Section 2' },
      ].map(section => (
        <div key={section.heading} className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-gray-700'>{section.label}</label>
          <input
            name={section.heading}
            value={(form as any)[section.heading]}
            onChange={handleChange}
            placeholder='Heading'
            className='border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black'
          />
          <textarea
            name={section.body}
            value={(form as any)[section.body]}
            onChange={handleChange}
            placeholder='Body text'
            rows={3}
            className='border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black resize-y'
          />
        </div>
      ))}

      {/* Description image */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium text-gray-700'>Description Image</label>
        {form.description_image_1 && <img src={form.description_image_1} className='h-40 w-full object-cover rounded-lg mb-2' />}
        <input type='file' accept='image/*' onChange={handleDescImage} className='border rounded-lg px-4 py-2 text-sm' />
        {uploadingDesc && <p className='text-xs text-gray-400'>Uploading...</p>}
      </div>

      {/* Accordion content */}
      {[
        { name: 'warranty', label: 'Warranty' },
        { name: 'shipping_details', label: 'Shipping Details' },
        { name: 'customer_support', label: 'Customer Support' },
      ].map(field => (
        <div key={field.name} className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-700'>{field.label}</label>
          <textarea
            name={field.name}
            value={(form as any)[field.name]}
            onChange={handleChange}
            rows={2}
            className='border rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black resize-y'
          />
        </div>
      ))}

      {/* Toggles */}
      {[
        { key: 'featured', label: 'Featured Product' },
        { key: 'in_stock', label: 'In Stock' },
      ].map(toggle => (
        <div key={toggle.key} className='flex items-center justify-between border rounded-lg px-4 py-3'>
          <p className='text-sm font-medium text-gray-700'>{toggle.label}</p>
          <button
            type='button'
            onClick={() => setForm(prev => ({ ...prev, [toggle.key]: !(prev as any)[toggle.key] }))}
            className={`w-12 h-6 rounded-full transition-colors duration-200 ${(form as any)[toggle.key] ? 'bg-black' : 'bg-gray-200'}`}
          >
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mx-0.5 ${(form as any)[toggle.key] ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className='bg-black text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50'
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>

      {success && <p className='text-green-600 text-sm font-medium'>✅ Product updated successfully!</p>}

      <a href='/admin/products/manage' className='text-sm text-gray-500 hover:text-black transition'>
        ← Back to manage products
      </a>
    </div>
  )
}