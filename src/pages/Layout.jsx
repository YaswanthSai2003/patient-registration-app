import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUserPlus,
  FaList,
  FaThLarge,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#f1f5f9]">
      {/* Topbar */}
      <header className="h-20 bg-gradient-to-r from-[#0f172a] to-[#1d4ed8] text-white shadow-md flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/hospital.jpg"
            alt="Hospital Logo"
            className="h-12 w-12 rounded-md shadow-md"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            NovaMed Multispeciality Hospital
          </h1>
        </div>
        <img
          src="/doctor.jpg"
          alt="Doctor Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
        />
      </header>

      {/* Below Topbar: Sidebar + Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? "w-20" : "w-64"
          } transition-all duration-300 bg-gradient-to-b from-[#1e293b] to-[#1d4ed8] text-white shadow-md flex flex-col`}
        >
          {/* Collapse Header */}
          <div className="flex items-center justify-between p-4 border-b border-blue-700">
            {!collapsed && (
              <span className="text-lg font-semibold">Menu</span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:text-red-400 transition"
            >
              <FaBars />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
            {[
              { path: "/dashboard", label: "Dashboard", icon: <FaThLarge /> },
              {
                path: "/dashboard/register",
                label: "Register Patient",
                icon: <FaUserPlus />,
              },
              {
                path: "/dashboard/list",
                label: "Patient List",
                icon: <FaList />,
              },
              {
                path: "/dashboard/sql",
                label: "SQL Console",
                icon: <FaFileAlt />,
              },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-md transition-all ${
                  isActive(item.path)
                    ? "bg-white text-blue-800 font-semibold"
                    : "hover:bg-blue-800"
                }`}
              >
                {item.icon}
                {!collapsed && item.label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-blue-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
            >
              <FaSignOutAlt />
              {!collapsed && "Logout"}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
