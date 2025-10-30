"use client";
import { useState, useEffect } from "react";
import { UMKM } from "@/types";
import { mockUMKM } from "@/data/mock";

export function useUMKM() {
  const [umkm, setUmkm] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUMKM();
  }, []);

  const loadUMKM = async () => {
    try {
      setLoading(true);
      // In real app, fetch from API
      setUmkm(mockUMKM);
    } catch (err) {
      setError("Failed to load UMKM");
    } finally {
      setLoading(false);
    }
  };

  const getUMKMBySlug = (slug: string): UMKM | undefined => {
    return umkm.find((u) => u.slug === slug);
  };

  const getUMKMByCategory = (category: string): UMKM[] => {
    return umkm.filter((u) => u.category === category);
  };

  const searchUMKM = (query: string, filters?: any): UMKM[] => {
    let results = umkm;

    // Apply search query
    if (query) {
      results = results.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.description.toLowerCase().includes(query.toLowerCase()) ||
          u.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filters
    if (filters) {
      if (filters.category) {
        results = results.filter((u) => u.category === filters.category);
      }
      if (filters.rating) {
        results = results.filter((u) => u.rating >= filters.rating);
      }
      if (filters.isOpen) {
        results = results.filter((u) => {
          const now = new Date();
          const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
          ];
          const today = days[now.getDay()];
          const currentTime = now.toTimeString().slice(0, 5);

          const todaySchedule = u.businessHours.find((h) => h.day === today);
          return (
            todaySchedule &&
            !todaySchedule.isClosed &&
            currentTime >= todaySchedule.open &&
            currentTime <= todaySchedule.close
          );
        });
      }
    }

    return results;
  };

  return {
    umkm,
    loading,
    error,
    getUMKMBySlug,
    getUMKMByCategory,
    searchUMKM,
    refetch: loadUMKM,
  };
}

export function useUMKMDetail(slug: string) {
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUMKMDetail();
  }, [slug]);

  const loadUMKMDetail = async () => {
    try {
      setLoading(true);
      // In real app, fetch from API
      const foundUMKM = mockUMKM.find((u) => u.slug === slug);
      if (foundUMKM) {
        setUmkm(foundUMKM);
      } else {
        setError("UMKM not found");
      }
    } catch (err) {
      setError("Failed to load UMKM details");
    } finally {
      setLoading(false);
    }
  };

  return { umkm, loading, error, refetch: loadUMKMDetail };
}
