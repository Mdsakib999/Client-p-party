import { Link } from "react-router";
import { HiPlay } from "react-icons/hi";
import activitiesData from "../../data/activities.json";

const Activity = () => {
// Use activities data
const activities = activitiesData.slice(0, 4).map(activity => ({
  id: activity.id,
  title: activity.title,
  author: activity.category,
  date: activity.date,
  image: activity.featuredImage,
  slug: activity.slug,
}));

const featured = {
  id: activitiesData[4].id,
  category: activitiesData[4].category,
  title: activitiesData[4].title,
  description: activitiesData[4].excerpt,
  image: activitiesData[4].featuredImage,
  slug: activitiesData[4].slug,
};

  return (
    <section className="py-12 px-4 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Left - Activity List */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Activity</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  to={`/news/${activity.slug}`}
                  className="flex gap-3 group"
                >
                  <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 relative">
                  <img
                  src={activity.image}
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
                      {activity.author} · {activity.date}
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

          {/* Right - Featured Card */}
          <Link to={`https://www.youtube.com/watch?v=mYrsY6cZw1Q`} className="block group">
            <div className="relative h-[400px] rounded-3xl overflow-hidden">
              <img
                src='https://i.ibb.co.com/99Xcm55m/foysal-amin.png'
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/40 transition-colors">
                  <HiPlay className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  News
                </span>
                <h3 className="text-3xl font-bold mb-3 leading-tight">
                  The Goal is one, Establishing Democracy: Mirza Faisal
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">
                  {featured.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Activity;
