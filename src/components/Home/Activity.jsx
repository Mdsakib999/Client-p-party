import { Link } from "react-router";
import { HiPlay } from "react-icons/hi";
import { useGetAllActivitiesQuery } from "../../redux/features/activity/activity.api";
import { useState } from "react";
import BNPLoader from "../../utils/BNPLoader";
import { extractYouTubeId, getFeaturedThumb, getSmallThumb } from "../../utils/extractYouTubeId";

const Activity = () => {
  const { data, isLoading } = useGetAllActivitiesQuery();
  const [showVideo, setShowVideo] = useState(false);

  if (isLoading) return <BNPLoader />

  const activities = data?.data || [];

  const featured = activities[0];

  const featuredVideoId = extractYouTubeId(featured?.videoLink);

  return (
    <section className="py-12 px-4 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-6">Activity</h2>

            <div className="space-y-4">
              {activities.slice(1, 5).map((activity) => (
                <Link
                  key={activity._id}
                  to={`/activities/${activity.slug}`}
                  className="flex gap-3 group"
                >
                  <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 relative">
                    <img
                      src={getSmallThumb(activity)}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                      <HiPlay className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-sm leading-tight mb-1 group-hover:text-green-600 transition-colors">
                      {activity.title}
                    </h3>

                    <p className="text-xs text-gray-600">
                      {new Date(activity.createdAt).toDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/activities"
              className="inline-block mt-6 font-semibold text-sm hover:text-green-600 transition-colors"
            >
              See more +
            </Link>
          </div>

          {featured && (
            <div
              className={`relative h-[400px] rounded-3xl overflow-hidden group ${featuredVideoId ? "cursor-pointer" : "cursor-default"
                }`}
              onClick={() => {
                if (featuredVideoId) setShowVideo(true);
              }}
            >
              {showVideo && featuredVideoId ? (
                <div className="w-full h-full animate-fadeIn">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                // ---------- IMAGE ALWAYS SHOWN ----------
                <>
                  <img
                    src={getFeaturedThumb(featured)}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient + Play Button ONLY IF video exists */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {featuredVideoId && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                        <HiPlay className="w-8 h-8 text-red-500" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                    <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      {featured.category}
                    </span>

                    <h3 className="text-3xl font-bold mb-3 leading-tight">
                      {featured.title}
                    </h3>

                    <p className="text-gray-200 text-sm leading-relaxed">
                      {featured.content?.slice(0, 140)}...
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Activity;
