import { Wrench, Zap, Paintbrush, Lock, Hammer, PaintBucket } from 'lucide-react';
import { slugifyCategory } from '@/lib/utils';

const categoryIcons: { [key: string]: any } = {
  Instalator: { icon: Wrench, color: 'text-blue-500' },
  Electrician: { icon: Zap, color: 'text-yellow-500' },
  Tâmplar: { icon: Hammer, color: 'text-orange-500' },
  Zugrav: { icon: Paintbrush, color: 'text-green-500' },
  Zidar: { icon: PaintBucket, color: 'text-red-500' },
  Lăcătuș: { icon: Lock, color: 'text-purple-500' },
};

interface CategoryHeaderProps {
  category: string;
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  const { icon: Icon, color } = categoryIcons[category] || {};
  const slug = slugifyCategory(category);

  return (
    <div className="flex items-center space-x-4">
      {Icon && (
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-8 w-8" />
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold">{category}</h1>
        <p className="text-muted-foreground">
          Găsește {category.toLowerCase()}i de încredere în zona ta
        </p>
      </div>
    </div>
  );
}
