"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Building2, ChevronLeft, ExternalLink, Landmark } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { LabelledPieChart } from "./Charts/LabelledPieChart";
import { NumberTicker } from "./ui/number-ticker";
import { AreaChartSimple } from "./Charts/AreaChart";
import { Disaster, NGO } from "@prisma/client";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { getNGOs } from "~/app/api/getNGOs";
import { useEffect, useState } from "react";

const DisasterSingle = ({ location }: { location: Disaster }) => {
  const [ngos, setNgos] = useState<NGO[]>([]);

  useEffect(() => {
    const fetchNGOs = async () => {
      const n = await getNGOs();
      setNgos(n);
    };
    fetchNGOs();
  }, []);
  const router = useRouter();

  const simpleareachart = [
    { timeline: "January", value: 186 },
    { timeline: "February", value: 305 },
    { timeline: "March", value: 237 },
    { timeline: "April", value: 73 },
    { timeline: "May", value: 209 },
    { timeline: "June", value: 214 },
  ];

  const piechart = [
    { label: "food", value: 275, fill: "var(--color-chrome)" },
    { label: "travel", value: 200, fill: "var(--color-safari)" },
    { label: "emergency", value: 297, fill: "var(--color-firefox)" },
  ];

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="mx-auto min-h-screen w-[90%]">
      <Card>
        <CardHeader className="mx-auto w-full px-4 py-6">
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <div className="flex-wrap">
                <CardTitle className="text-2xl">{location.title}</CardTitle>
              </div>
              <CardDescription>{location.source}</CardDescription>
            </div>
            <Button
              onClick={() => void router.push("/map")}
              variant={"outline"}
            >
              <ChevronLeft />
              Back to Map
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="my-2 grid gap-3 sm:grid-cols-2">
        <LabelledPieChart data={piechart} />
        <AreaChartSimple data={simpleareachart} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardHeader className="items-start pb-0">
              <CardTitle>No. of People Reached</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <NumberTicker
                value={120}
                className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-start pb-0">
              <CardTitle>No. of NGO&apos;s Contacted</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <NumberTicker
                value={20}
                className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
              />
            </CardContent>
          </Card>
        </div>
        <Card className="">
          <CardHeader className="items-start">
            <div className="flex w-full justify-between">
              <div>
                <CardTitle>News Content</CardTitle>
                <CardDescription>About the Emergency</CardDescription>
              </div>
              <Link href={location.link}>
                <ExternalLink className="my-auto" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge>{location.severity}</Badge>
              <Badge variant={"outline"}>{location.source}</Badge>
            </div>
            {location.name}
          </CardContent>
        </Card>
      </div>

      <Card className="p-2">
        <CardHeader className="flex w-full justify-between">
          <div className="flex w-full justify-between">
            <div>
              <CardTitle>NGO&apos;s In touch</CardTitle>
              <CardDescription>
                NGO&apos;s attending to the emergency
              </CardDescription>
            </div>
            <Building2 className="my-auto" />
          </div>
        </CardHeader>
        <CardContent>
          <Table className="rounded-md">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">NGO Name</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ngos.map((invoice, i) => (
                <TableRow key={i}>
                  <TableCell className="w-[200px] font-medium">
                    {invoice.name}
                  </TableCell>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.website}</TableCell>
                  <TableCell className="text-right">100</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {ngos.length * 100}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Card className="my-2 p-2">
        <CardHeader className="flex w-full justify-between">
          <div className="flex w-full justify-between">
            <div>
              <CardTitle>Current Transactions</CardTitle>
              <CardDescription>Transactions about the disaster</CardDescription>
            </div>
            <Landmark className="my-auto" />
          </div>
        </CardHeader>
        <CardContent>
          <Table className="rounded-md">
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Location Details</h2>
              <p className="mb-2 text-gray-600">
                <strong>Address:</strong> {location.address}
              </p>
              <p className="mb-2 text-gray-600">
                <strong>Rating:</strong> {location.rating} / 5
              </p>
              <p className="mb-2 text-gray-600">
                <strong>Hours:</strong> {location.openingHours}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Features</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {location.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DisasterSingle;
