import { Wrench, Zap, Paintbrush, Lock, Hammer, PaintBucket } from "lucide-react";

const categoryIcons: { [key: string]: any } = {
  plumber: { icon: Wrench, color: "text-blue-500" },
  electrician: { icon: Zap, color: "text-yellow-500" },
  carpenter: { icon: Hammer, color: "text-orange-500" },
  painter: { icon: Paintbrush, color: "text-green-500" },
  mason: { icon: PaintBucket, color: "text-red-500" },
  locksmith: { icon: Lock, color: "text-purple-500" },
};

interface CategoryHeaderProps {
  category: string;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  const { icon: Icon, color } = categoryIcons[category] || {};

  return (
    <div className="flex items-center space-x-4">
      {Icon && (
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-8 w-8" />
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold capitalize">{category}</h1>
        <p className="text-muted-foreground">
          Find trusted {category}s in your area
        </p>
      </div>
    </div>
  );
}