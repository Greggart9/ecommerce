

import React from 'react'
import Link from 'next/link'
import AdminLogout from '../component/AdminLogout'

const page = () => {
  return (
    <div className=' flex h-screen flex-col items-center text-lg md:text-2xl text-center justify-center gap-10'>
          <h1 className='text-3xl font-bold'>Admin's Dashboard</h1>

        <div className=' flex flex-col md:flex-row w-full p-4 justify-around items-center bg-neutral-100 rounded-2xl h-72'>
            <Link href='/admin/blog'><div className='h-full w-full bg-black text-white px-6 py-3 rounded-lg'>BLOG</div></Link>
            <Link href='/admin/products'><div className='h-full w-full bg-black text-white px-6 py-3 rounded-lg'>PRODUCTS</div></Link>
            <Link href='/admin/posts'><div className='h-full w-full bg-black text-white px-6 py-3 rounded-lg'>MANAGE BLOG</div></Link>
            <Link href='/admin/products/manage'><div className='h-full w-full bg-black text-white px-6 py-3 rounded-lg'>MANAGE PRODUCTS</div></Link>
        </div>

        <AdminLogout />

        
    </div>
  )
}

export default page