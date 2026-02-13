import React from 'react'
import Button from '../component/button1'
import Blog from '../component/FeaturedArticle'
import Footer from '../component/footer'

const Blogpage = () => {
  return (
    <div className='flex flex-col items-center justify-center px-10 w-full pt-25'>

                <section className='w-full mt-20'>
                     <div className='h-40 '>
                        <div className='flex justify-between items-end h-26 text-black'>
                            <h2 className='font-serif text-5xl/18 font-medium text-black'> Browse Our <br/><span className='text-gray-600'>Latest Beauty Reads</span> </h2>
                            <p className='text-right text-lg'>Browse our curated collection for detailed <br/> insights and inspiring ideas.</p>
                        </div>
                     </div>
                    <Blog />
                    <div className='py-20 mb-5'><hr></hr></div>
                    <Footer />
                </section>
    </div>
  )
}

export default Blogpage