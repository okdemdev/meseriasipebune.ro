import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, count, size = 'md' }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const starSize = starSizes[size];
  const textSize = textSizes[size];

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} className={`${starSize} fill-primary text-primary`} />
        ))}
        {hasHalfStar && <StarHalf className={`${starSize} fill-primary text-primary`} />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-star-${i}`} className={`${starSize} text-muted-foreground`} />
        ))}
      </div>
      <span className={`ml-2 ${textSize} text-muted-foreground`}>
        ({count} {count === 1 ? 'evaluare' : 'evaluări'})
      </span>
    </div>
  );
}
