import { BellRing, Wallet } from "lucide-react";
import React from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "../ui/separator";

const VendorLogin = () => {
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login as a Vendor</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login as a Vendor</DialogTitle>
            <DialogDescription>
              Login here to help NGO&apos;s reach out for a Good Cause
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Full Name here" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Phone No.</Label>
              <Input id="name" placeholder="+91" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Aadhar Card No.</Label>
              <Input id="name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">GST No.</Label>
              <Input id="name" />
            </div>
          </div>
          <Separator />
          <DialogFooter>
            <Button variant={"outline"} type="submit">
              <img src={img} height={15} width={15} alt="Hi" />
              Login with Ethereum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorLogin;
