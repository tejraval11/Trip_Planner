'use client'

import { Timeline } from "@/components/ui/timeline"
import { MapPin, Clock, Wallet, Star, Camera, Ticket, Calendar } from "lucide-react"
import { PlaceImage } from "./PlaceImage"
import { useTripDetailInfo } from "@/app/Provider"
import { useEffect, useState } from "react"

// ✅ Import types
import { Trip, TripPlan } from "@/types/trip"

function Itinerary() {
  const { TripDetailInfo } = useTripDetailInfo()
  const [TripDetails, setTripDetails] = useState<Trip | null>(null)

  useEffect(() => {
    if (TripDetailInfo) {
      setTripDetails(TripDetailInfo)
    }
  }, [TripDetailInfo])

  if (!TripDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Loading trip details...
      </div>
    )
  }

  const timelineData = [
    {
      title: "Hotels",
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Recommended Hotels</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {(TripDetails.trip_plan.hotels ?? []).map((hotel, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              >
                <PlaceImage
                  placeName={hotel.hotel_name}
                  className="w-full h-48 object-cover"
                  alt={hotel.hotel_name}
                />

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-primary">{hotel.hotel_name}</h4>
                    {hotel.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    )}
                  </div>

                  {hotel.description && (
                    <p className="text-muted-foreground text-sm mb-3">{hotel.description}</p>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{hotel.hotel_address}</span>
                    </div>
                    {hotel.price_per_night && (
                      <div className="flex items-center gap-2 text-sm">
                        <Wallet className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-600">
                          {hotel.price_per_night} per night
                        </span>
                      </div>
                    )}
                  </div>

                  <button className="mt-4 w-full py-2 text-sm font-medium rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition">
                    View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    ...(TripDetails.itinerary ?? []).map((day) => ({
      title: `Day ${day.day}`,
      content: (
        <div className="space-y-6">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-primary">{day.day_plan}</h3>
            </div>
            {day.best_time_to_visit_day && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Best time: {day.best_time_to_visit_day}</span>
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {(day.activities ?? []).map((activity, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg shadow-sm overflow-hidden"
              >
                <PlaceImage
                  placeName={activity.place_name}
                  className="w-full h-48 object-cover"
                  alt={activity.place_name}
                />

                <div className="p-4">
                  <h4 className="text-lg font-semibold text-primary mb-2">{activity.place_name}</h4>
                  {activity.place_details && (
                    <p className="text-muted-foreground text-sm mb-4">{activity.place_details}</p>
                  )}

                  <div className="space-y-3 text-sm">
                    {activity.place_address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{activity.place_address}</span>
                      </div>
                    )}
                    {activity.ticket_pricing && (
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-600">{activity.ticket_pricing}</span>
                      </div>
                    )}
                    {activity.time_travel_each_location && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Duration: {activity.time_travel_each_location}
                        </span>
                      </div>
                    )}
                    {activity.best_time_to_visit && (
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">
                          Best time: {activity.best_time_to_visit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    })),
  ]

  return (
    <div className="min-h-screen bg-background">
      <Timeline data={timelineData} TripDetails={TripDetails} />
    </div>
  )
}

export default Itinerary
