interface RatingProps {
  rating: number;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Rating({
  rating,
  showNumber = false,
  size = "md",
}: RatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <span key={index}>⭐</span>;
          } else if (index === fullStars && hasHalfStar) {
            return <span key={index}>⭐</span>; // Half star symbol if available
          } else {
            return (
              <span key={index} className="text-gray-300">
                ⭐
              </span>
            );
          }
        })}
      </div>
      {showNumber && (
        <span className="ml-2 text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
