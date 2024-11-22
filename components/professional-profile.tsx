'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/star-rating';
import { MapPin, Phone, Calendar, PencilIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

interface ProfessionalProfileProps {
  professional: any;
  isOwnProfile?: boolean;
}

export function ProfessionalProfile({
  professional,
  isOwnProfile = false,
}: ProfessionalProfileProps) {
  const [profileImageLoaded, setProfileImageLoaded] = useState(false);
  const [workImagesLoaded, setWorkImagesLoaded] = useState<boolean[]>(
    new Array(professional.workImages?.length || 0).fill(false)
  );
  const router = useRouter();

  const handleContact = () => {
    window.open(`https://wa.me/${professional.whatsapp}`, '_blank');
  };

  const handleWorkImageLoad = (index: number) => {
    setWorkImagesLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="relative h-32 w-32 rounded-full overflow-hidden">
                {!profileImageLoaded && <Skeleton className="absolute inset-0 rounded-full" />}
                <Image
                  src={professional.profileImage}
                  alt={professional.name}
                  fill
                  className="object-cover"
                  onLoad={() => setProfileImageLoaded(true)}
                  style={{ opacity: profileImageLoaded ? 1 : 0 }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{professional.name}</h1>
                <p className="text-lg text-muted-foreground capitalize">{professional.category}</p>
                <div className="mt-2">
                  <StarRating rating={professional.rating} count={professional.ratingCount} />
                </div>
                <div className="flex items-center mt-4 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {professional.city}
                </div>
                <div className="flex items-center mt-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  Member since {format(new Date(professional.createdAt), 'MMMM yyyy')}
                </div>
              </div>
            </div>
            {isOwnProfile && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/profile')}
                className="ml-4"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Work Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {professional.workImages.map((image: string, index: number) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  {!workImagesLoaded[index] && <Skeleton className="absolute inset-0" />}
                  <Image
                    src={image}
                    alt={`Work sample ${index + 1}`}
                    fill
                    className="object-cover"
                    onLoad={() => handleWorkImageLoad(index)}
                    style={{ opacity: workImagesLoaded[index] ? 1 : 0 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <Button onClick={handleContact} className="w-full">
            <Phone className="h-4 w-4 mr-2" />
            Contact via WhatsApp
          </Button>
        </Card>
      </div>
    </div>
  );
}
