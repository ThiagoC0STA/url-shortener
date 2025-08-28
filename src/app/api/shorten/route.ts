import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Check if URL already exists
    const existingUrl = await prisma.shortUrl.findUnique({
      where: { originalUrl: url },
    });

    if (existingUrl) {
      return NextResponse.json({
        shortCode: existingUrl.shortCode,
        originalUrl: existingUrl.originalUrl,
        shortUrl: `${request.nextUrl.origin}/${existingUrl.shortCode}`,
      });
    }

    // Generate unique short code
    let shortCode: string;
    let isUnique = false;

    while (!isUnique) {
      shortCode = nanoid(6); // 6 characters
      const existing = await prisma.shortUrl.findUnique({
        where: { shortCode },
      });
      if (!existing) {
        isUnique = true;
      }
    }

    // Create new short URL
    const shortUrl = await prisma.shortUrl.create({
      data: {
        originalUrl: url,
        shortCode: shortCode!,
      },
    });

    // Get the correct domain for the short URL
    const domain = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

    return NextResponse.json({
      shortCode: shortUrl.shortCode,
      originalUrl: shortUrl.originalUrl,
      shortUrl: `${domain}/${shortUrl.shortCode}`,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
