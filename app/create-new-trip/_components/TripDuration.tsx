'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface TripDurationProps {
  onSelectedOption: (value: string) => void
}

const TripDuration: React.FC<TripDurationProps> = ({ onSelectedOption }) => {
  const [days, setDays] = useState<number>(3) // default 3 days

  const decreaseDays = () => {
    if (days > 1) setDays(days - 1)
  }

  const increaseDays = () => {
    setDays(days + 1)
  }

  return (
    <div className="mt-3 p-4 bg-white rounded-2xl shadow-md text-center">
      <h3 className="text-lg font-semibold mb-4">
        How many days do you want to travel?
      </h3>
      <div className="flex items-center justify-center space-x-6 mb-4">
        <Button
          variant="outline"
          onClick={decreaseDays}
          className="rounded-full w-10 h-10"
        >
          -
        </Button>
        <span className="text-xl font-bold">{days} Days</span>
        <Button
          variant="outline"
          onClick={increaseDays}
          className="rounded-full w-10 h-10"
        >
          +
        </Button>
      </div>
      <Button
        onClick={() => onSelectedOption(`Trip Duration:${days}`)}
        className="bg-primary hover:bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Confirm
      </Button>
    </div>
  )
}

export default TripDuration
