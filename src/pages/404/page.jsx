import React, { useState, useEffect } from "react";
import { Home, Search, ArrowLeft, Flag } from "lucide-react";

export default function BNP404Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-10 left-10 opacity-10">
        <Flag className="w-16 h-16 text-green-700" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Flag className="w-20 h-20 text-red-700" />
      </div>

      <div
        className={`relative z-10 max-w-2xl w-full text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-16 h-2 bg-green-600 rounded-full"></div>
          <div className="w-16 h-2 bg-red-600 rounded-full"></div>
        </div>

        <h1 className="text-9xl font-bold mb-4">
          <span className="text-emerald-600">4</span>
          <span className="text-red-600">0</span>
          <span className="text-emerald-600">4</span>
        </h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-green-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা পাওয়া যায়নি
          </p>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go Home
          </a>

          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-600">
          <p className="mb-3 font-semibold">Popular Pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/about"
              className="hover:text-green-600 transition-colors underline"
            >
              About Us
            </a>
            <span>•</span>
            <a
              href="/news"
              className="hover:text-green-600 transition-colors underline"
            >
              News
            </a>
            <span>•</span>
            <a
              href="/contact"
              className="hover:text-green-600 transition-colors underline"
            >
              Contact
            </a>
            <span>•</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center w-full text-sm text-gray-500">
        <p>Bangladesh Nationalist Party © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
