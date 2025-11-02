import { Link } from "react-router";
import newsArticles from "../../data/newsArticles.json";

const NewsSection = () => {
  const newsActivities = newsArticles.slice(0, 8);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            News and Activities
          </h2>
          <p className="text-gray-600 text-lg">
            We Focus on the details of everything we do. All to help people
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {newsActivities.map((item) => (
            <Link
              key={item.id}
              to={`/news/${item.slug}`}
              className="block group"
            >
              <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 uppercase">
                    {item.category} · {item.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Link */}
        <Link
          to="/news"
          className="inline-block font-semibold text-sm hover:text-green-600 transition-colors"
        >
          See more +
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;
