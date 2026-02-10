'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import Button from './button1'

const faqs = [
  {
    question: 'What products does your store offer?',
    answer:
      'Our store offers a curated selection of skincare products—crafted to nourish, protect, and elevate your natural glow, no matter your skin type or routine.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship internationally to most countries. Shipping rates and delivery times vary by location.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We accept returns within 14 days of delivery for unused products in original packaging.',
  },
  {
    question: 'Do you offer discounts or promotions?',
    answer:
      'Yes, we run seasonal promotions and exclusive offers for subscribers.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Once your order ships, you’ll receive a tracking link via email.',
  },
]

const FAQs = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <div className='mb-30'>
              {/* FEATURES */}
              <section className=''>
                  <div>
                      <div className="flex flex-col items-center justify-center lg:sticky lg:top-24">
                          <button className='px-4 py-2 bg-gray-200 rounded-full mb-7'>FAQs</button>
      
                          <h1 className='mt-6 text-5xl/16 font-serif font-normal text-black text-center'> 
                              Your Questions <span className='text-gray-600'>Answered</span>
                          </h1> 
      
                          <p className='mt-6 mb-8 font-medium text-lg text-gray-600 text-center max-w-sm'>
                              Here are the most common questions customers ask before buying from us. 
                          </p>
                          
                          <Button variant='secondary'>Get in Touch</Button>
                      </div>
                  </div>
              </section>


    <section className="mx-auto max-w-2xl px-6 py-15">
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index

          return (
            <div
              key={index}
              className="rounded-2xl border border-black/5 bg-gray-100 transition-all"
            >
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-medium text-gray-900">
                  {faq.question}
                </span>

                <ChevronDown
                  className={clsx(
                    'h-5 w-5 transition-transform duration-300',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>

              <div
                className={clsx(
                  'grid overflow-hidden px-6 transition-all duration-300',
                  isOpen
                    ? 'grid-rows-[1fr] pb-5 opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <p className="overflow-hidden text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>

    </div>
  )
}

export default FAQs
