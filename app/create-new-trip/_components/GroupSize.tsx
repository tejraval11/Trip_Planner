

export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    icon: "🧍‍♂️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    icon: "👫",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    icon: "⛺",
    people: "5 to 10 People",
  },
];

function GroupSize({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      {SelectTravelesList.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center text-center w-full px-4 py-5 
                     rounded-xl border bg-white shadow-sm cursor-pointer transition-all duration-200 
                     hover:border-primary hover:bg-primary/5"
          onClick={() => {onSelectedOption(item.title  + ":" + item.people)}}
        >
          <span className="text-lg">{item.icon}</span>
          <span className="font-medium text-gray-700 mt-2">{item.title}</span>
          <span className="text-xs text-gray-500">{item.people}</span>
        </div>
      ))}
    </div>
  );
}

export default GroupSize;  