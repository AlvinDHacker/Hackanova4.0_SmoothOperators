import React from "react";
import SideNav from "~/components/Sidenav";

export default async function Home() {
  return (
    <div>
      <div className="container mx-auto block sm:flex sm:gap-24">
        <SideNav />
        <div className="grid grid-cols-2 gap-3">Hello</div>
      </div>
    </div>
  );
}
