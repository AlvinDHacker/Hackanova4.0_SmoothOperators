"use client";
import DonorDashboard from "~/components/DonorDashboard";
import NgoDashboard from "~/components/NgoDashboard";
import SideNav from "~/components/Sidenav";
import { useUser } from "~/components/AuthComponent";
import { useEffect, useState } from "react";
import { getNGOInfo } from "../api/getNGOInfo/route";

export default function DashboardPage() {
  interface NGO {
    name: string;
    locationLat: number;
    locationLong: number;
    mission: string;
    website: string | null;
  }
  const { user } = useUser();
  const [info, setInfo] = useState<NGO | null>(null);
  useEffect(() => {
    if (user?.userType === "NGO") {
      const fetchNGOInfo = async () => {
        const ngo = await getNGOInfo(user.id);
        setInfo(ngo);
      };

      fetchNGOInfo();
    }
  }, [user]);

  return (
    <div className="container mx-auto block sm:flex sm:gap-24">
      <SideNav />
      <div className="w-full">
        {user?.userType == "NGO" ? (
          <NgoDashboard
            ngo={{
              name: user.name,
              mission: info?.mission,
              website: info?.website,
              locationLat: info?.locationLat,
              locationLong: info?.locationLong,
            }}
          />
        ) : (
          <DonorDashboard
            user={{
              id: "1",
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "1234567890",
              address: "123 Main St, City, Country",
              donations: [
                {
                  id: "1",
                  amount: 100,
                  date: "2023-01-01",
                  cause: "Medical Relief",
                },
                {
                  id: "2",
                  amount: 50,
                  date: "2023-02-01",
                  cause: "Education",
                },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}
