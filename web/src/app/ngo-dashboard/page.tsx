import NgoDashboard from "~/components/NgoDashboard";

export default function NgoDashboardPage() {
  return (
    <NgoDashboard ngo={{
      name: "NGO Name",
      mission: "Mission Statement",
      website: "website.org",
      locationLat: 12.9716,
      locationLong: 77.5946,
    }} />
  )
}