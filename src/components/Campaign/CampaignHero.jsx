import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router";

const CampaignHero = ({ campaign }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-2xl shadow-2xl group">
      <div className="absolute inset-0">
        <img
          src={campaign.featuredImage}
          alt={campaign.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg animate-pulse">
              Next Major Event
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 border border-white/20">
              <MapPin size={14} /> {campaign.location}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {campaign.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
            {/* Countdown Timer */}
            <div className="flex gap-4">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="text-center group/timer">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 shadow-lg group-hover/timer:bg-green-600/20 transition-colors">
                    <span className="text-2xl md:text-3xl font-bold text-white font-mono">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-300 uppercase tracking-wider font-bold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <Link
                to={`/campaigns/${campaign.slug}`}
                className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-green-500/30 hover:shadow-lg flex items-center justify-center gap-2"
              >
                Join Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHero;
