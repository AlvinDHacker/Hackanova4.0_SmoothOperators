import DonorDashboard from "~/components/DonorDashboard";

export default function DonorDashboardPage() {
  return (
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
  );
}
