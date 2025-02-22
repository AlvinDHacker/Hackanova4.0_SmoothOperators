"use server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import axios from "axios";
import { Severity, DisasterStatus } from "@prisma/client";

function determineEmergencyType(disasterName: string): string {
  const name = disasterName.toLowerCase();
  
  const types = {
    natural: ['earthquake', 'flood', 'hurricane', 'tsunami', 'tornado', 'landslide'],
    medical: ['outbreak', 'epidemic', 'pandemic', 'disease', 'health', 'virus'],
    fire: ['fire', 'wildfire', 'blaze', 'burning'],
    accident: ['crash', 'collision', 'accident', 'derailment', 'explosion'],
  };

  for (const [type, keywords] of Object.entries(types)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return type;
    }
  }
  
  return 'other';
}

function determineSeverity(disasterName: string): Severity {
  const name = disasterName.toLowerCase();
  
  const highSeverityKeywords = ['major', 'severe', 'catastrophic', 'devastating', 'emergency', 'fatal'];
  const mediumSeverityKeywords = ['moderate', 'significant', 'partial', 'growing'];
  
  if (highSeverityKeywords.some(keyword => name.includes(keyword))) {
    return "HIGH";
  } else if (mediumSeverityKeywords.some(keyword => name.includes(keyword))) {
    return "MEDIUM";
  }
  return "LOW";
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, disasterName, place, description } = body;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.length > 0) {
      const lat = parseFloat(data[0].lat);
      const long = parseFloat(data[0].lon);
      
      const disaster = await db.disaster.create({
        data: {
          title: `${disasterName} - ${place}`,
          name: disasterName,
          description: description || `${disasterName} brought to notice by ${name}`,
          source: "User Report",
          link: "",
          locationLat: lat,
          locationLong: long,
          severity: determineSeverity(disasterName),
          status: DisasterStatus.ACTIVE,
          amountUsed: 0.0,
          published: new Date(),
          emergencyType: determineEmergencyType(disasterName),
        },
      });

      return NextResponse.json(
        { 
          status: 200, 
          message: "Disaster successfully recorded",
          data: disaster 
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { 
          status: 400, 
          message: "Location not found. Please provide a valid location.",
          error: "LOCATION_NOT_FOUND"
        },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error creating disaster record:", error);
    
    // Enhanced error response
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { 
        status: 500, 
        message: "Failed to create disaster record",
        error: errorMessage
      },
      { status: 500 },
    );
  }
}