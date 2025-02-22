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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";

const UploadProof = () => {
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Upload Aid Proof</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Show others that you&apos;ve actually made a difference
            </DialogTitle>
            <DialogDescription>
              Upload your GST Bill to show that you have actually saved lives
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Amount Used</Label>
              <Input id="name" placeholder="Amount in ETH" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Fields of Assist</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fields</SelectLabel>
                    <SelectItem value="FOOD">FOOD</SelectItem>
                    <SelectItem value="MEDICAL">MEDICAL</SelectItem>
                    <SelectItem value="TRAVEL">TRAVEL</SelectItem>
                    <SelectItem value="INFRASTRUCTURE">
                      INFRASTRUCTURE
                    </SelectItem>
                    <SelectItem value="pineapple">OTHER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Assisting Description</Label>
              <Input type="file" id="name" />
            </div>
          </div>
          <Separator />
          <DialogFooter>
            <Button variant={"outline"} type="submit">
              <img src={img} height={15} width={15} alt="Hi" />
              Store Proof on ETH
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadProof;
