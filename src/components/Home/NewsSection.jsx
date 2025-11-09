import { Link } from "react-router";

const NewsSection = ({ newsArticles }) => {
  const newsActivities = newsArticles?.slice(0, 8) || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            News and Activities
          </h2>
          <p className="text-gray-600 text-lg">
            We Focus on the details of everything we do. All to help people
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newsActivities.map((item) => (
            <Link
              key={item._id}
              to={`/news/${item.slug}`}
              className="block group"
            >
              <div className="w-full max-w-96 mx-auto rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={item?.images?.[0]?.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base leading-tight mb-2 group-hover:text-green-600 transition-colors">
                    {item.title.slice(0, 50)}...
                  </h3>
                  <p className="text-xs text-gray-600">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
