import { NewsCardSkeleton } from "./NewsCardSkeleton";

export const FeaturedNewsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="relative w-full h-[500px] md:h-[600px] bg-gray-300 animate-pulse overflow-hidden rounded-3xl my-6">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-400 to-gray-500"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl">
          <div className="h-6 w-32 bg-gray-400/60 rounded-full mb-4"></div>
          <div className="space-y-3 mb-4">
            <div className="h-10 bg-gray-400/60 rounded w-full"></div>
            <div className="h-10 bg-gray-400/60 rounded w-4/5"></div>
            <div className="h-10 bg-gray-400/60 rounded w-3/5"></div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="h-4 w-36 bg-gray-400/60 rounded"></div>
            <div className="h-4 w-28 bg-gray-400/60 rounded"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(8)].map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
