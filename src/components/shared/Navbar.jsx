import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { Link, NavLink } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "../../redux/features/auth/auth.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const { data: userInfo } = useUserInfoQuery();
  const user = userInfo?.data;

  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [imageError, setImageError] = useState(false);

  const userMenuRef = useRef(null);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
    toast.success(
      <h1 className="text-center font-serif">Logged out successfully</h1>,
      {
        position: "bottom-right",
      }
    );
    setShowUserMenu(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="/logo.png"
              alt="BNP Logo"
              className="w-16 h-16 object-contain"
            />
            <div className="hidden lg:block">
              <div className="text-base font-bold leading-tight text-gray-900">
                Bangladesh
              </div>
              <div className="text-base font-bold leading-tight text-gray-900">
                National Party - BNP
              </div>
            </div>
            <div className="lg:hidden">
              <div className="text-sm font-bold text-gray-900">BNP</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive
                  ? "text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-gray-700 hover:text-green-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive
                  ? "text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-gray-700 hover:text-green-700"
                }`
              }
            >
              Candidates
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive
                  ? "text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-gray-700 hover:text-green-700"
                }`
              }
            >
              News
            </NavLink>
            <NavLink
              to="/activities"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive
                  ? "text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-gray-700 hover:text-green-700"
                }`
              }
            >
              Activities
            </NavLink>
            <NavLink
              to="/campaigns"
              className={({ isActive }) =>
                `font-medium transition-colors ${isActive
                  ? "text-green-700 border-b-2 border-green-700 pb-1"
                  : "text-gray-700 hover:text-green-700"
                }`
              }
            >
              Campaigns
            </NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {user.photos && user.photos.length > 0 && !imageError ? (
                    <img
                      src={user.photos[0]}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-green-700"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-semibold shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Dashboard
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-lg hover:bg-green-800 transition-all font-medium shadow-sm"
                >
                  Login <HiArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <AiOutlineClose size={24} className="text-gray-900" />
            ) : (
              <AiOutlineMenu size={24} className="text-gray-900" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-1 max-w-7xl mx-auto">
            {user && (
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
                {user.photos && user.photos.length > 0 && !imageError ? (
                  <img
                    src={user.photos[0]}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-700"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            )}

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/candidates"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Candidates
            </NavLink>
            <NavLink
              to="/news"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              News
            </NavLink>
            <NavLink
              to="/campaigns"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Campaigns
            </NavLink>
            <NavLink
              to="/activities"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Activities
            </NavLink>

            <div className="pt-4 space-y-2">
              <button className="w-full flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium shadow-sm">
                Donate <HiArrowRight className="w-5 h-5" />
              </button>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-5 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="cursor-pointer w-full text-start px-5 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-800 transition-colors font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
