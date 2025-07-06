import { NavLink, useNavigate } from "react-router-dom";
import logo from "/hospital.jpg";
import { FiHome, FiUserPlus, FiList, FiDatabase, FiLogOut, FiMenu } from "react-icons/fi";

export default function Sidebar({ collapsed, toggle }) {
  const navItems = [
    { icon: <FiHome />, to: "/dashboard", label: "Dashboard" },
    { icon: <FiUserPlus />, to: "/dashboard/register", label: "Register" },
    { icon: <FiList />, to: "/dashboard/list", label: "Patients" },
    { icon: <FiDatabase />, to: "/dashboard/sql", label: "SQL" },
  ];

  return (
    <aside className={`bg-[#001F3F] text-[#F0F4F8] flex flex-col shadow-2xl
      transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>
      <div className="flex items-center justify-between p-4 border-b border-[#004466]">
        {!collapsed && <img src={logo} alt="Logo" className="w-12 h-12 rounded-lg shadow-md" />}
        <button onClick={toggle} className="text-[#F0F4F8] focus:outline-none">
          <FiMenu size={24} />
        </button>
      </div>
      <nav className="flex-1 px-2 space-y-1 mt-4">
        {navItems.map(({ icon, to, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive ? "bg-[#00BFA6] text-[#001F3F]" : "hover:bg-[#003366]/50"
            }`}
          >
            <span className="text-xl">{icon}</span>
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-[#004466]">
        <button className="flex items-center gap-2 w-full justify-center p-3 bg-[#00BFA6] rounded-lg hover:bg-[#00a590] transition-colors">
          <FiLogOut /> {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}
