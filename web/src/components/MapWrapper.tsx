// MapWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Maps"), {
  ssr: false, // Disable SSR for the Map component
});

const MapWrapper = () => {
  return <Map />;
};

export default MapWrapper;
