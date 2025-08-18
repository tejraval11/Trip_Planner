import { suggestions } from '@/app/_components/Hero'
import React from 'react'

function EmptyBoxState({onSelectOption} : any) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center">
        Start Planning a new <strong className="text-primary">Trip</strong> Using AI
      </h2>
      <p className="text-center text-gray-400 mt-2">
        Discover personalized destinations, group sizes, budgets, and more.
      </p>

      <div className="grid grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.title}
            onClick = {() => onSelectOption(suggestion.title)}
            className="flex items-center gap-3 rounded-2xl p-5 border bg-white 
                       shadow-md cursor-pointer transition-all duration-300 
                       hover:shadow-lg hover:border-primary hover:bg-primary/5"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
              {React.cloneElement(suggestion.icon, { className: "w-5 h-5" })}
            </div>
            <h2 className="text-lg font-medium text-gray-700 group-hover:text-primary">
              {suggestion.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmptyBoxState
