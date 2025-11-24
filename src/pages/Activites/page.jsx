import { Link } from "react-router";
import { useState } from "react";
import { HiPlay } from "react-icons/hi";
import { useGetAllActivitiesQuery } from "../../redux/features/activity/activity.api";
import BNPLoader from "../../utils/BNPLoader";
import Pagination from "../../components/Pagination";
import { extractYouTubeId, getFeaturedThumb } from "../../utils/extractYouTubeId";

export default function Activities() {
  const { data, isLoading } = useGetAllActivitiesQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isLoading) return <BNPLoader />;

  const activities = data?.data || [];

  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedActivities = activities.slice(start, end);

  return (
    <section className="py-12 px-4 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">All Activities</h2>
        <p className="text-gray-600 md:text-lg max-w-3xl mx-auto mb-10 text-center">
            We Focus on the details of everything we do. All to help businesses
            around the world Focus on what's most important to them.
          </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedActivities.map((activity) => {
            const videoId = extractYouTubeId(activity.videoLink);

            return (
              <Link
                key={activity._id}
                to={`/activities/${activity.slug}`}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={videoId ? getFeaturedThumb(activity) : activity.featuredImage?.url}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {videoId && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                        <HiPlay className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {activity.category}
                  </span>

                  <h3 className="text-lg font-bold mt-3 group-hover:text-green-700 transition-colors line-clamp-2">
                    {activity.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {activity.content}
                  </p>

                  <p className="text-gray-400 text-xs mt-3">
                    {new Date(activity.createdAt).toDateString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {
          totalPages && totalPages.length > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )
        }
      </div>
    </section>
  );
}
