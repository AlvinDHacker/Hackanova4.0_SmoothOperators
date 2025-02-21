import React from "react";
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
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const MainLogin = () => {
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Choose a User Type</DialogTitle>
            <DialogDescription>
              Select your preferable user type
            </DialogDescription>
          </DialogHeader>
          <div className="h-full gap-4 space-y-2 text-sm text-gray-500">
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
                  <CardDescription>Can donate towards a cause</CardDescription>
                </CardHeader>
              </div>
              <div className="my-auto">
                <DonorLogin />
              </div>
            </Card>
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
          <Separator />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLogin;
