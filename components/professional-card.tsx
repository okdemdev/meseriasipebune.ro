'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from '@/components/star-rating';
import { MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface ProfessionalCardProps {
  professional: any;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/professional/${professional._id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative h-48">
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
            <Image
              src={professional.profileImage}
              alt={professional.name}
              fill
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">{professional.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 capitalize">{professional.category}</p>
            <div className="flex items-center mb-2">
              <StarRating rating={professional.rating} count={professional.ratingCount} />
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {professional.city}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
