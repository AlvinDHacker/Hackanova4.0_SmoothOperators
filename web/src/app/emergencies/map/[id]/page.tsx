import { type Location } from "~/types/map";
import DisasterSingle from "~/components/DisasterSingle";
import { getDisasterInfo } from "~/app/api/getDisasterInfo";

// Make the component async and properly type the params
export default async function LocationPage({ params }: any) {
  const { id } = await params;

  // Since we're using an async component, we can now safely access params
  const location = await getDisasterInfo(id);
  if (location) {
    return <DisasterSingle location={location} />;
  } else {
    return <>No Location FOund</>;
  }
}
