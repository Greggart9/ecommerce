import sql from '@/app/db'
import { notFound } from 'next/navigation'
import EditProductForm from '@/app/admin/products/edit/[id]/EditProductForm'
import AdminLogout from '@/app/component/AdminLogout'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const result = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`
  const product = result[0]

  if (!product) return notFound()

  return (
    <div className='max-w-2xl mx-auto px-5 py-10 mt-20'>
      <div className='flex justify-end mb-4'>
        <AdminLogout />
      </div>
      <h1 className='font-serif text-3xl text-black mb-2'>Edit Product</h1>
      <p className='text-gray-500 mb-8'>Update the details below.</p>
      <EditProductForm product={product} />
    </div>
  )
}