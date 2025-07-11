"use client";

import { ModeToggle } from "~/components/ui/mode-toggle";
import { DockIcon, Docks } from "../components/ui/dock";
import Image from "next/image";
// import { HeaderActions } from "./header-actions";
import Link from "next/link";
// import { OrganizationSwitcher } from "@clerk/nextjs";
// import { Authenticated } from "convex/react";
import {
  Coins,
  Earth,
  Home,
  Loader2,
  Map,
  Search,
  ShieldCheck,
  User2,
} from "lucide-react";
import { BarChart2, ClipboardPen, Files, Globe } from "lucide-react";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import MainLogin from "./Login/MainLogin";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="navbar relative z-10 flex w-full items-center justify-between px-3 py-2">
        <div className="container mx-auto flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold sm:text-2xl"
            >
              {/* <Image
              src="/favicon.ico"
              width={40}
              height={40}
              className="rounded"
              alt="logo"
            /> */}
              <ShieldCheck className="text-green-600" />
              Relief ResQ
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href={"/emergencies"}>
              <div className="hidden items-center gap-8 text-sm font-medium hover:text-green-600 hover:underline sm:flex">
                Emergency
              </div>
            </Link>
            <ModeToggle />
            <MainLogin />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 w-full">
        <div className="mx-auto flex w-[80%] justify-center sm:hidden">
          <Docks
            className="shadow-second z-10 rounded-t-xl bg-white shadow-md dark:bg-black"
            direction="middle"
          >
            <DockIcon>
              <Link href={"/"}>
                <Home
                  className={cn("text-second size-6", {
                    "text-green-600": pathname.endsWith("/"),
                  })}
                />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href={"/emergencies"}>
                <Earth
                  className={cn("text-second size-6", {
                    "text-green-600": pathname.endsWith("/emergencies"),
                  })}
                />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href={"/emergencies/map"}>
                <Map
                  className={cn("text-second size-6", {
                    "text-green-600": pathname.endsWith("/emergencies/map/"),
                  })}
                />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href={"/funds"}>
                <Coins
                  className={cn("text-second size-6", {
                    "text-green-600": pathname.endsWith("/funds"),
                  })}
                />
              </Link>
            </DockIcon>
            <DockIcon>
              <Link href={"/dashboard"}>
                <User2
                  className={cn("text-second size-6", {
                    "text-green-600": pathname.endsWith("/dashboard"),
                  })}
                />
              </Link>
            </DockIcon>
          </Docks>
        </div>
      </div>
    </>
  );
};

export default Navbar;
