import React from 'react'
import Footer from '../component/footer'
import Store from '../component/store'

const StorePage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-10 w-full pt-25">
      <section className="w-full mt-20">
        <div className="h-40">
          <div className="flex justify-between items-center h-26 text-black">
            <h2 className="font-serif text-5xl/18 font-medium text-black">
              Browse Our
              <br />
              <span className="text-gray-600">Product Line Up</span>
            </h2>
            <p className="text-right text-lg">
              Explore our product collection for
              <br />
              in-depth details and inspiring picks.
            </p>
          </div>
        </div>

        <Store />

        <div className="py-20 mb-5">
          <hr />
        </div>

        <Footer />
      </section>
    </div>
  )
}

export default StorePage