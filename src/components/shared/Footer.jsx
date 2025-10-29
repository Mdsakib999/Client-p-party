import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto py-12 px-6 md:px-12">
        {/* ✅ Company Info */}
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase">
            Ekspress
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            At FastGo, we believe in providing our clients with personalized and
            efficient logistics solutions that meet their unique needs.
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
              <Link to="">About Us</Link>
            </li>
            <li>
              <Link to="">Services</Link>
            </li>
            <li>
              <Link to="">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* ✅ Support (New Column instead of Recent Project) */}
        <div className="space-y-4 text-center">
          <h4 className="text-base sm:text-lg font-semibold text-white uppercase text-center">
            Support
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              Help Center
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Customer Care
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Terms & Support
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
                className="flex-shrink-0 cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 font-semibold text-sm rounded-full transition-all duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-xs sm:text-sm text-gray-500 px-4">
        © {new Date().getFullYear()} Ekspress. All rights reserved.
      </div>
    </footer>
  );
}
