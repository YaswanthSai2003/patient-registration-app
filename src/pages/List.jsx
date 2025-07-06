import React, { useEffect, useState } from "react";
import { getPatients } from "../db";

function List() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPatients().then((data) => {
      console.log("Fetched patients:", data);
      setPatients(data || []);
    });
  }, []);

  const filtered = patients.filter((p) => {
    if (!p || !p.name || !p.pid) return false;
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.pid.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Patient List</h2>

      <input
        type="text"
        placeholder="Search by Name or PID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-full"
      />

      {filtered.length === 0 ? (
        <p className="text-gray-600">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">PID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Contact</th>
                <th className="border p-2">Aadhaar</th>
                <th className="border p-2">PAN</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Payment Type</th>
                <th className="border p-2">Insurance No</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Doctor</th>
                <th className="border p-2">Appointment Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i} className="border-t">
                  <td className="border p-2">{p.pid}</td>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.age}</td>
                  <td className="border p-2">{p.gender}</td>
                  <td className="border p-2">{p.contact}</td>
                  <td className="border p-2">{p.aadhar}</td>
                  <td className="border p-2">{p.pan}</td>
                  <td className="border p-2">{p.address || "-"}</td>
                  <td className="border p-2">{p.insurancetype || "-"}</td>
                  <td className="border p-2">{p.insuranceno || "-"}</td>
                  <td className="border p-2">{p.department}</td>
                  <td className="border p-2">{p.doctor}</td>
                  <td className="border p-2">{p.appointmentdate || "-"}</td>
                  <td className="border p-2">{p.status}</td>
                  <td className="border p-2">
                    {p.createdat
                    ? new Date(p.createdat).toLocaleString()
                    : "-"}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default List;