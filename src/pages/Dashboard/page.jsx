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
import { useUserInfoQuery } from "../../redux/features/auth/auth.api";

const Dashboard = () => {
  const location = useLocation();
  const { data } = useUserInfoQuery();
  const userRole = data?.data?.role;

  const allSidebarItems = [
    {
      path: "/dashboard/overview",
      label: "Overview",
      Icon: FaHome,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard/create-candidate",
      label: "Create Candidate",
      Icon: FaUserPlus,
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
      path: "/dashboard/manage-blogs",
      label: "Manage Blogs",
      Icon: FaNewspaper,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      path: "/dashboard/donate",
      label: "Donate",
      Icon: FaDonate,
      roles: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
    {
      path: "/dashboard",
      label: "Manage Account",
      Icon: FaUser,
      roles: ["SUPER_ADMIN", "ADMIN", "USER"],
    },
  ];

  const sidebarItems = allSidebarItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
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
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
