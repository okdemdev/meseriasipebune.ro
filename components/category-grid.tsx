import Link from 'next/link';
import { Wrench, Zap, Paintbrush, Lock, Hammer, PaintBucket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { slugifyCategory } from '@/lib/utils';

const categories = [
  {
    name: 'Instalator',
    icon: Wrench,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
    description:
      'Reparații instalații, montaj obiecte sanitare și rezolvare probleme de instalații',
  },
  {
    name: 'Electrician',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950',
    description: 'Instalare, întreținere și reparații sisteme electrice',
  },
  {
    name: 'Tâmplar',
    icon: Hammer,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
    description: 'Construcție, reparații și montaj structuri și mobilier din lemn',
  },
  {
    name: 'Zugrav',
    icon: Paintbrush,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950',
    description: 'Transformă spațiile prin servicii profesionale de zugrăvit',
  },
  {
    name: 'Zidar',
    icon: PaintBucket,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950',
    description: 'Lucrări cu cărămidă, piatră și beton pentru proiecte de construcții',
  },
  {
    name: 'Lăcătuș',
    icon: Lock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
    description: 'Instalare, reparații și întreținere sisteme de încuiere și securitate',
  },
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link key={category.name} href={`/categories/${slugifyCategory(category.name)}`}>
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
                  Găsește {category.name.toLowerCase()}i în zona ta
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
