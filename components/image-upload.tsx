"use client";

import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  maxFiles?: number;
  multiple?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  maxFiles = 1,
  multiple = false,
}: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);

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

  const handleFiles = (files: File[]) => {
    // In a real app, you would upload these files to a storage service
    // For demo purposes, we'll create object URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    
    if (multiple) {
      const currentUrls = Array.isArray(value) ? value : [];
      const newUrls = [...currentUrls, ...urls].slice(0, maxFiles);
      onChange(newUrls);
    } else {
      onChange(urls[0]);
    }
  };

  const removeImage = (urlToRemove: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter((url) => url !== urlToRemove));
    } else {
      onChange("");
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center hover:bg-accent transition-colors",
          dragActive && "border-primary bg-accent",
          "cursor-pointer"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.multiple = multiple;
          input.accept = "image/*";
          input.onchange = (e) => {
            const files = Array.from((e.target as HTMLInputElement).files || []);
            handleFiles(files);
          };
          input.click();
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drag & drop or click to upload
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {multiple && Array.isArray(value)
          ? value.map((url) => (
              <div key={url} className="relative aspect-square">
                <Image
                  src={url}
                  alt="Uploaded image"
                  className="object-cover rounded-lg"
                  fill
                />
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
          : !multiple && value && (
              <div className="relative aspect-square">
                <Image
                  src={value}
                  alt="Uploaded image"
                  className="object-cover rounded-lg"
                  fill
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(value as string);
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