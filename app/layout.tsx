import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./component/Navbar";
import "./globals.css";
import { CartProvider } from "./context/CartContext";



const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
})

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// })

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: 'Essential Beauty',
    template: '%s | Essential Beauty',
  },
  description: 'Discover premium skincare and beauty products crafted for your lifestyle.',
  keywords: ['skincare', 'beauty', 'moisturiser', 'toner', 'essential beauty'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ecommerce9.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Essential Beauty',
    title: 'Essential Beauty',
    description: 'Discover premium skincare and beauty products crafted for your lifestyle.',
    images: [{ url: '/assets/asset0.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essential Beauty',
    description: 'Discover premium skincare and beauty products crafted for your lifestyle.',
    images: ['/assets/asset0.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased max-w-360 mx-auto`}
        suppressHydrationWarning
      >
        <div className="bg-white border-x border-gray-200 ">
        <CartProvider>
        <Navbar />
        {children }
        </CartProvider>
        </div>
      </body>
    </html>
  );
}
