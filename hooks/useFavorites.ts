"use client";
import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    try {
      const stored = localStorage.getItem("umkm-favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  const saveFavorites = (newFavorites: string[]) => {
    try {
      localStorage.setItem("umkm-favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  };

  const addFavorite = (umkmId: string) => {
    const newFavorites = [...favorites, umkmId];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (umkmId: string) => {
    const newFavorites = favorites.filter((id) => id !== umkmId);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (umkmId: string) => {
    if (favorites.includes(umkmId)) {
      removeFavorite(umkmId);
    } else {
      addFavorite(umkmId);
    }
  };

  const isFavorite = (umkmId: string) => {
    return favorites.includes(umkmId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    refetch: loadFavorites,
  };
}
