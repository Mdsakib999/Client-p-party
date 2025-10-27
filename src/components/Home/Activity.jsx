import { Link } from "react-router";

const Activity = () => {
  const activities = [
    {
      id: 1,
      title: "Underdog Triumph: Unexpected Victory at the Championship",
      author: "GARY NEVILLE",
      date: "TODAY",
      image: "/activity1.jpg",
    },
    {
      id: 2,
      title: "Reliving the Most Iconic Moments on Ice",
      author: "JOHN MOON",
      date: "TODAY",
      image: "/activity2.jpg",
    },
    {
      id: 3,
      title: "From Amateur to Pro: The Journey of Aspiring Boxers",
      author: "MIKE CHANDLER",
      date: "TODAY",
      image: "/activity3.jpg",
    },
    {
      id: 4,
      title: "Olympic Dreams: Athletes Prepare for Paris 2024",
      author: "JOHN WHITE",
      date: "YESTERDAY",
      image: "/activity4.jpg",
    },
  ];

  const featured = {
    id: 5,
    category: "Sports",
    title: "Underdog Triumph: Unexpected Victory at the Championship",
    description:
      "Against all odds, the underdog team delivered an astonishing performance, unexpected victory at the championship, leaving fans and critics alike in awe determination and skill.",
    image: "/activity-featured.jpg",
  };

  return (
    <section className="py-16 px-6 bg-green-50">
      <div className="max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          {/* Left - Activity List */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Activity</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <Link
                  key={activity.id}
                  to={`/activity/${activity.id}`}
                  className="flex gap-3 group"
                >
                  <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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
          <Link to={`/activity/${featured.id}`} className="block group">
            <div className="relative h-[400px] rounded-3xl overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {featured.category}
                </span>
                <h3 className="text-3xl font-bold mb-3 leading-tight">
                  {featured.title}
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
