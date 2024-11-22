import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeCategory(category: string): string {
  const categoryMap: { [key: string]: string } = {
    tamplar: 'Tâmplar',
    lacatus: 'Lăcătuș',
    instalator: 'Instalator',
    electrician: 'Electrician',
    zugrav: 'Zugrav',
    zidar: 'Zidar',
  };

  return categoryMap[category.toLowerCase()] || category;
}

export function slugifyCategory(category: string): string {
  const slugMap: { [key: string]: string } = {
    Tâmplar: 'tamplar',
    Lăcătuș: 'lacatus',
    Instalator: 'instalator',
    Electrician: 'electrician',
    Zugrav: 'zugrav',
    Zidar: 'zidar',
  };

  return slugMap[category] || category.toLowerCase();
}
