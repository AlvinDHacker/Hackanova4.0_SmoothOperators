import { BellRing, SmartphoneNfc, Wallet } from "lucide-react";
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
import { Separator } from "./ui/separator";

const DonorPay = () => {
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <SmartphoneNfc />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Pay Now, Help when needed</DialogTitle>
            <DialogDescription>
              Set up money in a wallet to pay automatically when an emergency
              occurs
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Amount</Label>
              <Input id="name" placeholder="Amount in ETH" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Converted Currency</Label>
              <Input
                id="name"
                disabled
                defaultValue={`${300} in Rs`}
                placeholder="Amount in Rs which is converted"
              />
            </div>
          </div>
          <Separator />
          <DialogFooter>
            <Button variant={"outline"} type="submit">
              <img src={img} height={15} width={15} alt="Hi" />
              Pay Now with Ethereum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonorPay;
