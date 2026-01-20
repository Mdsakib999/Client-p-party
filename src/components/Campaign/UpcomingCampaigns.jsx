import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router";

const UpcomingCampaigns = ({ campaigns }) => {
  const getDaysAway = (dateString) => {
    const diff = new Date(dateString) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
          <Calendar className="text-green-600" />
          Upcoming Schedule
        </h3>
      </div>

      <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
        {campaigns.map((campaign) => {
          const daysAway = getDaysAway(campaign.eventDate);

          return (
            <div key={campaign.id} className="group relative pl-12">
              {/* Timeline Dot */}
              <div
                className={`absolute left-[11px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${
                  daysAway <= 5 ? "bg-red-500" : "bg-green-500"
                }`}
              />

              <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-2 py-1 rounded">
                  {campaign.category}
                </span>
                <span
                  className={`px-2 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                    daysAway <= 5
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <Clock size={10} />
                  In {daysAway} Days
                </span>
              </div>

              <Link to={`/campaigns/${campaign.slug}`}>
                <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2 text-lg">
                  {campaign.title}
                </h4>
              </Link>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500 font-medium">
                  {campaign.location}
                </span>
                <Link
                  to={`/campaigns/${campaign.slug}`}
                  className="text-green-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 duration-300"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingCampaigns;
