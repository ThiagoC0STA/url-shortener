import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const resolvedParams = await params;
    const { code } = resolvedParams;

    if (!code) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Find the short URL
    const { data: shortUrl, error } = await supabase
      .from("short_urls")
      .select("*")
      .eq("short_code", code)
      .single();

    if (error || !shortUrl) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Increment click count
    await supabase
      .from("short_urls")
      .update({ clicks: shortUrl.clicks + 1 })
      .eq("id", shortUrl.id);

    // Redirect to the original URL
    return NextResponse.redirect(shortUrl.original_url);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}
