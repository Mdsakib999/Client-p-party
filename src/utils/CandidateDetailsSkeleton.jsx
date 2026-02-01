const CandidateDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse pt-24">
      {/* Top Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="w-32 h-40 bg-emerald-100 rounded-lg flex-shrink-0" />

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div className="h-6 w-1/3 bg-emerald-100 rounded" />
          <div className="flex gap-2">
            <div className="h-4 w-20 bg-emerald-100 rounded-full" />
            <div className="h-4 w-24 bg-emerald-100 rounded-full" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-emerald-50 rounded" />
            <div className="h-4 w-5/6 bg-emerald-50 rounded" />
            <div className="h-4 w-4/6 bg-emerald-50 rounded" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-4 flex gap-4">
        <div className="h-8 w-24 bg-emerald-100 rounded-md" />
        <div className="h-8 w-32 bg-emerald-50 rounded-md" />
        <div className="h-8 w-36 bg-emerald-50 rounded-md" />
      </div>

      {/* Details Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="h-5 w-40 bg-emerald-100 rounded" />

          <div className="space-y-3">
            <div className="h-4 w-3/4 bg-emerald-50 rounded" />
            <div className="h-4 w-2/3 bg-emerald-50 rounded" />
          </div>

          <div className="h-5 w-48 bg-emerald-100 rounded" />
          <div className="h-12 w-full bg-emerald-50 rounded-lg" />
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="h-5 w-32 bg-emerald-100 rounded" />

          <div className="space-y-3">
            <div className="h-4 w-full bg-emerald-50 rounded" />
            <div className="h-4 w-5/6 bg-emerald-50 rounded" />
            <div className="h-4 w-4/6 bg-emerald-50 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsSkeleton;
