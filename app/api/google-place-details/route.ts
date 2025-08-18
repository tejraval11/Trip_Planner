import axios from "axios";
import { head } from "motion/react-client";
import { NextRequest, NextResponse } from "next/server";
import { text } from "stream/consumers";

export async function POST(req: NextRequest) {
    try {
        const BASE_URL = "https://places.googleapis.com/v1/places:searchText"
        const { placeName } = await req.json();
        const config = {
            headers: {
                "Content-Type": "application/json",
                'X-Goog-API-Key': process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
                'X-Goog-FieldMask':"places.id,places.displayName,places.photos"
            }
        };
        const result = await axios.post(BASE_URL, {
            textQuery: placeName,
        }, config)
        
        const placeRefName = result.data.places[0].photos[0].name;
        const photoRefUrl = `https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`;
    
        return NextResponse.json(photoRefUrl);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error });
    }
}

