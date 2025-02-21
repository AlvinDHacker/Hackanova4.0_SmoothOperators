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

const NgoLogin = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login as an NGO</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>NGO Login</DialogTitle>
            <DialogDescription>
              Login here to Help during Emergencies
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Ngo Id</Label>
              <Input id="name" />
            </div>
            <Button type="button" variant={"outline"}>
              <Wallet size={15} /> Connect NGO Wallet
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NgoLogin;
