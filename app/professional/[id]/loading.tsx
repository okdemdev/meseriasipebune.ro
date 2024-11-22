import { Skeleton } from '@/components/ui/skeleton';
import { ProfessionalProfileSkeleton } from '@/components/skeletons/professional-profile-skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-32 mb-6" />
      <ProfessionalProfileSkeleton />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
