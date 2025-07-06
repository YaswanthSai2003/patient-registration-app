import React, { useState } from "react";
import { runSQL } from "../db";

function SQLConsole() {
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRun = async () => {
    setError(null);
    setResult(null);

    try {
      const res = await runSQL(sql);
      setResult(res);
    } catch (err) {
      console.error("SQL Error:", err);
      setError(err.message || "Invalid SQL");
    }
  };

  const formatHeader = (key) => {
    const map = {
      pid: "PID",
      insurancetype: "Payment Type",
      insuranceno: "Insurance Number",
      appointmentdate: "Appointme Date",
      createdat: "Created At",
    };
    return map[key] || key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const formatValue = (key, val) => {
    if (key === "createdat" && val) {
      return new Date(val).toLocaleString();
    }
    return val !== null ? String(val) : "-";
  };

  return (
    <div className="w-full h-full overflow-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">SQL Console</h2>

      <textarea
        className="w-full h-32 p-3 border rounded mb-4 font-mono shadow"
        placeholder="Enter SQL query..."
        value={sql}
        onChange={(e) => setSql(e.target.value)}
      />

      <button
        onClick={handleRun}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
      >
        Run
      </button>

      {error && (
        <div className="mt-4 bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded shadow">
          Error: {error}
        </div>
      )}

      {result?.rows?.length > 0 && (
        <div className="overflow-auto mt-6 max-h-[65vh] border rounded shadow bg-white">
          <table className="min-w-[900px] w-full text-sm text-left">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                {Object.keys(result.rows[0]).map((key) => (
                  <th key={key} className="p-2 border font-semibold text-gray-800">
                    {formatHeader(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  {Object.entries(row).map(([key, val]) => (
                    <td key={key} className="p-2 border whitespace-nowrap text-gray-700">
                      {formatValue(key, val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result?.rows?.length === 0 && (
        <p className="mt-4 text-gray-600 italic">No results found.</p>
      )}
    </div>
  );
}

export default SQLConsole;
