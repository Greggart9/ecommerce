import sql from '../db'
import AdminLogout from '../component/AdminLogout'
import Link from 'next/link'

async function getStats() {
  const [
    totalProducts,
    totalPosts,
    featuredProducts,
    featuredPosts,
    recentProducts,
    recentPosts,
  ] = await Promise.all([
    sql`SELECT COUNT(*) FROM products`,
    sql`SELECT COUNT(*) FROM posts`,
    sql`SELECT COUNT(*) FROM products WHERE featured = true`,
    sql`SELECT COUNT(*) FROM posts WHERE featured = true`,
    sql`SELECT id, title, brand, image_url, slug, created_at FROM products ORDER BY created_at DESC LIMIT 4`,
    sql`SELECT id, title, tag, cover_image_url, slug, created_at FROM posts ORDER BY created_at DESC LIMIT 4`,
  ])

  return {
    totalProducts: parseInt(totalProducts[0].count),
    totalPosts: parseInt(totalPosts[0].count),
    featuredProducts: parseInt(featuredProducts[0].count),
    featuredPosts: parseInt(featuredPosts[0].count),
    recentProducts: recentProducts as any[],
    recentPosts: recentPosts as any[],
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div className='max-w-4xl mx-auto px-5 py-10 mt-25'>
      {/* Header */}
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='font-serif text-4xl text-black'>Admin Dashboard</h1>
          <p className='text-gray-500 text-sm mt-1'>Manage your store and blog</p>
        </div>
        <AdminLogout />
      </div>

      {/* Stats grid */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
        {[
          { label: 'Total Products', value: stats.totalProducts, color: 'bg-black text-white' },
          { label: 'Total Posts', value: stats.totalPosts, color: 'bg-black text-white' },
          { label: 'Featured Products', value: stats.featuredProducts, color: 'bg-neutral-100 text-black' },
          { label: 'Featured Posts', value: stats.featuredPosts, color: 'bg-neutral-100 text-black' },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl p-5 flex flex-col gap-2 ${stat.color}`}>
            <p className='text-3xl font-serif font-medium'>{stat.value}</p>
            <p className='text-sm opacity-70'>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-10'>
        {[
          { label: '+ New Product', href: '/admin/products' },
          { label: '+ New Post', href: '/admin/blog' },
          { label: 'Manage Products', href: '/admin/products/manage' },
          { label: 'Manage Posts', href: '/admin/posts' },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className='rounded-xl border px-4 py-3 text-sm font-medium text-center text-black hover:bg-black hover:text-white transition'
          >
            {action.label}
          </Link>
        ))}
      </div>

      {/* Recent products */}
      <div className='mb-10'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='font-serif text-xl text-black'>Recent Products</h2>
          <Link href='/admin/products/manage' className='text-sm text-gray-500 hover:text-black transition'>
            View all →
          </Link>
        </div>
        <div className='flex flex-col divide-y border rounded-2xl overflow-hidden'>
          {stats.recentProducts.map((product) => (
            <div key={product.id} className='flex items-center gap-4 px-4 py-3'>
              {product.image_url && (
                <img src={product.image_url} className='h-12 w-12 rounded-xl object-cover bg-neutral-100' />
              )}
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-black truncate'>{product.title}</p>
                <p className='text-xs text-gray-400'>{product.brand}</p>
              </div>
              <div className='flex items-center gap-3 shrink-0'>
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className='text-xs text-blue-500 hover:text-blue-700 transition'
                >
                  Edit
                </Link>
                <Link
                  href={`/store/${product.slug}`}
                  className='text-xs text-gray-400 hover:text-black transition'
                  target='_blank'
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent posts */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='font-serif text-xl text-black'>Recent Posts</h2>
          <Link href='/admin/posts' className='text-sm text-gray-500 hover:text-black transition'>
            View all →
          </Link>
        </div>
        <div className='flex flex-col divide-y border rounded-2xl overflow-hidden'>
          {stats.recentPosts.map((post) => (
            <div key={post.id} className='flex items-center gap-4 px-4 py-3'>
              {post.cover_image_url && (
                <img src={post.cover_image_url} className='h-12 w-12 rounded-xl object-cover bg-neutral-100' />
              )}
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-black truncate'>{post.title}</p>
                <p className='text-xs text-gray-400'>{post.tag}</p>
              </div>
              <div className='flex items-center gap-3 shrink-0'>
                <Link
                  href={`/admin/posts/edit/${post.id}`}
                  className='text-xs text-blue-500 hover:text-blue-700 transition'
                >
                  Edit
                </Link>
                <Link
                  href={`/blog/${post.slug}`}
                  className='text-xs text-gray-400 hover:text-black transition'
                  target='_blank'
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}