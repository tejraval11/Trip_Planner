'use client'
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowDown,
  Globe2,
  Landmark,
  Plane,
  Send,
  TreePineIcon,
} from "lucide-react";
import React from "react";
import PopularCityCard from "./PopularCityCard";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const suggestions = [
  { title: "Create New Trip", icon: <Globe2 className="w-5 h-5" /> },
  { title: "Inspire me where to go", icon: <Plane className="w-5 h-5" /> },
  { title: "Discover hidden gems", icon: <Landmark className="w-5 h-5" /> },
  { title: "Adventure Destinations", icon: <TreePineIcon className="w-5 h-5" /> },
];

function Hero() {

    const {user} = useUser()
    const router = useRouter()

    const handleClick = () => {
        if(!user){
            router.push('/sign-in')
        }
        // handle if user is signed-in
        router.push('/create-new-trip')
    }

  return (
    <div className="mt-24 w-full flex flex-col items-center">
      {/* Top hero content (centered) */}
      <div className="max-w-4xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hi, I am your personal{" "}
          <span className="text-primary">AI Travel Planner</span>
        </h1>
        <p className="text-lg">
          Tell me where, and I'll handle the rest: Flights, Hotels, Trip
          Planning – All in seconds.
        </p>

        {/* Input Box */}
        <div className="border rounded-2xl p-4 relative">
          <Textarea
            placeholder="Create a trip for Paris from New York"
            className="w-full h-28 border-none bg-transparent focus-visible:ring-0 shadow-none resize-none"
          />
          <Button size={"icon"} className="absolute right-3 bottom-3" onClick={handleClick}>
            <Send className="w-6 h-6" />
          </Button>
        </div>

        {/* Suggestion list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.title}
              className="flex items-center gap-2 rounded-full p-3 border cursor-pointer 
                 hover:bg-primary hover:text-white transition-colors w-full justify-center"
            >
              {React.cloneElement(suggestion.icon, { className: "w-5 h-5" })}
              <h2 className="text-xs">{suggestion.title}</h2>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="flex flex-col items-center justify-center mt-14">
          <h2 className="my-7 text-center flex items-center gap-2">
            Not Sure Where To Start{" "}
            <strong className="flex items-center gap-1 font-semibold">
              See How It Works <ArrowDown className="inline-block" />
            </strong>
          </h2>

          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>

      {/* PopularCityCard now full width */}
      <div className="w-full">
        <PopularCityCard />
      </div>
    </div>
  );
}

export default Hero;
