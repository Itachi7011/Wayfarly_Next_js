import { NextRequest, NextResponse } from "next/server";
import { trips } from "@/data/trips";

// Demo search endpoint over seed data. Swap the seed lookup for a
// Trip.find({ userId, title: { $regex: q, $options: "i" } }) query
// once MongoDB is connected.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";

  if (!q) return NextResponse.json({ results: [] });

  const results = trips
    .filter(
      (trip) =>
        trip.title.toLowerCase().includes(q) ||
        trip.destination.toLowerCase().includes(q) ||
        trip.country.toLowerCase().includes(q)
    )
    .map((t) => ({ id: t.id, slug: t.slug, title: t.title, destination: t.destination }));

  return NextResponse.json({ results });
}
