import { useState, useEffect, useRef } from "react";
import { X, Menu, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);

  const userMenuRef = useRef(null);
  const [logout] = useLogoutMutation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu on outside click
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
    toast.success(
      <h1 className="text-center font-serif">Logged out successfully</h1>,
      {
        position: "bottom-right",
      },
    );
    setShowUserMenu(false);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/candidates", label: "Candidates" },
    { path: "/frame-editor", label: "Photo Frame" },
    { path: "/vision", label: "Vision" },
    { path: "/campaigns", label: "Campaigns" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="hidden sm:block">
              <div className="text-base sm:text-lg font-bold leading-tight tracking-widest text-gray-900 group-hover:text-green-700 transition-colors">
                bnpcandidates
              </div>
            </div>
            <div className="sm:hidden">
              <div className="text-sm font-bold text-gray-900 tracking-widest group-hover:text-green-700 transition-colors">
                bnpcandidates
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 font-medium text-sm xl:text-base transition-all duration-200 rounded-lg group ${
                    isActive
                      ? "text-green-700"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop User Section */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                >
                  {user.photos && user.photos.length > 0 && !imageError ? (
                    <img
                      src={user.photos[0]}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-green-700 ring-offset-2 group-hover:ring-green-600 transition-all"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-semibold ring-2 ring-green-700 ring-offset-2 group-hover:ring-green-600 transition-all">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-5 py-4 text-white">
                      <p className="font-semibold truncate text-base">
                        {user.name}
                      </p>
                      <p className="text-xs text-green-100 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors group"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-green-700 transition-colors" />
                        <span className="font-medium">BNP</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                      >
                        <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-slideDown">
          <div className="px-4 py-6 space-y-2 max-w-7xl mx-auto max-h-[calc(100vh-5rem)] overflow-y-auto">
            {/* User Info in Mobile */}
            {user && (
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
                {user.photos && user.photos.length > 0 && !imageError ? (
                  <img
                    src={user.photos[0]}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-green-700"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-semibold text-lg ring-2 ring-green-700">
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

            {/* Navigation Links */}
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* User Actions in Mobile */}
            {user ? (
              <div className="pt-4 space-y-2 border-t border-gray-200 mt-4">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  <LayoutDashboard className="w-5 h-5 text-gray-400" />
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5 text-red-400" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-md"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 100vh;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
