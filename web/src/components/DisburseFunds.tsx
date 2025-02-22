"use client";
import { BellRing, Wallet } from "lucide-react";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { BrowserProvider, Signer, Contract, parseEther } from "ethers";
import contractAbi from "../../contract/ResQ.json";
import type { ResQ } from "typechain-types/ResQ";
import { useUser } from "./AuthComponent";

const DisburseFunds = () => {
  const img = `https://cdn.simpleicons.org/ethereum/ethereum`;
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [rs, setRs] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr",
        );
        setEthPrice(response.data.ethereum.inr);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };
    fetchEthPrice();
  }, []);

  useEffect(() => {
    if (rs && ethPrice) {
      const ethValue = (parseFloat(rs) / ethPrice).toFixed(6);
      setConvertedAmount(ethValue);
    } else {
      setConvertedAmount("");
    }
  }, [rs, ethPrice]);

  const handleTransaction = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    if (!contractAddress) {
      throw new Error("Contract address is missing in .env");
    }

    const contractInstance: ResQ = new Contract(
      contractAddress,
      contractAbi.abi,
      signer,
    ) as unknown as ResQ;

    try {
      const tx = await contractInstance.disburseFunds(
        user?.walletId!,
        BigInt(parseFloat(convertedAmount) * 10 ** 18), // If you need it as a BigInt
      );
      await tx.wait(); // Wait for the transaction to be confirmed
      console.log("Payment successful!");
    } catch (error) {
      console.error("Error depositing funds:", error);
    }
  };

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
              Funds can be requested with proper invoices to manage disaster
              expenses.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount Required (INR)</Label>
              <Input
                id="amount"
                placeholder="Amount in Rs"
                value={rs}
                onChange={(e) => setRs(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="converted">Amount Required (ETH)</Label>
              <Input
                id="converted"
                placeholder="Amount in ETH"
                value={convertedAmount}
                disabled
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="field">Fields of Assist</Label>
              <Input id="field" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Assisting Description</Label>
              <Textarea id="description" rows={3} />
            </div>
          </div>
          <Separator />
          <DialogFooter>
            <Button onClick={handleTransaction} variant="outline" type="submit">
              <img
                src={img}
                height={15}
                width={15}
                alt="ETH"
                className="mr-2"
              />
              Request Funds in Ethereum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisburseFunds;
