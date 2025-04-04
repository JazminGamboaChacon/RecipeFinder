import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return NextResponse.json(data.meals || []);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching recipes" }, { status: 500 });
  }
}
