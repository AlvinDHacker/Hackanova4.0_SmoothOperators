"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import DonorLogin from "./DonorLogin";
import VendorLogin from "./VendorLogin";
import NgoLogin from "./NgoLogin";
import { useUser } from "../AuthComponent";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { signOut } from "next-auth/react";
import { Badge } from "../ui/badge";

const MainLogin = () => {
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  const { user } = useUser();
  useEffect(() => {
    console.log(user?.walletId);
  }, []);
  return (
    <div>
      {!user ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-black text-white dark:bg-white dark:text-black"
              variant="outline"
            >
              Login
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Choose a User Type</DialogTitle>
              <DialogDescription>
                Select your preferable user type
              </DialogDescription>
            </DialogHeader>
            <div className="h-full gap-4 space-y-2 text-sm text-gray-500">
              <div id="donorlogin">
                <Card className="flex w-full justify-between gap-3 px-1.5">
                  <div className="flex">
                    <img
                      src="https://api.dicebear.com/9.x/lorelei/svg?seed=Brian"
                      height={50}
                      width={50}
                      alt="avatar"
                    />
                    <CardHeader className="p-4">
                      <CardTitle className="-mb-2">Donor</CardTitle>
                      <CardDescription>
                        Can donate towards a cause
                      </CardDescription>
                    </CardHeader>
                  </div>
                  <div className="my-auto">
                    <DonorLogin />
                  </div>
                </Card>
              </div>
              <div id="vendorlogin">
                <Card className="flex w-full justify-between gap-3 px-1.5">
                  <div className="flex">
                    <img
                      src="https://api.dicebear.com/9.x/lorelei/svg?seed=Aiden"
                      height={50}
                      width={50}
                      alt="avatar"
                    />
                    <CardHeader className="p-4">
                      <CardTitle className="-mb-2">Vendor</CardTitle>
                      <CardDescription>Supplies materials</CardDescription>
                    </CardHeader>
                  </div>
                  <div className="my-auto">
                    <VendorLogin />
                  </div>
                </Card>
              </div>
              <div id="NGOlogin">
                <Card className="flex w-full justify-between gap-3 px-1.5">
                  <div className="flex">
                    <img
                      src="https://api.dicebear.com/9.x/lorelei/svg?seed=Destiny"
                      height={50}
                      width={50}
                      alt="avatar"
                    />
                    <CardHeader className="p-4">
                      <CardTitle className="-mb-2">NGO</CardTitle>
                      <CardDescription>Manages transactions</CardDescription>
                    </CardHeader>
                  </div>
                  <div className="my-auto">
                    <NgoLogin />
                  </div>
                </Card>
              </div>
            </div>
            <Separator />
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          onClick={() => {
            signOut();
          }}
          variant="outline"
        >
          Logout | <Badge className="px-4 text-xs">{user?.userType}</Badge>
        </Button>
      )}
    </div>
  );
};

export default MainLogin;
