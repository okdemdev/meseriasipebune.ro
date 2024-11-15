"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { MapPin, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ProfessionalProfileProps {
  professional: any;
}

export function ProfessionalProfile({ professional }: ProfessionalProfileProps) {
  const handleContact = () => {
    window.open(`https://wa.me/${professional.whatsapp}`, "_blank");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative h-32 w-32 rounded-full overflow-hidden">
              <Image
                src={professional.profileImage}
                alt={professional.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{professional.name}</h1>
              <p className="text-lg text-muted-foreground capitalize">
                {professional.category}
              </p>
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

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Work Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {professional.workImages.map((image: string, index: number) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Work sample ${index + 1}`}
                    fill
                    className="object-cover"
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