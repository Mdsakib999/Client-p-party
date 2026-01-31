const CandidatesSkeleton = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      {/* ===== Banner Skeleton ===== */}
      <div className="relative h-56 bg-green-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-700 to-green-800" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
          <div className="h-6 w-64 bg-white/40 rounded mb-4 animate-pulse" />

          {/* Search bar */}
          <div className="flex gap-2 w-full max-w-3xl">
            <div className="flex-1 h-10 bg-white rounded animate-pulse" />
            <div className="w-40 h-10 bg-white rounded animate-pulse hidden md:block" />
            <div className="w-40 h-10 bg-white rounded animate-pulse hidden md:block" />
            <div className="w-10 h-10 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* ===== Cards Grid Skeleton ===== */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="border border-green-200 rounded-xl p-4 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="h-40 w-full bg-green-100 rounded-lg animate-pulse mb-4" />

              {/* Name */}
              <div className="h-4 w-3/4 bg-green-200 rounded animate-pulse mb-2" />

              {/* Position */}
              <div className="h-3 w-1/2 bg-green-100 rounded animate-pulse mb-1" />

              {/* Location */}
              <div className="h-3 w-2/3 bg-green-100 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* ===== Pagination Skeleton ===== */}
        <div className="flex justify-center gap-3 mt-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-9 rounded-full bg-green-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidatesSkeleton;
