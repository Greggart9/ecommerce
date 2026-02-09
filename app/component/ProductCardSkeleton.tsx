import { Skeleton } from '../../components/ui/skeleton'

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm space-y-4">
      <Skeleton className="aspect-4/3 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  )
}
