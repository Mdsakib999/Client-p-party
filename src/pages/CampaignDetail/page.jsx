import { useParams, Link } from "react-router";
import { Calendar, MapPin, Clock, ArrowLeft, User } from "lucide-react";
import campaignActivities from "../../data/campaignActivities.json";
import { useState, useEffect } from "react";

const CampaignDetail = () => {
  const { slug } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const foundCampaign = campaignActivities.find((c) => c.slug === slug);
    setCampaign(foundCampaign);
  }, [slug]);

  useEffect(() => {
    if (!campaign?.eventDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(campaign.eventDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [campaign]);

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <img
          src={campaign.featuredImage}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl w-full text-center">
            <Link
              to="/campaigns"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" /> Back to Campaigns
            </Link>
            <div className="mb-4">
              <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider inline-block">
                {campaign.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {campaign.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-white/90 text-sm md:text-base">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <Calendar size={18} /> {campaign.date}
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <MapPin size={18} /> {campaign.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <div className="prose max-w-none text-gray-600 leading-relaxed">
                <p className="text-xl font-medium text-gray-900 mb-8 leading-relaxed border-l-4 border-green-600 pl-4">
                  {campaign.excerpt}
                </p>
                {campaign.content.map((block, idx) => {
                  if (block.type === "text")
                    return (
                      <p key={idx} className="mb-6 text-lg">
                        {block.text}
                      </p>
                    );
                  if (block.type === "quote")
                    return (
                      <blockquote
                        key={idx}
                        className="border-l-4 border-green-600 pl-6 italic text-gray-800 my-8 bg-green-50 p-6 rounded-r-xl"
                      >
                        <p className="text-xl font-serif mb-4">"{block.text}"</p>
                        <footer className="text-sm font-bold text-green-700 flex items-center gap-2">
                          <span className="w-8 h-[2px] bg-green-600 inline-block"></span>
                          {block.author}
                        </footer>
                      </blockquote>
                    );
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Countdown Card */}
            {campaign.eventDate && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 text-center sticky top-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  <Clock className="text-green-600" size={20} />
                  Event Starts In
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hrs", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="bg-green-600 rounded-lg p-2 mb-1 shadow-md">
                        <span className="text-xl font-bold text-white block font-mono">
                          {String(item.value).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-gray-500">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-colors mb-3 shadow-lg shadow-green-200">
                  Register to Attend
                </button>
                <button className="w-full bg-white border-2 border-gray-200 hover:border-green-600 text-gray-600 hover:text-green-600 py-3 rounded-xl font-bold transition-colors">
                  Add to Calendar
                </button>
              </div>
            )}

            {/* Key Details Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
                Key Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                      Led By
                    </span>
                    <span className="font-medium text-gray-900 block">
                      {campaign.candidate}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                      Location
                    </span>
                    <span className="font-medium text-gray-900 block">
                      {campaign.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                      Date
                    </span>
                    <span className="font-medium text-gray-900 block">
                      {campaign.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
