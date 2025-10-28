import { useParams, Link } from "react-router";
import newsArticles from "../../data/newsArticles.json";
import activitiesData from "../../data/activities.json";
import campaignActivities from "../../data/campaignActivities.json";

export default function NewsDetail() {
  const { slug } = useParams();

  // Campaign activities are imported from JSON

  const article = newsArticles.find((a) => a.slug === slug) ||
  activitiesData.find((a) => a.slug === slug) ||
  campaignActivities.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link to="/news" className="text-green-600 hover:underline">
          Back to News
        </Link>
      </div>
    );
  }

  const allArticles = [...newsArticles, ...activitiesData, ...campaignActivities];
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span className="uppercase font-semibold text-gray-700">
            {article.category}
          </span>
          <span>•</span>
          <span>{article.date}</span>
        </div>

        {/* Article Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {article.title}
        </h1>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.map((block, index) => {
            switch (block.type) {
              case "text":
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-6">
                    {block.text}
                  </p>
                );
              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-green-600 pl-6 py-4 my-8 bg-gray-50"
                  >
                    <p className="text-xl text-gray-800 italic mb-2">
                      "{block.text}"
                    </p>
                    <cite className="text-sm text-gray-600 not-italic">
                      — {block.author}
                    </cite>
                  </blockquote>
                );
              case "image":
                return (
                  <div key={index} className="my-8">
                    <img
                      src={block.url}
                      alt={block.alt}
                      className="w-full h-auto rounded-lg object-cover"
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>

      {/* Popular Posts Section */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Post</h2>
            <Link
              to="/news"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((post) => (
              <Link key={post.id} to={`/news/${post.slug}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      {post.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="text-green-600 text-sm font-semibold hover:underline">
                      Read More...
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
