import sql from '@/app/db'
import { notFound } from 'next/navigation'
import EditPostForm from '@/app/admin/posts/edit/[id]/EditPostForm'
import AdminLogout from '@/app/component/AdminLogout'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const result = await sql`SELECT * FROM posts WHERE id = ${id} LIMIT 1`
  const post = result[0]

  if (!post) return notFound()

  return (
    <div className='max-w-2xl mx-auto px-5 py-10 mt-20'>
        
      <div className='flex justify-end mb-4'>
        <AdminLogout />
      </div>
      <h1 className='font-serif text-3xl text-black mb-2'>Edit Post</h1>
      <p className='text-gray-500 mb-8'>Update the details below.</p>
      <EditPostForm post={post} />
    </div>
  )
}