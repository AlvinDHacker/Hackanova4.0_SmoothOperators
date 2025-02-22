"use client";
import React, { useState, useEffect } from "react";
import { ExternalLink, Filter, Search, SmartphoneNfc } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Separator } from "./ui/separator";
import axios from "axios";
import { BrowserProvider, Signer, Contract, parseEther } from "ethers";
import contractAbi from "../../contract/ResQ.json";
import type { ResQ } from "typechain-types/ResQ";

const API_BASE_URL = "http://127.0.0.1:5000";
const img = `https://cdn.simpleicons.org/ethereum/ethereum`;

const EmergencyCard = ({ article, openDialog }: any) => (
  <Card className="flex h-full flex-col justify-between">
    <CardHeader>
      <div className="flex justify-between">
        <div>
          <CardTitle className="mb-1 text-lg">
            {article.title.split(" - ")[0]}
          </CardTitle>
          <Separator />
          <CardDescription className="mt-2">
            <div className="flex justify-between">
              {new Date(article.published).toLocaleDateString()}
              <Badge
                variant={
                  article.severity === "high"
                    ? "destructive"
                    : article.severity === "medium"
                      ? "secondary"
                      : "default"
                }
                className="my-auto"
              >
                {article.severity.toUpperCase()}
              </Badge>
            </div>
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pb-2">
      <div
        className="mb-4"
        dangerouslySetInnerHTML={{
          __html: article.description.split("&nbsp;")[0],
        }}
      />
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="outline" className="capitalize">
          {article.emergencyType}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Source: {article.source}
        </span>
      </div>
    </CardContent>
    <CardFooter className="border-t pt-4">
      <div className="flex w-full justify-end gap-3">
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          <Button variant={"outline"}>View Report</Button>
        </a>
        <Button variant="outline" onClick={openDialog}>
          <SmartphoneNfc />
        </Button>
        <a href={`/emergencies/map/${article.title}`}>
          <Button className="bg-green-600 text-white hover:bg-green-500 dark:bg-green-700">
            <ExternalLink />
          </Button>
        </a>
      </div>
    </CardFooter>
  </Card>
);

const Emergency = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sepoliaEth, setSepoliaEth] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const fetchArticles = async (endpoint = "/emergency-news") => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();
      setArticles(data.articles || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch emergency news");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ethPrice && sepoliaEth) {
      setConvertedAmount(
        parseFloat((parseFloat(sepoliaEth) * ethPrice).toFixed(2)),
      );
    } else {
      setConvertedAmount(0);
    }
  }, [sepoliaEth, ethPrice]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr",
        );
        setEthPrice(response.data.ethereum.inr);
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };

    fetchPrice();
    fetchArticles();
  }, []);

  useEffect(() => {
    if (selectedCategory !== "all") {
      fetchArticles(`/emergency-news/by-type/${selectedCategory}`);
    } else if (selectedSeverity !== "all") {
      fetchArticles(`/emergency-news/by-severity/${selectedSeverity}`);
    } else if (searchKeyword) {
      fetchArticles(`/search/${encodeURIComponent(searchKeyword)}`);
    } else {
      fetchArticles();
    }
  }, [selectedCategory, selectedSeverity, searchKeyword]);

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
      const tx = await contractInstance.depositFunds({
        value: parseEther(sepoliaEth), // Sending 1 ETH
      });

      await tx.wait(); // Wait for the transaction to be confirmed
      console.log("Deposit successful!");
    } catch (error) {
      console.error("Error depositing funds:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Emergency Relief Center</h1>
        <p className="text-muted-foreground">
          Latest updates on emergencies and disasters worldwide
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Filter className="h-5 w-5" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Emergency Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="natural">Natural</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="fire">Fire</SelectItem>
              <SelectItem value="accident">Accident</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <form className="flex gap-2">
          <Input
            type="search"
            name="search"
            placeholder="Search emergencies..."
            className="w-[200px]"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button type="submit" variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <EmergencyCard
                article={article}
                openDialog={() => setIsOpen(true)}
              />
            </motion.div>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              <Label htmlFor="amount">Amount (ETH)</Label>
              <Input
                onChange={(e) => setSepoliaEth(e.target.value)}
                id="amount"
                placeholder="Amount in ETH"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="converted">Converted Currency</Label>
              <Input
                id="converted"
                disabled
                value={`${convertedAmount} Rs`}
                placeholder="Amount in Rs which is converted"
              />
            </div>
          </div>
          <Separator />
          <DialogFooter>
            <Button
              onClick={handleTransaction}
              variant={"outline"}
              type="submit"
            >
              <img src={img} height={15} width={15} alt="Hi" />
              Pay Now with Ethereum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Emergency;
