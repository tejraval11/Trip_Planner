import React from 'react'
import ChatBot from './_components/ChatBot'
import Itinerary from './_components/Itinerary'

function page() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
      {/* ChatBot */}
      <div>
      <ChatBot/>
      </div>
      <div className='col-span-2'>
        <Itinerary />
      </div>

      {/* Trip Details */}
    </div>
  )
}

export default page
