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
                "text-green-600": pathname.endsWith("/home"),
              },
            )}
            href="/home"
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
                "text-green-600": pathname.endsWith("/disasters"),
              },
            )}
            href="/disasters"
          >
            <Earth />
            Disasters
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
            href="/disasters/map"
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
            href="/disasters/notes"
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
            href="/disasters/analytics"
          >
            <BarChart2 />
            Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
}
