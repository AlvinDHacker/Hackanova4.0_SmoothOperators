"use client";
import { cn } from "../lib/utils";
import {
  BarChart2,
  ClipboardPen,
  Files,
  Search,
  Globe,
  Map,
  Earth,
  Home,
  User2,
  Coins,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="hidden space-y-6 py-5 sm:block">
        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/"),
              },
            )}
            href="/"
          >
            <Home />
            Home
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/emergencies"),
              },
            )}
            href="/emergencies"
          >
            <Earth />
            Emergency
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/map"),
              },
            )}
            href="/emergencies/map"
          >
            <Map />
            Maps
          </Link>
        </li>

        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/funds"),
              },
            )}
            href="/funds"
          >
            <Coins />
            Funds
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/dashboard"),
              },
            )}
            href="/dashboard"
          >
            <User2 />
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}
