import { useEffect, useState } from "react";
import { getPatients } from "../db";

export default function Dashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients().then((data) => setPatients(data));
  }, []);

  // Count logic
  const total = patients.length;
  const inPatients = patients.filter(p => p.status === "In Patient").length;
  const outPatients = patients.filter(p => p.status === "Out Patient").length;
  const discharged = patients.filter(p => p.status === "Discharged").length;
  const deceased = patients.filter(p => p.status === "Deceased").length;

  const insurance = patients.filter(p => p.insurancetype?.toLowerCase() === "insurance").length;
  const selfPay = patients.filter(p => p.insurancetype?.toLowerCase() === "self pay").length;

  const today = new Date().toISOString().slice(0, 10); // e.g., "2025-07-06"
  const todayAppointments = patients.filter(p => p.appointmentdate?.startsWith(today)).length;

  return (
    <div className="p-6 space-y-8">
      {/* Patient Summary Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">👥 Patient Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card title="Total Patients" count={total} />
          <Card title="In Patients" count={inPatients} />
          <Card title="Out Patients" count={outPatients} />
          <Card title="Discharged" count={discharged} />
          <Card title="Deceased" count={deceased} />
        </div>
      </section>

      {/* Payment Type Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">💳 Payment Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Insurance" count={insurance} />
          <Card title="Self Pay" count={selfPay} />
        </div>
      </section>

      {/* Today's Appointments Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">📅 Today's Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Appointments Today" count={todayAppointments} />
        </div>
      </section>
    </div>
  );
}

function Card({ title, count }) {
  return (
    <div className="bg-white p-5 shadow rounded border border-gray-100 hover:shadow-md transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  );
}
