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
                  Membru din {format(new Date(professional.createdAt), 'MMMM yyyy')}
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
                Editează Profilul
              </Button>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Portofoliu de Lucrări</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {professional.workImages.map((image: string, index: number) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
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

      <div>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setShowNumber(!showNumber)}
            >
              {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showNumber ? formatPhoneNumber(professional.whatsapp) : 'Arată Numărul'}
            </Button>
            <Button onClick={handleContact} className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Contactează prin WhatsApp
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
