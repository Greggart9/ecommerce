export type Product = {
  id: number
  title: string
  brand: string
  price: number
  currency: string
  image: string
  href: string
  slug: string
}

export const products: Product[] = [
  {
    id: 1,
    title: 'Lustre Dew Elixir',
    brand: 'Veloura Skincare',
    price: 109,
    currency: 'USD',
    image: '/assets/asset5.jpeg',
    href: '/store/lustre-dew-elixir',
    slug: 'lustre-dew-elixir',
  },
  {
    id: 2,
    title: 'Hydrating Day Cream',
    brand: 'Aéra Beauty',
    price: 52,
    currency: 'USD',
    image: '/assets/asset6.png',
    href: '/store/hydrating-day-cream',
    slug: 'hydrating-day-cream',
  },
  {
    id: 3,
    title: 'Gentle Foaming Cleanser',
    brand: 'Natural Iris',
    price: 159,
    currency: 'USD',
    image: '/assets/asset7.png',
    href: '/store/gentle-foaming-cleanser',
    slug: 'gentle-foaming-cleanser',
  },
  
  {
    id: 4,
    title: 'Replenshing Night Balm',
    brand: 'Eluna Botanicals',
    price: 112,
    currency: 'USD',
    image: '/assets/asset8.png',
    href: '/store/replenishing-night-balm',
    slug: 'replenishing-night-balm',
  },
  {
    id: 5,
    title: 'Brightening Toner',
    brand: 'Serenys Skin',
    price: 210,
    currency: 'USD',
    image: '/assets/asset9.png',
    href: '/store/brightening-toner',
    slug: 'brightening-toner',
  },
    {
    id: 6,
    title: 'Soothing Eye Cream',
    brand: 'Lumina Skincare',
    price: 100,
    currency: 'USD',
    image: '/assets/asset11.png',
    href: '/store/soothing-eye-cream',
    slug: 'soothing-eye-cream',
  },
]
