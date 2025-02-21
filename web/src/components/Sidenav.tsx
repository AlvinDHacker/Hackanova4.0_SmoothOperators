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
                "text-green-600": pathname.endsWith("/notes"),
              },
            )}
            href="/emergencies/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/analytics"),
              },
            )}
            href="/emergencies/analytics"
          >
            <BarChart2 />
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}
