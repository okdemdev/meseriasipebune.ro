'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/star-rating';
import { MapPin, Phone, Calendar, PencilIcon, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { AvailabilityIndicator } from '@/components/availability-indicator';
import { ImageViewer } from '@/components/image-viewer';

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
  const [showNumber, setShowNumber] = useState(false);
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

  const handleContact = () => {
    window.open(`https://wa.me/${professional.whatsapp}`, '_blank');
  };

  const formatPhoneNumber = (number: string) => {
    // Remove any non-digit characters
    const cleaned = number.replace(/\D/g, '');
    // Format as: +40 XXX XXX XXX
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(
      8
    )}`;
  };

  const handleWorkImageLoad = (index: number) => {
    setWorkImagesLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const allImages = [professional.profileImage, ...professional.workImages];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div
              className="relative h-40 w-40 md:h-48 md:w-48 rounded-full overflow-hidden cursor-pointer shrink-0"
              onClick={() => setSelectedImageIndex(0)}
            >
              {!profileImageLoaded && <Skeleton className="absolute inset-0 rounded-full" />}
              <Image
                src={professional.profileImage}
                alt={professional.name}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
                onLoad={() => setProfileImageLoaded(true)}
                style={{ opacity: profileImageLoaded ? 1 : 0 }}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{professional.name}</h1>
                  <p className="text-lg text-muted-foreground capitalize mt-1">
                    {professional.category}
                  </p>
                  <div className="mt-3">
                    <StarRating
                      rating={professional.rating}
                      count={professional.ratingCount}
                      size="lg"
                    />
                  </div>
                </div>
                <AvailabilityIndicator />
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mt-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-muted-foreground capitalize">{professional.city}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-muted-foreground">
                    Membru din {format(new Date(professional.createdAt), 'MMMM yyyy')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Portofoliu de Lucrări</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {professional.workImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImageIndex(index + 1)}
                >
                  {!workImagesLoaded[index] && <Skeleton className="absolute inset-0" />}
                  <Image
                    src={image}
                    alt={`Exemplu lucrare ${index + 1}`}
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

      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-6">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-12 text-base"
              onClick={() => setShowNumber(!showNumber)}
            >
              {showNumber ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              {showNumber ? formatPhoneNumber(professional.whatsapp) : 'Arată Numărul'}
            </Button>
            <Button onClick={handleContact} className="w-full h-12 text-base" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Contactează prin WhatsApp
            </Button>
          </div>
        </Card>
      </div>

      <ImageViewer
        images={allImages}
        currentIndex={selectedImageIndex}
        isOpen={selectedImageIndex !== -1}
        onClose={() => setSelectedImageIndex(-1)}
      />
    </div>
  );
}
