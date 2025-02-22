"use client";
import DonorDashboard from "~/components/DonorDashboard";
import NgoDashboard from "~/components/NgoDashboard";
import SideNav from "~/components/Sidenav";
import { useUser } from "~/components/AuthComponent";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div className="container mx-auto block sm:flex sm:gap-24">
      <SideNav />
      <div className="w-full">
        {user?.userType != "NGO" ? (
          <NgoDashboard
            ngo={{
              name: "NGO Name",
              mission: "Mission Statement",
              website: "website.org",
              locationLat: 12.9716,
              locationLong: 77.5946,
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
