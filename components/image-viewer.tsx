'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageViewerProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageViewer({ images, currentIndex, isOpen, onClose }: ImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const handlePrevious = () => {
    setActiveIndex((current) => (current > 0 ? current - 1 : images.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current < images.length - 1 ? current + 1 : 0));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0">
        <div className="relative w-full h-full flex items-center justify-center bg-background/95">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="relative w-full h-full">
            <Image
              src={images[activeIndex]}
              alt={`Image ${activeIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
