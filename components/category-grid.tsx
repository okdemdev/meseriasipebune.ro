import Link from 'next/link';
import { Wrench, Zap, Paintbrush, Lock, Hammer, PaintBucket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    name: 'Plumber',
    icon: Wrench,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    description: 'Fix leaks, install fixtures, and solve plumbing issues',
  },
  {
    name: 'Electrician',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    description: 'Install, maintain, and repair electrical systems',
  },
  {
    name: 'Carpenter',
    icon: Hammer,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
    description: 'Build, repair, and install wooden structures and furniture',
  },
  {
    name: 'Painter',
    icon: Paintbrush,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950',
    description: 'Transform spaces with professional painting services',
  },
  {
    name: 'Mason',
    icon: PaintBucket,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950',
    description: 'Work with brick, stone, and concrete for construction projects',
  },
  {
    name: 'Locksmith',
    icon: Lock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    description: 'Install, repair, and maintain locks and security systems',
  },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`p-3 rounded-lg ${category.bgColor} ${category.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground flex-grow">{category.description}</p>
                <p className="text-sm font-medium text-primary mt-4">
                  Find local {category.name.toLowerCase()}s
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
