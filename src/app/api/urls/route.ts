import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { data: urls, error } = await supabase
      .from("short_urls")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching URLs:", error);
      return NextResponse.json(
        { error: "Failed to fetch URLs" },
        { status: 500 }
      );
    }

    const formattedUrls = urls.map((url) => ({
      id: url.id,
      originalUrl: url.original_url,
      shortCode: url.short_code,
      shortUrl: `${request.nextUrl.origin}/${url.short_code}`,
      createdAt: url.created_at,
      clicks: url.clicks,
    }));

    return NextResponse.json(formattedUrls);
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
    const { error } = await supabase
      .from("short_urls")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all

    if (error) {
      console.error("Error deleting URLs:", error);
      return NextResponse.json(
        { error: "Failed to delete URLs" },
        { status: 500 }
      );
    }

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
