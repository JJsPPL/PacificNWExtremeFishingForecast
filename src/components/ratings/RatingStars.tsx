
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
  const fullStars = Math.floor(rating / 20);
  const halfStar = rating % 20 >= 10;
  
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />;
        } else if (i === fullStars && halfStar) {
          return <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400/50" />;
        } else {
          return <Star key={i} className="h-5 w-5 text-gray-300" />;
        }
      })}
    </div>
  );
};
