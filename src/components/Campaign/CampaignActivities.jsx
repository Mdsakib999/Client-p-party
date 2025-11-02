import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

const CampaignActivities = ({ campaignActivities }) => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Campaign Activities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Latest updates from BNP candidates' campaign activities, public meetings,
            and community engagements across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {campaignActivities.slice(1, 7).map((activity) => (
            <Link
              key={activity.id}
              to={`/news/${activity.slug}`}
              className="block group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={activity.featuredImage}
                  alt={activity.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {activity.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {activity.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors leading-tight">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {activity.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium">{activity.candidate}</span>
                  <span>{activity.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 transition-colors font-semibold text-lg"
          >
            View All Campaign News <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampaignActivities;
