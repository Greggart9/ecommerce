import sql from '@/app/db'
import DeleteButton from './DeleteButton'

export default async function ManagePosts() {
  const posts = await sql`SELECT * FROM posts ORDER BY created_at DESC` as any[]

  return (
    <div className='max-w-2xl mx-auto px-5 py-10 mt-20'>
      <h1 className='font-serif text-3xl text-black mb-2'>Manage Posts</h1>
      <p className='text-gray-500 mb-8'>Delete or review your existing posts.</p>

      <div className='flex flex-col gap-4'>
        {posts.length === 0 && <p className='text-gray-400'>No posts found.</p>}
        {posts.map((post) => (
          <div key={post.id} className='flex items-center justify-between border rounded-lg px-4 py-3'>
            <div>
              <p className='font-medium text-gray-900'>{post.title}</p>
              <p className='text-xs text-gray-400'>{post.tag} · {post.minutes_read} min read</p>
            </div>
            <DeleteButton id={post.id} />
          </div>
        ))}
      </div>

      <a href='/admin' className='inline-block mt-8 text-sm text-gray-500 hover:text-black transition'>
        ← Back to create post
      </a>
    </div>
  )
}