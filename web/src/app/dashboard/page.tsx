"use client";
import DonorDashboard from "~/components/DonorDashboard";
import NgoDashboard from "~/components/NgoDashboard";
import SideNav from "~/components/Sidenav";
import { useUser } from "~/components/AuthComponent";
import { useEffect, useState } from "react";
import { getNGOInfo } from "../api/getNGOInfo/route";
import { getDonorInfo } from "../api/getDonorInfo/route";

export default function DashboardPage() {
  interface NGO {
    name: string;
    locationLat: number;
    locationLong: number;
    mission: string;
    website: string | null;
  }

  interface Donor {
    id: string;
    name: string | null;
    email: string | null;
    phoneNo: string;
    aadhar: string | null;
    accounts: {
      id: string;
      provider: string;
    }[];
  }
  const { user } = useUser();
  const [info, setInfo] = useState<NGO | null>(null);
  const [infoD, setInfoD] = useState<Donor | null>(null);
  useEffect(() => {
    if (user?.userType === "NGO") {
      const fetchNGOInfo = async () => {
        const ngo = await getNGOInfo(user.id);
        setInfo(ngo);
      };

      fetchNGOInfo();
    } else {
      const fetchDonorInfo = async () => {
        const donor = await getDonorInfo(user!.id);
        setInfoD(donor);
      };

      fetchDonorInfo();
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
          <DonorDashboard
            user={{
              id: infoD?.id,
              name: infoD?.name,
              email: infoD?.email,
              phone: infoD?.phoneNo,
              address: "123 Main St, City, Country",
              donations: [
                infoD?.accounts,
                // {
                //   id: infoD?.accounts.id,
                //   amount: 100,
                //   date: "2023-01-01",
                //   cause: "Medical Relief",
                // },
                // {
                //   id: "2",
                //   amount: 50,
                //   date: "2023-02-01",
                //   cause: "Education",
                // },
              ],
            }}
          />
        )}
      </div>
    </div>
  );
}
