"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "../ui/label";

export default function LocationPicker({ setData }: { setData: any }) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setData((prevState: any) => ({
          ...prevState,
          lat: latitude,
          lon: longitude,
        }));
        setError(null);
      },
      (err) => {
        setError(
          "Failed to retrieve location. Please enable location services.",
        );
      },
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Get Your Live Location</Label>
      <div className="flex gap-3">
        <Button className="my-auto" onClick={getLocation}>
          Get Location
        </Button>
        {location && (
          <p className="text-sm text-gray-500">
            Latitude: {location.lat},<br /> Longitude: {location.lng}
          </p>
        )}
      </div>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
