import React from "react";
import SideNav from "~/components/Sidenav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { NumberTicker } from "~/components/ui/number-ticker";

export default async function Home() {
  return (
    <div>
      <div className="container mx-auto block sm:flex sm:gap-24">
        <SideNav />
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardHeader className="items-start pb-0">
              <CardTitle>No. of People Reached</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <NumberTicker
                value={120}
                className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-start pb-0">
              <CardTitle>No. of NGO&apos;s Contacted</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <NumberTicker
                value={3}
                className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
