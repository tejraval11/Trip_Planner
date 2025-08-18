'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSize from './GroupSize'
import BudgetSelection from './BudgetSelection'
import TripDuration from './TripDuration'
import FinalUi from './FinalUi'
import SpecialRequirements from './SpecialRequirements'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useTripDetailInfo, useUserDetail } from '@/app/Provider'
import { v4 as uuidv4 } from 'uuid';
type Message = {
  role: string;
  content: string;
  ui?: string;
}

export type TripPlan = {
  destination: string;
  duration: string;
  origin: string;
  budget: string;
  group_size: string;
  hotels: any[];
  itinerary: any[];
}

function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripPlan, setTripPlan] = useState<any>({});
  const SaveTripDetails = useMutation(api.tripdetails.CreateNewTrip);
  const {userDetail, setUserDetail} = useUserDetail()
  const {TripDetailInfo, setTripDetailInfo} = useTripDetailInfo()
  const handleClick = async (input?: string) => {
    const value = input ?? userInput;
    if (!value) return;

    setLoading(true);

    const newMessage: Message = {
      role: "user",
      content: value,
    };

    setUserInput("");
    setMessages((prev) => [...prev, newMessage]);

    try {
      const result = await axios.post('/api/ai-modal', {
        messages: [...messages, newMessage],
        isFinal: isFinal
      });

      console.log("Trip Plan", result.data);

     !isFinal && setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.data.resp,
          ui: result.data.ui,
        },
      ]);

      if(isFinal) {
        setTripPlan(result.data.trip_plan);
        setTripDetailInfo(result.data);
        const tripId = uuidv4();
        await SaveTripDetails({
          tripDetails: result.data.trip_plan,
          uid: userDetail?._id,
          tripId: tripId,
          })
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRenderUi = (ui: string | undefined) => {
    if (ui === 'budget') {
      return (
        <BudgetSelection
          onSelectedOption={(v: string) => handleClick(v)}
        />
      )
    } else if (ui === 'groupSize') {
      return (
        <GroupSize
          onSelectedOption={(v: string) => handleClick(v)}
        />
      )
    } else if (ui === 'TripDuration') {
      return (
        <TripDuration
          onSelectedOption={(v: string) => handleClick(v)}
        />
      )
    }
    else if (ui === 'special') {
      return (
        <SpecialRequirements/>
      )
    }
      else if(ui === 'final') {
        return (
          <FinalUi isReady={!!tripPlan.destination} />
        )
      }
    return null
  }

useEffect(() => {
  if (messages[messages.length - 1]?.ui === 'final') {
    setIsFinal(true);
    setUserInput("Ok great!");
  }
}, [messages]); 

useEffect(() => {
  if (isFinal && userInput ) {
      handleClick();
  }
}, [isFinal]);

  return (
    <div className='flex flex-col h-[85vh]'>
      {messages.length == 0 &&
        <EmptyBoxState onSelectOption={(v: string) => handleClick(v)} />
      }

      {/* Display Messages */}
      <section className='flex-1 overflow-y-auto p-4'>
        {messages.map((message, index) => (
          message.role === "user" ?
            <div className='flex justify-end mt-2' key={index}>
              <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                {message.content}
              </div>
            </div> :
            <div className='flex justify-start mt-2' key={index}>
              <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                {message.content}
                {handleRenderUi(message.ui) ?? ""}
              </div>
            </div>
        ))}

        {loading && (
          <div className='flex justify-start mt-2'>
            <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
              <Loader className='animate-spin' />
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Start Typing Here..."
            className="w-full h-28 border-none bg-transparent focus-visible:ring-0 shadow-none resize-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            size={"icon"}
            className="absolute right-3 bottom-3"
            onClick={() => handleClick()}
          >
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </section>
    </div>
  )
}

export default ChatBot
