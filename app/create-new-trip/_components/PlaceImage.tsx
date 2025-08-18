"use client"
import { useState, useEffect } from "react"
import axios from "axios"

export function PlaceImage({ 
  placeName, className, alt
}: { placeName: string, className?: string, alt?: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const GetGooglePlaceDetails = async () => {
    try {
      const result = await axios.post('/api/google-place-details', {
        placeName,
      });

      if (result?.data?.error) {
        console.error("Backend error:", result.data.error);
        setIsLoading(false);
        return;
      }

      if (result?.data) {
        setImageUrl(result.data);
      }
    } catch (err) {
      console.error("Error fetching place details:", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetGooglePlaceDetails();
  }, [placeName]); // 👈 re-run if placeName changes

  if (isLoading && !imageUrl) {
    return <div className={`${className} bg-gray-200 animate-pulse rounded-md`} />;
  }

  return (
    <img
      src={imageUrl ?? ""}
      alt={alt || placeName}
      className={`${className} object-cover rounded-md`}
      onLoad={() => setIsLoading(false)}   // stop loader after image loads
      onError={() => {
        setIsLoading(false);
        setImageUrl(null);
      }}
    />
  );
}
