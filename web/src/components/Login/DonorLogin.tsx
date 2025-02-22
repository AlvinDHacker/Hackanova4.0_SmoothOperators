"use client";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";
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
} from "~/components/ui/dialog";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "~/components/ui/input-otp";
import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "motion/react";
import { signIn } from "next-auth/react";
import { SiweMessage, generateNonce } from "siwe";
import { BrowserProvider, Contract } from "ethers";
import contractAbi from "../../../contract/ResQ.json";
import { checkUser } from "~/app/api/manageUser";
import type { ResQ } from "typechain-types/ResQ";
import type { JsonRpcSigner } from "ethers";

type FormData = {
  name: string;
  phoneNo: string;
  aadhar: string;
  userType: string;
};

const DonorLogin = () => {
  const [next, setNext] = useState(false);
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  const [data, setData] = useState<FormData>({
    name: "",
    phoneNo: "",
    aadhar: "",
    userType: "DONOR",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<SiweMessage>();
  const [signature, setSignature] = useState("");
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSignUp = async () => {
    try {
      await signIn("credentials", {
        message: JSON.stringify(message),
        signature,
        redirect: false,
        ...data,
      });

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

      if (!contractAddress) {
        throw new Error("Contract address is missing in .env");
      }

      const contractInstance: ResQ = new Contract(
        contractAddress,
        contractAbi.abi,
        signer,
      ) as unknown as ResQ;

      if (signer) {
        contractInstance.registerDonor(
          signer.address,
          `did:ethr:${signer.address}`,
          data.aadhar,
        );
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!window.ethereum) {
      alert("MetaMask required");
      return;
    }

    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const tsigner = await provider.getSigner();
      const address = await tsigner.getAddress();

      const userExists = await checkUser(address);
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce: generateNonce(),
      });

      const signature = await tsigner.signMessage(message.prepareMessage());

      if (userExists) {
        await signIn("credentials", {
          message: JSON.stringify(message),
          signature,
          redirect: false,
          ...data,
        });
      } else {
        setMessage(message);
        setSignature(signature);
        setSigner(tsigner);
        openDialog();
      }
    } catch (e) {
      console.error("Login error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleLogin} variant="outline">
        Login as Donor
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                    <Input
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                      id="name"
                      placeholder="Full Name here"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phoneNo">Phone No.</Label>
                    <Input
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          phoneNo: e.target.value,
                        }));
                      }}
                      id="phoneNo"
                      placeholder="+91"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="aadhar">Aadhar Card No.</Label>
                    <Input
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          aadhar: e.target.value,
                        }));
                      }}
                      id="aadhar"
                    />
                  </div>
                </div>
                <Separator />
                <DialogFooter>
                  <div className="mt-2 flex justify-between gap-3">
                    <Button
                      onClick={handleSignUp}
                      disabled={
                        data.name === "" ||
                        data.phoneNo === "" ||
                        data.aadhar === "" ||
                        loading
                      }
                      className="border border-gray-600 disabled:bg-gray-400"
                      variant="outline"
                      type="submit"
                    >
                      <img
                        src={img}
                        height={15}
                        width={15}
                        alt="Ethereum"
                        className="mr-2"
                      />
                      {loading ? "Processing..." : "Login with Ethereum"}
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
                  <Label htmlFor="otp">Enter OTP</Label>
                  {/* <InputOTP maxLength={6}>
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
                  </InputOTP> */}
                </div>
                <Separator />
                <DialogFooter>
                  <div className="mt-2 flex justify-between gap-3">
                    <Button onClick={() => setNext(false)} variant="outline">
                      <ChevronLeft />
                      Back
                    </Button>
                    <Button
                      onClick={handleSignUp}
                      variant="outline"
                      type="submit"
                      disabled={loading}
                    >
                      <img
                        src={img}
                        height={15}
                        width={15}
                        alt="Ethereum"
                        className="mr-2"
                      />
                      {loading ? "Processing..." : "Login with Ethereum"}
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
