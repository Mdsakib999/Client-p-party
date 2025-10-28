import FeaturedCampaign from "../../components/Campaign/FeaturedCampaign";
import CampaignActivities from "../../components/Campaign/CampaignActivities";
import CampaignStats from "../../components/Campaign/CampaignStats";
import campaignActivities from "../../data/campaignActivities.json";

const page = () => {
  return (
    <div>
      <div className="px-6 py-10 max-w-8xl mx-auto">
        <FeaturedCampaign campaignActivities={campaignActivities} />
      </div>
      <CampaignStats />
      <CampaignActivities campaignActivities={campaignActivities} />
    </div>
  );
};

export default page;
