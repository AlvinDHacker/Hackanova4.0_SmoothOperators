import { type Location } from "~/types/map";
import DisasterSingle from "~/components/DisasterSingle";

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
    reviews: [],
  };
};

// Make the component async and properly type the params
export default async function LocationPage({ params }: any) {
  const { id } = await params;

  // Since we're using an async component, we can now safely access params
  const location = getDummyLocation(await id);
  return <DisasterSingle location={location} />;
}
