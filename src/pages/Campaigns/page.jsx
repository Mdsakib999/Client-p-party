import CampaignHero from "../../components/Campaign/CampaignHero";
import UpcomingCampaigns from "../../components/Campaign/UpcomingCampaigns";
import CampaignActivities from "../../components/Campaign/CampaignActivities";
import CampaignStats from "../../components/Campaign/CampaignStats";
import campaignActivities from "../../data/campaignActivities.json";

const page = () => {
  // Sort campaigns by date if needed, here we assume JSON is ordered
  const heroCampaign = campaignActivities[0]; // Next big event (Youth Rally)
  const upcomingCampaigns = campaignActivities.slice(1, 4); // Next 3 events
  const recentCampaigns = campaignActivities.slice(4); // Past/Other events

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section: Hero + Upcoming List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Hero Section (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <CampaignHero campaign={heroCampaign} />
          </div>

          {/* Upcoming List (Takes up 1 column) */}
          <div className="lg:col-span-1">
            <UpcomingCampaigns campaigns={upcomingCampaigns} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <CampaignStats />
        </div>

        {/* Recent Activities / News Grid */}
        <div className="mb-8">
          {/* Reusing existing component for the grid */}
          <CampaignActivities campaignActivities={recentCampaigns} />
        </div>
      </div>
    </div>
  );
};

export default page;
