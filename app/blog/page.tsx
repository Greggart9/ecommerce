import React from 'react'
import Button from '../component/button1'
import Blog from '../component/FeaturedArticle'
import Footer from '../component/footer'

const Blogpage = () => {
  return (
    <div className='flex flex-col items-center justify-center px-5 md:px-10 w-full pt-25'>

                <section className='w-full mt-15 md:mt-20'>
                     <div className='h-40 mb-15 xl:mb-0'>
                        <div className='flex flex-col xl:flex-row xl:justify-between items-start xl:items-center '>
                            <h2 className='font-serif text-4xl/12 xl:text-5xl/16 font-medium text-black'> Browse Our <br/><span className='text-gray-600'>Latest Beauty Reads</span> </h2>
                            <p className='xl:text-right text-left text-lg pt-5 xl:pt-0'>Browse our curated collection for detailed <br/> insights and inspiring ideas.</p>
                        </div>
                     </div>
                    <Blog />
                    <div className='py-10 md:py-20 mb-5'><hr></hr></div>
                    <Footer />
                </section>
    </div>
  )
}

export default Blogpage