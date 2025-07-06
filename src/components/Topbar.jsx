import React from "react";
import avatar from "/doctor.jpg";
import { FiBell, FiSettings } from "react-icons/fi";

export default function Topbar({ pageTitle }) {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-[#F9FAFB] border-b border-gray-300 shadow-sm sticky top-0 z-50 transition-shadow">
      <h2 className="text-2xl font-semibold text-[#001F3F]">{pageTitle}</h2>
      <div className="flex items-center gap-6">
        <button className="p-2 rounded-full hover:bg-[#00BFA615] transition-colors">
          <FiSettings size={20} className="text-[#00BFA6]" />
        </button>
        <button className="relative p-2 rounded-full hover:bg-[#00BFA615] transition-colors">
          <FiBell size={20} className="text-[#00BFA6]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <img
          src={avatar}
          alt="Doctor"
          className="w-10 h-10 rounded-lg border-2 border-[#00BFA6] shadow transition-transform hover:scale-105"
        />
      </div>
    </header>
  );
}
