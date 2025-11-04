export default function BNPLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative">
        <div className="relative w-32 h-32">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#006747"
              strokeWidth="8"
              strokeDasharray="339.292"
              strokeDashoffset="84.823"
              strokeLinecap="round"
              className="animate-spin origin-center"
              style={{ animationDuration: "1.5s" }}
            />
          </svg>

          {/* Red arc */}
          <svg
            className="absolute inset-0 w-full h-full rotate-180"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#F42A41"
              strokeWidth="8"
              strokeDasharray="339.292"
              strokeDashoffset="254.469"
              strokeLinecap="round"
              className="animate-spin origin-center"
              style={{ animationDuration: "1.5s" }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 rounded-full bg-red-600 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700 font-medium text-sm tracking-wide">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}
