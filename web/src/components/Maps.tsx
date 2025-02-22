"use client";
import { type Location } from "~/types/map";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";

const Map = () => {
  const router = useRouter();

  const positions: Location[] = [
    {
      id: "cm7fpu1sw00a29mr0oura7oyp",
      position: [19.2, 72.87],
      title: "16-year-old dies of heart attack in Telangana’s Kamareddy",
      description:
        "Hyderabad News: Student Dies Of Heart Attack On Way To School In Telangana, Teachers In Shock - Jagran English",
      link: "https://news.google.com/rss/articles/CBMizgFBVV95cUxOdVN3TmFvTi1sSkRiUWdwcTBTbEdYY05Pcl9jX3JUcVZ4MEFJZ1Q2SjR3cW5VQXV6VmRaekV2Sk1RWlBQTENFY0xyREZ0d0hXME0wdk9pUEpXT3RVZURxYVI3U0tnUThLMzdVRGptNz",
      severity: "LOW",
      status: "ACTIVE",
    },
    {
      id: "cm7fpu1ua00a89mr0tuh8q7ti",
      position: [19.1, 72.83],
      title:
        "First wave of COVID-19 increased risk of heart attack, stroke up to three years later - National Institutes of Health",
      description: "National Institutes of Health",
      link: "https://news.google.com/rss/articles/CBMiugFBVV95cUxOUkk1ODhlcU90dVJOZWo0d0pIaVdIT1NMWW1nX3laZTZ6ZERhcGFfTGw4ZGZVY0NnMGtIdUI5ZG9vMTlZYkJCeUJWZDRPdnkwb19Rd1k0WEZmUW9qYjJjOW5KYkFCTjlIekdjWkd1aF",
      severity: "HIGH",
      status: "ACTIVE",
    },
    {
      id: "cm7fpu1uf00a99mr0n0kxwz2g",
      position: [19.15, 72.88],
      title:
        "Telangana: Class 10 student dies of heart attack in Kamareddy, third such case in recent months - Moneycontrol",
      description: "National Institutes of Health",
      link: "https://news.google.com/rss/articles/CBMiugFBVV95cUxOUkk1ODhlcU90dVJOZWo0d0pIaVdIT1NMWW1nX3laZTZ6ZERhcGFfTGw4ZGZVY0NnMGtIdUI5ZG9vMTlZYkJCeUJWZDRPdnkwb19Rd1k0WEZmUW9qYjJjOW5KYkFCTjlIekdjWkd1aF",
      severity: "HIGH",
      status: "ACTIVE",
    },
    // Add more locations as needed
  ];

  const defaultIcon = new Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const handleClick = (locationId: string): void => {
    void router.push(`map/${locationId}`);
  };

  return (
    <div className="h-screen w-screen">
      <MapContainer
        className="h-full w-full"
        center={positions[0]?.position || [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positions.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={defaultIcon}
          >
            <Popup>
              <div className="p-3">
                <strong>{location.title}</strong>
                <br />
                {location.description}
                <br />
                <button
                  onClick={() => handleClick(location.id)}
                  className="mt-2 cursor-pointer text-blue-600 underline"
                >
                  View Details →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
