'use client'

import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Button from '../component/button1';
import { useRef } from "react";
import Store from '../component/store';
import StatsFeatures from '../component/statsFeatures';
import Blog from '../component/FeaturedArticle';

const Hero = () => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"]
  });
  
  const yImg = useTransform(scrollYProgress, [0, 1], [0, -400]);
  return (
     <div className='flex flex-col  items-center justify-center w-full h-fit'>
       {/* EMPTY DIV */}
       <div className='h-49'></div>

         {/* LANDING */}
        <motion.div
                initial={{ y: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}>

            {/* CUSTOMER REVIEWS */}
            <motion.section
                initial={{ y: -20, filter: "blur(0px)", opacity: 0 }}
                animate={{ y: 0 , filter: "blur(0px)", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                className='flex justify-center items-center gap-3'
            >        
                {/* Avatars */}
                <div className="flex -space-x-2">
                    {["/assets/asset1.png", "/assets/asset2.png", "/assets/asset3.jpeg"].map((src, i) => (
                    <div
                        key={i}
                        className="relative w-8 h-8 rounded-full overflow-hidden border-3 border-white"
                    >
                        <Image
                        src={src}
                        alt="Customer"
                        fill
                        className="object-cover"
                        />
                    </div>
                    ))}
                </div>

                {/* Rating + text */}
                <div className="flex flex-col leading-tight">
                    <div className="flex gap-0.5 text-orange-500 text-base">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                    </div>

                    <p className="text-base font-medium text-gray-500">
                    <span className="font-medium text-gray-900">230k+</span> Happy customers
                    </p>
                </div>
            </motion.section> 

   
            {/* MAIN TEXT ON THE HERO */}
            <motion.section>
                <h1 className='mt-6 text-6xl/16 font-serif font-normal text-black text-center'> 
                    Built To Buy,<br /> <span className='text-gray-600'>Designed To Delight</span>
                </h1> 
            </motion.section>

            {/* SUBTEXT + BUTTON + HERO IMAGE */}
            <motion.section
                initial={{ y: 20, filter: "blur(0px)", opacity: 0 }}
                animate={{ y: 0 , filter: "blur(0px)", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeIn" }}
                className='flex flex-col gap-6 justify-center items-center'
            >
                <p className='mt-6 font-medium text-lg text-gray-600 text-center max-w-xs'>
                   Natural tools and curated products designed to elevate your lifestyle. 
                </p>

                <Button variant='primary'>Store</Button>
                <span className='mt-6'>
                <motion.img 
                  ref={imgRef}
                  src="/assets/asset4.png" 
                  alt="Hero Image" 
                  height={440} 
                  width={440} 
                  style={{ y: yImg,
                    maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
                    filter: 'drop-shadow(0 0 -20px 20px rgba(255,255,255,1.0))'
                   }}
                    transition={{ 
                    duration: 0.8,
                    ease: "easeOut" }}
                />

                </span>
                 
            </motion.section>

        </motion.div>


        {/* ABOUT US */}
            <section className='w-full -mt-80 pt-50 pb-25  flex justify-center items-center'>
                <div className=' flex justify-between w-full items-start
                 text-black'>
                    <button className='px-4 py-2 bg-gray-200 rounded-full'>About us</button>

                    <p className='font-serif text-3xl/10 font-medium max-w-200 '>
                        "At our store, we believe that good design should be both
                        beautiful and practical. That’s why we curate a collection of
                        carefully crafted essentials—each chosen for its purpose,
                        quality, and timeless appeal."

                    </p>
                </div>

            </section>

        {/* STORE */}
        <section className='mt-30 mb-10'>
             <div className='h-57.5 '>
                <button className='px-4 py-2 bg-gray-200 rounded-full mb-9'>Store</button>
                <div className='flex justify-between items-end h-26 text-black'>
                    <h2 className='font-serif text-5xl/14 font-medium text-black'> Find Products That Perfectly Match <br/><span className='text-gray-600'>Your Lifestyle</span> </h2>
                    <Button variant='secondary'>View All</Button>
                </div>
             </div>
            <Store />
        </section>

        {/* STATS AND FEATURES */}
        <section className='mt-50 mb-30 '>
            <StatsFeatures />
        </section>


        {/* BLOG */}
        <section className='w-full mt-10 mb-30'>
             <div className='h-57.5 '>
                <button className='px-4 py-2 bg-gray-200 rounded-full mb-9'>Blog</button>
                <div className='flex justify-between items-end h-26 text-black'>
                    <h2 className='font-serif text-5xl/14 font-medium text-black'> Explore Beauty Reads Tailored to <br/><span className='text-gray-600'>Your Lifestyle</span> </h2>
                    <Button variant='secondary'>View All</Button>
                </div>
             </div>
            <Blog />
        </section>


     </div>
  )
}

export default Hero



