import { Link, Outlet, useLocation } from "react-router";
import {
  FaHome,
  FaUserPlus,
  FaPen,
  FaUsers,
  FaNewspaper,
  FaDonate,
  FaUser,
} from "react-icons/fa";

const Dashboard = () => {
  const location = useLocation();

  const sidebarItems = [
    { path: "/dashboard", label: "Overview", Icon: FaHome },
    {
      path: "/dashboard/create-candidate",
      label: "Create Candidate",
      Icon: FaUserPlus,
    },
    {
      path: "/dashboard/create-blog",
      label: "Create Blog/Article",
      Icon: FaPen,
    },
    {
      path: "/dashboard/manage-candidates",
      label: "Manage Candidates",
      Icon: FaUsers,
    },
    {
      path: "/dashboard/manage-blogs",
      label: "Manage Blogs",
      Icon: FaNewspaper,
    },
    {
      path: "/dashboard/donate",
      label: "Donate",
      Icon: FaDonate,
    },
    {
      path: "/dashboard/manage-account",
      label: "Manage Account",
      Icon: FaUser,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={` px-4 py-2 flex items-center hover:bg-gray-200 ${
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
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
