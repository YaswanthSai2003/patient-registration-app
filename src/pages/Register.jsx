import React, { useState, useEffect, useRef } from "react";
import { addPatient } from "../db.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const errorRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    aadhar: "",
    pan: "",
    address: "",
    insuranceType: "Self Pay",
    insuranceNo: "",
    history: "",
    department: "Cardiology",
    doctor: "",
    appointmentDate: "",
    status: "In Patient",
  });

  const [doctors, setDoctors] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const deptMap = {
      Cardiology: ["Dr. Kumar Goud", "Dr. Patel"],
      Neurology: ["Dr. Sharma", "Dr. Rao"],
    };
    setDoctors(deptMap[form.department] || []);
    if (!deptMap[form.department]) {
      setForm((f) => ({ ...f, doctor: "" }));
    }
  }, [form.department]);

  const handleChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const formElements = [...e.target.form.elements];
      const index = formElements.indexOf(e.target);
      formElements[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.age ||
      !form.contact.trim() ||
      !form.address.trim() ||
      !form.appointmentDate
    ) {
      setFormError("⚠️ Please fill all required fields before submitting.");
      setShowPreview(true);
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const rand = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    const pid = `HPT-${datePart}-${rand}`;
    const createdAt = new Date().toISOString();

    try {
      await addPatient({
        pid,
        ...form,
        age: parseInt(form.age),
        createdAt,
      });
      navigate("/dashboard/list");
    } catch (err) {
      console.error("Error adding patient:", err);
      setFormError("🚫 Registration failed. Check console for details.");
      setShowPreview(true);
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const renderPreview = () => (
    <div className="p-6 mt-6 bg-blue-50 border border-blue-300 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">Preview Patient Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {Object.entries(form).map(([key, val]) => (
          <div key={key}>
            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}: </span>
            <span className="text-gray-700">{val || "-"}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Confirm & Submit
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10 overflow-y-auto">
      <div className="max-w-7xl mx-auto bg-white p-10 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Register New Patient</h2>

        <form className="space-y-5" onKeyDown={handleKeyDown}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Full Name *</label>
              <input type="text" value={form.name} onChange={handleChange("name")} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-medium">Age *</label>
              <input type="number" value={form.age} onChange={handleChange("age")} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Gender *</label>
              <select value={form.gender} onChange={handleChange("gender")} className="w-full p-2 border rounded">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Contact *</label>
              <input type="text" value={form.contact} onChange={handleChange("contact")} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Aadhaar No.</label>
              <input type="text" value={form.aadhar} onChange={handleChange("aadhar")} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-medium">PAN No.</label>
              <input type="text" value={form.pan} onChange={handleChange("pan")} className="w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label className="font-medium">Address *</label>
            <input type="text" value={form.address} onChange={handleChange("address")} className="w-full p-2 border rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Payment Type *</label>
              <select value={form.insuranceType} onChange={handleChange("insuranceType")} className="w-full p-2 border rounded">
                <option>Self Pay</option>
                <option>Insurance</option>
              </select>
            </div>
            {form.insuranceType === "Insurance" && (
              <div>
                <label className="font-medium">Insurance No. *</label>
                <input type="text" value={form.insuranceNo} onChange={handleChange("insuranceNo")} className="w-full p-2 border rounded" />
              </div>
            )}
          </div>

          <div>
            <label className="font-medium">Medical History</label>
            <textarea value={form.history} onChange={handleChange("history")} className="w-full p-2 border rounded" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Department *</label>
              <select value={form.department} onChange={handleChange("department")} className="w-full p-2 border rounded">
                <option>Cardiology</option>
                <option>Neurology</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Doctor *</label>
              <select value={form.doctor} onChange={handleChange("doctor")} className="w-full p-2 border rounded">
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-medium">Appointment Date *</label>
              <input type="date" value={form.appointmentDate} onChange={handleChange("appointmentDate")} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="font-medium">Status *</label>
              <select value={form.status} onChange={handleChange("status")} className="w-full p-2 border rounded">
                <option>In Patient</option>
                <option>Out Patient</option>
                <option>Discharged</option>
                <option>Deceased</option>
              </select>
            </div>
          </div>

          {/* Preview Button */}
          {!showPreview && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Preview
              </button>
            </div>
          )}
        </form>

        {/* Error message box (floating) */}
        {showPreview && formError && (
          <div ref={errorRef} className="flex justify-center mt-6">
            <div className="bg-red-100 text-red-700 border border-red-300 px-6 py-3 rounded-lg text-sm shadow-md text-center max-w-xl w-full transition">
              {formError}
            </div>
          </div>
        )}

        {/* Preview */}
        {showPreview && renderPreview()}
      </div>
    </div>
  );
}
