import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import SideNav from "~/components/Sidenav";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "ResQ Relief",
  description: "Blockchain Aid, Emergency Response, Transparent Donations, Fund Disbursement, Smart Contracts, ResQ Relief",
  icons: [{ rel: "icon", url: "/resqlogo.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="pb-16">
            <Navbar />
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
