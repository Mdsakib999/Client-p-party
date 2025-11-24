import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto py-12 px-6 md:px-0">
        {/* ✅ Company Info */}
        <div className="space-y-3 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img
              src="/logo.png"
              alt="BNP Logo"
              className="w-20 h-15 object-contain"
            />
            <div>
              <div className="text-lg font-semibold leading-tight text-white">
                Bangladesh
              </div>
              <div className="text-lg font-semibold leading-tight text-white">
                National Party - BNP
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Bangladesh National Party (BNP) is committed to democratic values,
            national unity, and the welfare of the people.
          </p>
        </div>

        {/* ✅ Navigation */}
        <div className="space-y-4 text-center">
          <h4 className="text-base sm:text-lg font-semibold text-white uppercase text-center">
            Navigation
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/candidates">Candidates</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/campaigns">Campaigns</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* ✅ Support (New Column instead of Recent Project) */}
        <div className="space-y-4 text-center">
          <h4 className="text-base sm:text-lg font-semibold text-white uppercase text-center">
            Resources
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              Our Leaders
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Vision
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* ✅ Subscribe + Social Icons */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-base sm:text-lg font-semibold text-white uppercase">
            Stay Updated
          </h4>

          {/* Subscribe Form */}
          <form className="w-full max-w-sm mx-auto md:mx-0">
            <div className="flex items-center bg-gray-900 rounded-full shadow-md overflow-hidden border border-gray-700">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-transparent text-gray-100 placeholder-gray-500 px-5 py-3 text-sm focus:ring-0 focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 cursor-pointer bg-green-800 hover:bg-green-900 text-white px-5 py-3 font-semibold text-sm rounded-full transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-xs sm:text-sm text-gray-400 px-4">
        © {new Date().getFullYear()} Bangladesh Nationalist Party - BNP. All rights reserved.
      </div>
    </footer>
  );
}
