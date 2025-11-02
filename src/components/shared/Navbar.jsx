import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { Link, NavLink } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white border border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="BNP Logo"
            className="w-20 h-15 object-contain"
          />
          <div>
            <div className="text-lg font-semibold leading-tight">
              Bangladesh
            </div>
            <div className="text-lg font-semibold leading-tight">
              National Party - BNP
            </div>
          </div>
        </div>

        {/* Desktop nav - Centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-12 text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-800 pb-1"
                : "hover:text-gray-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-800 pb-1"
                : "hover:text-gray-600"
            }
          >
            Candidates
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-800 pb-1"
                : "hover:text-gray-600"
            }
          >
            News
          </NavLink>
          <NavLink
            to="/campaigns"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-green-800 pb-1"
                : "hover:text-gray-600"
            }
          >
            Campaigns
          </NavLink>
        </div>

        <div className="flex items-center gap-x-2">
  

          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 bg-green-700 text-white px-6 py-2.5 rounded hover:bg-green-800 transition-colors font-medium"
          >
            Join Us <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t flex flex-col space-y-4 p-6 absolute top-full left-0 w-full z-40 shadow-lg">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-green-600 font-medium" : "hover:text-green-600"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/candidates"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-green-600 font-medium" : "hover:text-green-600"
            }
          >
            Candidates
          </NavLink>
          <NavLink
            to="/news"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-green-600 font-medium" : "hover:text-green-600"
            }
          >
            News
          </NavLink>
          <NavLink
            to="/campaigns"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-green-600 font-medium" : "hover:text-green-600"
            }
          >
            Campaigns
          </NavLink>
 
        </div>
      )}
    </div>
  );
}
