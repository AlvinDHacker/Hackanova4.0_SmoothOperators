"use client";
import { BellRing, ChevronLeft, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
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
import { AnimatePresence, motion } from "motion/react";
import { Separator } from "../ui/separator";
import LocationPicker from "./LocationPicker";

const NgoLogin = () => {
  const [next, setNext] = useState(false);
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login as an NGO</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm">
            <AnimatePresence mode="wait">
              {!next ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogHeader>
                    <DialogTitle>NGO Login</DialogTitle>
                    <DialogDescription>
                      Login here to Help during Emergencies
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 py-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Full Name here" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Phone No.</Label>
                      <Input id="name" placeholder="+91" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Description</Label>
                      <Textarea
                        placeholder="Type your message here."
                        rows={3}
                      />
                    </div>
                  </div>
                  <Separator />
                  <DialogFooter>
                    <div className="mt-2 flex justify-between gap-3">
                      <DialogClose asChild>
                        <Button variant="outline">
                          <ChevronLeft />
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button onClick={() => setNext(true)} className="w-full">
                        Next
                      </Button>
                    </div>
                  </DialogFooter>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogHeader>
                    <DialogTitle>NGO Login</DialogTitle>
                    <DialogDescription>
                      Login here to Help during Emergencies
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3 py-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Mission</Label>
                      <Input id="name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Vision</Label>
                      <Input id="name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Website</Label>
                      <Input id="name" />
                    </div>
                    <LocationPicker />
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Ngo Id</Label>
                      <Input id="name" />
                    </div>
                  </div>
                  <Separator />
                  <DialogFooter>
                    <div className="mt-2 flex justify-between gap-3">
                      <Button onClick={() => setNext(false)} variant="outline">
                        <ChevronLeft />
                        Back
                      </Button>
                      <Button
                        className="w-full"
                        variant={"outline"}
                        type="submit"
                      >
                        <img src={img} height={15} width={15} alt="Hi" />
                        Login with Ethereum
                      </Button>
                    </div>
                  </DialogFooter>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NgoLogin;
