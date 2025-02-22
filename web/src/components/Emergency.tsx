"use client";
import React, { useState, useEffect } from "react";
import { ExternalLink, Filter, ChevronRight, Search, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
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
import DonorPay from "./DonorPay";

const API_BASE_URL = "http://127.0.0.1:5000";

const EmergencyCard = ({ article }: any) => (
  <Card className="flex h-full flex-col justify-between">
    <CardHeader>
      <div className="flex justify-between">
        {/* <div className="flex"> */}
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
        {/* </div> */}
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
          <Button variant={"outline"} className="">
            View Report
          </Button>
        </a>
        <DonorPay />
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

  const handleSearch = (e: any) => {
    e.preventDefault();
    const searchInput = e.target.elements.search.value;
    setSearchKeyword(searchInput);
    setSelectedCategory("all");
    setSelectedSeverity("all");
  };

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value);
    setSelectedSeverity("all");
    setSearchKeyword("");
  };

  const handleSeverityChange = (value: any) => {
    setSelectedSeverity(value);
    setSelectedCategory("all");
    setSearchKeyword("");
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
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
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

          <Select value={selectedSeverity} onValueChange={handleSeverityChange}>
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

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            name="search"
            placeholder="Search emergencies..."
            className="w-[200px]"
          />
          <Button type="submit" variant="secondary">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

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
              <EmergencyCard article={article} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Link href="/emergencies">
          <Button variant="outline" size="lg">
            View All Emergencies
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Emergency;
