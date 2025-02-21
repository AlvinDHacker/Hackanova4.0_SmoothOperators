"use client";

import { ModeToggle } from "~/components/ui/mode-toggle";
import Image from "next/image";
// import { HeaderActions } from "./header-actions";
import Link from "next/link";
// import { OrganizationSwitcher } from "@clerk/nextjs";
// import { Authenticated } from "convex/react";
import { Loader2, ShieldCheck } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar relative z-10 flex w-full items-center justify-between px-3 py-2">
      <div className="container mx-auto flex items-center justify-between">
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

          {/* <nav className="sm:flex hidden items-center gap-8">
            <OrganizationSwitcher />

            <Authenticated>
              <Link href="/dashboard" className="text-sm hover:underline">
                Dashboard
              </Link>
            </Authenticated>
          </nav> */}
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {/* <HeaderActions /> */}
          <Loader2 className="animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
