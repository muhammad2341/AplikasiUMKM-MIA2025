"use client";
import { useState } from "react";

interface FavoriteButtonProps {
  umkmId: string;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  umkmId,
  size = "md",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const handleToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Add to favorites via API
  };

  return (
    <button
      onClick={handleToggle}
      className={`${
        sizeClasses[size]
      } bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 ${
        isFavorite
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-gray-600"
      }`}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
