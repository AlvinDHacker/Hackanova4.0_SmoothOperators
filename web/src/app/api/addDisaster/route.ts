"use server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, disasterName, place } = body;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.length > 0) {
      const lat = data[0].lat;
      const long = data[0].lon;
      await db.disaster.create({
        data: {
          name: disasterName,
          locationLat: parseFloat(lat),
          locationLong: parseFloat(long),
          description: `${disasterName} brought to notice by ${name}`,
          link: "SMS",
        },
      });

      return NextResponse.json(
        { status: 200, Message: "Success" },
        { status: 200 },
      );
    } else {
      //   throw new Error("Address not found");
      return NextResponse.json(
        { status: 400, Message: "Address not found" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return NextResponse.json(
      { status: 500, Message: "Error from our side" },
      { status: 500 },
    );
  }
}
