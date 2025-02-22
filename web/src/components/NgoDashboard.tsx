"use client";
import React from "react";
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Building2,
  Globe,
  Heart,
  LineChart as LC,
  Users,
  Target,
  Briefcase,
  Map,
  AlertCircle,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  AreaChart,
  Area,
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "./ui/button";

const NGODashboard = ({ ngo }: any) => {
  const disasterData = [
    { month: "Jan", active: 4, resolved: 2, ongoing: 3 },
    { month: "Feb", active: 5, resolved: 3, ongoing: 4 },
    { month: "Mar", active: 3, resolved: 4, ongoing: 2 },
    { month: "Apr", active: 6, resolved: 2, ongoing: 5 },
    { month: "May", active: 4, resolved: 5, ongoing: 3 },
    { month: "Jun", active: 5, resolved: 3, ongoing: 4 },
  ];

  const focusAreaImpact = [
    { name: "MEDICAL", value: 35, color: "#FF6B6B" },
    { name: "FOOD", value: 25, color: "#4ECDC4" },
    { name: "SHELTER", value: 20, color: "#45B7D1" },
    { name: "EDUCATION", value: 15, color: "#96CEB4" },
    { name: "INFRASTRUCTURE", value: 5, color: "#FFEEAD" },
  ];

  const activeDisasters = [
    {
      id: 1,
      name: "Flood Relief",
      location: "Kerala",
      status: "ACTIVE",
      amountUsed: 25000,
      progress: 75,
    },
    {
      id: 2,
      name: "Earthquake Response",
      location: "Gujarat",
      status: "ONGOING",
      amountUsed: 15000,
      progress: 45,
    },
    {
      id: 3,
      name: "Medical Camp",
      location: "Maharashtra",
      status: "ACTIVE",
      amountUsed: 35000,
      progress: 90,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 p-8">
      <Card className="">
        <CardContent className="flex items-center gap-6 p-6">
          <div className="h-20 w-20 rounded-full bg-white/20 p-4">
            <Building2 className="h-12 w-12" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{ngo?.name || "NGO Name"}</h1>
            <p className="">{ngo?.mission || "Mission Statement"}</p>
            <div className="mt-2 flex gap-4">
              <span className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {ngo?.website || "website.org"}
              </span>
              <span className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                {`${ngo?.locationLat}, ${ngo?.locationLong}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Disasters
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              People Reached
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,521</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Funds Utilized
            </CardTitle>
            <Briefcase className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$75,234</div>
            <p className="text-xs text-muted-foreground">87% efficiency rate</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Focus Areas</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Primary sectors</p>
          </CardContent>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Disaster Response Timeline</CardTitle>
              <CardDescription>
                Monthly disaster status breakdown
              </CardDescription>
            </div>
            <Select defaultValue="6m">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={disasterData} stackOffset="expand">
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="active"
                  stackId="1"
                  stroke="#FF6B6B"
                  fill="#FF6B6B"
                />
                <Area
                  type="monotone"
                  dataKey="ongoing"
                  stackId="1"
                  stroke="#4ECDC4"
                  fill="#4ECDC4"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stackId="1"
                  stroke="#45B7D1"
                  fill="#45B7D1"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Focus Area Impact</CardTitle>
            <CardDescription>
              Distribution of resources by sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={focusAreaImpact}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {focusAreaImpact.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Disaster Response</CardTitle>
              <CardDescription>
                Currently ongoing relief operations
              </CardDescription>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeDisasters.map((disaster) => (
              <div
                key={disaster.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{disaster.name}</h3>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        disaster.status === "ACTIVE"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {disaster.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {disaster.location}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{disaster.progress}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${disaster.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NGODashboard;
