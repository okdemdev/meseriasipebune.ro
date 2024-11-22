export const CATEGORIES = [
  'Instalator',
  'Electrician',
  'Tâmplar',
  'Zugrav',
  'Zidar',
  'Lăcătuș',
] as const;

export const CITIES = [
  'București',
  'Cluj-Napoca',
  'Timișoara',
  'Iași',
  'Constanța',
  'Brașov',
] as const;

export type Category = (typeof CATEGORIES)[number];
export type City = (typeof CITIES)[number];
