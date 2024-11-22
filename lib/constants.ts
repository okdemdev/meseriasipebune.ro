export const CATEGORIES = [
  'Plumber',
  'Electrician',
  'Carpenter',
  'Painter',
  'Mason',
  'Locksmith',
] as const;

export const CITIES = [
  'Bucharest',
  'Cluj-Napoca',
  'Timișoara',
  'Iași',
  'Constanța',
  'Brașov',
] as const;

export type Category = (typeof CATEGORIES)[number];
export type City = (typeof CITIES)[number];
