import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  FaHome,
  FaUserPlus,
  FaPen,
  FaUsers,
  FaNewspaper,
  FaDonate,
  FaUser,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import { useUserInfoQuery } from "../../redux/features/auth/auth.api";
import { SquareActivity, SquareKanban } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();
  const { data } = useUserInfoQuery();
  const userRole = data?.data?.role;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allSidebarItems = [
    {
      path: "/dashboard/overview",
      label: "Overview",
      Icon: FaHome,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard",
      label: "Manage Account",
      Icon: FaUser,
      roles: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      path: "/dashboard/create-candidate",
      label: "Create Candidate",
      Icon: FaUserPlus,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard/add-activity",
      label: "Add Activity",
      Icon: SquareActivity,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard/create-news-article",
      label: "Create News Article",
      Icon: FaPen,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard/manage-candidates",
      label: "Manage Candidates",
      Icon: FaUsers,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard/manage-news-articles",
      label: "Manage News Articles",
      Icon: FaNewspaper,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard/manage-activity",
      label: "Manage Activity",
      Icon: SquareKanban,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
  ];

  const sidebarItems = allSidebarItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          {/* Close Arrow (Mobile Only) */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 p-2"
          >
            <FaArrowLeft size={20} />
          </button>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`px-4 py-2 flex items-center hover:bg-gray-200 transition-colors ${
                location.pathname === item.path ? "bg-gray-200" : ""
              }`}
            >
              <item.Icon className="mr-2" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header with Toggle */}
        <div className="md:hidden bg-white p-4 shadow-sm flex items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900 mr-4"
          >
            <FaBars size={24} />
          </button>
          <span className="font-bold text-lg">Dashboard</span>
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
