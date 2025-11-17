export const NewsCardSkeleton = () => {
  return (
    <div className="w-full max-w-96 mx-auto rounded-2xl overflow-hidden bg-white shadow-md animate-pulse">
      <div className="aspect-[4/3] bg-gray-300"></div>
      <div className="p-4">
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};
