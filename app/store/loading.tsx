import { SkeletonBox } from '../component/Skeleton'

export default function StoreLoading() {
  return (
    <div className="flex flex-col items-center justify-center px-5 md:px-10 w-full pt-25">
      <section className="w-full mt-15 md:mt-20">
        {/* Header skeleton */}
        <div className="h-40 mb-20 xl:mb-0">
          <SkeletonBox className="h-12 w-72 mb-4" />
          <SkeletonBox className="h-6 w-48" />
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm">
              <SkeletonBox className="aspect-4/3 w-full rounded-none" />
              <div className="p-4 space-y-3">
                <SkeletonBox className="h-4 w-3/4" />
                <SkeletonBox className="h-3 w-1/2" />
                <SkeletonBox className="h-9 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}