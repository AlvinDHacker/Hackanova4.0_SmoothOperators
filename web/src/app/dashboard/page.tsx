"use client";
import DonorDashboard from "~/components/DonorDashboard";
import NgoDashboard from "~/components/NgoDashboard";
import SideNav from "~/components/Sidenav";
import { useUser } from "~/components/AuthComponent";
import { useEffect, useState } from "react";
import { getNGOInfo } from "../api/getNGOInfo";
import { getDonorInfo } from "../api/getDonorInfo";
import { User } from "@prisma/client";

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
              name: user?.name,
              mission: info?.mission,
              website: info?.website,
              locationLat: info?.locationLat,
              locationLong: info?.locationLong,
            }}
          />
        ) : (
          <DonorDashboard />
        )}
      </div>
    </div>
  );
}
