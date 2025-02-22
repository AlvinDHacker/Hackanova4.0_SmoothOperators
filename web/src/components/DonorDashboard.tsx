"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Building2,
  Globe,
  Heart,
  LineChart,
  Map,
  Phone,
  User2,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  AreaChart,
  Area,
  Bar,
  BarChart,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "./ui/button";

const DonorDashboard = ({ user }: any) => {
  const donationHistory = [
    { month: "Jan", amount: 2400 },
    { month: "Feb", amount: 1398 },
    { month: "Mar", amount: 9800 },
    { month: "Apr", amount: 3908 },
    { month: "May", amount: 4800 },
    { month: "Jun", amount: 3800 },
  ];

  const impactMetrics = [
    { month: "Jan", lives: 24, ngos: 5 },
    { month: "Feb", lives: 13, ngos: 3 },
    { month: "Mar", lives: 98, ngos: 8 },
    { month: "Apr", lives: 39, ngos: 4 },
    { month: "May", lives: 48, ngos: 6 },
    { month: "Jun", lives: 38, ngos: 4 },
  ];

  const disasterTypeDistribution = [
    { name: "Medical", value: 30 },
    { name: "Food", value: 25 },
    { name: "Shelter", value: 20 },
    { name: "Education", value: 15 },
    { name: "Infrastructure", value: 10 },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-8">
      <Card className="">
        <CardContent className="p-6">
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-white/20 p-4">
                <User2 className="h-12 w-12" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                  {user?.name || "NGO Name"}
                </h1>
                <p className="">{user?.email || "xyz@gmail.com"}</p>
                <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {user?.phone || "website.org"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Map className="h-4 w-4" />
                    {`${user?.location}`}
                  </span>
                </div>
              </div>
            </div>
            <Button variant={"outline"}>Show Demo</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Donations
            </CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Lives Impacted
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">Across 15 disasters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Disasters
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              In 8 different regions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              NGOs Supported
            </CardTitle>
            <Building2 className="h-4 w-4 text-green-600 dark:text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Across 5 focus areas
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Donation Overview</CardTitle>
            <CardDescription>Your donation history over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={donationHistory}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
            <CardDescription>Lives impacted and NGOs supported</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={impactMetrics}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lives" fill="#8884d8" />
                <Bar dataKey="ngos" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>Your donor information</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">Wallet ID</p>
                <p className="text-xs text-muted-foreground">0x1234...5678</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Member Since</p>
                <p className="text-xs text-muted-foreground">January 2024</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Focus Areas</p>
                <p className="text-xs text-muted-foreground">
                  Medical, Education
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <Tabs defaultValue="recent" className="h-full space-y-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="all">All Activity</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="recent" className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-gray-100 p-2">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Donated to Medical Relief
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">$500.00</div>
                  </div>
                ))}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
