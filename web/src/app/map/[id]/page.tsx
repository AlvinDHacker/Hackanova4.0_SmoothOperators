// app/map/[id]/page.tsx
import { type Location } from "~/types/map";
import LocationDetails from "~/components/LocationDetails";

const getDummyLocation = (id: string): Location => {
    return {
      id,
      position: [51.505, -0.09],
      title: `Location ${id}`,
      description: `This is location ${id}`,
      address: "123 Main St",
      rating: 4.5,
      openingHours: "9:00 AM - 6:00 PM",
      features: ["WiFi", "Parking"],
      reviews: []
    };
  };
  
  export default function LocationPage({ params }: { params: { id: string } }) {
    const location = getDummyLocation(params.id);
    return <LocationDetails location={location} />;
  }