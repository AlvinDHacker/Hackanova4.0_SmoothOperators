import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Severity } from "@prisma/client";

const prisma = new PrismaClient();

function determineSeverity(article: any): Severity {
  const title = article.title.toLowerCase();
  const description = article.description.toLowerCase();
  
  const highSeverityKeywords = ['catastrophic', 'devastating', 'emergency', 'fatal', 'death'];
  const mediumSeverityKeywords = ['severe', 'significant', 'injured', 'damage'];
  
  if (highSeverityKeywords.some(keyword => title.includes(keyword) || description.includes(keyword))) {
    return "HIGH";
  } else if (mediumSeverityKeywords.some(keyword => title.includes(keyword) || description.includes(keyword))) {
    return "MEDIUM";
  }
  return "LOW";
}

function determineEmergencyType(article: any): string {
  const content = (article.title + " " + article.description).toLowerCase();
  
  const types = {
    natural: ['earthquake', 'flood', 'hurricane', 'tsunami', 'tornado'],
    medical: ['outbreak', 'epidemic', 'pandemic', 'disease', 'health'],
    fire: ['fire', 'wildfire', 'blaze'],
    accident: ['crash', 'collision', 'accident', 'derailment'],
  };

  for (const [type, keywords] of Object.entries(types)) {
    if (keywords.some(keyword => content.includes(keyword))) {
      return type;
    }
  }
  
  return 'other';
}

export async function POST(request: Request) {
  try {
    const articles = await request.json();
    
    const disasters = await Promise.all(
      articles.map(async (article: any) => {
        const existingDisaster = await prisma.disaster.findFirst({
          where: {
            title: article.title,
            published: new Date(article.published),
          },
        });

        if (existingDisaster) {
          return existingDisaster;
        }

        return await prisma.disaster.create({
          data: {
            title: article.title,
            name: article.title.split(" - ")[0],
            description: article.description,
            source: article.source,
            link: article.link,
            locationLat: article.locationLat || 0,
            locationLong: article.locationLong || 0,
            severity: determineSeverity(article),
            published: new Date(article.published),
            emergencyType: determineEmergencyType(article),
          },
        });
      })
    );

    return NextResponse.json({ disasters });
  } catch (error) {
    console.error("Error creating disasters:", error);
    return NextResponse.json(
      { error: "Failed to create disasters" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const disasters = await prisma.disaster.findMany({
      orderBy: {
        published: 'desc'
      }
    });
    
    return NextResponse.json({ disasters });
  } catch (error) {
    console.error("Error fetching disasters:", error);
    return NextResponse.json(
      { error: "Failed to fetch disasters" },
      { status: 500 }
    );
  }
}