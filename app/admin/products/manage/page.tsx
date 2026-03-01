import sql from '@/app/db'
import DeleteProductButton from './DeleteProductButton'
import Footer from '../../../component/footer'
import AdminLogout from '../../../component/AdminLogout'

export default async function ManageProducts() {
  const products = await sql`SELECT * FROM products ORDER BY created_at DESC` as any[]

  return (
    <>

      <div className='max-w-2xl mx-auto px-5 py-10 mt-25'>
          <div className='flex justify-end mb-4'>
          <AdminLogout />
          </div>


      <h1 className='font-serif text-4xl text-black mb-2'>Manage Products</h1>
      <p className='text-gray-500 mb-8'>Delete or review your existing products.</p>

      <div className='flex flex-col gap-4'>
        {products.length === 0 && <p className='text-gray-400'>No products found.</p>}
        {products.map((product) => (
          <div key={product.id} className='flex items-center justify-between border rounded-lg px-4 py-3'>
            <div className='flex items-center gap-3'>
              {product.image_url && (
                <img src={product.image_url} className='h-12 w-12 object-cover rounded-lg' />
              )}
              <div>
                <p className='font-medium text-gray-900'>{product.title}</p>
                <p className='text-xs text-gray-400'>{product.brand} · ${parseFloat(product.price).toFixed(2)}</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
            
              <a
                href={`/admin/products/edit/${product.id}`}
                className='text-sm text-blue-500 hover:text-blue-700 transition'
              >
                Edit
            </a>
            
            <DeleteProductButton id={product.id} />
            </div>
          </div>
        ))}
      </div>

      <div className='flex gap-4 mt-8'>
        <a href='/admin/products' className='text-sm text-gray-500 hover:text-black transition'>
          ← Add new product
        </a>
        <a href='/admin' className='text-sm text-gray-500 hover:text-black transition'>
          ← Back to admin
        </a>
      </div>
      </div>

      
      <div className='mt-10 md:mt-20 lg:mt-30 px-5 md:px-10'>
      <Footer />
      </div>
    </>
  )
}