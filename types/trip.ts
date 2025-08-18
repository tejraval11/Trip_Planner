// ✅ Coordinates
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

// ✅ Hotels
export interface Hotel {
  hotel_name: string;
  hotel_address: string;
  price_per_night: string;
  hotel_image_url: string;
  geo_coordinates: GeoCoordinates;
  rating: number;
  description: string;
}

// ✅ Activities
export interface Activity {
  place_name: string;
  place_details: string;
  place_image_url: string;
  geo_coordinates: GeoCoordinates;
  place_address: string;
  ticket_pricing: string;
  time_travel_each_location: string;
  best_time_to_visit: string;
}

// ✅ Itinerary (per day)
export interface DayItinerary {
  day: number;
  day_plan: string;
  best_time_to_visit_day: string;
  activities: Activity[];
}

// ✅ Trip plan info
export interface TripPlan {
  destination: string;
  duration: string;
  origin: string;
  budget: string;
  group_size: string;
  hotels: Hotel[];
}

// ✅ Whole Trip object
export interface Trip {
  trip_plan: TripPlan;
  itinerary: DayItinerary[];
}
