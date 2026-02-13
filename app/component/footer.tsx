"use client"

import Image from 'next/image'
import { FaLinkedin, FaUpwork, FaXTwitter } from 'react-icons/fa6'
import Button from './button1'

const Footer = () => {
    return (
        <div className="w-full">
            {/* THE IMAGE SEC */}
            <section
                className="relative overflow-hidden rounded-3xl bg-cover w-full bg-center px-8 py-28"
                style={{ backgroundImage: "url('/assets/asset33.png')" }}
            >
                {/* soft overlay for readability */}
                <div className="pointer-events-none absolute inset-0 bg-black/10" />

                <div className="relative mx-auto max-w-3xl text-center">
                    {/* Heading */}
                    <h1 className="font-serif text-4xl leading-tight text-black md:text-5xl">
                        The Perfect Product Is Just A
                        <br className='hidden sm:block' />
                        <span className="text-black/50"> Click Away</span>
                    </h1>

                    {/* CUSTOMER REVIEWS */}
                    <div className="flex justify-center items-center gap-3">
                        {/* Avatars */}
                        <div className="flex -space-x-2">
                            {[
                                '/assets/asset1.png',
                                '/assets/asset2.png',
                                '/assets/asset3.jpeg',
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    className="relative w-8 h-8 rounded-full overflow-hidden border-3 border-white/50"
                                >
                                    <Image src={src} alt="Customer" fill className="object-cover" />
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
                    </div>

                    {/* CTA */}
                    <div className="mt-10">
                        <Button
                            onClick={() => (window.location.href = '/store')}
                            variant="primary"
                        >
                            Store
                        </Button>
                    </div>
                </div>
            </section>

            {/* INFO SEC */}
            <section className="mx-auto md:mt-15 lg:mt-30 py-20">
                <div className="grid gap-12 md:grid-cols-[4fr_3.5fr]">
                    {/* Brand + copy */}
                    <div className="space-y-6">
                        <img
                            src="/assets/asset0.png"
                            alt="Essential Logo"
                            width={46}
                            height={46}
                            className="rounded-xl"
                        />
                        <p className="text-lg text-neutral-600 max-w-sm">
                            Framer template crafted for eCommerce brands ready to elevate their
                            online presence and drive more sales.
                        </p>
                        <div className="flex items-center gap-1 text-neutral-700 -mt-5">
                            <a href="https://x.com/Oluwad_amilare" aria-label="X" className="p-2">
                                <FaXTwitter className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/oluwadamilaregreggart9/"
                                aria-label="LinkedIn"
                                className="p-2"
                            >
                                <FaLinkedin className="h-4 w-4" />
                            </a>
                            <a
                                href="https://www.upwork.com/freelancers/~01f4206c2db39023fa"
                                aria-label="Upwork"
                                className="p-2"
                            >
                                <FaUpwork className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links Container */}
                    <div className="grid gap-12 grid-cols-2 lg:grid-cols-3">
                        {/* Main pages */}
                        <div className="space-y-6">
                            <h3 className="text-base font-semibold text-neutral-900">Main Pages</h3>
                            <ul className="space-y-6 text-neutral-600">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/store">Store</a>
                                </li>
                                <li>
                                    <a href="/blog">Blog</a>
                                </li>
                                <li>
                                    <a href="/our-methods">Our methods</a>
                                </li>
                                <li>
                                    <a href="/support">Support</a>
                                </li>
                            </ul>
                        </div>

                        {/* Other pages */}
                        <div className="space-y-6">
                            <h3 className="text-base font-semibold text-neutral-900">Other Pages</h3>
                            <ul className="space-y-6 text-neutral-600">
                                <li>
                                    <a href="/product">Product</a>
                                </li>
                                <li>
                                    <a href="/blog">Blog</a>
                                </li>
                                <li>
                                    <a href="/expert">Expert</a>
                                </li>
                                <li>
                                    <a href="/404">404</a>
                                </li>
                            </ul>
                        </div>

                        {/* Information */}
                        <div className="space-y-6">
                            <h3 className="text-base font-semibold text-neutral-900">Information</h3>
                            <ul className="space-y-6 text-neutral-600">
                                <li>
                                    <a href="/privacy">Privacy policy</a>
                                </li>
                                <li>
                                    <a href="/terms">Terms &amp; conditions</a>
                                </li>
                                <li>
                                    <a href="/returns">Return policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t pt-8 flex flex-col gap-4 text-base font-semibold text-black md:flex-row md:items-center md:justify-between">
                    <p>Copyright © All rights reserved</p>
                    <p>
                        Developed by <span className="text-gray-600">Olúwadámiláre</span>
                    </p>
                </div>
            </section>

            {/* BRANDNAME */}
            <section className="mx-auto w-full overflow-hidden py-12">
                <div className="text-center  md:mt-20">
                    <h2 className="font-serif text-[16vw] leading-none tracking-wide text-transparent bg-clip-text bg-linear-to-b from-neutral-700 via-neutral-300 to-neutral-100">
                        ESSENTIAL
                    </h2>
                </div>
            </section>
        </div>
    )
}

export default Footer