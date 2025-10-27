import { Link } from "react-router";

const NewsActivities = () => {
  const newsActivities = [
    {
      id: 1,
      title: "Life-Changing Moments: Personal Narratives that Inspire",
      author: "JANE MAY",
      date: "TODAY",
      image: "/news-activity1.jpg",
    },
    {
      id: 2,
      title: "Overcoming Adversity: Inspiring Tales of Resilience",
      author: "TAYLOR STONE",
      date: "TODAY",
      image: "/news-activity2.jpg",
    },
    {
      id: 3,
      title: "Cultural Chronicles: Traditions and Tales from Around the World",
      author: "LILLY LANE",
      date: "TODAY",
      image: "/news-activity3.jpg",
    },
    {
      id: 4,
      title: "Unheard Voices: Stories from Remote Communities",
      author: "JANE MAY",
      date: "TODAY",
      image: "/news-activity4.jpg",
    },
    {
      id: 5,
      title: "Unexpected Heroes: Ordinary People Doing Extraordinary Things",
      author: "TAYLOR STONE",
      date: "TODAY",
      image: "/news-activity5.jpg",
    },
    {
      id: 6,
      title: "Urban Legends: Exploring the Myths and Mysteries of Cities",
      author: "JANE MAY",
      date: "YESTERDAY",
      image: "/news-activity6.jpg",
    },
    {
      id: 7,
      title: "Innovative Minds: Stories of Creativity and Invention",
      author: "TAYLOR STONE",
      date: "YESTERDAY",
      image: "/news-activity7.jpg",
    },
    {
      id: 8,
      title: "The Human Connection: Heartwarming Stories that Unite Us",
      author: "JANE MAY",
      date: "YESTERDAY",
      image: "/news-activity8.jpg",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            News and Activities
          </h2>
          <p className="text-gray-600 text-lg">
            We Focus on the details of everything we do. All to help people
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newsActivities.map((item) => (
            <Link
              key={item.id}
              to={`/news-activities/${item.id}`}
              className="block group"
            >
              <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 uppercase">
                    {item.author} · {item.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Link */}
        <Link
          to="/news-activities"
          className="inline-block font-semibold text-sm hover:text-green-600 transition-colors"
        >
          See more +
        </Link>
      </div>
    </section>
  );
};

export default NewsActivities;
