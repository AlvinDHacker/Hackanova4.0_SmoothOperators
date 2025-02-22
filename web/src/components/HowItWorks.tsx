"use client";
import React, { useState } from "react";
import {
  Globe,
  Building2,
  Wallet,
  FileCheck,
  Link as ChainLink,
  ArrowRight,
} from "lucide-react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "AI-Powered Detection",
      description:
        "AI scrapes real-time disaster news & verifies it with on-ground sources.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: "NGO Verification",
      description: "NGOs confirm the crisis & estimate aid requirements.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Smart Contract Release",
      description:
        "Funds are auto-released via smart contracts to verified NGOs & vendors.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FileCheck className="h-8 w-8" />,
      title: "Proof Submission",
      description:
        "Vendors supply aid & submit proofs (bills, GPS-stamped images, videos).",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <ChainLink className="h-8 w-8" />,
      title: "Blockchain Logging",
      description:
        "All transactions are logged on blockchain for full transparency & accountability.",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden pb-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-95" />

      {/* Content container */}
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-poppins mb-6 font-semibold text-black dark:text-white text-4xl md:text-5xl">
            How it Works
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-600" />
        </div>

        {/* Steps container */}
        <div className="mb-12 grid gap-6 md:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative cursor-pointer ${
                activeStep === index ? "scale-105" : "scale-100"
              } transition-all duration-300`}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 md:block">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-600" />
                  <ArrowRight className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                </div>
              )}

              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-700 p-px transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-500">
                <div className="relative h-full rounded-2xl bg-gray-900 p-6">
                  {/* Step number */}
                  <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-gray-700 to-gray-600 text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Icon container */}
                  <div
                    className={`mb-4 h-16 w-16 rounded-xl bg-gradient-to-r ${step.color} transform p-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
