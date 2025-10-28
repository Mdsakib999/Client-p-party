import { Link } from "react-router";
import newsArticles from "../../data/newsArticles.json";
const HighlightCard = () => {
  const featuredNews = newsArticles[0];
  const newsItems = newsArticles.slice(1, 6);
  return (
    <div>
      {" "}
      {/* Featured News Card */}
      <div className="mb-6">
        <Link to={`/news/${featuredNews.slug}`} className="block">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group">
            <img
              src={featuredNews.featuredImage}
              alt={featuredNews.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-sm font-medium mb-4">
                {featuredNews.category}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                {featuredNews.title}
              </h3>
              <p className="text-gray-200 text-lg max-w-3xl">
                {featuredNews.excerpt}
              </p>
            </div>
          </div>
        </Link>
      </div>
      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {newsItems.map((news) => (
          <Link key={news.id} to={`/news/${news.slug}`} className="block group">
            <div className="relative h-[200px] rounded-2xl overflow-hidden">
              <img
                src={news.featuredImage}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-bold text-sm leading-tight">
                  {news.title}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HighlightCard;
