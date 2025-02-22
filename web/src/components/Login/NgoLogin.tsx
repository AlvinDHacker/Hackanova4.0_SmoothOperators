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
import { Checkbox } from "~/components/ui/checkbox";
import LocationPicker from "./LocationPicker";
import { BrowserProvider, Signer, Contract } from "ethers";
import { SiweMessage, generateNonce } from "siwe";
import contractAbi from "../../../contract/ResQ.json";
import { signIn } from "next-auth/react";

const NgoLogin = () => {
  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(false);
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  const [data, setData] = useState<{
    name: string;
    phoneNo: string;
    desc: string;
    focusArea: number[]; // Corrected type
    mission: string;
    vision: string;
    website: string;
    ngoId: string;
    lat: number;
    lon: number;
    userType: "NGO";
  }>({
    name: "",
    phoneNo: "",
    desc: "",
    focusArea: [], // Now correctly typed as number[]
    mission: "",
    vision: "",
    website: "",
    ngoId: "",
    lat: 0.0,
    lon: 0.0,
    userType: "NGO",
  });

  const handleCheckboxChange = (area: number, checked: boolean) => {
    setData((prev) => ({
      ...prev,
      focusArea: checked
        ? [...prev.focusArea, area] // Add if checked
        : prev.focusArea.filter((item) => item !== area), // Remove if unchecked
    }));
  };

  const handleLogin = async () => {
    if (!window.ethereum) return alert("MetaMask required");

    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum",
        uri: window.location.origin,
        version: "1",
        chainId: 1,
        nonce: generateNonce(),
      });

      const signature = await signer.signMessage(message.prepareMessage());
      await signIn("credentials", {
        message: JSON.stringify(message),
        signature,
        redirect: false,
        ...data,
        focusArea: JSON.stringify(data.focusArea),
      });

      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

      if (!contractAddress) {
        throw new Error("Contract address is missing in .env");
      }

      const contractInstance = new Contract(
        contractAddress,
        contractAbi.abi,
        signer,
      );

      contractInstance.registerBeneficiary(
        signer.address,
        `did:ethr:${signer.address}`,
        data.ngoId,
      );
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login as an NGO</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm">
            <AnimatePresence mode="wait">
              {next == 0 ? (
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
                      <Input
                        onChange={(e) => {
                          setData((prevState) => ({
                            ...prevState,
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
                          setData((prevState) => ({
                            ...prevState,
                            phoneNo: e.target.value,
                          }));
                        }}
                        id="phoneNo"
                        placeholder="+91"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Description</Label>
                      <Textarea
                        onChange={(e) => {
                          setData((prevState) => ({
                            ...prevState,
                            desc: e.target.value,
                          }));
                        }}
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
                      <Button
                        disabled={
                          data.name == "" ||
                          data.phoneNo == "" ||
                          data.desc == ""
                        }
                        onClick={() => setNext(1)}
                        className="w-full disabled:opacity-50"
                      >
                        Next
                      </Button>
                    </div>
                  </DialogFooter>
                </motion.div>
              ) : next == 1 ? (
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
                    <Separator />
                    <div className="flex flex-col">
                      <Label className="text-lg" htmlFor="name">
                        Focus Area
                      </Label>
                      <div className="mb-4 text-xs">
                        What are your primary supprort areas?
                      </div>
                      <div className="">
                        <div className="flex items-center">
                          <Checkbox
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(0, !!checked)
                            }
                          />{" "}
                          <span className="mx-2">Food</span>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(1, !!checked)
                            }
                          />{" "}
                          <span className="mx-2">Medical</span>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(2, !!checked)
                            }
                          />{" "}
                          <span className="mx-2">Travel</span>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(3, !!checked)
                            }
                          />{" "}
                          <span className="mx-2">Infrastructure</span>
                        </div>
                        <div className="flex items-center">
                          <Checkbox
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(4, !!checked)
                            }
                          />{" "}
                          <span className="mx-2">Other</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <DialogFooter>
                    <div className="mt-2 flex justify-between gap-3">
                      <DialogClose asChild>
                        <Button onClick={() => setNext(0)} variant="outline">
                          <ChevronLeft />
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={data.focusArea.length == 0}
                        onClick={() => setNext(2)}
                        className="w-full disabled:opacity-50"
                      >
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
                      <Input
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            mission: e.target.value,
                          }));
                        }}
                        id="name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Vision</Label>
                      <Input
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            vision: e.target.value,
                          }));
                        }}
                        id="name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Website</Label>
                      <Input
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            website: e.target.value,
                          }));
                        }}
                        id="name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Ngo Id</Label>
                      <Input
                        onChange={(e) => {
                          setData((prevData) => ({
                            ...prevData,
                            ngoId: e.target.value,
                          }));
                        }}
                        id="name"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <LocationPicker setData={setData} />
                    </div>
                  </div>
                  <Separator />
                  <DialogFooter>
                    <div className="mt-2 flex justify-between gap-3">
                      <Button onClick={() => setNext(1)} variant="outline">
                        <ChevronLeft />
                        Back
                      </Button>
                      <Button
                        onClick={handleLogin}
                        disabled={
                          data.mission == "" ||
                          data.vision == "" ||
                          data.website == "" ||
                          data.lat == 0.0 ||
                          data.lon == 0.0
                        }
                        className="w-full border border-gray-600 disabled:bg-gray-400"
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
