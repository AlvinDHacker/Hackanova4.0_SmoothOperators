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
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

const DisburseFunds = () => {
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Request Funds</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Funds for Disaster Management</DialogTitle>
            <DialogDescription>
              Funds can be requested with a proper Invoices to manage disaster
              expenses
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Amount Required</Label>
              <Input id="name" placeholder="Amount in ETH" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Fields of Assist</Label>
              <Input id="name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Assisting Description</Label>
              <Textarea id="name" rows={3} />
            </div>
          </div>
          <Separator />
          <DialogFooter>
            <Button variant={"outline"} type="submit">
              <img src={img} height={15} width={15} alt="Hi" />
              Request Funds in Ethereum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisburseFunds;
