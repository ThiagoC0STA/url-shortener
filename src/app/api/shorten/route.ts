import { supabase } from "@/lib/supabase";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

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
    const { data: existingUrl } = await supabase
      .from("short_urls")
      .select("*")
      .eq("original_url", url)
      .single();

    if (existingUrl) {
      return NextResponse.json({
        shortCode: existingUrl.short_code,
        originalUrl: existingUrl.original_url,
        shortUrl: `${request.nextUrl.origin}/${existingUrl.short_code}`,
      });
    }

    // Generate unique short code
    let shortCode: string = "";
    let isUnique = false;

    while (!isUnique) {
      shortCode = nanoid(6); // 6 characters
      const { data: existing } = await supabase
        .from("short_urls")
        .select("id")
        .eq("short_code", shortCode)
        .single();

      if (!existing) {
        isUnique = true;
      }
    }

    // Create new short URL
    const { data: shortUrl, error } = await supabase
      .from("short_urls")
      .insert({
        original_url: url,
        short_code: shortCode,
        clicks: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating short URL:", error);
      return NextResponse.json(
        { error: "Failed to create short URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      shortCode: shortUrl.short_code,
      originalUrl: shortUrl.original_url,
      shortUrl: `${request.nextUrl.origin}/${shortUrl.short_code}`,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
