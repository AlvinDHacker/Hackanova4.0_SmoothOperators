// components/DemoButtons.jsx
"use client";

import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import MainLogin from "~/components/Login/MainLogin";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import DisburseFunds from "./DisburseFunds";

const DemoButtons = () => {
  useEffect(() => {
    // Initialize driver.js after component mounts
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: "#showdemo",
          popover: {
            title: "Take A Demo With Us",
            description: "a detailed explanation on how to use Relief ResQ",
          },
        },
        {
          element: "#login",
          popover: {
            title: "Begin your journey with us",
            description: "Login as per usertype to Relief ResQ",
          },
        },
      ],
    });

    // Start the tour
    driverObj.drive();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div id="login">
        <MainLogin />
      </div>
      <Button id="showdemo" variant="outline">
        Show Demo
      </Button>
      <DisburseFunds />
    </div>
  );
};

export default DemoButtons;
