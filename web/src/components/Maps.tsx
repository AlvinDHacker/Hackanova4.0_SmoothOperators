"use client"
import { type Location } from "~/types/map";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useRouter } from "next/navigation";

const Map = () => {
  const router = useRouter();

  const positions: Location[] = [
    {
      id: "1",
      position: [51.505, -0.09],
      title: "Location 1",
      description: "This is location 1",
      address: "123 Main St",
      rating: 4.5,
      openingHours: "9:00 AM - 6:00 PM",
      features: ["WiFi", "Parking"],
      reviews: []
    },
    // Add more locations as needed
  ];

  const defaultIcon = new Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41]
  });

  const handleClick = (locationId: string): void => {
    void router.push(`/map/${locationId}`);
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
              <div>
                <strong>{location.title}</strong>
                <br />
                {location.description}
                <br />
                <button 
                  onClick={() => handleClick(location.id)}
                  className="mt-2 text-blue-600 underline cursor-pointer"
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