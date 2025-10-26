import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink, useLocation } from "react-router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setShowTopBar(false);
      return;
    }

    const banner = document.getElementById("banner-section");
    if (!banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio <= 0.6) {
          setShowTopBar(false);
        } else {
          setShowTopBar(true);
        }
      },
      { threshold: [0, 0.6] }
    );

    observer.observe(banner);

    return () => {
      if (banner) observer.unobserve(banner);
    };
  }, [location.pathname]);

  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar */}
      <div
        className={`bg-white border-b-4 transition-all duration-500 overflow-hidden 
        ${showTopBar ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-[14px] sm:text-[16px]">
            <span className="text-dark">EKSPRESS@MAIL.COM</span>
            <span>+1 (555) 000-0000</span>
          </div>
          <button className="bg-yellow-400 text-black w-[120px] sm:w-[150px] h-[40px] sm:h-[44px] rounded hover:bg-yellow-500 text-[14px] sm:text-[16px]">
            GET QUOTE
          </button>
        </nav>
      </div>

      {/* Main nav */}
      <div className="bg-black relative z-50">
        <nav className="max-w-7xl mx-auto text-white p-4 -mt-1 flex justify-between items-center h-[94px] relative">
          {/* Logo */}
          <div className="text-xl font-semibold">
            <Link to="/">EKSPRESS</Link>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex space-x-6 text-[14px] sm:text-[16px]">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-yellow-400" : "hover:border-b-2 "}>HOME</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-400" : "hover:border-b-2"}>ABOUT US</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? "text-yellow-400" : "hover:border-b-2"}>SERVICES</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-400" : "hover:border-b-2"}>CONTACT US</NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white relative z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden bg-black text-white flex flex-col space-y-4 p-4 absolute top-[94px] left-0 w-full z-40">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>HOME</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>ABOUT US</NavLink>
            <NavLink to="/services" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>SERVICES</NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-yellow-400" : "hover:text-yellow-400"}>CONTACT US</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
