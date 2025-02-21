"use client";
import { cn } from "../lib/utils";
import { BarChart2, ClipboardPen, Files, Search, Globe } from "lucide-react";
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
                "text-green-600": pathname.endsWith("/search"),
              },
            )}
            href="/dashboard/search"
          >
            <Search />
            Search
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/documents"),
              },
            )}
            href="/dashboard/documents"
          >
            <Files />
            Documents
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "flex min-h-0 flex-1 flex-row gap-3 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
              {
                "text-green-600": pathname.endsWith("/finnosearch"),
              },
            )}
            href="/dashboard/finnosearch"
          >
            <Globe />
            FinnoSearch
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
            href="/dashboard/notes"
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
            href="/dashboard/analytics"
          >
            <BarChart2 />
            Analytics
          </Link>
        </li>
      </ul>
      {/* <div className="fixed w-full bottom-0">
        <div className="flex w-[70%] mx-auto bg-green-500 p-3 justify-between sm:hidden">
          <div>
            <Search />
          </div>
          <div>
            <Files />
          </div>
          <div>
            <ClipboardPen />
          </div>
          <div>
            <BarChart2 />
          </div>
        </div>
      </div> */}
    </nav>
  );
}
