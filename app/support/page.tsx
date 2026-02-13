import React from 'react'
import Button from '../component/button1'
import FAQs from '../component/faqs'
import Footer from '../component/footer'

const SupportPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-10 w-full pt-25">
      {/* FORM */}
      <section className="w-full max-w-360 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* LEFT */}
          <div className="space-y-6">
            <button className="px-4 py-2 bg-gray-200 rounded-full">Support</button>

            <h1 className="font-serif text-5xl/14 text-neutral-900">
              Answers &amp; Limitless
              <br />
              <span className="text-neutral-500">Support</span>
            </h1>

            <ul className="space-y-4 text-neutral-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-neutral-900">✓</span>
                <span>Easy-to-understand help without any confusion.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-neutral-900">✓</span>
                <span>
                  Access support anytime with 24/7 availability and quick responses.
                </span>
              </li>
            </ul>

            <Button variant="secondary">Our FAQs</Button>

            <div className="overflow-hidden rounded-lg border bg-neutral-100">
              <img
                src="/assets/asset35.png"
                alt="Support visual"
                className="h-58 w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-lg border bg-neutral-100 p-8 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-semibold text-black">
                Drop Us a Line
              </h2>
              <p className="text-base text-neutral-500">
                We&apos;re here and ready to listen!
              </p>
            </div>

            <form className="mt-6 space-y-10">
              <div className="space-y-4">
                <label className="text-base font-medium text-neutral-700">
                  Request
                </label>
                <select className="w-full rounded-lg border px-4 py-4 text-sm">
                  <option>Product return</option>
                  <option>Order status</option>
                  <option>General inquiry</option>
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="text-base font-medium text-neutral-700">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Olúwadámiláre"
                    className="w-full rounded-lg border px-4 py-4 text-sm"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-base font-medium text-neutral-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 907 9654 499"
                    className="w-full rounded-lg border px-4 py-4 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-base font-medium text-neutral-700">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="oluwadamilare.greggart9@gmail.com"
                  className="w-full rounded-lg border px-4 py-4 text-sm"
                />
              </div>

              <div className="space-y-4">
                <label className="text-base font-medium text-neutral-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Your message!"
                  className="w-full rounded-lg border px-4 py-4 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg cursor-pointer bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:scale-[1.01]"
              >
                Submit
                <span className="ml-2">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="mt-35">
        <FAQs />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default SupportPage
