import { HiCalendar, HiLocationMarker, HiUserGroup } from "react-icons/hi";
import { Link } from "react-router";

const FeaturedCampaign = ({ campaignActivities }) => {
  const featured = campaignActivities[0]; // First activity as featured

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
        Campaign Highlights
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto mb-6">
        Stay updated with the latest campaign activities, rallies, and initiatives
        from BNP candidates across Bangladesh.
        </p>
        </div>

        <Link to={`/campaigns/${featured.slug}`} className="block group">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gray-200">
            <img
              src={featured.featuredImage}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
            <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            {featured.category}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            {featured.title}
            </h3>
            <p className="text-gray-200 text-base sm:text-lg max-w-lg sm:max-w-2xl md:max-w-3xl">
            {featured.excerpt}
            </p>
            <div className="flex items-center gap-2 sm:gap-4 mt-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <HiUserGroup className="w-4 h-4" />
                  {featured.candidate}
                </span>
                <span className="flex items-center gap-1">
                  <HiLocationMarker className="w-4 h-4" />
                  {featured.location}
                </span>
                <span className="flex items-center gap-1">
                  <HiCalendar className="w-4 h-4" />
                  {featured.date}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCampaign;
