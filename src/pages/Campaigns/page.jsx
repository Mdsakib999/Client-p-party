import CampaignHero from "../../components/Campaign/CampaignHero";
import UpcomingCampaigns from "../../components/Campaign/UpcomingCampaigns";
import CampaignActivities from "../../components/Campaign/CampaignActivities";
import CampaignStats from "../../components/Campaign/CampaignStats";
import campaignActivities from "../../data/campaignActivities.json";

const page = () => {
  const heroCampaign = campaignActivities[0];
  const upcomingCampaigns = campaignActivities.slice(1, 4);
  const recentCampaigns = campaignActivities.slice(4);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <CampaignHero campaign={heroCampaign} />
          </div>
          <div className="lg:col-span-1">
            <UpcomingCampaigns campaigns={upcomingCampaigns} />
          </div>
        </div>
        <div className="mb-16">
          <CampaignStats />
        </div>
        <div className="mb-8">
          <CampaignActivities campaignActivities={recentCampaigns} />
        </div>
      </div>
    </div>
  );
};

export default page;
