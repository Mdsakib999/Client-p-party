import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  FaHome,
  FaUserPlus,
  FaPen,
  FaUsers,
  FaNewspaper,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useUserInfoQuery } from "../../redux/features/auth/auth.api";
import { SquareActivity, SquareKanban } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const { data } = useUserInfoQuery();
  const userRole = data?.data?.role;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allSidebarItems = [
    { path: "/dashboard/overview", label: "Overview", Icon: FaHome, roles: ["SUPER_ADMIN", "ADMIN"] },
    { path: "/dashboard", label: "Manage Account", Icon: FaUser, roles: ["SUPER_ADMIN", "ADMIN", "USER"] },
    { path: "/dashboard/create-candidate", label: "Create Candidate", Icon: FaUserPlus, roles: ["SUPER_ADMIN", "ADMIN"] },
    { path: "/dashboard/add-activity", label: "Add Activity", Icon: SquareActivity, roles: ["SUPER_ADMIN", "ADMIN"] },
    { path: "/dashboard/create-news-article", label: "Create News Article", Icon: FaPen, roles: ["SUPER_ADMIN", "ADMIN"] },
    { path: "/dashboard/manage-candidates", label: "Manage Candidates", Icon: FaUsers, roles: ["SUPER_ADMIN", "ADMIN"] },
    { path: "/dashboard/manage-news-articles", label: "Manage News Articles", Icon: FaNewspaper, roles: ["SUPER_ADMIN", "ADMIN"] },
    { path: "/dashboard/manage-activity", label: "Manage Activity", Icon: SquareKanban, roles: ["SUPER_ADMIN", "ADMIN"] },
  ];

  const sidebarItems = allSidebarItems.filter((item) => item.roles.includes(userRole));

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-emerald-700">Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${location.pathname === item.path
                ? "bg-emerald-100 text-emerald-700 shadow-sm"
                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
            >
              <item.Icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <header className="lg:hidden bg-white shadow-sm sticky top-0 z-30 flex items-center gap-4 p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaBars size={24} />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8 min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;