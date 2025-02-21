"use client"
import { type Location } from "~/types/map";
import { useRouter } from "next/navigation";

interface LocationDetailsProps {
  location: Location;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({ location }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">{location.title}</h1>
            <button
              onClick={() => void router.push("/map")}
              className="rounded-md bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200"
            >
              ← Back to Map
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Location Details</h2>
              <p className="mb-2 text-gray-600">
                <strong>Address:</strong> {location.address}
              </p>
              <p className="mb-2 text-gray-600">
                <strong>Rating:</strong> {location.rating} / 5
              </p>
              <p className="mb-2 text-gray-600">
                <strong>Hours:</strong> {location.openingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Features</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {location.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
