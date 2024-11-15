"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { MapPin, Phone } from "lucide-react";

interface Professional {
  _id: string;
  name: string;
  category: string;
  city: string;
  whatsapp: string;
  profileImage: string;
  rating: number;
  ratingCount: number;
}

interface ProfessionalCardProps {
  professional: Professional;
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const handleContact = () => {
    window.open(`https://wa.me/${professional.whatsapp}`, "_blank");
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative h-48">
          <Image
            src={professional.profileImage}
            alt={professional.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                <Link href={`/professional/${professional._id}`}>
                  {professional.name}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground capitalize">
                {professional.category}
              </p>
            </div>
            <StarRating rating={professional.rating} count={professional.ratingCount} />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {professional.city}
            </div>
          </div>

          <div className="mt-4">
            <Button onClick={handleContact} className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Contact via WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}