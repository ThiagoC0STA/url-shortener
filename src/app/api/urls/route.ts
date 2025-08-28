import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const urls = await prisma.shortUrl.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        originalUrl: true,
        shortCode: true,
        createdAt: true,
        clicks: true,
      },
    });

    // Get the correct domain for the short URLs
    const domain = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

    const urlsWithShortUrls = urls.map((url) => ({
      ...url,
      shortUrl: `${domain}/${url.shortCode}`,
    }));

    return NextResponse.json(urlsWithShortUrls);
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Delete all URLs from the database
    await prisma.shortUrl.deleteMany({});

    return NextResponse.json({
      message: "All URLs deleted successfully",
      deletedCount: "all",
    });
  } catch (error) {
    console.error("Error deleting URLs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
