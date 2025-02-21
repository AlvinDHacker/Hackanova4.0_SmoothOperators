"use client";
import React, { useEffect, useState } from "react";
import { Contract, BrowserProvider, Signer } from "ethers";
import contractABI from "../../../contract/ResQ.json"; // Adjust the import path
import { ConnectWalletButton } from "~/components/ConnectWalletButton";

// Define types for better safety
declare global {
  interface Window {
    ethereum?: any; // Ensuring compatibility with MetaMask
  }
}

export default function Page() {
  const [contract, setContract] = useState<Contract | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);

  useEffect(() => {
    const getContract = async () => {
      if (!window.ethereum) {
        console.error("MetaMask not found!");
        return;
      }

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signerInstance = await provider.getSigner();
        setSigner(signerInstance);

        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

        if (!contractAddress) {
          throw new Error("Contract address is missing in .env");
        }

        const contractInstance = new Contract(
          contractAddress,
          contractABI.abi,
          signerInstance,
        );

        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    getContract();
  }, []);

  const createBeneficiary = async () => {
    if (!contract) {
      console.error("Contract not initialized");
      return;
    }

    try {
      const tx = await contract.registerBeneficiary(
        signer?.getAddress,
        "123",
        "456",
      );
      await tx.wait(); // Wait for transaction confirmation
      console.log("Beneficiary registered successfully!");
    } catch (error) {
      console.error("Error registering beneficiary:", error);
    }
  };

  return (
    <div>
      <div>
        <ConnectWalletButton />
      </div>
      <button onClick={() => console.log(contract)}>Show Contract</button>
      <button onClick={createBeneficiary}>Register Beneficiary</button>
    </div>
  );
}
