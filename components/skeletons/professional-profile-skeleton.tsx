import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfessionalProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="space-y-4 flex-1">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-4 rounded-full" />
                ))}
                <Skeleton className="h-4 w-16 ml-2" />
              </div>
              <div className="flex items-center">
                <Skeleton className="h-4 w-4 rounded-full mr-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Card className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      </div>
    </div>
  );
}
