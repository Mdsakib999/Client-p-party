import React from "react";

export default function LeaderCard({ candidate }) {
  return (
    <div className="group relative bg-white overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 max-w-[280px] mx-auto">
      {/* IMAGE */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={candidate.image}
          alt={candidate.name}
          className="w-96 h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-700/20 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative px-4 py-4 text-center">
        <h3 className="text-base font-semibold text-gray-900">
          {candidate.name}
        </h3>

        <p className="mt-1 text-sm text-green-700 font-medium">
          {candidate.position}
        </p>
      </div>

      {/* GREEN ACCENT BAR */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-600 to-green-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </div>
  );
}
