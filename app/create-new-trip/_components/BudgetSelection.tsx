import React from "react";

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💸",
    color: "bg-purple-100 text-purple-600",
  },
];

function BudgetSelection({ onSelectedOption }: { onSelectedOption: (v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
      {SelectBudgetOptions.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center text-center p-4 
                     rounded-xl border bg-white shadow-sm cursor-pointer transition-all duration-200 
                     hover:border-primary hover:bg-primary/5"
          onClick={() => onSelectedOption(item.title + ":" + item.desc)}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${item.color}`}
          >
            {item.icon}
          </div>
          <h3 className="mt-2 font-medium text-gray-700">{item.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default BudgetSelection;
