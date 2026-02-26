'use client'

type Props = {
  mainImage: string
  galleryImages: string[]
}

export default function ProductGallery({ mainImage, galleryImages }: Props) {
  const allImages = [mainImage, ...galleryImages].filter(Boolean)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3 h-160'>
      {/* Large main image spanning full height */}
      <div className='row-span-2 rounded-2xl overflow-hidden bg-neutral-100'>
        <img
          src={allImages[0]}
          alt='Product main'
          className='w-full h-96 md:h-full object-cover'
        />
      </div>

      {/* Two smaller images stacked on the right */}
      {allImages.slice(1, 3).map((img, i) => (
        <div key={i} className='rounded-2xl overflow-hidden  bg-neutral-100 '>
          <img
            src={img}
            alt={`Product view ${i + 2}`}
            className='w-full md:w-85 h-45 md:h-85 object-cover'
          />
        </div>
      ))}
    </div>
  )
}