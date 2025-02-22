"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { CloudLightning } from "lucide-react";
import MainLogin from "./Login/MainLogin";

const CTA = () => (
  <section className="mx-auto my-6 flex w-[90%] max-w-7xl flex-col items-center justify-between rounded-[20px] bg-gray-200 px-6 py-6 text-black transition-all duration-200 hover:bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-black sm:my-16 sm:flex-row sm:px-16 sm:py-12">
    <div className="flex flex-1 flex-col">
      <h2 className="w-full text-3xl font-semibold text-black dark:text-white sm:text-5xl">
        Try Relief ResQ now!
      </h2>
      <div className="text-black-300 text-md mt-5 max-w-[470px] dark:text-white">
        We are here to help you during any emergency
        <br />
        All you need to do is Ask!
      </div>
    </div>

    <div className="ml-0 mt-10 sm:ml-10 sm:mt-0">
      <Link href="/emergencies" className="text-sm hover:underline">
        <Button className="gap-3">
          View Emergencies <CloudLightning />
        </Button>
      </Link>
    </div>
  </section>
);

export default CTA;
