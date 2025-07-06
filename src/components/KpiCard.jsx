import React from "react";

export default function KpiCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow text-center">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
