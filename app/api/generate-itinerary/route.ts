import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

async function getCoordinates(location: string) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location,
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  );
  const data = await response.json();

  if (data.results?.[0]) {
    return data.results[0].geometry.location;
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, duration, travelStyle, budget, interests } = body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable travel planner that creates detailed day-by-day itineraries.",
        },
        {
          role: "user",
          content: `Create a ${duration}-day itinerary for ${destination}. 
            Travel style: ${travelStyle}
            Budget level: ${budget}/5
            Interests: ${interests}
            
            Format the response as a JSON object with a title, overview, and an array of days, where each day has a title and location.`,
        },
      ],
    });

    const itineraryData = JSON.parse(completion.choices[0].message.content!);

    // Add coordinates to each day's locations
    for (const day of itineraryData.days) {
      const coordinates = await getCoordinates(day.location);
      day.coordinates = coordinates;
    }

    const id = Math.random().toString(36).substr(2, 9);

    return NextResponse.json({ id, itinerary: itineraryData });
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 },
    );
  }
}
