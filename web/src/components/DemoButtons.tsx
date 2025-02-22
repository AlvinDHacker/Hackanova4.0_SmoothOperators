// components/DemoButtons.jsx
'use client';

import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import MainLogin from "~/components/Login/MainLogin";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const DemoButtons = () => {
  const showdemofunction = () => {
    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      showProgress: true,
      steps: [
        {
          element: "#login",
          popover: {
            title: "Begin your journey with us",
            description: "Login as per usertype to Relief ResQ",
          },
        },
        {
          element: "#donorlogin",
          popover: {
            title: "Donor Portal",
            description: "Donate funds securely, track your contributions, and ensure aid reaches the right people in real-time.",
          },
        },
        {
          element: "#vendorlogin",
          popover: {
            title: "Vendor Portal",
            description: "Manage relief supply orders, track deliveries, and receive instant payments for aid distribution.",
          },
        },{
          element: "#NGOlogin",
          popover: {
            title: "NGO Portal",
            description: "Request funds, coordinate disaster relief efforts, and track aid distribution efficiently.",
          },
        },

      ],
    });

    // Start the tour
    driverObj.drive();
  }
  
  useEffect(() => {
    // Initialize driver.js after component mounts
    
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div id = "login">
      <MainLogin />
      </div>
      <Button id="showdemo" variant="outline" onClick={showdemofunction}>
        Show Demo
      </Button>
    </div>
  );
};

export default DemoButtons;