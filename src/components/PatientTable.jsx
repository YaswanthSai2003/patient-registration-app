import React from 'react';

export default function PatientTable({ patients }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-gray-100">
            {[
              'PID','Name','Age','Gender','Contact','Aadhaar','PAN',
              'Insurance','Ins. No','Dept','Doctor','Appt. Date','Status','Created At'
            ].map(h => (
              <th key={h} className="px-3 py-2 text-left text-sm font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id} className="border-t last:border-b">
              <td className="px-3 py-2 text-sm">{p.pid}</td>
              <td className="px-3 py-2 text-sm">{p.name}</td>
              <td className="px-3 py-2 text-sm">{p.age}</td>
              <td className="px-3 py-2 text-sm">{p.gender}</td>
              <td className="px-3 py-2 text-sm">{p.contact}</td>
              <td className="px-3 py-2 text-sm">{p.aadhar}</td>
              <td className="px-3 py-2 text-sm">{p.pan}</td>
              <td className="px-3 py-2 text-sm">{p.insuranceType}</td>
              <td className="px-3 py-2 text-sm">{p.insuranceNo}</td>
              <td className="px-3 py-2 text-sm">{p.department}</td>
              <td className="px-3 py-2 text-sm">{p.doctor}</td>
              <td className="px-3 py-2 text-sm">{p.appointmentDate}</td>
              <td className="px-3 py-2 text-sm">{p.status}</td>
              <td className="px-3 py-2 text-sm">{p.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
