import React from "react";

function SpecialRequirements() {
  return (
    <div className="mt-6 p-5 border rounded-2xl bg-white shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        Any <span className="text-primary">Special Requirements</span>?
      </h2>
      <p className="text-center text-gray-400 mt-2 text-sm">
        (e.g., dietary needs, accessibility, pets, kids, specific activities…)
      </p>
    </div>
  );
}

export default SpecialRequirements;
