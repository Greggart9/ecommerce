import React from 'react'
import ScrollCircleGallery from './ScrollCircleGallery'
import Button from './button1'

const statsFeatures = () => {
    return (
        <div className="mx-auto max-w-360 px-10">
        <ScrollCircleGallery />

        {/* FEATURES */}
        <section className=''>
            <div>
                <div className="flex flex-col items-center justify-center lg:sticky lg:top-24">
                    <button className='px-4 py-2 bg-gray-200 rounded-full mb-7'>Features</button>

                    <h1 className='mt-6 text-5xl/16 font-serif font-normal text-black text-center'> 
                        Where Timeless Values Meet<br /> <span className='text-gray-600'>Modern Vision</span>
                    </h1> 

                    <p className='mt-6 mb-8 font-medium text-lg text-gray-600 text-center max-w-xs'>
                        Behind every pixel, product, and project lies a story of dedication. 
                    </p>
                    
                    <Button variant='secondary'>Our Methods</Button>
                </div>
            </div>


            <div>

                {/* MATERIALS */}
                <div className=" mx-auto py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        
                        {/* LEFT CONTENT */}
                        <div className="space-y-6 lg:sticky lg:top-30 self-start h-fit">
                        <button className='px-4 py-2 bg-gray-200 rounded-full mb-7'>Materials</button>

                        <h2 className="text-4xl font-serif leading-tight">
                            Sustainable Elegance
                        </h2>

                        <p className="text-neutral-600 max-w-md">
                            Thoughtfully crafted from eco-friendly materials, this product
                            reflects a commitment to both style and the planet.
                        </p>
                        </div>

                        {/* RIGHT CARDS */}
                        <div className=" lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 w-fit ml-auto">
                        
                        {/* Card 1 */}
                        <div className="rounded-xl border bg-white p-6 w-97">
                            <h3 className="text-center text-base font-medium mb-6">
                            Plant based
                            </h3>

                            <div className="overflow-hidden rounded-xl">
                            <img
                                src="/assets/asset22.png"
                                alt="Plant based"
                                className="w-full h-105 object-cover"
                            />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-xl border bg-white p-6 w-97">
                            <h3 className="text-center text-base font-medium mb-6">
                            Organic
                            </h3>

                            <div className="overflow-hidden rounded-xl">
                            <img
                                src="/assets/asset23.png"
                                alt="Organic"
                                className="w-full h-105 object-cover"
                            />
                            </div>
                        </div>

                        </div>
                    </div>
                </div>

                {/* SOURCES */}
                <div className=" mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        
                        {/* LEFT CONTENT */}
                        <div className="space-y-6 lg:sticky lg:top-30 self-start h-fit">
                        <button className='px-4 py-2 bg-gray-200 rounded-full mb-7'>Sources</button>

                        <h2 className="text-4xl font-serif leading-tight">
                            Natural Integrity
                        </h2>

                        <p className="text-neutral-600 max-w-md">
                            Built with responsibly sourced components and 
                            clean design principles, it blends function, form, and sustainability

                        </p>
                        </div>

                        {/* RIGHT CARDS */}
                        <div className=" lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 w-fit ml-auto">
                        
                        {/* Card 1 */}
                        <div className="rounded-xl border bg-white p-6 w-97">
                            <h3 className="text-center text-base font-medium mb-6">
                            All natural
                            </h3>

                            <div className="overflow-hidden rounded-xl">
                            <img
                                src="/assets/asset24.png"
                                alt="All natural"
                                className="w-full h-105 object-cover"
                            />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-xl border bg-white p-6 w-97">
                            <h3 className="text-center text-base font-medium mb-6">
                            Chemicals free
                            </h3>

                            <div className="overflow-hidden rounded-xl">
                            <img
                                src="/assets/asset25.png"
                                alt="Chemicals free"
                                className="w-full h-105 object-cover"
                            />
                            </div>
                        </div>

                        </div>
                    </div>
                </div>

                {/* DESIGN */}
                <div className=" mx-auto py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        {/* LEFT CONTENT */}
                        <div className="space-y-6 lg:sticky lg:top-30 self-start h-fit">
                        <button className='px-4 py-2 bg-gray-200 rounded-full mb-7'>Design</button>

                        <h2 className="text-4xl font-serif leading-tight">
                            Conscious Design
                        </h2>

                        <p className="text-neutral-600 max-w-md">
                            Made using durable, low-impact materials, this piece is as mindful as it is 
                            beautifully made—designed to last and leave a lighter footprint
                        </p>
                        </div>

                        {/* RIGHT CARDS */}
                        <div className=" lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 w-fit ml-auto">
                        
                        {/* Card 1 */}
                        <div className="rounded-xl border bg-white p-6 w-97">
                            <h3 className="text-center text-base font-medium mb-6">
                            Handled with care
                            </h3>

                            <div className="overflow-hidden rounded-xl">
                            <img
                                src="/assets/asset26.png"
                                alt="Handled with care"
                                className="w-full h-105 object-cover"
                            />
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-xl border bg-white p-6 w-97">
                            <h3 className="text-center text-base font-medium mb-6">
                            Expert design
                            </h3>

                            <div className="overflow-hidden rounded-xl">
                            <img
                                src="/assets/asset27.jpeg"
                                alt="Expert design"
                                className="w-full h-105 object-cover"
                            />
                            </div>
                        </div>

                        </div>
                    </div>
                </div>

                

            </div>
        </section>
    </div>
  )
}

export default statsFeatures