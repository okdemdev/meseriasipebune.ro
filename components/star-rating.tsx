import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count: number;
}

export function StarRating({ rating, count }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} className="w-4 h-4 fill-primary text-primary" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-primary text-primary" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={`empty-star-${i}`} className="w-4 h-4 text-muted-foreground" />
        ))}
      </div>
      <span className="ml-2 text-sm text-muted-foreground">
        ({count} {count === 1 ? 'evaluare' : 'evaluări'})
      </span>
    </div>
  );
}
