import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const resolvedParams = await params;
    const { code } = resolvedParams;

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    // Find the short URL
    const shortUrl = await prisma.shortUrl.findUnique({
      where: { shortCode: code },
    });

    if (!shortUrl) {
      return NextResponse.json(
        { error: "Short URL not found" },
        { status: 404 }
      );
    }

    // Update click count
    await prisma.shortUrl.update({
      where: { id: shortUrl.id },
      data: { clicks: shortUrl.clicks + 1 },
    });

    // Redirect to original URL
    return NextResponse.redirect(shortUrl.originalUrl);
  } catch (error) {
    console.error("Error redirecting short URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
