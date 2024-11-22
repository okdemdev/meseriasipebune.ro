import { Skeleton } from '@/components/ui/skeleton';
import { ProfessionalCardSkeleton } from '@/components/skeletons/professional-card-skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-32 mb-6" />
      <div className="flex items-center space-x-4 mb-8">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProfessionalCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
