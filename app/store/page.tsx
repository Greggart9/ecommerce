import React from 'react'
import Footer from '../component/footer'
import Store from '../component/store'

const StorePage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 md:px-10 w-full pt-25">
      <section className="w-full mt-15 md:mt-20">
        <div className="h-40 mb-20 xl:mb-0">
          <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-center  text-black">
            <h2 className="font-serif text-5xl/14 xl:text-5xl/16 font-medium text-black">
              Browse Our
              <br />
              <span className="text-gray-600">Product Line Up</span>
            </h2>
            <p className="xl:text-right text-left text-lg pt-5 xl:pt-0">
              Explore our product collection for
              <br />
              in-depth details and inspiring picks.
            </p>
          </div>
        </div>

        <Store />

        <div className="py-15 md:py-20 mb-5">
          <hr />
        </div>

        <Footer />
      </section>
    </div>
  )
}

export default StorePage