import { Link } from "react-router";
import logo from "../../assets/BNP-logo.png";
import { FaXTwitter } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info - Enhanced */}
          <div className="space-y-6 text-center md:text-left lg:col-span-1">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <img src={logo} className="w-32 md:w-46" alt="" srcset="" />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs mx-auto md:mx-0">
             {t('footer_title_text')}
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 justify-center md:justify-start">
              <a
              target="_blank"
                href="https://www.facebook.com/people/BNPcandidatescom/61587275225560/"
                className="w-10 h-10 bg-gray-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              
              <a
                // href=""
                className="w-10 h-10 bg-gray-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                // href=""
                className="w-10 h-10 bg-gray-800 hover:bg-green-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
              >
                <FaXTwitter />
                {/* <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg> */}
              </a>
              
            </div>
          </div>

          

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider relative inline-block ">
              {t('footer_quick')}
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-green-600 rounded-full mt-2"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: t('nav_home') },
                // { to: "/candidates", label: t('nav_candidates') },
                { to: "/vision", label: t('nav_vision') },
                { to: "/contact", label: t('nav_contact') },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-400 hover:text-green-500 hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider relative inline-block">
              {t('footer_Resources')}
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-green-600 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/campaigns", label: t('nav_campaigns') },
                { to: "/privacy-policy", label: t('footer_privacy') },
                { to: "/terms-and-conditions", label: t('footer_terms') },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-400 hover:text-green-500 hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5 ">
            <h4 className="text-lg font-bold text-white uppercase tracking-wider relative inline-block">
              {t('footer_stay')}
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-green-600 rounded-full"></span>
            </h4>
            <p className="text-sm text-gray-400">
              {t('footer_stay_text')}
            </p>

            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 px-4 py-3.5 rounded-lg text-sm focus:ring-2 focus:ring-green-600 focus:border-transparent focus:outline-none transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:from-green-600 hover:to-green-800 text-white px-6 py-3.5 font-semibold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Bottom Bar - Enhanced */}
      <div className="max-w-7xl mx-auto py-6 px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Bnpcandidates.com.</span>
            <span className="hidden md:inline">All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span>Design & Developed by</span>
            <Link
              to="https://smitsolution.com.bd/"
              target="_blank"
              className="text-green-500 hover:text-green-400 font-medium transition-colors duration-300"
            >
              SM IT SOLUTION
            </Link>
            <span className="text-gray-600">•</span>
            <span className="text-gray-500">
              Associated with{" "}
              <Link to="https://www.facebook.com/breakthemalt.event" target="_" className="text-green-500 hover:text-green-400 font-medium">
                BREAK THE MALT
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
