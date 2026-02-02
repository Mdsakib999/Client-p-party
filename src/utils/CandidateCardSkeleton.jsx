const cards = Array.from({ length: 6 });

const CandidateCardSkeleton = () => {
  return (
    <div className="md:hidden space-y-4">
      {cards.map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 animate-pulse"
        >
          <div className="flex gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="h-4 w-48 bg-gray-200 rounded mb-3" />

          <div className="flex gap-2">
            <div className="h-10 flex-1 bg-gray-200 rounded" />
            <div className="h-10 flex-1 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CandidateCardSkeleton;
