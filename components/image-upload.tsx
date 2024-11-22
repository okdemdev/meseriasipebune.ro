'use client';

import { useCallback, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { uploadImage } from '@/lib/upload-image';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  maxFiles?: number;
  multiple?: boolean;
}

export function ImageUpload({ value, onChange, maxFiles = 1, multiple = false }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFiles = async (files: File[]) => {
    try {
      setIsUploading(true);
      const uploadPromises = files.map((file) => uploadImage(file));
      const urls = await Promise.all(uploadPromises);

      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : [];
        const newUrls = [...currentUrls, ...urls].slice(0, maxFiles);
        onChange(newUrls);
      } else {
        onChange(urls[0]);
      }
    } catch (error) {
      toast.error('Failed to upload image(s)');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
      }
    },
    [value]
  );

  const removeImage = (urlToRemove: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter((url) => url !== urlToRemove));
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-4 text-center hover:bg-accent transition-colors',
          dragActive && 'border-primary bg-accent',
          'cursor-pointer'
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => {
          if (isUploading) return;
          const input = document.createElement('input');
          input.type = 'file';
          input.multiple = multiple;
          input.accept = 'image/*';
          input.onchange = (e) => {
            const files = Array.from((e.target as HTMLInputElement).files || []);
            handleFiles(files);
          };
          input.click();
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Se încarcă...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Trage și plasează sau click pentru încărcare
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {multiple && Array.isArray(value)
          ? value.map((url) => (
              <div key={url} className="relative aspect-square">
                <Image src={url} alt="Uploaded image" className="object-cover rounded-lg" fill />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(url);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-foreground/80 text-background hover:bg-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          : !multiple &&
            typeof value === 'string' &&
            value && (
              <div className="relative aspect-square">
                <Image src={value} alt="Uploaded image" className="object-cover rounded-lg" fill />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(value);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-foreground/80 text-background hover:bg-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
      </div>
    </div>
  );
}
