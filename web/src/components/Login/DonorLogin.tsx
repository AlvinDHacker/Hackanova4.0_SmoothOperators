"use client";
import { BellRing, ChevronLeft, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "motion/react";

const DonorLogin = () => {
  const [next, setNext] = useState(false);
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login as Donor</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login as a Donor</DialogTitle>
            <DialogDescription>
              Login here to Donate for a Good Cause
            </DialogDescription>
          </DialogHeader>
          <AnimatePresence mode="wait">
            {!next ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                <div className="grid gap-4 py-4">
                  <Label htmlFor="name">Enter OTP</Label>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Separator />
                <DialogFooter>
                  <div className="mt-2 flex justify-between gap-3">
                    <Button onClick={() => setNext(false)} variant="outline">
                      <ChevronLeft />
                      Back
                    </Button>
                    <Button variant={"outline"} type="submit">
                      <img src={img} height={15} width={15} alt="Hi" />
                      Login with Ethereum
                    </Button>
                  </div>
                </DialogFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonorLogin;
