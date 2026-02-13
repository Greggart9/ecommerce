import React from 'react'
import Image from 'next/image'
import { FiCheckCircle } from 'react-icons/fi'
import Footer from '../component/footer'

const OurMethodsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-10 w-full pt-25">
      {/* HERO SECTION */}
      <section className="w-full mt-20">
        <div className="h-40">
          <div className="flex justify-between items-center h-26 text-black">
            <h2 className="font-serif text-5xl/18 font-medium text-black">
              As Natural As You.
              <br />
              <span className="text-gray-600">Perfectly Refined</span>
            </h2>
            <p className="text-right text-lg">
              Explore our approach for in-depth
              <br />
              insights and intentional choices.
            </p>
          </div>
        </div>

        <div>
          <img
            src="/assets/asset36.png"
            alt="Our Methods"
            className="w-full h-175 rounded-lg"
          />
        </div>
      </section>

      {/* OUR METHODS SECTION */}
      <section className="mt-40">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center">
          <button className="px-4 py-2 bg-gray-200 rounded-full mb-7">
            Our methods
          </button>

          <h1 className="mt-6 text-5xl/16 font-serif font-normal text-black text-center">
            Rooted In Purpose, Backed
            <br />
            <span className="text-gray-600">By Care</span>
          </h1>

          <p className="mt-6 mb-8 font-medium text-lg text-gray-600 text-center max-w-sm">
            We blend high-performing formulas with naturally derived ingredients.
          </p>
        </div>

        {/* Methods Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* Eco-Friendly Packaging Card */}
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-serif font-medium text-black mb-4">
                Eco-Friendly Packaging
              </h3>
              <p className="text-gray-600 mb-6">
                Made with biodegradable and low-waste materials to reduce our
                impact and support a cleaner future.
              </p>
              <div className="relative w-full h-72 mt-20">
                <Image
                  src="/assets/asset38.png"
                  alt="Eco packaging"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Eco Bag Image */}
            <div className="relative w-full h-40 rounded-lg overflow-hidden">
              <Image
                src="/assets/asset39.png"
                alt="Eco bag"
                fill
                className="object-cover"
              />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-3xl font-serif font-medium text-black">90%+</p>
                <p className="text-gray-600 text-base mt-2">Naturally ingredients</p>
              </div>
              <div className="rounded-lg p-6">
                <p className="text-3xl font-serif font-medium text-black">0%</p>
                <p className="text-gray-600 text-base mt-2">
                  Compromise on performance, purity, or planet
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">
            {/* Energy Image */}
            <div className="relative w-full h-88 rounded-lg overflow-hidden">
              <Image
                src="/assets/asset37.png"
                alt="Renewable energy"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Section */}
            <div>
              <button className="px-4 py-2 bg-gray-200 rounded-full">
                Formulas
              </button>
              <h2 className="text-3xl mt-6 font-serif font-medium text-black mb-6">
                Science-Backed Formulas
              </h2>
              <p className="text-gray-600 mb-8">
                Every product is crafted with purpose, blending proven actives and
                plant-based ingredients to support real skin results—no fluff, no
                fillers.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-600 text-xl mt-1 shrink-0" />
                  <span className="text-gray-700">Botanical-powered blends</span>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-600 text-xl mt-1 shrink-0" />
                  <span className="text-gray-700">Clinically conscious formulas</span>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-green-600 text-xl mt-1 shrink-0" />
                  <span className="text-gray-700">Mindful manufacturing</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 gap-6">
                <div className="rounded-lg p-6">
                  <p className="text-3xl font-serif font-medium text-black">100%</p>
                  <p className="text-gray-600 text-base mt-2">Cruelty-free</p>
                </div>
                <div className="rounded-lg p-6">
                  <p className="text-3xl font-serif font-medium text-black">80%</p>
                  <p className="text-gray-600 text-base mt-2">Eco-friendly packaging</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       
      {/* TEAM SECTION */}
      <section className="mt-40 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center">
          <button className="px-4 py-2 bg-gray-200 rounded-full mb-7">
            Experts
          </button>

          <h1 className="mt-6 text-5xl/16 font-serif font-normal text-black text-center">
            Meet The People Who
            <br />
            Make <span className="text-gray-600">Everything Possible</span>
          </h1>

          <p className="mt-6 mb-8 font-medium text-lg text-gray-600 text-center max-w-sm">
            At Essential, we believe beauty should feel effortless and empowering.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {/* Team Member 1 */}
          <div className="group bg-gray-50 rounded-lg cursor-pointer">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src="/assets/asset1.png"
                alt="Lucas Grant"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <p className="text-sm w-fit text-black font-semibold bg-white py-1 px-3 rounded-full flex justify-center mb-1">
                Skincare consultant
              </p>
              <h3 className="text-2xl pt-2 font-serif font-medium text-black">
                Lucas Grant
              </h3>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="group bg-gray-50 rounded-lg cursor-pointer">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src="/assets/asset2.png"
                alt="Milo Carter"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <p className="text-sm w-fit text-black font-semibold bg-white py-1 px-3 rounded-full flex justify-center mb-1">
                Customer experience
              </p>
              <h3 className="text-2xl pt-2 font-serif font-medium text-black">
                Milo Carter
              </h3>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="group bg-gray-50 rounded-lg cursor-pointer">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src="/assets/asset29.png"
                alt="Adrian Cole"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <p className="text-sm w-fit text-black font-semibold bg-white py-1 px-3 rounded-full flex justify-center mb-1">
                Content contributor
              </p>
              <h3 className="text-2xl pt-2 font-serif font-medium text-black">
                Adrian Cole
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="mt-40 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center">
          <button className="px-4 py-2 bg-gray-200 rounded-full mb-7">
            Testimonials
          </button>

          <h1 className="mt-6 text-5xl/16 font-serif font-normal text-black text-center">
            Hear What Our Customers
            <br />
            <span className="text-gray-600">Are Saying</span>
          </h1>

          <p className="mt-6 mb-8 font-medium text-lg text-gray-600 text-center max-w-xs">
            Our testimonials reflect genuine experiences from customers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {/* Testimonial 1 */}
          <div className="relative rounded-2xl overflow-hidden p-3">
            <Image
              src="/assets/asset12.png"
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 bg-white rounded-xl p-6">
              <div className="w-14 h-14 rounded-full overflow-hidden mb-6 bg-white">
                <Image
                  src="/assets/asset12.png"
                  alt="Customer"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                "I've never felt this confident without makeup before. This serum is
                truly a game changer for my skin!"
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-red-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-medium text-black">Lina Johnson</h4>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="relative rounded-2xl overflow-hidden p-3">
            <Image
              src="/assets/asset13.png"
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 bg-white rounded-xl p-6">
              <div className="w-14 h-14 rounded-full overflow-hidden mb-6 bg-white">
                <Image
                  src="/assets/asset13.png"
                  alt="Customer"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                "I've tried so many moisturizers, but this one actually keeps my
                skin glowing all day. Totally obsessed!"
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-medium text-black">Sofia Davis</h4>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="relative rounded-2xl overflow-hidden p-3">
            <Image
              src="/assets/asset14.png"
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 bg-white rounded-xl p-6">
              <div className="w-14 h-14 rounded-full overflow-hidden mb-6 bg-white">
                <Image
                  src="/assets/asset14.png"
                  alt="Customer"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                "This cleanser completely transformed my routine. It leaves my face
                feeling so fresh without drying it out."
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-red-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-medium text-black">Emily Roberts</h4>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="relative rounded-2xl overflow-hidden p-3">
            <Image
              src="/assets/asset15.png"
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 bg-white rounded-xl p-6">
              <div className="w-14 h-14 rounded-full overflow-hidden mb-6 bg-white">
                <Image
                  src="/assets/asset15.png"
                  alt="Customer"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                "I noticed a difference within just a few days. My skin feels
                smoother, clearer, and so refreshed."
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-medium text-black">Maya Chen</h4>
            </div>
          </div>

          {/* Testimonial 5 */}
          <div className="relative rounded-2xl overflow-hidden p-3">
            <Image
              src="/assets/asset16.png"
              alt="Background"
              fill
              className="object-cover"
            />
            <div className="relative z-10 bg-white rounded-xl p-6">
              <div className="w-14 h-14 rounded-full overflow-hidden mb-6 bg-white">
                <Image
                  src="/assets/asset16.png"
                  alt="Customer"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 text-base mb-6 leading-relaxed">
                "Finally found a product that understands my skin. It's gentle,
                effective, and absolutely worth every cent."
              </p>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-red-500 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <h4 className="text-lg font-medium text-black">Rachel Kim</h4>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="py-20 mb-5">
        <hr />
      </div>
      <Footer />
    </div>
  )
}

export default OurMethodsPage