# Essential

A full-stack e-commerce and content platform built for a beauty and skincare brand. Features a product storefront, blog system, shopping cart, secure admin panel, and search — all built with Next.js and PostgreSQL.

**Live Site:** https://ecommerce9.vercel.app  
**GitHub:** https://github.com/Greggart9/ecommerce

---

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** Neon PostgreSQL (Serverless)
- **Images:** Cloudinary
- **Email:** Resend
- **Rate Limiting:** Upstash Redis
- **Deployment:** Vercel

---

## Features

### Store
- Product listing with animated grid
- Individual product pages with image gallery
- Quantity selector, Add to Cart, and Buy Now
- Similar products section
- Scroll-linked description image animation

### Cart
- Global in-memory cart via React Context
- Real-time item count badge in navbar
- Quantity management and item removal
- Order confirmation screen

### Blog
- Featured hero post + paginated grid
- Individual post pages with author info
- Load more pagination
- Eye cursor hover effect

### Search
- Covers both products and blog posts
- Debounced API calls with animated dropdown
- Full results page at `/search`

### Admin Panel
- Password-protected with cookie auth
- Dashboard with stats and quick actions
- Create, edit, and delete products and posts
- Cloudinary image upload for all content
- Protected by Next.js middleware

### Security
- Rate limiting on all API routes (Upstash Redis)
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Cloudinary upload restrictions (type + size)
- SQL injection prevention via parameterized queries
- httpOnly admin cookie

### Email
- Contact form sends admin notification + user confirmation
- Powered by Resend API

### SEO
- Static metadata on all pages
- Dynamic `generateMetadata()` for product and blog slug pages
- OpenGraph and Twitter card support

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- Neon PostgreSQL database
- Cloudinary account
- Resend account
- Upstash Redis database

### Installation

```bash
git clone https://github.com/Greggart9/ecommerce
cd ecommerce
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
DATABASE_URL=your_neon_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_PASSWORD=your_admin_password
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
RESEND_API_KEY=your_resend_key
ADMIN_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
```

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
app/
  ├── page.tsx                    # Homepage
  ├── store/
  │   ├── page.tsx                # Store listing
  │   └── [slug]/page.tsx         # Product page
  ├── blog/
  │   ├── page.tsx                # Blog listing
  │   └── [slug]/page.tsx         # Blog post
  ├── cart/page.tsx               # Cart page
  ├── search/page.tsx             # Search results
  ├── support/page.tsx            # Contact + FAQ
  ├── our-methods/page.tsx        # Brand story
  ├── admin/
  │   ├── page.tsx                # Dashboard
  │   ├── login/page.tsx          # Admin login
  │   ├── blog/page.tsx           # Create post
  │   ├── posts/                  # Manage + edit posts
  │   └── products/               # Manage + edit products
  ├── api/
  │   ├── products/route.ts       # Products CRUD
  │   ├── posts/route.ts          # Posts CRUD
  │   ├── upload/route.ts         # Cloudinary upload
  │   ├── search/route.ts         # Search endpoint
  │   ├── contact/route.ts        # Contact form + email
  │   └── admin/auth/route.ts     # Admin auth
  ├── component/                  # Shared UI components
  ├── context/CartContext.tsx     # Cart state
  ├── lib/ratelimit.ts            # Rate limiter instances
  ├── db.ts                       # Neon connection
  └── layout.tsx                  # Root layout

middleware.ts                     # Admin route protection
next.config.ts                    # Security headers + image config
```

---

## Database Schema

### products
| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| title, brand, slug | TEXT |
| price, original_price | NUMERIC |
| image_url, gallery_images[] | TEXT / TEXT[] |
| features[] | TEXT[] |
| description_heading/body × 2 | TEXT |
| warranty, shipping_details, customer_support | TEXT |
| rating, review_count | NUMERIC / INTEGER |
| featured, in_stock | BOOLEAN |
| created_at, updated_at | TIMESTAMPTZ |

### posts
| Column | Type |
|--------|------|
| id | SERIAL PRIMARY KEY |
| title, slug, tag | TEXT |
| body, cover_image_url | TEXT |
| author_name, author_role, author_image_url | TEXT |
| minutes_read | INTEGER |
| featured | BOOLEAN |
| created_at, updated_at | TIMESTAMPTZ |

---

## Admin Access

Visit `/admin` — you will be redirected to `/admin/login`. Enter your `ADMIN_PASSWORD` to access the dashboard.

The admin panel allows you to:
- View stats (total products, posts, featured counts)
- Create, edit, and delete products
- Create, edit, and delete blog posts
- Upload images via Cloudinary

---

## Deployment

The project is deployed on Vercel. To deploy your own instance:

```bash
npm install -g vercel
vercel
```

Then add all environment variables in your Vercel Dashboard under **Settings → Environment Variables**.

---

## License

MIT
